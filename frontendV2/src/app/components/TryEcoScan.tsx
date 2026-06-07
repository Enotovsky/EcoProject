import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, CheckCircle2, Leaf, AlertTriangle } from 'lucide-react';
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

export function TryEcoScan() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'result'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const stageIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Очистка интервала при размонтировании
  useEffect(() => {
    return () => {
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
      }
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (f: File) => {
    setFile(f);
    setError('');
    const objectUrl = URL.createObjectURL(f);
    setPreview(objectUrl);
  };

  // Полный сброс
  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setError('');
    setResult(null);
    setCurrentStage(0);
  };

  // Отправка файла на сервер
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus('analyzing');
    setError('');
    setCurrentStage(0);

    // Циклическая смена этапов обработки каждые 2 секунды
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
        setResult(data);
        setStatus('result');
      } else {
        setError(data.error || 'Произошла ошибка при анализе чека.');
        setStatus('idle');
      }
    } catch {
      setError('Не удалось подключиться к серверу. Убедитесь, что бэкенд запущен.');
      setStatus('idle');
    } finally {
      if (stageIntervalRef.current) {
        clearInterval(stageIntervalRef.current);
        stageIntervalRef.current = null;
      }
    }
  };

  return (
    <div className="relative py-24 w-full bg-[#D8FF00] overflow-hidden border-t-4 border-black border-dashed min-h-[80vh] flex flex-col items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1678070803622-226b432921d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhpbGxzJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3ODA3MTQ5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Green Hills"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <h2 className="text-center flex flex-wrap justify-center items-center gap-4 mb-12">
          <span className="font-['Feature_Mono',sans-serif] font-bold text-3xl md:text-5xl text-white drop-shadow-[2px_2px_0_#000]">
            ПОПРОБУЙТЕ
          </span>
          <span className="font-['Dotective',monospace] text-4xl md:text-6xl text-yellow-300 drop-shadow-[2px_2px_0_#000] rotate-2">
            ECOSCAN
          </span>
          <span className="font-['Feature_Mono',sans-serif] font-bold text-3xl md:text-5xl text-white drop-shadow-[2px_2px_0_#000]">
            НА ВАШЕМ ЧЕКЕ
          </span>
        </h2>

        {/* Form / Results Container */}
        <div className={`bg-white/95 backdrop-blur-md w-full rounded-[32px] border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] p-8 md:p-12 relative ${status === 'result' ? 'max-w-5xl' : 'max-w-2xl'} transition-all duration-500`}>
          
          <AnimatePresence mode="wait">
            {status === 'idle' && (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Блок ошибки */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border-2 border-red-300 rounded-xl px-5 py-4 flex items-start gap-3"
                  >
                    <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm font-['Segoe_UI',sans-serif]">{error}</p>
                  </motion.div>
                )}

                {/* Dropzone */}
                <div>
                  <label className="block font-['Feature_Mono',sans-serif] font-bold mb-2">Фото чека с QR-кодом</label>
                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-4 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleChange} accept="image/*" />
                    
                    {preview ? (
                      <div className="flex flex-col items-center">
                        <img src={preview} alt="Preview" className="h-32 object-contain rounded-md mb-4 shadow-md" />
                        <span className="font-['Segoe_UI',sans-serif] font-medium text-sm text-green-700 flex items-center gap-2">
                          <CheckCircle2 size={16} /> Файл готов к загрузке
                        </span>
                        <span className="text-xs text-gray-400 mt-1 font-['Segoe_UI',sans-serif]">
                          {file?.name} ({file && (file.size / 1024).toFixed(1)} КБ)
                        </span>
                      </div>
                    ) : (
                      <>
                        <Upload size={48} className="text-gray-400 mb-4" />
                        <p className="font-['Feature_Mono',sans-serif] text-gray-500 mb-2">
                          Нажмите или перетащите фото
                        </p>
                        <p className="text-xs text-gray-400 font-['Segoe_UI',sans-serif]">PNG, JPG (макс. 10MB)</p>
                        <p className="text-xs text-gray-400 font-['Segoe_UI',sans-serif] mt-1">Убедитесь, что QR-код на чеке хорошо виден</p>
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!file}
                  className="mt-2 w-full bg-[#D8FF00] text-black font-['Feature_Mono',sans-serif] font-bold text-xl py-4 rounded-xl border-2 border-black shadow-[4px_4px_0_#000] hover:bg-black hover:text-white hover:translate-y-1 hover:shadow-[0_0_0_#000] transition-all disabled:opacity-50 disabled:cursor-not-allowed duration-250"
                >
                  Отправить чек на анализ
                </button>

                <p className="text-sm text-gray-400 text-center font-['Segoe_UI',sans-serif]">
                  Ваш файл используется только для демонстрации продукта.
                </p>
              </motion.form>
            )}

            {status === 'analyzing' && (
              <motion.div 
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 min-h-[400px]"
              >
                <div className="relative w-24 h-24 mb-8">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute inset-0 border-4 border-dashed border-[#a3e635] rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText size={32} className="text-black" />
                  </div>
                </div>
                <h3 className="font-['Dotective',monospace] text-2xl text-center mb-4">
                  EcoScan анализирует чек...
                </h3>
                <p className="font-['Segoe_UI',sans-serif] text-sm text-black/60 animate-pulse">
                  {PROCESSING_STAGES[currentStage]}
                </p>
                {/* Прогресс-бар */}
                <div className="w-full max-w-xs h-2 bg-black/10 rounded-full overflow-hidden mt-6">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-[#D8FF00] to-[#7ed957] rounded-full"
                    animate={{ width: ['0%', '100%'] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            )}

            {status === 'result' && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <ResultsDashboard result={result} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
