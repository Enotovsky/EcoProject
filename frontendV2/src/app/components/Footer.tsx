import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logo from '../../imports/logoes.png';

export function Footer() {
  return (
    <footer id="contacts" className="bg-[#D8FF00] py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-start gap-8">
        
        {/* Left Side */}
        <div className="flex flex-col max-w-sm">
          <div className="w-24 mb-4">
            <ImageWithFallback 
              src={logo} 
              alt="EcoScan Logo" 
              className="w-full h-auto object-contain drop-shadow-sm"
            />
          </div>
          <p className="font-sans text-xs text-black font-medium leading-relaxed">
            Умный калькулятор углеродного следа для чеков покупок. <br/>
            Превращайте ваши ежедневные покупки в экологическую <br/>
            аналитику.
          </p>
        </div>

        {/* Right Side Links */}
        <div className="flex flex-col gap-2 md:items-start pt-2">
          <span className="font-sans font-bold text-xs mb-1 text-black">Быстрые ссылки</span>
          <div className="flex flex-wrap gap-4 text-xs font-sans text-black">
            <a href="#" className="hover:underline">О проекте</a>
            <a href="#how" className="hover:underline">Как это работает</a>
            <a href="#try" className="hover:underline">Демо</a>
            <a href="#faq" className="hover:underline">FAQ</a>
            <a href="#contacts" className="hover:underline">Контакты</a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-6 flex justify-between items-center text-[10px] font-sans text-black/60">
        <span>© 2026 EcoScan. Все права защищены.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-black">Политика конфиденциальности</a>
          <a href="#" className="hover:text-black">Условия использования</a>
        </div>
      </div>
    </footer>
  );
}
