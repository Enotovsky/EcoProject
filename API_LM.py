import json
from openai import OpenAI


class LMStudioError(Exception):
    """Исключение при обращении к серверу LM Studio (соединение, отсутствие моделей и т.д.)"""
    pass


class LLMResponseError(Exception):
    """Исключение при некорректном формате ответа от модели (например, не JSON)"""
    pass


class EcoScanAI:
    def __init__(self, base_url="http://localhost:1234/v1", api_key="lm-studio"):
        # Инициализируем клиент, указывая адрес локального сервера LM Studio
        self.client = OpenAI(base_url=base_url, api_key=api_key)

        # Задаем тот самый системный промт, который мы протестировали
        self.system_prompt = (
            "You are a strict Data Extraction API for the EcoScan platform. "
            "Your only task is to transform raw, noisy retail receipt text from CIS countries into a structured JSON array.\n\n"
            "Strict Execution Rules:\n"
            "1. Output Constraint: Return ONLY a valid JSON array. Do not include any introductory phrases, markdown formatting "
            "(do not wrap JSON in ```json), explanations, or closing remarks. Your response must start with '[' and end with ']'.\n"
            "2. CIS Retail NLP: Correctly decode messy abbreviations common in CIS receipts (e.g., 'мол.', 'молок.' -> Milk/Dairy; "
            "'хл', 'бул' -> Bread/Bakery; 'колб', 'сосис' -> Meat; 'пак', 'пл' -> Plastic bag/Packaging).\n"
            "3. Noise Filtering: Completely ignore metadata lines (receipt numbers, dates, cashiers, VAT/НДС, total sums, store addresses).\n"
            "4. Categorization & Emission Mapping: Map each real product to one of the following exact categories and assign the "
            "specified CO2 coefficient (float number, kg CO2 per 1 kg/unit of product):\n"
            "   - 'Мясо и Птица' (coefficient: 15.0)\n"
            "   - 'Молочные продукты и Яйца' (coefficient: 4.5)\n"
            "   - 'Рыба и Морепродукты' (coefficient: 5.0)\n"
            "   - 'Овощи, Фрукты и Зелень' (coefficient: 0.6)\n"
            "   - 'Бакалея и Хлеб' (coefficient: 1.2)\n"
            "   - 'Сладости и Снеки' (coefficient: 2.0)\n"
            "   - 'Напитки в пластике/жести' (coefficient: 1.5)\n"
            "   - 'Пластиковая упаковка / Пакеты' (coefficient: 3.0)\n"
            "   - 'Другое' (coefficient: 1.0)\n\n"
            "5. Actionable Eco Tips: For each item, write a highly specific, practical recommendation in Russian (max 15 words) under the 'eco_tip' key.\n"
            "   - If the item has high CO2 (Meat, Plastic), suggest a green alternative (e.g., reusable bags, plant-based alternatives, bulk buying).\n"
            "   - If the item is already eco-friendly (Vegetables), write 'Отличный эко-выбор!'.\n\n"
            "JSON Schema for each object in the array:\n"
            "{\n"
            "  'raw_name': 'String. Exact original line from the receipt',\n"
            "  'clean_name': 'String. Cleaned, fully decoded product name in Russian',\n"
            "  'category': 'String. One of the exact categories listed above',\n"
            "  'co2_coefficient': Float. The exact coefficient matching the category,\n"
            "  'eco_tip': 'String. Personalized short advice in Russian'\n"
            "}\n\n"
            "Few-Shot Example:\n"
            "User Input:\n"
            "ООО ПЯТЕРОЧКА\n"
            "КАССИР ИВАНОВА А.А.\n"
            "1. Хл.Дарницк.нарез. 45.00\n"
            "2. ПАКЕТ-МАЙКА БОЛ. 15.00\n"
            "ИТОГО: 60.00\n\n"
            "Your Expected Output:\n"
            "[\n"
            "  {\n"
            "    'raw_name': '1. Хл.Дарницк.нарез. 45.00',\n"
            "    'clean_name': 'Хлеб Дарницкий нарезной',\n"
            "    'category': 'Бакалея и Хлеб',\n"
            "    'co2_coefficient': 1.2,\n"
            "    'eco_tip': 'Покупайте локальный хлеб без лишней пластиковой упаковки.'\n"
            "  },\n"
            "  {\n"
            "    'raw_name': '2. ПАКЕТ-МАЙКА БОЛ. 15.00',\n"
            "    'clean_name': 'Пакет-майка большой',\n"
            "    'category': 'Пластиковая упаковка / Пакеты',\n"
            "    'co2_coefficient': 3.0,\n"
            "    'eco_tip': 'Используйте собственный тканевый шоппер вместо покупки пластиковых пакетов.'\n"
            "  }\n"
            "]\n\n"
            "Analyze the user's receipt text and output the JSON array now:"
        )

    def analyze_receipt_text(self, raw_text: str) -> list:
        """Отправляет текст чека в LM Studio и возвращает структурированный массив"""
        try:
            response = self.client.chat.completions.create(
                model="local-model",  # Сервер LM Studio проигнорирует имя и вызовет активную модель
                messages=[
                    {"role": "system", "content": self.system_prompt},
                    {"role": "user", "content": raw_text}
                ],
                temperature=0.2,  # Низкая температура для строгости ответов
            )

            # Получаем сырой текстовый ответ (JSON-строку) от нейросети
            json_string = response.choices[0].message.content.strip()

            # Превращаем JSON-строку в обычный список Python
            parsed_data = json.loads(json_string)
            if not isinstance(parsed_data, list):
                raise LLMResponseError("Модель вернула некорректный ответ (должен быть JSON-список).")
            return parsed_data

        except json.JSONDecodeError as e:
            raise LLMResponseError(
                f"Не удалось распознать структуру ответа нейросети как JSON. "
                f"Попробуйте отправить чек повторно. Подробности: {e}"
            )
        except Exception as e:
            error_msg = str(e)
            # Если LM Studio возвращает ошибку о том, что модели не загружены
            if "No models loaded" in error_msg:
                raise LMStudioError(
                    "В LM Studio не загружена модель! Откройте интерфейс LM Studio и выберите/загрузите модель "
                    "(например, Qwen 2.5), либо выполните команду 'lms load qwen2.5-14b-instruct' в терминале."
                )
            # Если сервер вообще выключен или недоступен
            elif "Connection error" in error_msg or "Failed to establish a new connection" in error_msg:
                raise LMStudioError(
                    "Не удалось подключиться к LM Studio на порту 1234. Убедитесь, что программа LM Studio запущена."
                )
            raise LMStudioError(f"Ошибка при работе с LM Studio: {error_msg}")


# --- ПРИМЕР ИСПОЛЬЗОВАНИЯ В БЭКЭНДЕ ---
if __name__ == "__main__":
    # 1. Создаем экземпляр нашего ИИ-модуля
    ai_module = EcoScanAI()

    # 2. Имитируем текст, полученный от OCR-распознавателя чека
    extracted_ocr_text = "1. Мол.Дом.в дер.3.2% 99.90\n2. ПАКЕТ-МАЙКА БОЛ. 15.00"

    # 3. Отправляем в модель
    print("Отправка запроса в локальную модель Qwen 2.5...")
    result = ai_module.analyze_receipt_text(extracted_ocr_text)

    # 4. На выходе получили чистые данные, с которыми бэкэнд может работать!
    print("\nРезультат успешно получен бэкэндом:")
    for item in result:
        print(f"Товар: {item['clean_name']} | Категория: {item['category']} | CO2: {item['co2_coefficient']} | Рекомендация: {item['eco_tip']}")