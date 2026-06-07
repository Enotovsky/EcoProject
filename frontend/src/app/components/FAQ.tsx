import { useState } from 'react';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Насколько точен EcoScan?",
      answer: "EcoScan считывает официальные данные чека напрямую из базы Федеральной налоговой службы (ФНС) через API. Это гарантирует 100% точность списка товаров. Затем наш ИИ классифицирует продукты по экологическим категориям для оценки углеродного следа."
    },
    {
      question: "Что делать, если QR-код на чеке не распознаётся?",
      answer: "Убедитесь, что QR-код внизу чека хорошо освещен, находится в фокусе, не размыт и не обрезан. Если изображение всё равно не считывается, попробуйте сфотографировать QR-код крупным планом при хорошем свете."
    },
    {
      question: "Откуда берутся данные о продуктах?",
      answer: "При загрузке чека система сканирует QR-код и отправляет официальный запрос в базу данных ФНС. Оттуда мы получаем точный перечень наименований и цен продуктов в чеке, после чего нейросеть анализирует их углеродный след."
    }
  ];

  return (
    <section id="faq" className="py-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Часто задаваемые <span className="text-[#00d9ff]">вопросы</span>
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left"
              >
                <span className="text-xl font-semibold pr-4">{faq.question}</span>
                <div className={`text-2xl transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ↓
                </div>
              </button>
              {openIndex === index && (
                <div className="px-8 pb-6">
                  <p className="text-white/70 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
