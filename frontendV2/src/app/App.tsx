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
      <div className="min-h-screen bg-[#F8FFE4] font-['Feature_Mono',sans-serif] text-black overflow-x-hidden">
      <Navigation />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="how">
          <HowItWorks />
        </section>
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
