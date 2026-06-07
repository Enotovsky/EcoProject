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
      
      {/* Global Textures Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none mix-blend-multiply opacity-40">
        <ImageWithFallback src="/scrapbook/texture_1.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="fixed inset-0 z-50 pointer-events-none mix-blend-color-burn opacity-30">
        <ImageWithFallback src="/scrapbook/texture_2.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="fixed inset-0 z-50 pointer-events-none mix-blend-overlay opacity-50">
        <ImageWithFallback src="/scrapbook/texture_3.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="min-h-screen bg-[#F8FFE4] font-mono text-black overflow-x-hidden relative">
      <Navigation />
      <main>
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ImageWithFallback 
              src="/scrapbook/hero_how_bg.png" 
              alt="Hills and Grass Background"
              className="w-full h-full object-cover object-top"
            />
          </div>
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
