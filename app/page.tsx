import HeroBanner from '@/components/HeroBanner'
import AboutProfile from '@/components/AboutProfile'
import Services from '@/components/Services'
import SupportSection from '@/components/SupportSection'
import EducationSection from '@/components/EducationSection'
import Quote from '@/components/Quote'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import CounselingServices from '@/components/CounselingServices'
import InstagramReelsServer from '@/components/InstagramReelsServer'
import { getHomepageSettings } from '@/lib/homepage'
import { Metadata } from 'next'

// Sayfanın her istekte güncel veriyi çekmesi için dinamik render
export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Antalya Psikolog | Psikolog Emine Yıldırım | En İyi Psikolojik Danışmanlık',
  description: 'Antalya\'nın en iyi psikoloğu Emine Yıldırım. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online danışmanlık. Randevu: ☎ 0532 649 91 46. Profesyonel psikolojik destek.',
  keywords: ['Antalya psikolog', 'psikolog Antalya', 'Antalya en iyi psikolog', 'psikolog emine yıldırım', 'Antalya psikolojik danışman', 'terapi Antalya', 'psikolojik destek Antalya'],
  openGraph: {
    title: 'Antalya Psikolog | Psikolog Emine Yıldırım | En İyi Psikolojik Danışmanlık',
    description: 'Antalya\'nın en iyi psikoloğu. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online danışmanlık. Randevu: ☎ 0532 649 91 46',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
}

export default async function Home() {
  const settings = await getHomepageSettings()
  
  // Debug: Video URL'ini kontrol et
  console.log('Homepage Settings:', {
    heroVideoUrl: settings.heroVideoUrl,
    hasVideoUrl: !!settings.heroVideoUrl,
  })

  return (
    <div>
      <HeroBanner
        videoUrl={settings.heroVideoUrl || undefined}
        subHeading={settings.heroSubHeading || undefined}
        mainHeading={settings.heroMainHeading || undefined}
        description={settings.heroDescription || undefined}
        button1Text={settings.heroButton1Text || undefined}
        button1Link={settings.heroButton1Link || undefined}
        button2Text={settings.heroButton2Text || undefined}
        button2Link={settings.heroButton2Link || undefined}
      />
      <AboutProfile />
      <CounselingServices
        videoUrl={settings.counselingVideoUrl || undefined}
        videoPoster={settings.counselingVideoPoster || undefined}
      />
      <SupportSection videoUrl={settings.supportSectionVideoUrl || undefined} />
      <BlogSection />
      <InstagramReelsServer />
      <Quote
        quote={settings.quoteText || undefined}
        author={settings.quoteAuthor || undefined}
      />
      <Testimonials />
      <ContactForm />
    </div>
  )
}

