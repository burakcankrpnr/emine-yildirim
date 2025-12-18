import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim - Psikolog Emine Yıldırım',
  description: 'Sorularınız, önerileriniz veya talepleriniz için bizimle iletişime geçin. Size yardımcı olmaktan mutluluk duyarız. Antalya psikolojik danışmanlık randevusu.',
  keywords: ['iletişim', 'randevu', 'psikolog randevusu', 'antalya psikolog iletişim', 'online terapi randevusu'],
  openGraph: {
    title: 'İletişim | Psikolog Emine Yıldırım',
    description: 'Sorularınız için bizimle iletişime geçin.',
    type: 'website',
  },
  alternates: {
    canonical: '/iletisim',
  },
}

export default function ContactPage() {
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
                  İLETİŞİM
                </p>
              </div>
              
              {/* Ana Başlık */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-3">
                Size Yakınız, Bize Yazın
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Sorularınız, önerileriniz veya talepleriniz için buradayız. Size yardımcı olmaktan mutluluk duyarız.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
    </div>
  )
}

