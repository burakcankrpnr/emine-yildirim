import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ebeveyn Danışmanlığı - Psikolog Emine Yıldırım',
  description: 'Ebeveyn danışmanlığı hizmetleri. Çocuk yetiştirme, disiplin ve ebeveyn-çocuk ilişkisi konularında profesyonel destek.',
}

export default function ParentCounselingPage() {
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
                Ebeveyn Danışmanlığı
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Çocuk yetiştirme yolculuğunuzda size rehberlik ediyoruz.
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
                Ebeveyn Danışmanlığı Nedir?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Ebeveyn danışmanlığı, çocuk yetiştirme sürecinde karşılaşılan zorluklarda ebeveynlere destek 
                sağlayan bir hizmettir. Bu süreçte, çocuk gelişimi, disiplin yöntemleri, iletişim becerileri 
                ve ebeveyn-çocuk ilişkisini güçlendirme konularında rehberlik sunulur.
              </p>
              
              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Hangi Konularda Yardımcı Olabiliriz?
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Etkili disiplin yöntemleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Çocukla sağlıklı iletişim kurma</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Yaşa uygun beklentiler belirleme</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Kardeş kıskançlığı ve çatışmaları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Okul ve ödev sorunları</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Ekran kullanımı ve teknoloji yönetimi</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#764e45] mr-2">•</span>
                  <span>Ebeveynler arası tutarlılık sağlama</span>
                </li>
              </ul>

              <h3 className="text-xl md:text-2xl font-serif text-gray-900 mt-8 mb-4">
                Danışmanlık Süreci
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Ebeveyn danışmanlığında, öncelikle mevcut durum ve ebeveynlerin ihtiyaçları değerlendirilir. 
                Ardından, çocuğun yaşına ve gelişimsel dönemine uygun stratejiler geliştirilir. Seanslar 
                sırasında, pratik çözümler sunulur ve ebeveynlerin kendilerine güven duymaları sağlanır. 
                Süreç, ebeveynlerin kendi ebeveynlik stillerini keşfetmelerine ve güçlendirmelerine yardımcı olur.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

