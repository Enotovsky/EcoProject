import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../../imports/logoes.png';

export function Hero() {
  return (
    <div className="relative min-h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1678070803622-226b432921d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMGhpbGxzJTIwYmx1ZSUyMHNreXxlbnwxfHx8fDE3ODA3MTQ5ODV8MA&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Windows XP Hills Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient to ensure text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/30 to-transparent"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10 z-10 w-32 md:w-48">
        <ImageWithFallback 
          src={logo} 
          alt="EcoScan Logo" 
          className="w-full h-auto object-contain drop-shadow-md"
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center justify-center mt-12 md:mt-0">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-y-4 gap-x-6 text-center"
        >
          <span className="font-['Feature_Mono',sans-serif] font-bold text-5xl md:text-7xl lg:text-8xl text-black drop-shadow-[4px_4px_0_rgba(255,255,255,0.8)]">
            ПРЕВРАТИТЕ
          </span>
          
          <div className="relative rotate-3 hover:rotate-6 transition-transform">
            <div className="absolute inset-0 bg-amber-100 shadow-md transform -skew-x-6"></div>
            <div className="absolute inset-0 border border-black transform -skew-x-6"></div>
            <span className="relative z-10 px-6 py-2 block font-['Receipt',monospace] text-4xl md:text-6xl text-black border-dashed border-2 border-black/30 bg-[url('https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center">
              ЧЕК
            </span>
          </div>

          <span className="w-full"></span>

          <span className="font-['Dotective',monospace] text-6xl md:text-8xl text-black rotate-[-2deg] drop-shadow-[2px_2px_0_#fff]">
            В <span className="inline-block w-6 md:w-12"></span> ОТЧЁТ
          </span>

          <span className="w-full"></span>

          <span className="font-['QuinqueFive',monospace] text-2xl md:text-4xl text-black bg-white px-4 py-2 rotate-1 border-2 border-black shadow-[4px_4px_0_#000]">
            О УГЛЕРОДНОМ СЛЕДЕ
          </span>
        </motion.h1>

        {/* Стрелка, указывающая на кнопку */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 0.3, y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } }}
          className="w-12 h-12 md:w-16 md:h-16 mt-6"
          style={{ filter: 'drop-shadow(2px 2px 0px white)' }}
          viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 5v14"/><path d="m5 12 7 7 7-7"/>
        </motion.svg>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-4 bg-[#D8FF00] px-8 py-3 rounded-full border-2 border-black rotate-[-1deg] hover:rotate-1 transition-transform shadow-[4px_4px_0_#000] cursor-pointer"
        >
          <a href="#how" className="font-['Feature_Mono',sans-serif] font-bold text-xl md:text-3xl tracking-widest text-black uppercase">
            КАК <span className="font-['QuinqueFive',monospace] text-lg">ЭТО</span> РАБОТАЕТ?
          </a>
        </motion.div>
      </div>
    </div>
  );
}
