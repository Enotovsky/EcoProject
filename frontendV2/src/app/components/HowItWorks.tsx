import React from 'react';
import { motion } from 'motion/react';

const STICKERS = [
  {
    num: '01',
    title: 'Загрузите чек',
    desc: 'Пользователь добавляет фото или скан магазинного чека.',
    color: 'bg-[#FFED63]',
    rotate: 'rotate-[-3deg]',
    y: 'translate-y-0',
    pinColor: 'bg-red-500'
  },
  {
    num: '02',
    title: 'QR-код → данные ФНС',
    desc: 'Сервис считывает QR-код чека и получает точный список товаров из базы ФНС.',
    color: 'bg-[#FFED63]',
    rotate: 'rotate-[4deg]',
    y: 'translate-y-8',
    pinColor: 'bg-blue-500'
  },
  {
    num: '03',
    title: 'ИИ классифицирует продукты',
    desc: 'Алгоритм определяет категории товаров и их экологическое влияние.',
    color: 'bg-[#FF9CF5]',
    rotate: 'rotate-[-2deg]',
    y: 'translate-y-16',
    pinColor: 'bg-yellow-400'
  },
  {
    num: '04',
    title: 'EcoScan показывает результат',
    desc: 'Пользователь видит углеродный след, эко-балл и советы.',
    color: 'bg-[#FF9CF5]',
    rotate: 'rotate-[3deg]',
    y: 'translate-y-4',
    pinColor: 'bg-green-500'
  }
];

export function HowItWorks() {
  return (
    <div className="relative py-24 w-full bg-[#D8FF00] overflow-hidden border-t-4 border-black border-dashed">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1603484477859-abe6a73f9366?auto=format&fit=crop&q=80')] mix-blend-multiply pointer-events-none"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 pb-12 mt-12">
          {STICKERS.map((sticker, idx) => (
            <motion.div 
              key={sticker.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 0 }}
              className={`relative p-6 shadow-[8px_8px_0_rgba(0,0,0,0.15)] md:${sticker.y} ${sticker.rotate} ${sticker.color} aspect-square flex flex-col`}
            >
              {/* Pin */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-black shadow-sm z-20 flex items-center justify-center bg-gray-200">
                <div className={`w-4 h-4 rounded-full ${sticker.pinColor} border border-black`}></div>
              </div>
              
              {/* Tape piece (optional) */}
              {idx % 2 === 0 && (
                <div className="absolute -top-2 -right-4 w-12 h-6 bg-white/40 backdrop-blur-sm border border-white/60 rotate-45 z-10"></div>
              )}

              <div className="font-['Feature_Mono',sans-serif] font-bold text-3xl mb-2 text-black text-center mt-2">
                {sticker.num}
              </div>
              <h3 className="font-['Feature_Mono',sans-serif] font-bold text-xl mb-3 text-black text-center leading-tight">
                {sticker.title}
              </h3>
              <p className="font-['Segoe_UI',sans-serif] text-sm text-black/80 text-center mt-2">
                {sticker.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 md:-right-6 top-20 text-6xl rotate-12 drop-shadow-md select-none pointer-events-none">📎</div>
        <div className="absolute left-10 bottom-10 text-4xl -rotate-12 drop-shadow-md select-none pointer-events-none">🍏</div>
        <div className="absolute right-1/4 bottom-0 w-8 h-8 rounded-full bg-red-500 border-2 border-black shadow-sm select-none pointer-events-none"></div>
      </div>
    </div>
  );
}
