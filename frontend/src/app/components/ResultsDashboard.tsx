import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Интерфейс результата анализа чека
export interface AnalysisResult {
  success: boolean;
  total_co2: number;
  eco_score: number;
  items: Array<{
    raw_name: string;
    clean_name: string;
    category: string;
    co2_coefficient: number;
    eco_tip: string;
  }>;
  categories_chart: Array<{
    category: string;
    total_co2: number;
    count: number;
    color: string;
  }>;
  ocr_text: string;
}

// Пропсы компонента дашборда результатов
interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
  hideTitle?: boolean;
  actionButtonText?: string;
}

// Цвета для категорий товаров
const CATEGORY_COLORS: Record<string, string> = {
  'Мясо и Птица': '#ff6b6b',
  'Молочные продукты и Яйца': '#ffa502',
  'Рыба и Морепродукты': '#00d9ff',
  'Овощи, Фрукты и Зелень': '#c6ff00',
  'Бакалея и Хлеб': '#a29bfe',
  'Сладости и Снеки': '#fd79a8',
  'Напитки в пластике/жести': '#74b9ff',
  'Пластиковая упаковка / Пакеты': '#636e72',
  'Другое': '#dfe6e9',
};

// Определение цвета CO₂ в зависимости от значения
function getCo2Color(value: number): string {
  if (value < 5) return '#c6ff00';
  if (value <= 15) return '#ffa502';
  return '#ff6b6b';
}

// Кастомный тултип для круговой диаграммы
function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { category: string; total_co2: number; count: number; color: string } }> }) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-[#0a1410] border border-white/20 rounded-xl px-4 py-3 shadow-lg">
      <p className="font-semibold text-white mb-1">{data.category}</p>
      <p className="text-sm text-white/80">CO₂: <span className="font-bold" style={{ color: data.color }}>{data.total_co2.toFixed(2)} кг</span></p>
      <p className="text-sm text-white/60">Товаров: {data.count}</p>
    </div>
  );
}

export function ResultsDashboard({ result, onReset, hideTitle, actionButtonText }: ResultsDashboardProps) {
  const co2Color = getCo2Color(result.total_co2);

  return (
    <div className="animate-fade-in space-y-8">
      {/* Заголовок раздела результатов */}
      {!hideTitle && (
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          Результаты <span className="text-[#c6ff00]">анализа</span>
        </h2>
      )}

      {/* Карточки сводки: общий CO₂ и эко-оценка */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Карточка общего CO₂ */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center">
          <p className="text-sm text-white/60 uppercase tracking-wider mb-3">Общий углеродный след</p>
          <p className="text-5xl font-bold mb-2" style={{ color: co2Color }}>
            {result.total_co2.toFixed(2)}
          </p>
          <p className="text-lg text-white/70">кг CO₂</p>
        </div>

        {/* Карточка эко-оценки с прогресс-баром */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center">
          <p className="text-sm text-white/60 uppercase tracking-wider mb-3">Эко-оценка</p>
          <p className="text-5xl font-bold text-white mb-2">
            {result.eco_score}<span className="text-2xl text-white/50">/100</span>
          </p>
          {/* Прогресс-бар эко-оценки */}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden mt-4">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${result.eco_score}%`,
                background: 'linear-gradient(90deg, #ff6b6b, #ffa502, #c6ff00)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Секция круговой диаграммы распределения CO₂ по категориям */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">
          Распределение CO₂ по <span className="text-[#c6ff00]">категориям</span>
        </h3>
        <div style={{ height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={result.categories_chart}
                dataKey="total_co2"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={120}
                innerRadius={60}
                paddingAngle={3}
                strokeWidth={0}
              >
                {/* Каждый сегмент диаграммы получает свой цвет из данных */}
                {result.categories_chart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomPieTooltip />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ paddingTop: 20, color: 'rgba(255,255,255,0.7)', fontSize: 13 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Таблица распознанных товаров */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-6">
          Распознанные <span className="text-[#c6ff00]">товары</span>
        </h3>
        {/* Горизонтальная прокрутка для мобильных устройств */}
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 text-white/60 text-sm uppercase tracking-wider">
                <th className="py-3 px-4">№</th>
                <th className="py-3 px-4">Товар</th>
                <th className="py-3 px-4">Категория</th>
                <th className="py-3 px-4">CO₂ (кг)</th>
                <th className="py-3 px-4">Эко-совет</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((item, index) => {
                // Получаем цвет категории из карты или используем серый по умолчанию
                const categoryColor = CATEGORY_COLORS[item.category] || '#dfe6e9';
                return (
                  <tr
                    key={index}
                    className="bg-white/5 hover:bg-white/10 transition-colors border-b border-white/5"
                  >
                    <td className="py-3 px-4 text-white/50">{index + 1}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium">{item.clean_name}</div>
                      {/* Исходное название из чека */}
                      {item.raw_name !== item.clean_name && (
                        <div className="text-xs text-white/40 mt-0.5">{item.raw_name}</div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {/* Цветная точка категории */}
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: categoryColor }}
                        />
                        <span className="text-sm">{item.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold" style={{ color: getCo2Color(item.co2_coefficient) }}>
                      {item.co2_coefficient.toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      {/* Эко-совет мелким текстом */}
                      <span className="text-xs text-white/60 leading-relaxed">{item.eco_tip}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Кнопки действий и итоговая информация */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <button
          onClick={onReset}
          className="bg-[#c6ff00] text-[#0a1410] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#b3e600] hover:scale-105 transition-all"
        >
          {actionButtonText || "Загрузить другой чек"}
        </button>
        <p className="text-white/50 text-sm">
          Всего товаров: <span className="text-white font-semibold">{result.items.length}</span>
        </p>
      </div>
    </div>
  );
}
