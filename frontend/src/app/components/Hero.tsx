import { ImageWithFallback } from './figma/ImageWithFallback';
import heroReceipt from '../../assets/hero_receipt.jpg';

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
              Превратите чек в отчёт о{' '}
              <span className="text-[#c6ff00]">углеродном следе</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed max-w-xl">
              Загрузите чек, и ИИ распознает продукты и покажет экологический след
              вашей покупки за секунды.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#upload" className="bg-[#c6ff00] text-[#0a1410] px-8 py-4 rounded-full font-semibold text-lg hover:bg-[#b3e600] transition-all hover:scale-105 text-center flex items-center justify-center">
                Загрузить чек
              </a>
              <a href="#how-it-works" className="border-2 border-white/20 px-8 py-4 rounded-full font-semibold text-lg hover:border-white/40 transition-colors text-center flex items-center justify-center">
                Как это работает
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1a2820] to-[#0f1a14] p-4 border border-white/10">
              <ImageWithFallback
                src={heroReceipt}
                alt="Receipt with QR code scanner and EcoScan on phone screen"
                className="w-full h-[500px] object-cover rounded-2xl"
              />
            </div>

            <div className="absolute -top-8 -left-8 w-32 h-32 bg-[#00d9ff]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#ff6b6b]/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
