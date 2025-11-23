import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function POST(request: NextRequest) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { url, title, order, active } = body

    if (!url) {
      return NextResponse.json({ error: 'URL gereklidir' }, { status: 400 })
    }

    const reel = await prisma.instagramReel.create({
      data: {
        url,
        title: title || null,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    })

    return NextResponse.json(reel, { status: 201 })
  } catch (error) {
    console.error('Reel oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}







