import { useState } from 'react';
import botScreenshot from '../../assets/bot_screenshot.png';

export function TelegramBot() {
  return (
    <section id="telegram-bot" className="py-20 px-8 bg-gradient-to-b from-[#0a1410] to-[#0f1a14] relative overflow-hidden">
      {/* Декоративные фоновые свечения */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-[#0088cc]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#c6ff00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Левая колонка: Текст и преимущества */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#0088cc]/30 bg-[#0088cc]/10 text-sm font-semibold text-[#0088cc]">
              <span>🤖</span> НАШ ТЕЛЕГРАМ-БОТ
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              EcoScan теперь работает и{' '}
              <span className="text-[#0088cc] drop-shadow-[0_0_15px_rgba(0,136,204,0.3)]">в Telegram</span>!
            </h2>

            <p className="text-xl text-white/70 leading-relaxed max-w-xl">
              Анализируйте свои покупки прямо «на ходу» со смартфона. Больше не нужно открывать браузер: просто отправьте фото чека с QR-кодом нашему боту в мессенджере.
            </p>

            {/* Список преимуществ бота */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#0088cc] text-xl mt-0.5">✓</span>
                <div>
                  <h4 className="font-semibold text-lg">Максимальное удобство</h4>
                  <p className="text-white/60">Отправляйте снимок чека в один клик из галереи телефона.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-[#0088cc] text-xl mt-0.5">✓</span>
                <div>
                  <h4 className="font-semibold text-lg">Точность ФНС</h4>
                  <p className="text-white/60">Бот считывает QR-код и запрашивает официальные данные чека.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-[#0088cc] text-xl mt-0.5">✓</span>
                <div>
                  <h4 className="font-semibold text-lg">Персональные эко-советы</h4>
                  <p className="text-white/60">ИИ анализирует состав и присылает краткие рекомендации прямо в чат.</p>
                </div>
              </div>
            </div>

            {/* Кнопка запуска бота */}
            <div className="pt-4">
              <a
                href="https://t.me/EcoScan_co2_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#0088cc] text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#0077b3] hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,136,204,0.4)]"
              >
                {/* SVG иконка Telegram */}
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-1-.65-.35-1 .22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.24-5.54 3.66-.52.36-.97.53-1.35.52-.42-.01-1.23-.24-1.83-.43-.74-.24-1.33-.37-1.28-.79.03-.22.33-.45.9-.69 3.52-1.53 5.87-2.54 7.05-3.03 3.36-1.39 4.06-1.63 4.51-1.64.1 0 .32.02.46.14.12.1.15.24.17.34.02.13.02.26 0 .37z"/>
                </svg>
                Запустить бота в Telegram
              </a>
            </div>
          </div>

          {/* Правая колонка: Реальный скриншот чата Telegram-коллеги */}
          <div className="relative">
            <div className="w-full max-w-[380px] mx-auto rounded-[32px] border border-white/10 bg-[#0f1d19] shadow-2xl p-1 overflow-hidden relative ring-1 ring-white/5">
              <img
                src={botScreenshot}
                alt="Telegram bot interface showing receipt analysis"
                className="w-full h-auto object-contain rounded-[28px] shadow-lg"
              />
            </div>
            
            {/* Декоративные свечения сзади скриншота */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#c6ff00]/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#0088cc]/10 rounded-full blur-xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
