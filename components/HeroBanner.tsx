'use client'

import Image from 'next/image'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'

export default function HeroBanner() {

  // Metni karakterlerine ayırıp animasyonlu render eden fonksiyon
  const renderAnimatedText = (text: string, baseDelay: number = 0, delayPerChar: number = 30) => {
    let charIndex = 0
    return text.split('').map((char, index) => {
      // Boşluk karakterleri için özel işleme
      if (char === ' ') {
        return <span key={index} className="inline-block">&nbsp;</span>
      }
      const delay = baseDelay + charIndex * delayPerChar
      charIndex++
      return (
        <span
          key={index}
          className="inline-block animate-char-fade-in"
          style={{
            animationDelay: `${delay}ms`,
          }}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <>
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Arka plan video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            src="/bannervideo.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* İçerik */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-4xl mx-auto">
              {/* Sol taraf - Metin ve Butonlar */}
              <div className="text-left space-y-6">
                {/* Küçük başlık */}
                <p className="sub-heading single text-sm md:text-base text-white font-bold tracking-wide">
                  {renderAnimatedText('DEĞİŞİM, BİR ADIMLA BAŞLAR;', 0, 30)}
                </p>

                {/* Ana başlık */}
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-white leading-tight">
                  {renderAnimatedText('Birlikte güçlü adımlar atalım', 300, 40)}
                </h1>

                {/* Paragraf */}
                <p className="text-base md:text-lg text-white/90 leading-relaxed max-w-xl">
                  {renderAnimatedText('Bazen küçük bir adım, büyük bir değişimin başlangıcıdır. Yolculuğunda güçlenmene ve netleşmene destek olmaya hazırım.', 800, 15)}
                </p>

                {/* Butonlar */}
                <div className="flex flex-wrap gap-3 md:gap-4 pt-4 animate-fade-in-up animation-delay-600">
                  <a
                    href="/danismanliklar/online-danismanlik"
                    className="px-6 py-3 md:px-8 md:py-4 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition-colors font-semibold text-sm md:text-base lg:text-lg shadow-lg"
                  >
                    Online Danışmanlıklar
                  </a>
                  <a
                    href="hakkimda"
                    className="px-6 py-3 md:px-8 md:py-4 bg-white text-[#764e45] rounded-lg hover:bg-gray-100 transition-colors font-semibold text-sm md:text-base lg:text-lg shadow-lg"
                  >
                    Hakkımda
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt İçerik Kutuları - HeroBanner'ın altında, slider'ın üstüne gelecek */}
      <div className="relative -mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 z-[5] px-4 md:pb-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Sol Kutu - Beyaz - İki Sütun */}
            <div className="bg-white rounded-lg p-5 md:p-6 lg:p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Sol Sütun - Açıklama */}
                <div>
                  <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                    Güçlü bir yarın için; Bugün Başla.
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Sizlerin zihinsel ve duygusal dengelerinizi desteklemek, günlük yaşamın zorluklarıyla başa çıkmanızı kolaylaştırmak ve kendinizi daha derin bir anlayışla keşfetmenize yardımcı olmak için buradayız. Antalya&apos;daki ofisimizde ve online danışmanlık hizmetimizle her zaman yanınızdayız.
                  </p>
                </div>

                {/* Sağ Sütun - Uzmanlık Alanları */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                    Uzmanlık Alanlarımız;
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {[
                      'Yetişkin Psikolojisi',
                      'Aile ve Çift Psikolojisi',
                      'Çocuk ve Ergen Psikolojisi',
                      'Ebeveyn Danışmanlığı',
                      'Online Psikolojik Danışmanlık'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <span className="text-[#764e45] mt-0.5 md:mt-1 flex-shrink-0">
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-sm md:text-base text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sağ Kutu - Kahverengi */}
            <div className="bg-[#764e45] rounded-lg p-5 md:p-6 lg:p-8 shadow-lg">
              <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                Size Yakınız, Bize Yazın
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-4 md:mb-6">
                Sorularınız, önerileriniz veya talepleriniz için buradayız. Size yardımcı olmaktan mutluluk duyarız! ☆
              </p>
              
              {/* WhatsApp Bölümü */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8b6b5f] flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-white text-lg md:text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">
                      WHATSAPP DANIŞMA HATTI
                    </p>
                    <a 
                      href="https://wa.me/+905326499146" 
                      className="text-white text-lg md:text-xl font-bold hover:underline block"
                    >
                      +90 532 649 91 46
                    </a>
                  </div>
                </div>
              </div>

              {/* İletişim Bölümü */}
              <div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8b6b5f] flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-lg md:text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">
                      İLETİŞİM DANIŞMA HATTI
                    </p>
                    <a 
                      href="tel:+905326499146" 
                      className="text-white text-lg md:text-xl font-bold hover:underline block"
                    >
                      +90 532 649 91 46
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
