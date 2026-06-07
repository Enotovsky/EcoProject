import React from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Leaf, BarChart3, ShoppingCart, Lightbulb } from 'lucide-react';

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

// Цвета для категорий товаров
const CATEGORY_COLORS: Record<string, string> = {
  'Мясо и Птица': '#ff6b6b',
  'Молочные продукты и Яйца': '#ffa502',
  'Рыба и Морепродукты': '#00d9ff',
  'Овощи, Фрукты и Зелень': '#7ed957',
  'Бакалея и Хлеб': '#a29bfe',
  'Сладости и Снеки': '#fd79a8',
  'Напитки в пластике/жести': '#74b9ff',
  'Пластиковая упаковка / Пакеты': '#636e72',
  'Другое': '#dfe6e9',
};

// Определение цвета CO₂ в зависимости от значения
function getCo2Color(value: number): string {
  if (value < 5) return '#7ed957';
  if (value <= 15) return '#ffa502';
  return '#ff6b6b';
}

// Эмодзи для эко-оценки
function getScoreEmoji(score: number): string {
  if (score >= 80) return '🌿';
  if (score >= 60) return '🌱';
  if (score >= 40) return '🍃';
  return '⚠️';
}

// Кастомный тултип для круговой диаграммы
function CustomPieTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { category: string; total_co2: number; count: number; color: string } }> }) {
  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-white border-2 border-black rounded-xl px-4 py-3 shadow-[4px_4px_0_#000]">
      <p className="font-['Feature_Mono',sans-serif] font-bold text-black mb-1">{data.category}</p>
      <p className="text-sm text-black/80 font-['Segoe_UI',sans-serif]">CO₂: <span className="font-bold" style={{ color: data.color }}>{data.total_co2.toFixed(2)} кг</span></p>
      <p className="text-sm text-black/60 font-['Segoe_UI',sans-serif]">Товаров: {data.count}</p>
    </div>
  );
}

interface ResultsDashboardProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultsDashboard({ result, onReset }: ResultsDashboardProps) {
  const co2Color = getCo2Color(result.total_co2);
  const scoreEmoji = getScoreEmoji(result.eco_score);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 w-full"
    >
      {/* Заголовок */}
      <h3 className="font-['Feature_Mono',sans-serif] font-bold text-3xl md:text-4xl text-center text-black">
        Результаты анализа 📊
      </h3>

      {/* Карточки метрик: CO₂ и Эко-балл */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Карточка CO₂ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -2 }}
          transition={{ delay: 0.1 }}
          className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] relative overflow-hidden"
        >
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-white/40 backdrop-blur-sm border border-black/20 rotate-[-5deg]"></div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 font-['Feature_Mono',sans-serif] flex items-center gap-2">
            <BarChart3 size={16} /> Углеродный след
          </p>
          <p className="text-5xl font-black font-['QuinqueFive',monospace]" style={{ color: co2Color }}>
            {result.total_co2.toFixed(1)}
          </p>
          <p className="text-base mt-1 font-['Segoe_UI',sans-serif] text-black/60">кг CO₂</p>
        </motion.div>

        {/* Карточка Эко-балл */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ delay: 0.2 }}
          className="bg-[#F8FFE4] border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] relative overflow-hidden"
        >
          <div className="absolute -top-2 right-4 w-10 h-5 bg-white/40 backdrop-blur-sm border border-black/20 rotate-[45deg]"></div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 font-['Feature_Mono',sans-serif] flex items-center gap-2">
            <Leaf size={16} /> Эко-оценка
          </p>
          <p className="text-5xl font-black font-['QuinqueFive',monospace] text-black">
            {result.eco_score}<span className="text-2xl text-black/40">/100</span> {scoreEmoji}
          </p>
          {/* Прогресс-бар */}
          <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden mt-4 border border-black/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.eco_score}%` }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #ff6b6b, #ffa502, #D8FF00, #7ed957)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Диаграмма категорий */}
      {result.categories_chart && result.categories_chart.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] relative"
        >
          <div className="absolute -top-3 left-8 w-6 h-6 rounded-full border-2 border-black shadow-sm bg-gray-200 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-yellow-400 border border-black"></div>
          </div>
          <h4 className="font-['Feature_Mono',sans-serif] font-bold text-xl mb-4 text-center">
            Распределение CO₂ по категориям
          </h4>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={result.categories_chart}
                  dataKey="total_co2"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  paddingAngle={3}
                  strokeWidth={2}
                  stroke="#000"
                >
                  {result.categories_chart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color || CATEGORY_COLORS[entry.category] || '#dfe6e9'} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  wrapperStyle={{ paddingTop: 16, color: '#333', fontSize: 12, fontFamily: "'Segoe UI', sans-serif" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}

      {/* Таблица товаров */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white border-4 border-black rounded-2xl p-6 shadow-[8px_8px_0_rgba(0,0,0,1)] relative"
      >
        <div className="absolute -top-2 right-8 w-14 h-6 bg-white/50 backdrop-blur-sm border border-black/10 rotate-[45deg]"></div>
        <h4 className="font-['Feature_Mono',sans-serif] font-bold text-xl mb-4 flex items-center gap-2">
          <ShoppingCart size={20} /> Распознанные товары
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead>
              <tr className="border-b-2 border-black text-black/60 text-xs uppercase tracking-wider font-['Feature_Mono',sans-serif]">
                <th className="py-3 px-3">№</th>
                <th className="py-3 px-3">Товар</th>
                <th className="py-3 px-3">Категория</th>
                <th className="py-3 px-3">CO₂</th>
                <th className="py-3 px-3">Совет</th>
              </tr>
            </thead>
            <tbody>
              {result.items.map((item, index) => {
                const categoryColor = CATEGORY_COLORS[item.category] || '#dfe6e9';
                return (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-black/10 hover:bg-[#F8FFE4] transition-colors"
                  >
                    <td className="py-3 px-3 text-black/40 font-['Feature_Mono',sans-serif] font-bold">{index + 1}</td>
                    <td className="py-3 px-3">
                      <div className="font-['Segoe_UI',sans-serif] font-medium text-black">{item.clean_name}</div>
                      {item.raw_name !== item.clean_name && (
                        <div className="text-xs text-black/40 mt-0.5 font-['Segoe_UI',sans-serif]">{item.raw_name}</div>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0 border border-black/20"
                          style={{ backgroundColor: categoryColor }}
                        />
                        <span className="text-sm font-['Segoe_UI',sans-serif]">{item.category}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-['QuinqueFive',monospace] font-bold text-sm" style={{ color: getCo2Color(item.co2_coefficient) }}>
                      {item.co2_coefficient.toFixed(2)}
                    </td>
                    <td className="py-3 px-3">
                      <span className="text-xs text-black/60 font-['Segoe_UI',sans-serif] leading-relaxed flex items-start gap-1">
                        <Lightbulb size={12} className="flex-shrink-0 mt-0.5 text-yellow-500" />
                        {item.eco_tip}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-right text-sm text-black/50 mt-4 font-['Segoe_UI',sans-serif]">
          Всего товаров: <span className="font-bold text-black">{result.items.length}</span>
        </p>
      </motion.div>

      {/* Кнопка «Загрузить другой чек» */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center"
      >
        <button
          onClick={onReset}
          className="bg-[#D8FF00] text-black font-['Feature_Mono',sans-serif] font-bold text-lg py-4 px-10 rounded-xl border-2 border-black shadow-[4px_4px_0_#000] hover:bg-black hover:text-white hover:translate-y-1 hover:shadow-[0_0_0_#000] transition-all duration-250"
        >
          Загрузить другой чек
        </button>
      </motion.div>
    </motion.div>
  );
}
