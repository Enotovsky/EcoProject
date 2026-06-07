export function MVP() {
  const pipeline = [
    "Фото чека",
    "OCR",
    "Список продуктов",
    "ИИ классификация",
    "Расчёт CO₂",
    "Дашборд"
  ];

  return (
    <section className="py-20 px-8 bg-gradient-to-b from-[#0a1410] to-[#0f1a14]">
      <div className="max-w-[1440px] mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Создан для <span className="text-[#ffa502]">быстрого MVP</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed">
            Первую версию можно создать с готовым OCR, лёгкой LLM через API,
            простой базой категорий продуктов и веб-интерфейсом.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {pipeline.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-[#c6ff00]/20 to-[#c6ff00]/5 border border-[#c6ff00]/30 rounded-2xl px-6 py-4">
                  <span className="font-semibold text-[#c6ff00]">{step}</span>
                </div>
                {index < pipeline.length - 1 && (
                  <div className="text-2xl text-white/30">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="bg-white/10 border border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all">
            Посмотреть архитектуру
          </button>
        </div>
      </div>
    </section>
  );
}
