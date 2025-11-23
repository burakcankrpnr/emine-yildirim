import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Veritabanına kaydet
    const contactMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    })

    // Email gönder
    try {
      await sendEmail({
        to: process.env.SMTP_TO || 'emine@example.com',
        subject: `Yeni İletişim Formu: ${subject}`,
        html: `
          <h2>Yeni İletişim Formu Mesajı</h2>
          <p><strong>Ad:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message}</p>
        `,
      })
    } catch (emailError) {
      console.error('Email gönderme hatası:', emailError)
      // Email hatası olsa bile mesaj kaydedildi, devam et
    }

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('İletişim formu hatası:', error)
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

