import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    const reel = await prisma.instagramReel.findUnique({
      where: { id },
    })

    if (!reel) {
      return NextResponse.json({ error: 'Reel bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(reel, { status: 200 })
  } catch (error) {
    console.error('Reel getirme hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    const body = await request.json()
    const { url, title, order, active } = body

    if (!url) {
      return NextResponse.json({ error: 'URL gereklidir' }, { status: 400 })
    }

    const reel = await prisma.instagramReel.update({
      where: { id },
      data: {
        url,
        title: title || null,
        order: order || 0,
        active: active !== undefined ? active : true,
      },
    })

    return NextResponse.json(reel, { status: 200 })
  } catch (error) {
    console.error('Reel güncelleme hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = params
    await prisma.instagramReel.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Reel silme hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}







