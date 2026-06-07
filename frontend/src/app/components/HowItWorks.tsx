export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Загрузите чек с QR-кодом",
      description: "Сфотографируйте чек так, чтобы QR-код внизу был чётко виден.",
      color: "#c6ff00"
    },
    {
      number: "02",
      title: "Считывание QR-кода",
      description: "Система распознаёт QR-код и загружает официальный список товаров из ФНС.",
      color: "#00d9ff"
    },
    {
      number: "03",
      title: "ИИ классифицирует продукты",
      description: "Продукты группируются по категориям: молочные, мясо, овощи, напитки, бытовые товары и другие.",
      color: "#ff6b6b"
    },
    {
      number: "04",
      title: "EcoScan показывает результат",
      description: "Пользователь получает оценку CO₂, эко-балл, графики и рекомендации альтернатив.",
      color: "#ffa502"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Как это <span className="text-[#c6ff00]">работает</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 h-full hover:bg-white/10 transition-all">
                <div
                  className="text-6xl font-bold mb-4 opacity-20"
                  style={{ color: step.color }}
                >
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: step.color }}>
                  {step.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/20" />
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#demo"
            className="bg-[#00d9ff] text-[#0a1410] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#00c4e6] transition-all hover:scale-105 inline-block"
          >
            Посмотреть демо-отчёт
          </a>
        </div>
      </div>
    </section>
  );
}
