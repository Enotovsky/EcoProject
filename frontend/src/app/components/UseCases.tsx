import { ImageWithFallback } from './figma/ImageWithFallback';

export function UseCases() {
  const cases = [
    {
      title: "Обычные покупатели",
      description: "Отслеживайте углеродный след с каждой покупкой",
      image: "https://images.unsplash.com/photo-1628102491629-778571d893a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHNob3BwaW5nJTIwZ3JvY2VyaWVzfGVufDF8fHx8MTc4MDQwNDc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Студенты и исследователи",
      description: "Собирайте реальные данные для экологических исследований",
      image: "https://images.unsplash.com/photo-1553531889-56cc480ac5cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxzdXN0YWluYWJsZSUyMHNob3BwaW5nJTIwZ3JvY2VyaWVzfGVufDF8fHx8MTc4MDQwNDc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Эко-проекты",
      description: "Интегрируйте отслеживание следа в приложения экологии",
      image: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxzdXN0YWluYWJsZSUyMHNob3BwaW5nJTIwZ3JvY2VyaWVzfGVufDF8fHx8MTc4MDQwNDc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "Ритейл и доставка",
      description: "Предоставляйте клиентам данные об эко-влиянии",
      image: "https://images.unsplash.com/photo-1584473457406-6240486418e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxzdXN0YWluYWJsZSUyMHNob3BwaW5nJTIwZ3JvY2VyaWVzfGVufDF8fHx8MTc4MDQwNDc2NHww&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <section className="py-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Кто может <span className="text-[#ff6b6b]">использовать EcoScan</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all hover:scale-105 group"
            >
              <div className="h-48 overflow-hidden">
                <ImageWithFallback
                  src={useCase.image}
                  alt={useCase.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{useCase.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
