import HeroBanner from '@/components/HeroBanner'
import AboutProfile from '@/components/AboutProfile'
import Services from '@/components/Services'
import SupportSection from '@/components/SupportSection'
import EducationSection from '@/components/EducationSection'
import Quote from '@/components/Quote'
import BlogSection from '@/components/BlogSection'
import Testimonials from '@/components/Testimonials'
import ContactForm from '@/components/ContactForm'
import Counter from '@/components/Counter'
import CounselingServices from '@/components/CounselingServices'
import InstagramReelsServer from '@/components/InstagramReelsServer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Antalya Psikolog - Psikolog Emine Yıldırım',
  description: 'Antalya\'da profesyonel psikolojik destek hizmetleri.  Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
  openGraph: {
    title: 'Antalya Psikolog - Psikolog Emine Yıldırım',
    description: 'Antalya\'da profesyonel psikolojik destek hizmetleri.  Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <AboutProfile />
      <Counter />
      <CounselingServices />
      <SupportSection />
      <BlogSection />
      <InstagramReelsServer />
      <Quote />
      <Testimonials />
      <ContactForm />
    </div>
  )
}

