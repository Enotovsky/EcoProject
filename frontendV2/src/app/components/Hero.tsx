import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../../imports/logoes.png';

export function Hero() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-8 pb-32">

      {/* Header / Logo Area */}
      <div className="relative z-10 w-full max-w-[95%] xl:max-w-7xl px-4 flex justify-between items-center mb-16">
        <div className="w-32 md:w-48">
          <ImageWithFallback 
            src={logo} 
            alt="EcoScan Logo" 
            className="w-full h-auto object-contain drop-shadow-md"
          />
        </div>
        {/* Removed duplicate Navigation Links */}
      </div>

      {/* Main Collage Content */}
      <div className="relative z-10 w-full max-w-[95%] xl:max-w-7xl px-4 flex flex-col items-center justify-center text-center">
        
        {/* Line 1: ПРЕВРАТИТЕ чек */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-4 relative z-20"
        >
          <span className="font-pixel text-2xl min-[375px]:text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] text-black leading-none drop-shadow-[4px_4px_0_#fff]">
            ПРЕВРАТИТЕ
          </span>
          
          <motion.div 
            whileHover={{ rotate: 2, scale: 1.05 }}
            className="relative -rotate-3"
          >
            <ImageWithFallback 
              src="/scrapbook/receipt_cutout.png" 
              alt="Чек"
              className="w-24 min-[375px]:w-32 sm:w-40 md:w-64 drop-shadow-[8px_8px_16px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </motion.div>

        {/* Line 2: В ОТЧЕТ */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-6 relative z-10 mb-8"
        >
          <span className="font-handwriting text-5xl min-[375px]:text-6xl sm:text-7xl md:text-9xl text-black leading-none -rotate-2">
            В ОТЧЁТ
          </span>
        </motion.div>

        {/* Line 3: О УГЛЕРОДНОМ СЛЕДЕ */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-3 relative z-30"
        >
          <span className="font-pixel text-[22px] min-[375px]:text-3xl sm:text-4xl md:text-6xl lg:text-[4.5rem] text-black leading-none drop-shadow-[3px_3px_0_#fff]">
            О УГЛЕРОДНОМ
          </span>
        </motion.div>
        
        {/* Line 4: СЛЕДЕ */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-1 relative z-30 mt-4 md:mt-6"
        >
          <div className="relative w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 -rotate-6 mr-1 md:mr-2">
            <ImageWithFallback 
              src="/scrapbook/fingerprint_c.png" 
              alt="С"
              className="w-full h-full object-contain drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
            />
          </div>
          <span className="font-pixel text-4xl sm:text-4xl md:text-6xl lg:text-[5rem] text-black leading-none drop-shadow-[3px_3px_0_#fff]">
            ЛЕДЕ
          </span>
        </motion.div>

        {/* Arrow and Button to next section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 relative flex flex-col items-center gap-4"
        >
          <ImageWithFallback 
            src="/scrapbook/arrow.png" 
            alt="Arrow down"
            className="w-16 md:w-24 rotate-[-5deg] ml-8"
          />
          <a href="#try" className="relative group inline-block">
            <div className="absolute inset-0 bg-black rounded-xl translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative px-8 py-4 bg-[#D8FF00] border-4 border-black rounded-xl font-pixel text-xl md:text-2xl text-black hover:-translate-y-1 hover:-translate-x-1 transition-transform uppercase">
              СКАНИРОВАТЬ ЧЕК
            </div>
          </a>
        </motion.div>

      </div>
    </div>
  );
}
