import AboutProfile from '@/components/AboutProfile'
import { Metadata } from 'next'
import Counter from '@/components/Counter'
import EducationTimeline from '@/components/EducationTimeline'
import HealingQuote from '@/components/HealingQuote'
export const metadata: Metadata = {
  title: 'Hakkımda - Psikolog Emine Yıldırım',
  description: ' Psikolog Emine Yıldırım hakkında bilgi edinin. Yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
}

export default function AboutPage() {
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
                  HAKKIMDA
                </p>
              </div>
              
              {/* Ana Başlık */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-3">
                 Psikolog Emine Yıldırım
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Bireylerin bedensel, ruhsal ve sosyal bütünlüğüne destek olma bilinci ile etik ilkeler kapsamında hizmet vermekteyim.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutProfile />
      <Counter />
      <HealingQuote />
      <EducationTimeline />
    </div>
  )
}

