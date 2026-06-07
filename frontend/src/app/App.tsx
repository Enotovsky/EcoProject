import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { HowItWorks } from './components/HowItWorks';
import { Dashboard } from './components/Dashboard';
import { UseCases } from './components/UseCases';
import { UploadForm } from './components/UploadForm';
import { FAQ } from './components/FAQ';
import { TelegramBot } from './components/TelegramBot';
import { Footer } from './components/Footer';
import { Contacts } from './components/Contacts';
import type { AnalysisResult } from './components/ResultsDashboard';

export default function App() {
  const [result, setResult] = useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-[#0a1410] text-white">
      <div className="grain-overlay" />
      <Header />
      <Hero />
      <Problem />
      <HowItWorks />
      <Dashboard />
      <UseCases />
      <UploadForm result={result} setResult={setResult} />
      <TelegramBot />
      <FAQ />
      <Contacts />
      <Footer />
    </div>
  );
}
