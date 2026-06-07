import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../../imports/logoes.png';

export function Footer() {
  return (
    <footer id="contacts" className="bg-[#D8FF00] border-t border-black py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Left Side */}
        <div className="flex flex-col max-w-xs">
          <div className="w-32 mb-4">
            <ImageWithFallback 
              src={logo} 
              alt="EcoScan Logo" 
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>
          <p className="font-['Segoe_UI',sans-serif] text-sm text-black font-medium mb-6">
            Сервис для анализа покупок и оценки углеродного следа по чекам.
          </p>
          <p className="text-xs text-black/60 font-['Segoe_UI',sans-serif]">
            Учебный проект. Данные расчета являются примерными.
          </p>
        </div>

        {/* Right Side Links */}
        <div className="flex flex-col gap-2 md:items-end">
          <a href="#" className="font-['Feature_Mono',sans-serif] font-bold text-sm uppercase hover:underline decoration-2 underline-offset-4">О проекте</a>
          <a href="#how" className="font-['Feature_Mono',sans-serif] font-bold text-sm uppercase hover:underline decoration-2 underline-offset-4">Как работает</a>
          <a href="#try" className="font-['Feature_Mono',sans-serif] font-bold text-sm uppercase hover:underline decoration-2 underline-offset-4">Попробовать</a>
          <a href="#faq" className="font-['Feature_Mono',sans-serif] font-bold text-sm uppercase hover:underline decoration-2 underline-offset-4">FAQ</a>
          <a href="#contacts" className="font-['Feature_Mono',sans-serif] font-bold text-sm uppercase hover:underline decoration-2 underline-offset-4">Контакты</a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-6 border-t border-black/10 flex justify-between items-center text-xs font-['Segoe_UI',sans-serif] text-black/50">
        <span>© 2026 EcoScan</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-black">Политика конфиденциальности</a>
          <a href="#" className="hover:text-black">Условия использования</a>
        </div>
      </div>
    </footer>
  );
}
