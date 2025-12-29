import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { FaHome } from 'react-icons/fa'
import HomepageForm from './HomepageForm'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export default async function AdminHomepage() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  // Veritabanından ayarları çek
  let settings
  try {
    settings = await prisma.homepageSettings.findFirst()

    if (!settings) {
      settings = await prisma.homepageSettings.create({
        data: {},
      })
    }
  } catch (error) {
    console.error('HomepageSettings hatası:', error)
    // Eğer model henüz oluşturulmamışsa, boş bir obje döndür
    settings = {
      id: '',
      heroSubHeading: null,
      heroMainHeading: null,
      heroDescription: null,
      heroButton1Text: null,
      heroButton1Link: null,
      heroButton2Text: null,
      heroButton2Link: null,
      heroVideoUrl: null,
      leftBoxTitle: null,
      leftBoxDescription: null,
      leftBoxExpertiseTitle: null,
      rightBoxTitle: null,
      rightBoxDescription: null,
      quoteText: null,
      quoteAuthor: null,
      supportSectionVideoUrl: null,
      counselingVideoUrl: null,
      counselingVideoPoster: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  }

  return (
    <div className="min-h-screen bg-primary-lighter py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] mb-4 md:mb-6 transition"
        >
          <span>←</span>
          <span>Geri Dön</span>
        </Link>

        <HomepageForm
          initialHeroSettings={{
            subHeading: settings.heroSubHeading || undefined,
            mainHeading: settings.heroMainHeading || undefined,
            description: settings.heroDescription || undefined,
            button1Text: settings.heroButton1Text || undefined,
            button1Link: settings.heroButton1Link || undefined,
            button2Text: settings.heroButton2Text || undefined,
            button2Link: settings.heroButton2Link || undefined,
            videoUrl: settings.heroVideoUrl || undefined,
          }}
          initialBoxSettings={{
            leftBoxTitle: settings.leftBoxTitle || undefined,
            leftBoxDescription: settings.leftBoxDescription || undefined,
            leftBoxExpertiseTitle: settings.leftBoxExpertiseTitle || undefined,
            rightBoxTitle: settings.rightBoxTitle || undefined,
            rightBoxDescription: settings.rightBoxDescription || undefined,
          }}
          initialQuoteSettings={{
            quote: settings.quoteText || undefined,
            author: settings.quoteAuthor || undefined,
          }}
          initialVideoSettings={{
            heroVideoUrl: settings.heroVideoUrl || undefined,
            supportSectionVideoUrl: settings.supportSectionVideoUrl || undefined,
            counselingVideoUrl: settings.counselingVideoUrl || undefined,
            counselingVideoPoster: settings.counselingVideoPoster || undefined,
          }}
        />
      </div>
    </div>
  )
}

