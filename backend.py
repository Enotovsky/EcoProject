# =============================================================================
# EcoScan API — Бэкенд для калькулятора углеродного следа по QR-кодам чеков
# =============================================================================

# --- Стандартные библиотеки ---
import json
import os
import io
import logging

# --- Веб-фреймворк и утилиты ---
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

# --- Обработка изображений ---
import cv2
import numpy as np

# --- Декодирование QR-кода ---
from pyzbar.pyzbar import decode as qr_decode

# --- HTTP Клиент ---
import httpx

# --- Модуль ИИ-анализа чеков ---
from API_LM import EcoScanAI

# --- Запуск сервера ---
import uvicorn


# =============================================================================
# Настройка логирования — вывод в консоль на русском языке
# =============================================================================
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("ecoscan")


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
# Инициализация приложения FastAPI
# =============================================================================
app = FastAPI(title="EcoScan API")

# --- Настройка CORS для фронтенд-разработки (Vite dev-сервер) ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =============================================================================
# Инициализация модулей на уровне модуля
# =============================================================================
ai_module = EcoScanAI()
logger.info("Модуль ИИ-анализа (EcoScanAI) инициализирован.")


# =============================================================================
# Цветовая палитра для категорий продуктов
# =============================================================================
CATEGORY_COLORS = {
    "Мясо и Птица": "#ff6b6b",
    "Молочные продукты и Яйца": "#ffa502",
    "Рыба и Морепродукты": "#00d9ff",
    "Овощи, Фрукты и Зелень": "#c6ff00",
    "Бакалея и Хлеб": "#a29bfe",
    "Сладости и Снеки": "#fd79a8",
    "Напитки в пластике/жести": "#74b9ff",
    "Пластиковая упаковка / Пакеты": "#636e72",
    "Другое": "#dfe6e9",
}


# =============================================================================
# Вспомогательные функции
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
    """
    Рекурсивный поиск значения ключа в словаре/списке любой вложенности.
    Помогает найти список товаров 'items' в ответе API ФНС.
    """
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
    """
    Запрашивает данные чека по строке QR-кода через API proverkacheka.com.
    Возвращает список товаров чека.
    """
    url = "https://proverkacheka.com/api/v1/check/get"
    payload = {
        "qrraw": qr_raw,
        "token": token
    }
    
    logger.info("Отправляем запрос к API proverkacheka.com...")
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(url, data=payload)
        
    if response.status_code != 200:
        raise Exception(f"Ошибка API (код {response.status_code}): {response.text}")
        
    res_json = response.json()
    
    # Проверяем коды ответов API
    # code 1 — успешная проверка чека в ФНС
    # code 0 — ошибка запроса (неверные параметры и т.д.)
    # code 2 — чек корректен, но еще не загружен в базу ФНС (ОФД его принял)
    # code 3 — сбой при проверке в ФНС (база недоступна)
    code = res_json.get("code")
    
    if code == 0:
        error_msg = res_json.get("data", "Неизвестная ошибка параметров запроса.")
        raise Exception(f"Неверные данные чека: {error_msg}")
    elif code in (2, 3):
        # Попробуем все равно найти товары, так как ОФД мог передать квитанцию
        logger.warning(f"База ФНС временно вернула статус {code}. Пробуем найти товары в квитанции ОФД...")
        
    items = find_key_recursive(res_json, "items")
    if not items:
        # Если товаров нет, бросаем ошибку с пояснением от API
        desc = res_json.get("data", "Не удалось получить список товаров из базы ФНС.")
        raise Exception(f"База ФНС ответила: {desc}")
        
    return items


# =============================================================================
# POST /api/analyze — Основной эндпоинт: загрузка фото чека и анализ по QR
# =============================================================================
@app.post("/api/analyze")
async def analyze_receipt(file: UploadFile = File(...)):
    """
    Принимает фотографию чека, считывает QR-код,
    запрашивает официальные данные из ФНС и отправляет их в LLM.
    """
    try:
        # --- Валидация типа файла ---
        if not file.content_type or not file.content_type.startswith("image/"):
            logger.warning(f"Отклонён файл с неверным типом: {file.content_type}")
            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "error": "Неподдерживаемый формат файла. Пожалуйста, загрузите изображение чека (JPEG, PNG).",
                },
            )

        # --- Чтение содержимого файла ---
        file_bytes = await file.read()

        # --- Валидация размера файла (максимум 10 МБ) ---
        max_size = 10 * 1024 * 1024  # 10 МБ в байтах
        if len(file_bytes) > max_size:
            logger.warning(f"Отклонён файл: размер {len(file_bytes)} байт превышает лимит.")
            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "error": "Файл слишком большой. Максимальный размер — 10 МБ.",
                },
            )

        logger.info(f"Получен файл чека: {file.filename}, размер: {len(file_bytes)} байт")

        # --- Шаг 1: Распознавание QR-кода на чеке ---
        try:
            qr_raw = extract_qr_code(file_bytes)
        except Exception as e:
            logger.error(f"Ошибка при декодировании картинки: {e}")
            return JSONResponse(
                status_code=400,
                content={
                    "success": False,
                    "error": "Не удалось декодировать изображение. Пожалуйста, убедитесь, что файл не поврежден.",
                }
            )

        if not qr_raw:
            logger.warning("QR-код на чеке не обнаружен.")
            return JSONResponse(
                content={
                    "success": False,
                    "error": "QR-код не обнаружен на изображении чека. Пожалуйста, сфотографируйте чек так, чтобы QR-код внизу был чётко виден, находился в фокусе и не был обрезан.",
                }
            )

        logger.info(f"QR-код успешно считан: {qr_raw}")

        # --- Шаг 2: Проверка токена ФНС API ---
        token = os.getenv("PROVERKACHEKA_TOKEN")
        if not token:
            logger.error("API Токен PROVERKACHEKA_TOKEN отсутствует в .env файле.")
            return JSONResponse(
                content={
                    "success": False,
                    "error": "Сервер не настроен для работы с ФНС: отсутствует API-токен в файле .env. Пожалуйста, обратитесь к администратору или пропишите токен.",
                }
            )

        # --- Шаг 3: Получение оригинального списка товаров из ФНС ---
        try:
            fns_items = await fetch_receipt_from_fns(qr_raw, token)
        except Exception as e:
            logger.error(f"Не удалось получить данные из ФНС: {e}")
            return JSONResponse(
                content={
                    "success": False,
                    "error": f"Ошибка связи с ФНС: {str(e)}",
                }
            )

        logger.info(f"Успешно получены данные чека из ФНС. Всего товаров: {len(fns_items)}")

        # --- Шаг 4: Форматирование списка товаров для отправки в LLM ---
        formatted_lines = []
        for idx, item in enumerate(fns_items, 1):
            name = item.get("name") or item.get("product_name") or item.get("text")
            if name:
                price = item.get("price", 0) / 100.0  # Цена переводится из копеек в рубли
                qty = item.get("quantity", 1)
                formatted_lines.append(f"{idx}. {name} x{qty} = {price:.2f}")

        if not formatted_lines:
            logger.error("Список товаров пуст после форматирования.")
            return JSONResponse(
                content={
                    "success": False,
                    "error": "В чеке не обнаружены наименования продуктов.",
                }
            )

        text_to_analyze = "\n".join(formatted_lines)
        logger.info(f"Сформирован текст чека для анализа LLM:\n{text_to_analyze}")

        # --- Шаг 5: ИИ-анализ полученного текста чека ---
        logger.info("Отправляем текст товаров на ИИ-анализ...")
        try:
            items = ai_module.analyze_receipt_text(text_to_analyze)
        except Exception as e:
            logger.error(f"Ошибка ИИ-анализа: {e}")
            return JSONResponse(
                content={
                    "success": False,
                    "error": str(e),
                }
            )

        if not items:
            logger.error("Модуль ИИ-анализа вернул пустой результат.")
            return JSONResponse(
                content={
                    "success": False,
                    "error": "Не удалось классифицировать продукты с помощью ИИ. Пожалуйста, попробуйте еще раз.",
                }
            )

        logger.info(f"ИИ-анализ успешно завершён. Классифицировано {len(items)} товаров.")

        # =================================================================
        # Расчёт метрик углеродного следа
        # =================================================================
        total_co2 = sum(item.get("co2_coefficient", 0) for item in items)
        avg_co2 = total_co2 / len(items) if items else 0
        eco_score = max(0, min(100, int(100 * (1 - (avg_co2 - 0.6) / (15.0 - 0.6)))))

        # =================================================================
        # Построение данных для диаграммы по категориям
        # =================================================================
        categories_data = {}
        for item in items:
            category = item.get("category", "Другое")
            co2 = item.get("co2_coefficient", 0)

            if category not in categories_data:
                categories_data[category] = {"total_co2": 0, "count": 0}

            categories_data[category]["total_co2"] += co2
            categories_data[category]["count"] += 1

        categories_chart = []
        for category, data in categories_data.items():
            categories_chart.append({
                "category": category,
                "total_co2": round(data["total_co2"], 2),
                "count": data["count"],
                "color": CATEGORY_COLORS.get(category, "#dfe6e9"),
            })

        categories_chart.sort(key=lambda x: x["total_co2"], reverse=True)

        # =================================================================
        # Формируем и возвращаем итоговый ответ
        # =================================================================
        response = {
            "success": True,
            "total_co2": round(total_co2, 2),
            "eco_score": eco_score,
            "items": items,
            "categories_chart": categories_chart,
            "ocr_text": text_to_analyze,  # Возвращаем текст из ФНС вместо OCR
        }

        logger.info(f"Анализ завершён. Общий CO2: {response['total_co2']} кг, Эко-оценка: {eco_score}/100")
        return JSONResponse(content=response)

    except Exception as e:
        logger.exception(f"Критическая ошибка при обработке запроса: {e}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error": f"Ошибка сервера при обработке: {str(e)}",
            },
        )


# =============================================================================
# Раздача статических файлов фронтенда (SPA) — если сборка существует
# =============================================================================
frontend_dist_path = os.path.join(os.path.dirname(__file__), "frontend", "dist")

if os.path.isdir(frontend_dist_path):
    app.mount("/assets", StaticFiles(directory=os.path.join(frontend_dist_path, "assets")), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        requested_file = os.path.join(frontend_dist_path, full_path)
        if os.path.isfile(requested_file):
            return FileResponse(requested_file)
        return FileResponse(os.path.join(frontend_dist_path, "index.html"))

    logger.info(f"Фронтенд подключён из директории: {frontend_dist_path}")
else:
    logger.warning(f"Директория фронтенда не найдена: {frontend_dist_path}")


# =============================================================================
# Точка входа — запуск сервера Uvicorn
# =============================================================================
if __name__ == "__main__":
    logger.info("Запуск EcoScan API сервера на http://0.0.0.0:8000")
    uvicorn.run(app, host="0.0.0.0", port=8000)
