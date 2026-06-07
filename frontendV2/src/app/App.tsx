import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Components
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { TryEcoScan } from './components/TryEcoScan';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <CustomCursor />
      
      <div className="min-h-screen bg-[#F8FFE4] font-mono text-black overflow-x-hidden relative">
      <Navigation />
      <main>
        {/* Hero & HowItWorks Section with Background and Textures */}
        <div className="relative w-full overflow-hidden">
          {/* Background Image & Grid (Behind Content) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <ImageWithFallback 
              src="/scrapbook/hero_how_bg.png" 
              alt="Hills and Grass Background"
              className="w-full h-full object-cover object-top"
            />
            {/* Grid Texture on background only, static with document */}
            <div 
              className="absolute -inset-[10%] mix-blend-multiply overflow-hidden"
              style={{ opacity: 0.02 }}
            >
              <ImageWithFallback src="/scrapbook/texture_1.png" alt="" className="w-full h-full object-cover max-w-none" />
            </div>
            
            {/* Papercut & Grunge Overlays (On background only) */}
            <div className="absolute -inset-[10%] pointer-events-none mix-blend-multiply opacity-5">
              <ImageWithFallback src="/scrapbook/texture_2.png" alt="" className="w-full h-full object-cover max-w-none" />
            </div>
            {/* Papercut Overlay (On background only) */}
            <div 
              className="absolute -inset-[10%] pointer-events-none mix-blend-overlay"
              style={{ opacity: 0.02 }}
            >
              <ImageWithFallback src="/scrapbook/texture_3.png" alt="" className="w-full h-full object-cover max-w-none" />
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <section id="hero">
              <Hero />
            </section>
            <section id="how">
              <HowItWorks />
            </section>
          </div>
        </div>
        <section id="features">
          <Features />
        </section>
        <section id="try">
          <TryEcoScan />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
    </>
  );
}
