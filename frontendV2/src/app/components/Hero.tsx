import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../../imports/logoes.png';

export function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center pt-8 pb-32">
      {/* Background Image - Green Hills */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="/scrapbook/hills_bg.png" 
          alt="Hills Background"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Header / Logo Area */}
      <div className="relative z-10 w-full max-w-6xl px-6 flex justify-between items-center mb-16">
        <div className="w-32 md:w-48">
          <ImageWithFallback 
            src={logo} 
            alt="EcoScan Logo" 
            className="w-full h-auto object-contain drop-shadow-md"
          />
        </div>
        {/* Simple Navigation Links like in mockup */}
        <nav className="hidden md:flex gap-8 font-pixel text-black text-sm uppercase">
          <a href="#" className="hover:underline decoration-wavy underline-offset-4">Главный экран</a>
          <a href="#how" className="hover:underline decoration-wavy underline-offset-4">Как это работает?</a>
          <a href="#features" className="hover:underline decoration-wavy underline-offset-4">Возможности</a>
          <a href="#faq" className="hover:underline decoration-wavy underline-offset-4">FAQ</a>
          <a href="#try" className="hover:underline decoration-wavy underline-offset-4">Попробовать</a>
        </nav>
      </div>

      {/* Main Collage Content */}
      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center justify-center text-center">
        
        {/* Line 1: ПРЕВРАТИТЕ чек */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-4 relative z-20"
        >
          <span className="font-pixel text-5xl md:text-7xl lg:text-[5.5rem] text-black leading-none drop-shadow-[4px_4px_0_#fff]">
            ПРЕВРАТИТЕ
          </span>
          
          <motion.div 
            whileHover={{ rotate: 2, scale: 1.05 }}
            className="relative -rotate-3"
          >
            <ImageWithFallback 
              src="/scrapbook/receipt_cutout.png" 
              alt="Чек"
              className="w-40 md:w-64 drop-shadow-[8px_8px_16px_rgba(0,0,0,0.5)]"
            />
          </motion.div>
        </motion.div>

        {/* Line 2: В ОТЧЕТ + Apple */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-6 relative z-10 mb-8"
        >
          <span className="font-handwriting text-7xl md:text-9xl text-black leading-none -rotate-2">
            В ОТЧЁТ
          </span>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute right-0 md:-right-12 top-0"
          >
            <ImageWithFallback 
              src="/scrapbook/apple.png" 
              alt="Apple"
              className="w-24 md:w-32 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
        </motion.div>

        {/* Line 3: О УГЛЕРОДНОМ СЛЕДЕ */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-3 relative z-30"
        >
          <span className="font-pixel text-4xl md:text-6xl lg:text-[4.5rem] text-black leading-none drop-shadow-[3px_3px_0_#fff]">
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
          <div className="relative w-16 md:w-24 h-16 md:h-24 -rotate-6 mr-1 md:mr-2">
            <ImageWithFallback 
              src="/scrapbook/fingerprint_c.png" 
              alt="С"
              className="w-full h-full object-contain drop-shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"
            />
          </div>
          <span className="font-pixel text-4xl md:text-6xl lg:text-[5rem] text-black leading-none drop-shadow-[3px_3px_0_#fff]">
            ЛЕДЕ
          </span>
        </motion.div>

        {/* Arrow to next section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 relative"
        >
          <ImageWithFallback 
            src="/scrapbook/arrow.png" 
            alt="Arrow down"
            className="w-16 md:w-24 -rotate-12 ml-32"
          />
        </motion.div>

      </div>
    </div>
  );
}
