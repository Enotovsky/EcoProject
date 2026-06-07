import logo from '../../assets/logo.png';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1410]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="EcoScan Logo" className="w-10 h-10 object-contain rounded-lg" />
          <span className="text-xl font-bold">EcoScan</span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-sm text-white/70 hover:text-white transition-colors">О проекте</a>
          <a href="#how-it-works" className="text-sm text-white/70 hover:text-white transition-colors">Как это работает</a>
          <a href="#demo" className="text-sm text-white/70 hover:text-white transition-colors">Демо</a>
          <a href="#faq" className="text-sm text-white/70 hover:text-white transition-colors">FAQ</a>
          <a href="#contacts" className="text-sm text-white/70 hover:text-white transition-colors">Контакты</a>
        </nav>

        <a href="#upload" className="bg-[#c6ff00] text-[#0a1410] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#b3e600] transition-colors">
          Попробовать
        </a>
      </div>
    </header>
  );
}
