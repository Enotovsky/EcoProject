import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import logo from '../../imports/logoes.png';

// Минимальное время показа экрана загрузки (мс) — чтобы сайт успел прогрузиться
const MIN_DURATION = 2500;
// Страховка: даже если событие load не наступит, скрываем прелоадер
const MAX_DURATION = 5000;
// Длительность затухания (мс) — должна совпадать с CSS duration ниже
const FADE_DURATION = 600;

export function Loader() {
  const [hidden, setHidden] = useState(false);   // запускает затухание (opacity -> 0)
  const [removed, setRemoved] = useState(false); // окончательно убирает из DOM

  useEffect(() => {
    let finished = false;
    const start = Date.now();
    let fadeTimer: number | undefined;

    const finish = () => {
      if (finished) return;
      finished = true;
      setHidden(true);
      // Размонтируем по таймеру, не завися от анимации (надёжно и в фоновой вкладке)
      fadeTimer = window.setTimeout(() => setRemoved(true), FADE_DURATION);
    };

    // Скрываем не раньше, чем истечёт минимальная длительность показа
    const hideAfterMin = () => {
      const remaining = Math.max(0, MIN_DURATION - (Date.now() - start));
      window.setTimeout(finish, remaining);
    };

    // Жёсткая страховка от «зависания» прелоадера
    const cap = window.setTimeout(finish, MAX_DURATION);

    // Ждём полной загрузки страницы (картинки, шрифты и т.д.)
    if (document.readyState === 'complete') {
      hideAfterMin();
    } else {
      window.addEventListener('load', hideAfterMin, { once: true });
    }

    return () => {
      window.clearTimeout(cap);
      if (fadeTimer) window.clearTimeout(fadeTimer);
      window.removeEventListener('load', hideAfterMin);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8FFE4] transition-opacity duration-[600ms] ease-in-out"
      style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? 'none' : 'auto' }}
    >
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
        {/* Логотип с лёгкой «покачивающейся» анимацией */}
        <motion.img
          src={logo}
          alt="EcoScan"
          className="w-52 md:w-72 drop-shadow-[4px_4px_8px_rgba(0,0,0,0.25)]"
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="font-handwriting text-3xl md:text-4xl text-black -rotate-2">
          Загружаем ваш эко-отчёт…
        </div>

        {/* Полоса прогресса в стиле «скрапбук» */}
        <div className="w-64 md:w-80 h-4 border-2 border-black bg-white overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
          <motion.div
            className="h-full bg-[#7cb342]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: MIN_DURATION / 1000, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  );
}
