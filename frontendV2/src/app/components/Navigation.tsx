import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const SECTIONS = [
  { id: 'how', label: 'Как это работает', showOnMobile: false },
  { id: 'features', label: 'Что может EcoScan', showOnMobile: false },
  { id: 'try', label: 'Попробовать', showOnMobile: true },
  { id: 'faq', label: 'FAQ', showOnMobile: true },
  { id: 'contacts', label: 'Контакты', showOnMobile: true },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      let currentSection = '';
      
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollPosition) {
          currentSection = section.id;
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      } else {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'contacts') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  const activeTarget = hoveredSection || activeSection;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 z-[100] w-[90vw] sm:w-[95vw] md:w-auto">
      <nav className="relative bg-white/80 backdrop-blur-md rounded-full px-4 md:px-6 py-3 md:py-4 shadow-sm border border-black/10">
        <ul className="flex justify-center items-center gap-x-4 md:gap-6 font-['Feature_Mono',sans-serif] text-[11px] sm:text-xs md:text-sm tracking-tight relative px-1 md:px-0">
          {SECTIONS.map((section) => {
            const isActive = activeTarget === section.id;
            return (
              <li 
                key={section.id} 
                className={`relative ${section.showOnMobile ? '' : 'hidden sm:block'}`}
                onMouseEnter={() => setHoveredSection(section.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <a 
                  href={`#${section.id}`} 
                  onClick={(e) => handleScrollTo(e, section.id)}
                  className={`transition-colors duration-200 uppercase font-bold relative z-10 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'}`}
                >
                  {section.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-2 left-0 right-0 h-3 text-black"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <svg viewBox="0 0 100 15" preserveAspectRatio="none" className="w-full h-full opacity-80 mix-blend-multiply overflow-visible">
                      <motion.path
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={{
                          d: [
                            "M -5 8 Q 15 2, 35 9 T 65 4 T 105 8",
                            "M -5 9 Q 15 11, 35 5 T 65 10 T 105 7",
                            "M -5 7 Q 15 4, 35 8 T 65 5 T 105 9",
                            "M -5 8 Q 15 2, 35 9 T 65 4 T 105 8"
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 0.3, ease: "linear" }}
                        style={{ filter: "url(#pencilTexture)" }}
                      />
                      <defs>
                        <filter id="pencilTexture">
                          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </defs>
                    </svg>
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
