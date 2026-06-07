# =============================================================================
# EcoScan Telegram Bot — Бот для анализа углеродного следа по QR-кодам чеков
# =============================================================================

import os
import io
import logging
import telebot
import cv2
import numpy as np
import httpx
from pyzbar.pyzbar import decode as qr_decode
from API_LM import EcoScanAI

# --- Настройка логирования ---
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("ecoscan_bot")


# =============================================================================
# Ручная загрузка переменных окружения из .env файла
# =============================================================================
def load_dotenv_manually():
    dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
    if os.path.exists(dotenv_path):
        with open(dotenv_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()
        logger.info("Переменные окружения из .env файла загружены.")
    else:
        logger.warning("Файл .env не найден в корне проекта.")

load_dotenv_manually()


# =============================================================================
# Проверка конфигурации и инициализация бота
# =============================================================================
bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
if not bot_token:
    logger.error("Переменная TELEGRAM_BOT_TOKEN не найдена в .env файле!")
else:
    logger.info("Токен Telegram-бота успешно считан из .env.")

# Инициализируем бота
bot = telebot.TeleBot(bot_token) if bot_token else None

# Инициализируем ИИ-модуль
ai_module = EcoScanAI()

# Карта категорий и соответствующих эмодзи для наглядности в мессенджере
CATEGORY_EMOJIS = {
    "Мясо и Птица": "🥩",
    "Молочные продукты и Яйца": "🥛",
    "Рыба и Морепродукты": "🐟",
    "Овощи, Фрукты и Зелень": "🍏",
    "Бакалея и Хлеб": "🍞",
    "Сладости и Снеки": "🍫",
    "Напитки в пластике/жести": "🥤",
    "Пластиковая упаковка / Пакеты": "🛍️",
    "Другое": "📦",
}


# =============================================================================
# Вспомогательные функции для работы с QR-кодом и ФНС API
# =============================================================================

def extract_qr_code(image_bytes: bytes) -> str:
    """
    Декодирует строку QR-кода из байтов изображения с помощью pyzbar.
    Пробует распознать на оригинале, в сером цвете и на улучшенном контрасте.
    """
    np_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(np_array, cv2.IMREAD_COLOR)

    if image is None:
        raise ValueError("Не удалось декодировать изображение чека.")

    # 1. Попытка на оригинальном цветном изображении
    qr_codes = qr_decode(image)
    if qr_codes:
        return qr_codes[0].data.decode("utf-8")

    # 2. Попытка в оттенках серого
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    qr_codes = qr_decode(gray)
    if qr_codes:
        return qr_codes[0].data.decode("utf-8")

    # 3. Попытка с улучшением локального контраста (CLAHE)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)
    qr_codes = qr_decode(enhanced)
    if qr_codes:
        return qr_codes[0].data.decode("utf-8")

    return ""


def find_key_recursive(data, key_to_find):
    """Рекурсивный поиск значения ключа в словаре/списке любой вложенности."""
    if isinstance(data, dict):
        if key_to_find in data:
            return data[key_to_find]
        for v in data.values():
            result = find_key_recursive(v, key_to_find)
            if result is not None:
                return result
    elif isinstance(data, list):
        for item in data:
            result = find_key_recursive(item, key_to_find)
            if result is not None:
                return result
    return None


async def fetch_receipt_from_fns(qr_raw: str, token: str) -> list:
    """Запрашивает данные чека по строке QR-кода через API proverkacheka.com."""
    url = "https://proverkacheka.com/api/v1/check/get"
    payload = {
        "qrraw": qr_raw,
        "token": token
    }
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(url, data=payload)
        
    if response.status_code != 200:
        raise Exception(f"Ошибка API (код {response.status_code}): {response.text}")
        
    res_json = response.json()
    code = res_json.get("code")
    
    if code == 0:
        error_msg = res_json.get("data", "Неизвестная ошибка параметров запроса.")
        raise Exception(f"Неверные данные чека: {error_msg}")
    elif code in (2, 3):
        logger.warning(f"База ФНС временно вернула статус {code}. Пробуем найти товары в квитанции ОФД...")
        
    items = find_key_recursive(res_json, "items")
    if not items:
        desc = res_json.get("data", "Не удалось получить список товаров из базы ФНС.")
        raise Exception(f"База ФНС ответила: {desc}")
        
    return items


# =============================================================================
# Обработчики команд Telegram-бота
# =============================================================================

if bot:
    @bot.message_handler(commands=['start', 'help'])
    def send_welcome(message):
        welcome_text = (
            "🌱 **Приветствую в EcoScan!**\n\n"
            "Я бот для экспресс-анализа углеродного следа ваших покупок.\n\n"
            "📸 **Как пользоваться:**\n"
            "1. Сфотографируйте чек из магазина.\n"
            "2. Убедитесь, что **QR-код внизу чека** получился чётким, не размытым и полностью попал в кадр.\n"
            "3. Отправьте фото мне.\n\n"
            "Я считаю QR-код, запрошу официальные данные у Федеральной налоговой службы (ФНС) и пришлю вам подробный разбор с расчётом выбросов CO₂ по категориям продуктов и экологическими советами!"
        )
        bot.reply_to(message, welcome_text, parse_mode="Markdown")


    @bot.message_handler(content_types=['photo'])
    def handle_receipt_photo(message):
        chat_id = message.chat.id
        status_msg = bot.send_message(chat_id, "📥 Скачиваю изображение...")

        try:
            # --- Шаг 1: Скачивание фотографии ---
            # Берем наибольшее разрешение фотографии
            file_info = bot.get_file(message.photo[-1].file_id)
            downloaded_file = bot.download_file(file_info.file_path)
            
            bot.edit_message_text("🔍 Сканирую QR-код на чеке...", chat_id, status_msg.message_id)

            # --- Шаг 2: Распознавание QR-кода ---
            qr_raw = extract_qr_code(downloaded_file)
            if not qr_raw:
                bot.edit_message_text(
                    "⚠️ **QR-код не обнаружен.**\n\n"
                    "Пожалуйста, сделайте более чёткую фотографию чека. Убедитесь, что QR-код внизу чека хорошо освещён, "
                    "находится в фокусе, не помят и не обрезан по краям.", 
                    chat_id, status_msg.message_id, parse_mode="Markdown"
                )
                return

            logger.info(f"Telegram-бот успешно считал QR-код: {qr_raw}")
            bot.edit_message_text("🌐 Запрашиваю официальные данные чека из ФНС...", chat_id, status_msg.message_id)

            # --- Шаг 3: Проверка токена ---
            fns_token = os.getenv("PROVERKACHEKA_TOKEN")
            if not fns_token:
                bot.edit_message_text(
                    "❌ **Ошибка настройки сервера**\n\n"
                    "На сервере бота не настроен токен `PROVERKACHEKA_TOKEN` в файле `.env`. Пожалуйста, укажите токен.",
                    chat_id, status_msg.message_id, parse_mode="Markdown"
                )
                return

            # --- Шаг 4: Запрос товаров из ФНС ---
            try:
                # Так как библиотека telebot синхронная, запустим асинхронную функцию запроса в синхронном режиме
                import asyncio
                fns_items = asyncio.run(fetch_receipt_from_fns(qr_raw, fns_token))
            except Exception as fns_err:
                logger.error(f"Ошибка получения чека из ФНС: {fns_err}")
                bot.edit_message_text(
                    f"❌ **Не удалось получить данные чека из ФНС**\n\n"
                    f"Подробности: {str(fns_err)}",
                    chat_id, status_msg.message_id, parse_mode="Markdown"
                )
                return

            bot.edit_message_text(
                f"📝 Данные получены ({len(fns_items)} товаров). ИИ классифицирует продукты...", 
                chat_id, status_msg.message_id
            )

            # --- Шаг 5: Форматирование товаров для ИИ ---
            formatted_lines = []
            for idx, item in enumerate(fns_items, 1):
                name = item.get("name") or item.get("product_name") or item.get("text")
                if name:
                    price = item.get("price", 0) / 100.0
                    qty = item.get("quantity", 1)
                    formatted_lines.append(f"{idx}. {name} x{qty} = {price:.2f}")

            if not formatted_lines:
                bot.edit_message_text(
                    "❌ В полученных данных чека не обнаружено перечня продуктов.",
                    chat_id, status_msg.message_id
                )
                return

            text_to_analyze = "\n".join(formatted_lines)

            # --- Шаг 6: Анализ через LLM ---
            try:
                items = ai_module.analyze_receipt_text(text_to_analyze)
            except Exception as ai_err:
                logger.error(f"Ошибка ИИ-анализа: {ai_err}")
                bot.edit_message_text(
                    f"❌ **Ошибка работы искусственного интеллекта**\n\n"
                    f"Убедитесь, что LM Studio запущена и модель загружена. Подробности:\n`{str(ai_err)}`",
                    chat_id, status_msg.message_id, parse_mode="Markdown"
                )
                return

            if not items:
                bot.edit_message_text(
                    "❌ Нейросеть вернула пустой результат анализа. Попробуйте отправить чек еще раз.",
                    chat_id, status_msg.message_id
                )
                return

            # --- Шаг 7: Расчет экологических метрик ---
            total_co2 = sum(item.get("co2_coefficient", 0) for item in items)
            avg_co2 = total_co2 / len(items) if items else 0
            eco_score = max(0, min(100, int(100 * (1 - (avg_co2 - 0.6) / (15.0 - 0.6)))))

            # --- Шаг 8: Сборка итогового сообщения ---
            response_text = (
                f"📊 **Результаты анализа EcoScan**\n\n"
                f"🌿 **Эко-оценка:** `{eco_score}/100`\n"
                f"🌍 **Общий углеродный след:** `{total_co2:.2f} кг CO₂`\n"
                f"🛍️ **Всего товаров:** `{len(items)}`\n\n"
                f"🛒 **Классифицированные продукты:**\n"
            )

            for idx, item in enumerate(items, 1):
                cat = item.get("category", "Другое")
                emoji = CATEGORY_EMOJIS.get(cat, "📦")
                co2_val = item.get("co2_coefficient", 0)
                clean_name = item.get("clean_name", "Товар")
                eco_tip = item.get("eco_tip", "")

                response_text += (
                    f"*{idx}. {clean_name}*\n"
                    f"└ Категория: {emoji} {cat}\n"
                    f"└ След: `{co2_val:.2f} кг CO₂`\n"
                )
                if eco_tip:
                    response_text += f"└ 💡 *Совет:* {eco_tip}\n"
                response_text += "\n"

            # Отправляем итоговый результат
            bot.edit_message_text(response_text, chat_id, status_msg.message_id, parse_mode="Markdown")
            logger.info(f"Бот успешно отправил результаты анализа в чат {chat_id}")

        except Exception as e:
            logger.exception("Критическая ошибка при обработке фото ботом:")
            bot.edit_message_text(
                f"❌ **Критическая ошибка при обработке:**\n`{str(e)}`",
                chat_id, status_msg.message_id, parse_mode="Markdown"
            )


# =============================================================================
# Точка входа — запуск бота в режиме бесконечного опроса (polling)
# =============================================================================
if __name__ == "__main__":
    if not bot_token:
        print("\n[КРИТИЧЕСКАЯ ОШИБКА] Бот не может быть запущен: отсутствует TELEGRAM_BOT_TOKEN в файле .env.")
    else:
        print("\n==================================================")
        print("🤖 EcoScan Telegram Bot успешно запущен!")
        print("Отправьте команду /start вашему боту в Telegram.")
        print("Для выхода нажмите Ctrl+C.")
        print("==================================================\n")
        bot.infinity_polling()
