import Image from 'next/image'

export default function EducationTimeline() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-primary-lighter">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Sol Sütun - Fotoğraflar */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Üst Fotoğraf */}
              <div className="relative w-full max-w-xs aspect-[3/4] rounded-lg overflow-hidden mb-4">
                <Image
                  src="/psikolog.jpg"
                  alt="Emine Yıldırım"
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Alt Fotoğraf - Üst fotoğrafın üzerine binmiş */}
              <div className="relative w-3/4 max-w-xs aspect-[3/4] rounded-lg overflow-hidden -mt-24 md:-mt-32 ml-auto">
                <Image
                  src="/psikolog.jpg"
                  alt="Emine Yıldırım"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sağ Sütun - Eğitim Bilgileri */}
            <div className="space-y-6 md:space-y-8">
              {/* Sub-heading */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#764e45]"></div>
                <div className="w-12 h-0.5 bg-[#764e45]"></div>
                <p className="text-xs md:text-sm text-[#764e45] font-semibold uppercase tracking-wide">
                  EĞİTİM SÜRECİ
                </p>
              </div>

              {/* Ana Başlık */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">
                Eğitim
              </h2>

              {/* Antalya Belek Üniversitesi - Lisans Eğitimi */}
              <div className="relative pl-8">
                {/* Timeline Çizgisi */}
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#764e45] -translate-x-1/2"></div>

                <div className="space-y-6 md:space-y-8">
                  <div className="relative">
                    <div className="pl-4">
                      <p className="text-sm md:text-base font-bold text-gray-900 mb-1">
                        Psikoloji, Lisans
                      </p>
                      <p className="text-sm md:text-base text-gray-700">
                        Antalya Belek Üniversitesi
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profesyonel Eğitimler */}
              <div className="pt-8 border-t border-gray-200 mt-4">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
                  Uzmanlık ve Mesleki Eğitimler
                </h3>
                <p className="text-sm md:text-base text-gray-700 mb-4">
                  Lisans eğitimi süresince ve sonrasında, bireysel danışan ihtiyaçlarına bütüncül bir bakış açısıyla yaklaşabilmek amacıyla farklı kuramsal ekollere ve uygulamalı çalışmalara yönelik eğitim programlarına katılmıştır.
                </p>
                <ul className="space-y-2 text-sm md:text-base text-gray-700 list-disc list-inside">
                  <li>Bilişsel Davranışçı Terapi (BDT) temelli psikoterapi eğitimi</li>
                  <li>Kabul ve Kararlılık Terapisi (ACT) yaklaşımı ile danışanla çalışma becerileri</li>
                  <li>Travma ve yas süreçlerinde psikolojik destek ve müdahale eğitimi</li>
                  <li>Pozitif psikoloji odaklı iyi oluş ve güçlendirme çalışmaları</li>
                  <li>Kısa süreli çözüm odaklı terapi teknikleri ve uygulamaları</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

