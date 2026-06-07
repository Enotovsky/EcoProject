import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ResultsDashboard } from './ResultsDashboard';
import type { AnalysisResult } from './ResultsDashboard';

const PROCESSING_STAGES = [
  'Предобработка изображения...',
  'Поиск и считывание текста OCR...',
  'Анализ и парсинг товаров...',
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

  useEffect(() => {
    return () => {
      if (stageIntervalRef.current) clearInterval(stageIntervalRef.current);
    };
  }, []);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
  };

  const handleFile = (f: File) => {
    setFile(f);
    setError('');
    setPreview(URL.createObjectURL(f));
  };

  const handleReset = () => {
    setFile(null);
    setPreview(null);
    setStatus('idle');
    setError('');
    setResult(null);
    setCurrentStage(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setStatus('analyzing');
    setError('');
    setCurrentStage(0);

    stageIntervalRef.current = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % PROCESSING_STAGES.length);
    }, 2000);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/analyze`, {
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
    <div id="try" className="relative py-24 w-full overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
      {/* Background Image & Grid (Behind Content) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageWithFallback 
          src="/scrapbook/hero_how_bg.png" 
          alt="Grass Background"
          className="w-full h-full object-cover object-bottom opacity-95"
        />
        <div className="absolute inset-0 bg-[#a2d149]/20 mix-blend-multiply"></div>
        {/* Grid Texture on background only, static with document */}
        <div className="absolute -inset-[10%] mix-blend-multiply opacity-5 overflow-hidden">
          <ImageWithFallback src="/scrapbook/texture_1.png" alt="" className="w-full h-full object-cover max-w-none" />
        </div>
      </div>

      {/* Papercut & Grunge Overlays (Over Content completely) */}
      <div className="absolute -inset-[10%] z-20 pointer-events-none mix-blend-color-burn opacity-30">
        <ImageWithFallback src="/scrapbook/texture_2.png" alt="" className="w-full h-full object-cover max-w-none" />
      </div>
      <div className="absolute -inset-[10%] z-20 pointer-events-none mix-blend-overlay opacity-50">
        <ImageWithFallback src="/scrapbook/texture_3.png" alt="" className="w-full h-full object-cover max-w-none" />
      </div>

      <div className="relative z-10 w-full max-w-[95%] xl:max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <div className="text-center flex flex-col items-center justify-center gap-2 mb-12">
          <div className="flex flex-wrap justify-center items-center gap-4">
            <span className="font-pixel text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-[3px_3px_0_#000]">
              ПОПРОБУЙТЕ
            </span>
            <span className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-[3px_3px_0_#000] rotate-2">
              ECOSCAN
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
            <span className="font-pixel text-3xl md:text-5xl lg:text-6xl text-white drop-shadow-[3px_3px_0_#000]">
              НА ВАШЕМ
            </span>
            <div className="relative flex items-center justify-center">
              <ImageWithFallback 
                src="/scrapbook/receipt_cutout.png" 
                alt="чек"
                className="w-32 md:w-48 -rotate-3 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.4)]"
              />
              {/* Added handwritten 'e' */}
              <span className="font-handwriting text-5xl md:text-7xl text-black font-bold absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 rotate-12 drop-shadow-[2px_2px_0_#fff]">
                е
              </span>
            </div>
          </div>
        </div>

        {/* Form / Results Container (Looks like a notebook page) */}
        <div className={`bg-white/95 backdrop-blur-md w-full rounded-2xl border border-gray-300 shadow-[12px_12px_0_rgba(0,0,0,0.15)] p-6 md:p-10 relative ${status === 'result' ? 'max-w-full' : 'max-w-4xl'} transition-all duration-500`}>
          
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
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3"
                  >
                    <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm font-sans">{error}</p>
                  </motion.div>
                )}

                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans font-bold text-sm">Загрузить чек</label>
                    <div 
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer overflow-hidden min-h-[200px] ${dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-black text-white hover:bg-gray-900'}`}
                    >
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" onChange={handleChange} accept="image/*,application/pdf" />
                      
                      {preview ? (
                        <div className="flex flex-col items-center">
                          <img src={preview} alt="Preview" className="h-40 md:h-64 object-contain rounded-md mb-4 shadow-md bg-white p-1" />
                          <span className="font-sans font-medium text-sm text-green-400 flex items-center gap-2">
                            <CheckCircle2 size={16} /> Файл готов к загрузке
                          </span>
                          <span className="text-xs text-gray-400 mt-1 font-sans">
                            {file?.name} ({file && (file.size / 1024).toFixed(1)} КБ)
                          </span>
                        </div>
                      ) : (
                        <>
                          <div className="bg-white/10 p-4 rounded-lg mb-4">
                            <FileText size={64} className="text-white" />
                          </div>
                          <p className="font-sans font-bold text-base mb-1">
                            Нажмите или перетащите файл
                          </p>
                          <p className="text-sm text-gray-400 font-sans">PNG, JPG или PDF ( макс. 10МБ )</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={!file}
                  className="mt-2 w-full bg-[#D8FF00] text-black font-sans font-bold text-base py-4 rounded-xl hover:bg-[#c2e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Отправить чек на анализ
                </button>
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
                <h3 className="font-pixel text-xl text-center mb-4 text-black">
                  Анализ чека...
                </h3>
                <p className="font-sans text-sm text-gray-600 animate-pulse">
                  {PROCESSING_STAGES[currentStage]}
                </p>
                <div className="w-full max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden mt-6">
                  <motion.div 
                    className="h-full bg-[#D8FF00] rounded-full"
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
