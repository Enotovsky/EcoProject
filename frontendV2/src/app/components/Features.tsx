import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const FEATURES = [
  {
    title: 'Оценка углеродного следа',
    desc: 'Показывает примерный CO₂-след покупки.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    rotate: 'rotate-[-3deg]'
  },
  {
    title: 'Эко-балл корзины',
    desc: 'Показывает общий рейтинг покупки по экологичности.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=400',
    rotate: 'rotate-[2deg]'
  },
  {
    title: 'Альтернативные продукты',
    desc: 'Подсказывает, чем можно заменить товары с высоким следом.',
    img: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=400',
    rotate: 'rotate-[-1deg]'
  },
  {
    title: 'История покупок',
    desc: 'Помогает сравнивать покупки и видеть изменения со временем.',
    img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=400',
    rotate: 'rotate-[4deg]'
  },
  {
    title: 'Основные категории влияния',
    desc: 'Показывает, какие категории дают самый большой вклад.',
    img: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&q=80&w=400',
    rotate: 'rotate-[-2deg]'
  },
  {
    title: 'Простые визуальные отчеты',
    desc: 'Делает понятные диаграммы и короткие выводы.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    rotate: 'rotate-[1deg]'
  }
];

export function Features() {
  return (
    <div className="relative py-24 w-full bg-[#F5F5DC] overflow-hidden" 
         style={{
           backgroundImage: 'linear-gradient(#ccc 1px, transparent 1px), linear-gradient(90deg, #ccc 1px, transparent 1px)',
           backgroundSize: '40px 40px'
         }}>
         
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Title Collage */}
        <div className="flex flex-col items-center justify-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-4 text-center"
          >
            <span className="font-['Dotective',monospace] text-4xl md:text-6xl text-black">
              ЧТО
            </span>
            <div className="bg-white border-2 border-black px-4 py-2 transform rotate-2 shadow-[4px_4px_0_#000]">
              <span className="font-['Feature_Mono',sans-serif] font-bold text-4xl md:text-6xl uppercase tracking-widest">
                МОЖЕТ
              </span>
            </div>
            <div className="w-full h-2"></div>
            <span className="font-['Feature_Mono',sans-serif] text-2xl md:text-4xl">
              показать
            </span>
            <span className="font-['QuinqueFive',monospace] text-2xl md:text-4xl px-2">
              ECOSCAN
            </span>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, transition: { delay: 0, duration: 0.2 } }}
              className={`relative bg-white p-3 pb-6 border border-gray-300 shadow-[6px_6px_12px_rgba(0,0,0,0.15)] ${feature.rotate}`}
            >
              {/* Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-white/50 backdrop-blur-sm border border-black/10 rotate-[-5deg] z-20 shadow-sm"></div>
              <div className="absolute -top-3 right-2 w-12 h-6 bg-white/50 backdrop-blur-sm border border-black/10 rotate-[45deg] z-20 shadow-sm"></div>
              
              <div className="w-full aspect-[4/3] bg-gray-100 mb-4 overflow-hidden border border-gray-200">
                <ImageWithFallback 
                  src={feature.img} 
                  alt={feature.title}
                  className="w-full h-full object-cover mix-blend-multiply"
                />
              </div>
              <h4 className="font-['Feature_Mono',sans-serif] font-bold text-center text-lg leading-tight mb-2 px-2">
                {feature.title}
              </h4>
              <p className="font-['Segoe_UI',sans-serif] text-center text-sm text-gray-600 px-4">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
