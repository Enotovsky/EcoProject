# Этап 1: Сборка фронтенда (NodeJS)
FROM node:20-alpine AS build-stage
WORKDIR /app/frontendV2
# Копируем только файлы зависимостей
COPY frontendV2/package.json frontendV2/package-lock.json* ./
# Устанавливаем зависимости
RUN npm install
# Копируем весь исходный код фронтенда
COPY frontendV2/ .
# Собираем production-версию сайта в папку dist
RUN npm run build

# Этап 2: Бэкенд и Telegram-бот (Python)
FROM python:3.11-slim

# Установка системных зависимостей для pyzbar и opencv
RUN apt-get update && apt-get install -y \
    libzbar0 \
    libglib2.0-0 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

# Настройка рабочей директории
WORKDIR /app

# Копирование файла зависимостей и их установка
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копирование исходного кода бэкенда
COPY . .

# Копируем собранный фронтенд из первого этапа в папку, откуда его раздаёт FastAPI
COPY --from=build-stage /app/frontendV2/dist /app/frontendV2/dist

# Команда по умолчанию (будет переопределяться в docker-compose)
CMD ["python", "backend.py"]
