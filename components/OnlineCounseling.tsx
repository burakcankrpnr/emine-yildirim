'use client'

import Image from 'next/image'

export default function OnlineCounseling() {
  return (
    
      <div className="container mx-auto max-w-7xl flex items-center justify-center min-h-[600px] md:min-h-[700px]">
        {/* Beyaz Kart */}
        <div className="relative w-full max-w-6xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] lg:h-full">
            {/* Sol Sütun - Metin İçeriği */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 space-y-6 md:space-y-8">
              {/* Başlık */}
              <div className="space-y-2 md:space-y-3">
                <h2 className="text-base md:text-lg lg:text-xl text-gray-500 font-medium">
                  Yetişkinler İçin;
                </h2>
                <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                  Online Psikolojik Danışmanlık
                </h3>
              </div>

              {/* Açıklama Metni */}
              <div className="space-y-4 md:space-y-5 text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed">
                <p>
                  Online psikolojik danışmanlık, yoğun hayatınızda kendinizi ihmal edilmiş 
                  hissettiğinizde destek almanın kolay bir yoludur. Duygularınızı keşfetmek, 
                  stresle başa çıkmak ve ruh sağlığınızı güçlendirmek için evinizin konforundan 
                  ayrılmadan profesyonel destek alabilirsiniz.
                </p>
                <p className="font-semibold text-gray-900">
                  Psikoloji desteğe (Terapiye) başlamak için doğru zaman tam da şimdi!{' '}
                  <span className="text-[#a47355]">Online Psikolojik Danışmanlık</span> için iletişime geçiniz.
                </p>
              </div>
            </div>

            {/* Sağ Sütun - Fotoğraf */}
            <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full min-h-[400px] lg:min-h-[600px]">
              <Image
                src="/psikolog.jpg"
                alt="Online Psikolojik Danışmanlık"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Video Kamera İkonu - Ortada, Kartın Sınırında */}
          <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#a47355] flex items-center justify-center shadow-2xl border-4 border-white">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 text-white" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17 10.5V7a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1v-3.5l4 4v-11l-4 4z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
  )
}

