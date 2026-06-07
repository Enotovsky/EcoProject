import logo from '../../assets/logo.png';

export function Footer() {
  const links = [
    { label: "О проекте", href: "#about" },
    { label: "Как это работает", href: "#how-it-works" },
    { label: "Демо", href: "#demo" },
    { label: "FAQ", href: "#faq" },
    { label: "Контакты", href: "#contacts" }
  ];

  return (
    <footer className="py-16 px-8 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="EcoScan Logo" className="w-12 h-12 object-contain rounded-lg" />
              <span className="text-2xl font-bold">EcoScan</span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-md">
              Умный калькулятор углеродного следа для чеков покупок.
              Превращайте ваши ежедневные покупки в экологическую аналитику.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Быстрые ссылки</h3>
            <div className="flex flex-wrap gap-6">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © 2026 EcoScan. Все права защищены.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/40 hover:text-white transition-colors text-sm">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
