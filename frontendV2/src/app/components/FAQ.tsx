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
  {
    q: 'Можно ли использовать это как студенческий проект?',
    a: 'Да! Это открытый проект для повышения экологической осведомленности. Мы будем рады вашему вкладу!'
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div id="faq" className="relative py-24 w-full bg-[#fcfbe8] overflow-hidden"
         style={{
           backgroundImage: 'linear-gradient(#e0dfce 1px, transparent 1px), linear-gradient(90deg, #e0dfce 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <span className="font-handwriting text-5xl md:text-7xl -rotate-2">
                ЧАСТО
              </span>
              <span className="font-handwriting text-5xl md:text-7xl rotate-1">
                ЗАДАВАЕМЫЕ
              </span>
            </div>
            
            <div className="flex justify-center items-end gap-2 md:gap-4 relative mt-2">
              <div className="relative rotate-[-2deg] hover:rotate-1 transition-transform">
                <ImageWithFallback 
                  src="/scrapbook/questions_cutout.png" 
                  alt="ВОПРОСЫ"
                  className="w-64 md:w-96 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.3)]"
                />
              </div>
              
              <div className="w-16 md:w-24 mb-4 md:mb-8 absolute -right-16 md:-right-24 bottom-0">
                <ImageWithFallback 
                  src="/scrapbook/smirk_emoji.png" 
                  alt="Smirk"
                  className="w-full drop-shadow-[2px_2px_4px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="relative">
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
