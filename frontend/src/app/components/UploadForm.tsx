import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResultsDashboard } from './ResultsDashboard';
import type { AnalysisResult } from './ResultsDashboard';

// Этапы обработки, которые циклически показываются пользователю
const PROCESSING_STAGES = [
  'Предобработка изображения...',
  'Поиск и считывание QR-кода...',
  'Запрос данных чека из ФНС...',
  'ИИ классифицирует продукты...',
  'Формирование экологического отчёта...',
];

interface UploadFormProps {
  result: AnalysisResult | null;
  setResult: (result: AnalysisResult | null) => void;
}

export function UploadForm({ result, setResult }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const [error, setError] = useState<string>('');
  const stageIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Очистка интервала при размонтировании компонента
  useEffect(() => {
    return () => {
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
      }
    };
  }, []);

  // Обработка выбора файла через input или drag & drop
  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      setError('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // Обработка выбора файла через стандартный input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileChange(selectedFile);
    }
  };

  // Обработка события перетаскивания файла над зоной загрузки
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Обработка ухода курсора из зоны перетаскивания
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Обработка сброса файла в зону загрузки
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith('image/') || droppedFile.type === 'application/pdf')) {
      handleFileChange(droppedFile);
    }
  };

  // Удаление загруженного файла
  const removeFile = () => {
    setFile(null);
    setPreview('');
  };

  // Полный сброс: очистка результатов, ошибок и файла
  const handleReset = () => {
    setResult(null);
    setError('');
    setFile(null);
    setPreview('');
  };

  // Отправка файла на сервер для анализа
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setError('');
    setCurrentStage(0);

    // Запускаем циклическую смену этапов обработки каждые 2 секунды
    stageIntervalRef.current = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % PROCESSING_STAGES.length);
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        // Успешный результат — отображаем дашборд
        setResult(data);
      } else {
        // Сервер вернул ошибку
        setError(data.error || 'Произошла ошибка при анализе чека.');
      }
    } catch {
      // Ошибка сети — сервер недоступен
      setError('Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен.');
    } finally {
      // Останавливаем смену этапов и сбрасываем состояние загрузки
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
        stageIntervalRef.current = null;
      }
      setIsUploading(false);
    }
  };

  // Если есть результат — отображаем дашборд вместо формы
  if (result) {
    return (
      <section id="upload" className="py-20 px-8 bg-gradient-to-b from-[#0f1a14] to-[#0a1410]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl mx-auto">
            <ResultsDashboard result={result} onReset={handleReset} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="py-20 px-8 bg-gradient-to-b from-[#0f1a14] to-[#0a1410]">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            Попробуйте EcoScan на <span className="text-[#c6ff00]">вашем чеке</span>
          </h2>
          <p className="text-xl text-white/70 text-center mb-12">
            Загрузите чек из магазина и получите мгновенный анализ углеродного следа
          </p>

          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 space-y-6">
            {/* Блок ошибки — красный алерт */}
            {error && (
              <div className="bg-[#ff6b6b]/10 border border-[#ff6b6b]/30 rounded-xl px-5 py-4 flex items-start gap-3 animate-fade-in">
                <span className="text-[#ff6b6b] text-xl flex-shrink-0">⚠️</span>
                <p className="text-[#ff6b6b] text-sm">{error}</p>
              </div>
            )}

            {/* Зона загрузки файла */}
            <div>
              <label className="block text-sm font-semibold mb-2">Загрузить чек</label>

              {!preview ? (
                <div className="relative">
                  <input
                    type="file"
                    onChange={handleInputChange}
                    className="hidden"
                    id="receipt-upload"
                    accept="image/*,.pdf"
                    required
                  />
                  <label
                    htmlFor="receipt-upload"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`flex items-center justify-center w-full border-2 border-dashed rounded-xl px-4 py-12 transition-all cursor-pointer ${
                      isDragging
                        ? 'border-[#c6ff00] bg-[#c6ff00]/10 scale-105'
                        : 'border-white/20 bg-white/5 hover:border-[#c6ff00] hover:bg-white/10'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`text-6xl mb-4 transition-transform ${isDragging ? 'scale-125' : ''}`}>
                        📄
                      </div>
                      <div className="font-semibold mb-1">
                        {isDragging ? 'Отпустите файл здесь' : 'Нажмите или перетащите файл'}
                      </div>
                      <div className="text-sm text-white/60">
                        PNG, JPG или PDF (макс. 10МБ)
                      </div>
                    </div>
                  </label>
                </div>
              ) : (
                <div className="relative bg-white/5 border border-[#c6ff00]/30 rounded-xl p-6 animate-fade-in">
                  {/* Кнопка удаления загруженного файла */}
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-4 right-4 w-8 h-8 bg-red-500/80 hover:bg-red-500 rounded-full flex items-center justify-center transition-all z-10"
                  >
                    ✕
                  </button>

                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Превью загруженного изображения */}
                    <div className="w-full md:w-48 h-64 bg-black/20 rounded-lg overflow-hidden flex-shrink-0">
                      {file?.type.startsWith('image/') ? (
                        <ImageWithFallback
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-6xl mb-2">📄</div>
                            <div className="text-sm text-white/60">PDF файл</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Информация о файле и индикатор обработки */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold text-[#c6ff00] mb-1">Файл загружен</div>
                          <div className="text-sm text-white/70 break-all">{file?.name}</div>
                          <div className="text-xs text-white/50 mt-1">
                            {file && (file.size / 1024).toFixed(2)} KB
                          </div>
                        </div>
                      </div>

                      {/* Индикатор прогресса с текущим этапом обработки */}
                      {isUploading && (
                        <div className="mt-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="animate-spin w-4 h-4 border-2 border-[#c6ff00] border-t-transparent rounded-full" />
                            <span className="text-sm">{PROCESSING_STAGES[currentStage]}</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-[#c6ff00] to-[#00d9ff] animate-progress" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Кнопка отправки с динамическим текстом этапа обработки */}
            <button
              type="submit"
              disabled={isUploading}
              className={`w-full py-4 rounded-full font-semibold text-lg transition-all ${
                isUploading
                  ? 'bg-white/10 cursor-not-allowed'
                  : 'bg-[#c6ff00] text-[#0a1410] hover:bg-[#b3e600] hover:scale-105'
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  {PROCESSING_STAGES[currentStage]}
                </span>
              ) : (
                'Отправить чек на анализ'
              )}
            </button>

            <p className="text-sm text-white/50 text-center">
              Ваш файл используется только для демонстрации продукта.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
