import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const FAQS = [
  {
    q: 'Насколько точен EcoScan?',
    a: 'EcoScan даёт примерную оценку на основе официальных данных чека из базы ФНС и средних экологических коэффициентов. Это не лабораторный расчёт, но удобный способ понять общий след покупки.'
  },
  {
    q: 'Нужно ли вводить продукты вручную?',
    a: 'Нет. Достаточно сфотографировать чек — сервис считает QR-код и автоматически получит список товаров из базы ФНС.'
  },
  {
    q: 'Что если чек распознан неправильно?',
    a: 'Убедитесь, что QR-код на чеке чётко виден, находится в фокусе и не обрезан. Попробуйте загрузить фото ещё раз при хорошем освещении.'
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div id="faq" className="relative py-24 w-full bg-[#fcfbe8] overflow-hidden">
      {/* Background Yellow Grid */}
      <div className="absolute inset-0 z-0 opacity-50 mix-blend-multiply" 
           style={{
             backgroundImage: 'url(/scrapbook/yellow_grid.png)',
             backgroundSize: '400px auto',
             backgroundRepeat: 'repeat'
           }} 
      />
      
      <div className="max-w-[95%] xl:max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 relative z-10">
              <span className="font-handwriting text-5xl md:text-7xl -rotate-2">
                ЧАСТО
              </span>
              <span className="font-handwriting text-5xl md:text-7xl rotate-1">
                ЗАДАВАЕМЫЕ
              </span>
            </div>
            
            <div className="relative rotate-[-2deg] hover:rotate-1 transition-transform -mt-6 md:-mt-12 z-20">
              <ImageWithFallback 
                src="/scrapbook/questions_cutout.png" 
                alt="ВОПРОСЫ"
                className="w-64 md:w-96 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.3)]"
              />
            </div>
          </motion.div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 max-w-5xl mx-auto relative mt-16 md:mt-24">
          {/* Confused Emoji standing on the first question */}
          <div className="absolute -top-24 md:-top-32 lg:-top-40 right-0 md:-right-16 lg:-right-24 w-32 md:w-48 lg:w-64 z-20 pointer-events-none">
            <ImageWithFallback 
              src="/scrapbook/confused_emoji.png" 
              alt="Confused Emoji"
              className="w-full drop-shadow-[6px_6px_12px_rgba(0,0,0,0.4)] rotate-6"
            />
          </div>

          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="relative z-10">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border border-gray-400 transition-colors duration-250 shadow-sm ${isOpen ? 'bg-[#cbe622]' : 'bg-[#D8FF00] hover:bg-[#cbe622]'}`}
                >
                  <span className="font-sans font-bold text-sm md:text-base text-left pr-4 text-black">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-black font-pixel text-xs"
                  >
                    ↓
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-5 mt-2 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl shadow-sm">
                        <p className="font-sans text-sm text-gray-700 leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
