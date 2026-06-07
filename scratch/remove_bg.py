import cv2
import numpy as np
import os

def make_logo_transparent():
    # Пути к файлам
    assets_dir = r"c:\Users\Enot\PycharmProjects\EcoProject_Receipt_analysis\frontend\src\assets"
    src_path = os.path.join(assets_dir, "logo.jpg")
    dst_path = os.path.join(assets_dir, "logo.png")

    if not os.path.exists(src_path):
        print(f"Ошибка: Исходный файл {src_path} не найден.")
        return

    # Загружаем изображение
    img = cv2.imread(src_path)
    
    # Конвертируем в оттенки серого
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Порог для поиска ярких областей (зеленая фигура намного ярче черного фона)
    _, thresh = cv2.threshold(gray, 20, 255, cv2.THRESH_BINARY)
    
    # Находим контуры
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if not contours:
        print("Ошибка: Контуры логотипа не найдены.")
        return
        
    # Берем самый большой внешний контур (это сама зеленая фигура)
    main_contour = max(contours, key=cv2.contourArea)
    
    # Создаем маску альфа-канала (изначально полностью прозрачная)
    h, w = img.shape[:2]
    alpha_channel = np.zeros((h, w), dtype=np.uint8)
    
    # Заполняем область внутри контура белым цветом (непрозрачно)
    cv2.drawContours(alpha_channel, [main_contour], -1, 255, -1)
    
    # Дополнительно сглаживаем границы альфа-маски, чтобы не было рваных краев
    alpha_channel = cv2.GaussianBlur(alpha_channel, (3, 3), 0)
    
    # Собираем RGBA изображение
    b, g, r = cv2.split(img)
    rgba = cv2.merge([b, g, r, alpha_channel])
    
    # Сохраняем в PNG с прозрачностью
    cv2.imwrite(dst_path, rgba)
    print(f"Логотип с прозрачным фоном успешно сохранен в {dst_path}")

if __name__ == "__main__":
    make_logo_transparent()
