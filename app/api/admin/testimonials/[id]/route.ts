import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { id } = params
    const body = await request.json()
    const { approved } = body

    await prisma.testimonial.update({
      where: { id },
      data: { approved },
    })

    return NextResponse.json(
      { success: true, message: approved ? 'Yorum onaylandı' : 'Yorum reddedildi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Yorum güncelleme hatası:', error)
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
      return NextResponse.json(
        { message: 'Yetkisiz erişim' },
        { status: 401 }
      )
    }

    const { id } = params

    await prisma.testimonial.delete({
      where: { id },
    })

    return NextResponse.json(
      { success: true, message: 'Yorum başarıyla silindi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Yorum silme hatası:', error)
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

