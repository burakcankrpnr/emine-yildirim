import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Online Danışmanlık - Psikolog Emine Yıldırım',
  description: 'Online danışmanlık hizmetleri. Evden konforunuzda, güvenli ve etkili psikolojik destek alın.',
}

export default function OnlineCounselingPage() {
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
                Online Danışmanlık
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Evden konforunuzda, güvenli ve etkili psikolojik destek.
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
                Online Danışmanlık Nedir?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Online danışmanlık, video konferans teknolojisi kullanılarak gerçekleştirilen psikolojik 
                destek hizmetidir. Bu yöntem, yüz yüze terapi ile aynı etkinliği sağlarken, zaman ve mekan 
                esnekliği sunar. Özellikle yoğun iş temposu, ulaşım zorlukları veya pandemi gibi durumlarda 
                ideal bir seçenektir.
              </p>
              
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Online Danışmanlığın Avantajları
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Evden konforunuzda terapi alabilme</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Zaman ve mekan esnekliği</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Ulaşım sorunu yaşamama</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Mahremiyet ve gizlilik</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Farklı şehirlerden erişim imkanı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Yüz yüze terapi ile aynı etkinlik</span>
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Nasıl Çalışır?
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Online danışmanlık süreci, güvenli ve şifreli bir video konferans platformu üzerinden 
                gerçekleştirilir. Randevu öncesi size gerekli teknik bilgiler ve bağlantı paylaşılır. 
                Seans sırasında, yüz yüze terapi ile aynı profesyonellik ve etik standartlar korunur. 
                Gizlilik ve mahremiyet en üst düzeyde sağlanır.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Online danışmanlık için ihtiyacınız olan tek şey, internet bağlantısı olan bir cihaz 
                (bilgisayar, tablet veya telefon) ve sessiz, özel bir ortamdır. Seanslar, yüz yüze terapi 
                ile aynı süre ve yapıda gerçekleştirilir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

