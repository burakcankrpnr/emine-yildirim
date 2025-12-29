'use client'

import Image from 'next/image'
import { useState } from 'react'

interface CounselingServicesProps {
  videoUrl?: string
  videoPoster?: string
}

export default function CounselingServices({
  videoUrl = '/online-terapi-final.mp4',
  videoPoster = '/onlinedanismanlik.jpg',
}: CounselingServicesProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const services = [
    {
      title: "Yetişkin",
      description: "Yetişkin psikoloğu, bireylerin psikolojik sağlıklarını ve genel yaşam kalitelerini artırmak amacıyla destek ve danışmanlık hizmetleri sunan uzmanlardır."
    },
    {
      title: "Çocuk",
      description: "Çocuk terapisi, oyun ve yaratıcı etkinlikler aracılığıyla duygularını ifade etmesine, kaygı ve davranış sorunlarıyla başa çıkmasına destek olur. Kendini güvenle ifade etmesini sağlar."
    },
    {
      title: "Ergen",
        description: "Ergen terapisi, kimlik gelişimi, sosyal ilişkiler ve duygusal zorluklarla başa çıkma konularında destek sunar. Kendini keşfetmesine ve özgüvenini güçlendirmesine yardımcı olur."
      },
      {
      title: "Aile ve Çift",
      description: "Aile ve çift danışmanlığı, ilişkilerdeki iletişimi güçlendirmeye, çatışmaları çözmeye ve bağları kuvvetlendirmeye odaklanır. Hem aile üyeleri hem de partnerler arasındaki sağlıklı ve anlayışlı ilişkilerin kurulmasına destek olur."
    }
  ]

  return (
    <>
    <section 
      className="relative py-12 md:py-20 px-4 sm:px-6"
      style={{
        backgroundImage: 'url(/dotted-pattern-large.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#2a2a2a'
      }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Sol Sütun - Metin İçeriği */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            {/* Sub-heading */}
            <div className="sub-heading single dark">
              <p className="text-sm md:text-base lg:text-lg text-[#f8f5f0] font-semibold uppercase tracking-wide">
                DANIŞMANLIKLAR
              </p>
            </div>

            {/* Ana Başlık */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#f8f5f0] font-bold leading-tight">
              Kendini ve İçsel Gücünü Keşfet
            </h2>

            {/* Açıklama Metni */}
            <div className="space-y-4 text-[#f8f5f0] text-base md:text-lg leading-relaxed">
              <p>
                Psikolojik danışmanlık seanslarımız, duygusal iyileşme, stres yönetimi ve 
                ruh sağlığınızı güçlendirmek için tasarlanmıştır. Hem hem de online 
                hizmetlerimizle, size en uygun şekilde destek sunuyoruz.
              </p>
              <p>
                Her bireyin kendine özgü ihtiyaçları olduğunu biliyoruz. Bu nedenle, 
                danışmanlık sürecimizde size özel bir yaklaşım benimsiyoruz. Duygusal 
                sağlığınızı korumak, yaşam kalitenizi artırmak ve içsel gücünüzü 
                keşfetmek için yanınızdayız.
              </p>
            </div>
          </div>

          {/* Sağ Sütun - Servis Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-transparent p-4 md:p-6 rounded-lg"
              >
                <div className="flex gap-3 md:gap-4">
                  {/* Yıldız İkonu - Görseldeki gibi dairesel arka plan ile */}
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#a47355] shadow-md">
                      <i className="fas fa-star text-white text-sm md:text-base"></i>
                    </div>
                  </div>

                  {/* Başlık ve Açıklama - Sağ tarafta */}
                  <div className="flex-1">
                    {/* Başlık - Alt çizgi ile */}
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#f8f5f0] pb-2 border-b border-[#a47355] border-opacity-30 mb-2 md:mb-3">
                      {service.title}
                    </h3>

                    {/* Açıklama */}
                    <p className="text-sm md:text-base text-[#f8f5f0] leading-relaxed opacity-90">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Online Counseling Section - Ters Layout, Arka Plan Yok, Üst Üste Binecek */}
    <div className="relative mt-[-60px] md:mt-[-80px] px-4 sm:px-6 bg-transparent">
      <div className="container mx-auto max-w-7xl flex items-center justify-center px-4 sm:px-6 pb-8 md:pb-12 lg:pb-16">
        {/* Beyaz Kart */}
        <div className="relative w-full max-w-7xl bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] lg:h-full">
            {/* Sol Sütun - Metin İçeriği */}
            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12 space-y-4 md:space-y-6">
              {/* Başlık */}
              <div className="space-y-1 md:space-y-2">
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  Online Psikolojik Danışmanlık
                </h3>
              </div>

              {/* Açıklama Metni */}
              <div className="space-y-3 md:space-y-4 text-gray-700 text-xs md:text-sm lg:text-base leading-relaxed">
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

            {/* Sağ Sütun - Fotoğraf ve Video Butonu */}
            <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-full min-h-[400px] lg:min-h-[600px] group cursor-pointer">
              <Image
                src="/onlinedanismanlik.jpg"
                alt="Online Psikolojik Danışmanlık"
                fill
                className="object-cover"
              />
              {/* Overlay ve Video Oynatma Butonu */}
              <div 
                className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center"
                onClick={() => setIsVideoModalOpen(true)}
              >
                {/* Play İkonu */}
                <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-[#a47355] flex items-center justify-center shadow-2xl border-2 border-white hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <svg 
                    className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white ml-0.5" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
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
    </div>

    {/* Video Modal */}
    {isVideoModalOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
        onClick={() => setIsVideoModalOpen(false)}
      >
        <div
          className="relative w-full h-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Kapat Butonu */}
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 active:bg-opacity-80 text-white rounded-full flex items-center justify-center transition-all duration-300 touch-manipulation"
            aria-label="Kapat"
          >
            <svg 
              className="w-6 h-6 sm:w-8 sm:h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Video Container */}
          <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-4 md:px-6">
            <video
              src={videoUrl}
              poster={videoPoster}
              controls
              autoPlay
              playsInline
              className="w-full h-auto max-w-full max-h-[85vh] sm:max-h-[80vh] md:max-h-[75vh] object-contain rounded-lg shadow-2xl"
              // Mobil optimizasyonları
              preload="metadata"
              // Responsive video attributes
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

