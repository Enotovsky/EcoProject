export function Problem() {
  const cards = [
    {
      title: "Чеки уже содержат данные о покупках",
      icon: "📄"
    },
    {
      title: "ИИ классифицирует продукты автоматически",
      icon: "🤖"
    },
    {
      title: "Пользователи получают наглядный отчёт",
      icon: "📊"
    }
  ];

  return (
    <section id="about" className="py-20 px-8 bg-gradient-to-b from-[#0a1410] to-[#0f1a14]">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Большинство людей не знают о влиянии{' '}
            <span className="text-[#00d9ff]">ежедневных покупок</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            Калькуляторы углеродного следа обычно кажутся сложными. EcoScan упрощает процесс:
            у пользователя уже есть чек, а ИИ превращает его в понятную экологическую сводку.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-105"
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
