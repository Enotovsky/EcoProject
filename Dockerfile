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

# Копирование исходного кода
COPY . .

# Команда по умолчанию (будет переопределяться в docker-compose)
CMD ["python", "backend.py"]
