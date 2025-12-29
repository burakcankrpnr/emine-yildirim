import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function GET() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Tek bir settings kaydı kullan (yoksa oluştur)
    let settings = await prisma.homepageSettings.findFirst()

    if (!settings) {
      settings = await prisma.homepageSettings.create({
        data: {},
      })
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    console.error('Ayarlar getirme hatası:', error)
    return NextResponse.json(
      { error: 'Ayarlar getirilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    // undefined değerleri null'a çevir (Prisma undefined'ı görmezden gelir, null ise alanı temizler)
    const data: any = {
      heroSubHeading: body.heroSubHeading !== undefined ? body.heroSubHeading : null,
      heroMainHeading: body.heroMainHeading !== undefined ? body.heroMainHeading : null,
      heroDescription: body.heroDescription !== undefined ? body.heroDescription : null,
      heroButton1Text: body.heroButton1Text !== undefined ? body.heroButton1Text : null,
      heroButton1Link: body.heroButton1Link !== undefined ? body.heroButton1Link : null,
      heroButton2Text: body.heroButton2Text !== undefined ? body.heroButton2Text : null,
      heroButton2Link: body.heroButton2Link !== undefined ? body.heroButton2Link : null,
      heroVideoUrl: body.heroVideoUrl !== undefined ? body.heroVideoUrl : null,
      leftBoxTitle: body.leftBoxTitle !== undefined ? body.leftBoxTitle : null,
      leftBoxDescription: body.leftBoxDescription !== undefined ? body.leftBoxDescription : null,
      leftBoxExpertiseTitle: body.leftBoxExpertiseTitle !== undefined ? body.leftBoxExpertiseTitle : null,
      rightBoxTitle: body.rightBoxTitle !== undefined ? body.rightBoxTitle : null,
      rightBoxDescription: body.rightBoxDescription !== undefined ? body.rightBoxDescription : null,
      quoteText: body.quoteText !== undefined ? body.quoteText : null,
      quoteAuthor: body.quoteAuthor !== undefined ? body.quoteAuthor : null,
      supportSectionVideoUrl: body.supportSectionVideoUrl !== undefined ? body.supportSectionVideoUrl : null,
      counselingVideoUrl: body.counselingVideoUrl !== undefined ? body.counselingVideoUrl : null,
      counselingVideoPoster: body.counselingVideoPoster !== undefined ? body.counselingVideoPoster : null,
    }

    // Tek bir settings kaydı kullan (yoksa oluştur)
    let settings = await prisma.homepageSettings.findFirst()

    if (settings) {
      settings = await prisma.homepageSettings.update({
        where: { id: settings.id },
        data,
      })
    } else {
      settings = await prisma.homepageSettings.create({
        data,
      })
    }

    return NextResponse.json(settings, { status: 200 })
  } catch (error) {
    console.error('Ayarlar kaydetme hatası:', error)
    return NextResponse.json(
      { error: 'Ayarlar kaydedilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}

