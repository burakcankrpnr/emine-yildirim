import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Aile ve Çift Danışmanlığı - Psikolog Emine Yıldırım',
  description: 'Aile ve Çift Danışmanlığı hizmetleri. İlişki problemleri, iletişim sorunları ve aile içi çatışmalar için profesyonel destek. Antalya çift terapisi.',
  keywords: ['çift terapisi', 'aile danışmanlığı', 'evlilik terapisi', 'ilişki terapisi', 'iletişim sorunları', 'antalya çift terapisi'],
  openGraph: {
    title: 'Aile ve Çift Danışmanlığı | Psikolog Emine Yıldırım',
    description: 'İlişki problemleri, iletişim sorunları ve aile içi çatışmalar için profesyonel destek.',
    type: 'website',
  },
  alternates: {
    canonical: '/danismanliklar/cift-ve-aile-danismanligi',
  },
}

export default function CoupleFamilyCounselingPage() {
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
                Aile ve Çift Danışmanlığı
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                İlişkilerinizi güçlendirmek ve aile içi uyumu sağlamak için profesyonel destek.
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
                Aile ve Çift Danışmanlığı Nedir?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Aile ve Çift Danışmanlığı, ilişkilerde yaşanan sorunları çözmek ve aile içi iletişimi güçlendirmek için 
                profesyonel bir destek sürecidir. Bu süreçte, çiftlerin ve ailelerin karşılaştığı zorlukları birlikte 
                ele alarak, sağlıklı iletişim yolları geliştirmelerine yardımcı oluyoruz.
              </p>
              
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Hangi Durumlarda Yardımcı Olabiliriz?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>İletişim problemleri ve çatışmalar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Güven sorunları ve aldatma</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Aile içi roller ve sorumluluklar</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Boşanma süreci ve sonrası uyum</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Çocuk yetiştirme konularında anlaşmazlıklar</span>
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Süreç Nasıl İşler?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Danışmanlık sürecimiz, öncelikle mevcut durumu anlamak için detaylı bir değerlendirme ile başlar. 
                Ardından, çiftin veya ailenin ihtiyaçlarına göre özelleştirilmiş bir çalışma planı oluşturulur. 
                Seanslar sırasında, güvenli bir ortamda açık iletişim kurulması sağlanır ve sorunların kökenine 
                inilerek kalıcı çözümler geliştirilir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

