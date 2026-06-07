import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const FEATURES = [
  {
    title: 'Оценка углеродного следа',
    img: '/scrapbook/feature_1.png',
    rotate: 'rotate-[-3deg]'
  },
  {
    title: 'Эко-балл корзины',
    img: '/scrapbook/feature_2.png',
    rotate: 'rotate-[2deg]'
  },
  {
    title: 'Альтернативные продукты',
    img: '/scrapbook/feature_3.png',
    rotate: 'rotate-[-1deg]'
  },
  {
    title: 'История покупок',
    img: '/scrapbook/feature_4.png',
    rotate: 'rotate-[4deg]'
  },
  {
    title: 'Основные категории влияния',
    img: '/scrapbook/feature_5.png',
    rotate: 'rotate-[-2deg]'
  },
  {
    title: 'Простые визуальные отчёты',
    img: '/scrapbook/feature_6.png',
    rotate: 'rotate-[1deg]'
  }
];

export function Features() {
  return (
    <div id="features" className="relative py-24 w-full bg-[#E8E6D3] overflow-hidden" 
         style={{
           backgroundImage: 'linear-gradient(#d1cfc0 1px, transparent 1px), linear-gradient(90deg, #d1cfc0 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
         
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Title Collage */}
        <div className="flex flex-col items-center justify-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-center"
          >
            <span className="font-handwriting text-6xl md:text-8xl text-black -rotate-3">
              ЧТО
            </span>
            <div className="relative rotate-2 hover:-rotate-1 transition-transform cursor-default">
              <ImageWithFallback 
                src="/scrapbook/mozhet_cutout.png" 
                alt="МОЖЕТ"
                className="w-48 md:w-80 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.3)]"
              />
            </div>
            <div className="w-full h-0"></div>
            <span className="font-pixel text-2xl md:text-4xl text-black drop-shadow-[2px_2px_0_#fff]">
              показать <span className="text-[1.2em]">ECOSCAN</span>
            </span>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              className={`relative bg-white p-3 pb-6 shadow-[8px_8px_0_rgba(0,0,0,0.2)] ${feature.rotate} cursor-pointer transition-transform`}
            >
              {/* Tape */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/60 backdrop-blur-md border border-white/40 rotate-[-4deg] z-20 shadow-sm mix-blend-screen"></div>
              <div className="absolute -top-3 -right-2 w-16 h-6 bg-white/60 backdrop-blur-md border border-white/40 rotate-[35deg] z-20 shadow-sm mix-blend-screen"></div>
              
              <div className="w-full aspect-video bg-gray-100 mb-4 overflow-hidden border border-gray-200">
                <ImageWithFallback 
                  src={feature.img} 
                  alt={feature.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h4 className="font-pixel font-bold text-center text-sm md:text-base leading-snug px-2 text-black">
                {feature.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
