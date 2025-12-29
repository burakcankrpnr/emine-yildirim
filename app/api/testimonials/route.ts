import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, comment } = body

    // Veritabanına kaydet
    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        email,
        comment: comment || null,
        approved: false, // Admin onayı bekliyor
      },
    })

    return NextResponse.json(
      { success: true, message: 'Yorumunuz başarıyla gönderildi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Yorum gönderme hatası:', error)
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

