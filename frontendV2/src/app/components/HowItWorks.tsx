import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const STICKERS = [
  { id: 1, src: '/scrapbook/note_1.png', alt: '01 Загрузите чек', delay: 0.1, y: 'translate-y-0', rotate: '-rotate-2', w: 'w-64 md:w-80' },
  { id: 2, src: '/scrapbook/note_2.png', alt: '02 OCR распознаёт текст', delay: 0.2, y: 'translate-y-6', rotate: 'rotate-3', w: 'w-64 md:w-80' },
  { id: 3, src: '/scrapbook/note_3.png', alt: '03 ИИ классифицирует продукты', delay: 0.3, y: 'translate-y-4', rotate: '-rotate-1', w: 'w-64 md:w-80' },
  { id: 4, src: '/scrapbook/note_4.png', alt: '04 EcoScan показывает результат', delay: 0.4, y: 'translate-y-12', rotate: 'rotate-2', w: 'w-64 md:w-80' }
];

export function HowItWorks() {
  return (
    <div id="how" className="relative py-24 w-full flex flex-col items-center min-h-[80vh]">
      <div className="w-full max-w-[95%] xl:max-w-7xl px-4 relative z-10 flex flex-col items-center">
        
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-16"
        >
          <span className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-[2px_2px_0_#000]">
            КАК
          </span>
          <span className="font-pixel text-4xl md:text-6xl lg:text-7xl text-black drop-shadow-[2px_2px_0_#fff] border-4 border-dashed border-white p-2 md:p-4 rotate-2">
            ЭТО
          </span>
          <span className="font-pixel text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-[2px_2px_0_#000]">
            РАБОТАЕТ?
          </span>
        </motion.div>

        {/* Stickers Container */}
        <div className="relative w-full max-w-4xl mx-auto mt-8">
          
          {/* Decorative Paperclip */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute -top-16 -right-4 md:-right-16 lg:-right-24 w-20 md:w-28 z-20 rotate-12"
          >
            <ImageWithFallback 
              src="/scrapbook/paperclip.png" 
              alt="Paperclip"
              className="w-full drop-shadow-[6px_6px_12px_rgba(0,0,0,0.4)]"
            />
          </motion.div>

          {/* Grid Layout 2x2 for stickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 justify-items-center">
            {STICKERS.map((sticker) => (
              <motion.div 
                key={sticker.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: sticker.delay, type: "spring", bounce: 0.4 }}
                whileHover={{ scale: 1.05, zIndex: 30 }}
                className={`relative ${sticker.w} ${sticker.y} ${sticker.rotate} cursor-pointer transition-transform duration-300 ease-out z-10`}
              >
                <ImageWithFallback 
                  src={sticker.src}
                  alt={sticker.alt}
                  className="w-full h-auto drop-shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:drop-shadow-[12px_12px_24px_rgba(0,0,0,0.4)] transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
