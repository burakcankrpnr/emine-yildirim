import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yetişkin Psikolojisi - Psikolog Emine Yıldırım',
  description: 'Yetişkin psikolojisi hizmetleri. Depresyon, kaygı, stres ve yaşam dönemleri sorunları için profesyonel psikolojik destek. Antalya yetişkin terapisi.',
  keywords: ['yetişkin psikolojisi', 'yetişkin terapisi', 'depresyon tedavisi', 'kaygı tedavisi', 'stres yönetimi', 'antalya psikolog'],
  openGraph: {
    title: 'Yetişkin Psikolojisi | Psikolog Emine Yıldırım',
    description: 'Depresyon, kaygı, stres ve yaşam dönemleri sorunları için profesyonel psikolojik destek.',
    type: 'website',
  },
  alternates: {
    canonical: '/danismanliklar/yetiskin-psikolojisi',
  },
}

export default function AdultPsychologyPage() {
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
                Yetişkin Psikolojisi
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Yaşamın her döneminde karşılaştığınız zorluklarda yanınızdayız.
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
                Yetişkin Psikolojisi Nedir?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Yetişkin psikolojisi, 18 yaş üzeri bireylerin ruh sağlığını desteklemeyi hedefleyen bir alandır. 
                Yaşamın farklı dönemlerinde karşılaşılan zorluklar, duygusal sorunlar ve psikolojik rahatsızlıklar 
                için bireysel terapi hizmeti sunulur.
              </p>
              
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Hangi Durumlarda Yardımcı Olabiliriz?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Depresyon ve duygudurum bozuklukları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Kaygı bozuklukları ve panik atak</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Stres yönetimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Travma ve travma sonrası stres bozukluğu</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Özgüven ve benlik saygısı sorunları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>İş ve kariyer kaygıları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Yaşam dönemleri geçişleri (evlilik, ebeveynlik, emeklilik)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Yas ve kayıp süreçleri</span>
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Terapi Süreci
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Yetişkin terapisinde, bilişsel davranışçı terapi, psikodinamik terapi ve çözüm odaklı terapi 
                gibi kanıta dayalı yöntemler kullanılır. Terapi süreci, bireyin kendini keşfetmesi, sorunların 
                kökenini anlaması ve etkili başa çıkma stratejileri geliştirmesi için güvenli ve destekleyici 
                bir ortam sağlar.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

