import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

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
    q: 'Что если QR-код не читается?',
    a: 'Убедитесь, что QR-код на чеке чётко виден, находится в фокусе и не обрезан. Попробуйте сфотографировать чек ещё раз при хорошем освещении.'
  }
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="relative py-24 w-full bg-[#F5F5DC]"
         style={{
           backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          <div className="absolute right-0 top-0 text-7xl select-none opacity-80 pointer-events-none drop-shadow-md">
            🤔
          </div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-x-2 gap-y-4 text-center"
          >
            <span className="font-['Dotective',monospace] text-4xl md:text-5xl rotate-[-2deg]">
              ЧАСТО
            </span>
            <div className="w-full h-1"></div>
            <span className="font-['Dotective',monospace] text-4xl md:text-5xl rotate-[1deg] mr-4">
              ЗАДАВАЕМЫЕ
            </span>
            <span className="bg-white border-2 border-black px-4 py-2 font-['Feature_Mono',sans-serif] font-bold text-5xl md:text-7xl shadow-[4px_4px_0_#000] rotate-[-1deg]">
              ВОПРОСЫ
            </span>
          </motion.div>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="relative">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full flex items-center justify-between p-6 rounded-xl border-2 border-black transition-colors duration-250 ${isOpen ? 'bg-black text-white' : 'bg-[#D8FF00] text-black hover:bg-black hover:text-white'}`}
                >
                  <span className="font-['Feature_Mono',sans-serif] font-bold text-lg md:text-xl text-left pr-4">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className={isOpen ? 'text-white' : ''} />
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
                      <div className="p-6 mt-2 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0_#000]">
                        <p className="font-['Segoe_UI',sans-serif] text-black leading-relaxed">
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
