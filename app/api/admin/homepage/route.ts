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

    // Tek bir settings kaydı kullan (yoksa oluştur)
    let settings = await prisma.homepageSettings.findFirst()

    if (settings) {
      settings = await prisma.homepageSettings.update({
        where: { id: settings.id },
        data: {
          heroSubHeading: body.heroSubHeading,
          heroMainHeading: body.heroMainHeading,
          heroDescription: body.heroDescription,
          heroButton1Text: body.heroButton1Text,
          heroButton1Link: body.heroButton1Link,
          heroButton2Text: body.heroButton2Text,
          heroButton2Link: body.heroButton2Link,
          heroVideoUrl: body.heroVideoUrl,
          leftBoxTitle: body.leftBoxTitle,
          leftBoxDescription: body.leftBoxDescription,
          leftBoxExpertiseTitle: body.leftBoxExpertiseTitle,
          rightBoxTitle: body.rightBoxTitle,
          rightBoxDescription: body.rightBoxDescription,
          quoteText: body.quoteText,
          quoteAuthor: body.quoteAuthor,
          supportSectionVideoUrl: body.supportSectionVideoUrl,
          counselingVideoUrl: body.counselingVideoUrl,
          counselingVideoPoster: body.counselingVideoPoster,
        },
      })
    } else {
      settings = await prisma.homepageSettings.create({
        data: {
          heroSubHeading: body.heroSubHeading,
          heroMainHeading: body.heroMainHeading,
          heroDescription: body.heroDescription,
          heroButton1Text: body.heroButton1Text,
          heroButton1Link: body.heroButton1Link,
          heroButton2Text: body.heroButton2Text,
          heroButton2Link: body.heroButton2Link,
          heroVideoUrl: body.heroVideoUrl,
          leftBoxTitle: body.leftBoxTitle,
          leftBoxDescription: body.leftBoxDescription,
          leftBoxExpertiseTitle: body.leftBoxExpertiseTitle,
          rightBoxTitle: body.rightBoxTitle,
          rightBoxDescription: body.rightBoxDescription,
          quoteText: body.quoteText,
          quoteAuthor: body.quoteAuthor,
          supportSectionVideoUrl: body.supportSectionVideoUrl,
          counselingVideoUrl: body.counselingVideoUrl,
          counselingVideoPoster: body.counselingVideoPoster,
        },
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

