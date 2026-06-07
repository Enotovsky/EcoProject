import { ResultsDashboard } from './ResultsDashboard';

const DEMO_RESULT = {
  success: true,
  total_co2: 12.35,
  eco_score: 74,
  items: [
    {
      raw_name: "1. Мол.Дом.в дер.3.2% 99.90",
      clean_name: "Молоко Домик в деревне 3.2%",
      category: "Молочные продукты и Яйца",
      co2_coefficient: 4.5,
      eco_tip: "Попробуйте растительное молоко (овсяное или соевое) — у него след в 3-4 раза меньше."
    },
    {
      raw_name: "2. Хл.Дарницк.нарез. 45.00",
      clean_name: "Хлеб Дарницкий нарезной",
      category: "Бакалея и Хлеб",
      co2_coefficient: 1.2,
      eco_tip: "Покупайте локальный хлеб без лишней пластиковой упаковки."
    },
    {
      raw_name: "3. ПАКЕТ-МАЙКА БОЛ. 15.00",
      clean_name: "Пакет-майка большой",
      category: "Пластиковая упаковка / Пакеты",
      co2_coefficient: 3.0,
      eco_tip: "Используйте собственный тканевый шоппер вместо покупки пластиковых пакетов."
    },
    {
      raw_name: "4. Томаты Черри 250г 120.00",
      clean_name: "Томаты черри",
      category: "Овощи, Фрукты и Зелень",
      co2_coefficient: 0.6,
      eco_tip: "Отличный эко-выбор! Овощи имеют минимальный углеродный след."
    },
    {
      raw_name: "5. Филе куриное 500г 220.00",
      clean_name: "Филе куриное",
      category: "Мясо и Птица",
      co2_coefficient: 15.0,
      eco_tip: "Курица экологичнее говядины, но растительные белки ещё более дружественны к природе."
    }
  ],
  categories_chart: [
    { category: "Мясо и Птица", total_co2: 15.0, count: 1, color: "#ff6b6b" },
    { category: "Молочные продукты и Яйца", total_co2: 4.5, count: 1, color: "#ffa502" },
    { category: "Пластиковая упаковка / Пакеты", total_co2: 3.0, count: 1, color: "#636e72" },
    { category: "Бакалея и Хлеб", total_co2: 1.2, count: 1, color: "#a29bfe" },
    { category: "Овощи, Фрукты и Зелень", total_co2: 0.6, count: 1, color: "#c6ff00" }
  ],
  ocr_text: "..."
};

export function Dashboard() {
  const handleScrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="demo" className="py-20 px-8 bg-gradient-to-b from-[#0f1a14] to-[#0a1410]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Ваша покупка, <span className="text-[#c6ff00]">визуализирована</span>
        </h2>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto animate-fade-in">
          {/* Отображаем реальный интерактивный дашборд с демо-данными */}
          <ResultsDashboard
            result={DEMO_RESULT}
            onReset={handleScrollToUpload}
            hideTitle={true}
            actionButtonText="Загрузить свой чек"
          />
        </div>
      </div>
    </section>
  );
}
