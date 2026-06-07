import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HowItWorks() {
  return (
    <div id="how" className="relative py-24 w-full flex flex-col items-center min-h-[100vh]">
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

        {/* Freeform Stickers Container */}
        <div className="relative w-full max-w-5xl mx-auto h-[1200px] md:h-[800px] lg:h-[700px] mt-8">
          
          {/* Note 1 - Top Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, zIndex: 40 }}
            className="absolute top-0 left-[10%] md:left-[5%] lg:left-[10%] w-64 md:w-80 -rotate-2 cursor-pointer transition-transform duration-300 ease-out z-10"
          >
            <ImageWithFallback 
              src="/scrapbook/note_1.png"
              alt="01 Загрузите чек"
              className="w-full h-auto drop-shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:drop-shadow-[12px_12px_24px_rgba(0,0,0,0.4)] transition-all"
            />
          </motion.div>

          {/* Note 2 - Top Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, zIndex: 40 }}
            className="absolute top-64 md:top-12 right-[10%] md:right-[5%] lg:right-[15%] w-64 md:w-80 rotate-3 cursor-pointer transition-transform duration-300 ease-out z-10"
          >
            <ImageWithFallback 
              src="/scrapbook/note_2.png"
              alt="02 OCR распознаёт текст"
              className="w-full h-auto drop-shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:drop-shadow-[12px_12px_24px_rgba(0,0,0,0.4)] transition-all"
            />
            
            {/* BIG Paperclip on Note 2 */}
            <motion.div
              initial={{ opacity: 0, y: -20, rotate: -45 }}
              whileInView={{ opacity: 1, y: 0, rotate: 15 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -top-16 md:-top-24 -right-12 md:-right-20 w-32 md:w-48 z-20 pointer-events-none"
            >
              <ImageWithFallback 
                src="/scrapbook/paperclip.png" 
                alt="Paperclip"
                className="w-full drop-shadow-[6px_6px_12px_rgba(0,0,0,0.4)]"
              />
            </motion.div>
          </motion.div>

          {/* Note 3 - Bottom Left */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, zIndex: 40 }}
            className="absolute top-[550px] md:top-[350px] left-[5%] md:left-[15%] lg:left-[25%] w-64 md:w-80 -rotate-1 cursor-pointer transition-transform duration-300 ease-out z-10"
          >
            <ImageWithFallback 
              src="/scrapbook/note_3.png"
              alt="03 ИИ классифицирует продукты"
              className="w-full h-auto drop-shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:drop-shadow-[12px_12px_24px_rgba(0,0,0,0.4)] transition-all"
            />
          </motion.div>

          {/* Note 4 - Bottom Right */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", bounce: 0.4 }}
            whileHover={{ scale: 1.05, zIndex: 40 }}
            className="absolute top-[820px] md:top-[400px] right-[5%] md:right-[15%] lg:right-[10%] w-64 md:w-80 rotate-2 cursor-pointer transition-transform duration-300 ease-out z-10"
          >
            <ImageWithFallback 
              src="/scrapbook/note_4.png"
              alt="04 EcoScan показывает результат"
              className="w-full h-auto drop-shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:drop-shadow-[12px_12px_24px_rgba(0,0,0,0.4)] transition-all"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
