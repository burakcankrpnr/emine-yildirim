import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Çocuk ve Ergen Psikolojisi | Antalya Psikolog | Psikolog Emine Yıldırım',
  description: 'Antalya psikolog Emine Yıldırım ile çocuk ve ergen psikolojisi. DEHB, okul uyum sorunları, davranış problemleri için uzman çocuk psikologu ve terapi hizmetleri.',
  keywords: ['çocuk psikologu Antalya', 'ergen psikolojisi Antalya', 'çocuk terapisi Antalya', 'DEHB tedavisi Antalya', 'okul uyum sorunları Antalya', 'Antalya çocuk psikologu', 'davranış problemleri Antalya', 'ergen terapisi Antalya'],
  openGraph: {
    title: 'Çocuk ve Ergen Psikolojisi | Antalya Psikolog | Psikolog Emine Yıldırım',
    description: 'Antalya psikolog Emine Yıldırım ile çocuk ve ergen psikolojisi. DEHB, okul uyum sorunları, davranış problemleri için uzman destek.',
    type: 'website',
  },
  alternates: {
    canonical: '/danismanliklar/cocuk-ergen-psikolojisi',
  },
}

export default function ChildAdolescentPsychologyPage() {
  return (
    <div className="min-h-screen bg-primary-lighter">
      {/* Banner Section */}
      <section 
        className="relative h-[250px] md:h-[300px] overflow-hidden"
        style={{
          backgroundImage: 'url(/bg-pattern-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#764e45]/80 z-0"></div>

        {/* İçerik */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-3xl mx-auto text-center">
              {/* Sub-heading */}
              <div className="mb-3">
                <p className="text-xs md:text-sm text-white font-semibold uppercase tracking-wide">
                  DANIŞMANLIK HİZMETLERİ
                </p>
              </div>
              
              {/* Ana Başlık */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-3">
                Çocuk - Ergen Psikolojisi
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Çocuklarınızın ve gençlerin ruh sağlığını desteklemek için özel yaklaşım.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İçerik Bölümü */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-12 space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif text-gray-900 mb-4">
                Çocuk ve Ergen Psikolojisi Nedir?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Çocuk ve ergen psikolojisi, 0-18 yaş arası çocukların ve gençlerin ruh sağlığını desteklemeyi 
                hedefleyen özel bir alandır. Bu yaş grubundaki bireylerin gelişimsel ihtiyaçları, duygusal 
                zorlukları ve davranışsal sorunları için yaşa uygun terapi yöntemleri kullanılır.
              </p>
              
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Hangi Durumlarda Yardımcı Olabiliriz?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Dikkat eksikliği ve hiperaktivite (DEHB)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Öğrenme güçlükleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Kaygı ve korkular</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Depresyon ve duygudurum bozuklukları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Davranış problemleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Okul uyum sorunları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Sosyal beceri eksiklikleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Ergenlik dönemi sorunları</span>
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Terapi Süreci
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Çocuk ve ergen terapisinde, oyun terapisi, bilişsel davranışçı terapi ve aile terapisi gibi 
                yaşa uygun yöntemler kullanılır. Süreç, çocuğun veya gencin kendini güvende hissetmesi ve 
                açık bir şekilde ifade edebilmesi için özenle tasarlanır. Aileler de sürece dahil edilerek, 
                ev ortamında da destekleyici bir çevre oluşturulması sağlanır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

