export function Contacts() {
  const developers = [
    {
      name: "Разработчик 1",
      role: "Backend & ML Engineer",
      telegram: "@tg_username_1",
      avatar: "🤖"
    },
    {
      name: "Разработчик 2",
      role: "Frontend Developer",
      telegram: "@tg_username_2",
      avatar: "💻"
    }
  ];

  return (
    <section id="contacts" className="py-20 px-8 bg-gradient-to-b from-[#0f1a14] to-[#0a1410]">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Наша <span className="text-[#c6ff00]">команда</span>
        </h2>
        <p className="text-xl text-white/70 text-center mb-16 max-w-2xl mx-auto">
          Свяжитесь с нами в Telegram по любым вопросам, связанным с проектом EcoScan
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
          {developers.map((dev, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:scale-105 flex flex-col items-center text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c6ff00]/20 to-[#00d9ff]/20 border border-white/10 flex items-center justify-center text-4xl">
                {dev.avatar}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{dev.name}</h3>
                <p className="text-sm text-white/50 mt-1">{dev.role}</p>
              </div>
              <a
                href={`https://t.me/${dev.telegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#00d9ff] text-[#0a1410] px-6 py-2.5 rounded-full font-semibold hover:bg-[#00c4e6] transition-all hover:scale-105"
              >
                <span>Telegram: {dev.telegram}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
