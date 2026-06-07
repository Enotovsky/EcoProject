export function Features() {
  const features = [
    {
      icon: "🌍",
      title: "Оценка углеродного следа",
      color: "#00d9ff"
    },
    {
      icon: "⭐",
      title: "Эко-балл корзины",
      color: "#c6ff00"
    },
    {
      icon: "📊",
      title: "Основные категории влияния",
      color: "#ffa502"
    },
    {
      icon: "🔄",
      title: "Альтернативные продукты",
      color: "#ff6b6b"
    },
    {
      icon: "📜",
      title: "История покупок",
      color: "#00d9ff"
    },
    {
      icon: "📈",
      title: "Простые визуальные отчёты",
      color: "#c6ff00"
    }
  ];

  return (
    <section id="features" className="py-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Что может показать <span className="text-[#00d9ff]">EcoScan</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-105 group"
            >
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <h3
                className="text-xl font-semibold"
                style={{ color: feature.color }}
              >
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
