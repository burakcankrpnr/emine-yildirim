import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { sendEmail } from '@/lib/email'

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
    const { to, subject, message } = body

    if (!to || !subject || !message) {
      return NextResponse.json(
        { error: 'Alıcı, konu ve mesaj alanları zorunludur' },
        { status: 400 }
      )
    }

    // Email gönder
    await sendEmail({
      to,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #764e45; border-bottom: 2px solid #764e45; padding-bottom: 10px;">
            ${subject}
          </h2>
          <div style="margin-top: 20px; line-height: 1.6; color: #333;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Bu email, Emine Yıldırım Psikolog web sitesi üzerinden gönderilmiştir.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { success: true, message: 'Email başarıyla gönderildi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email gönderme hatası:', error)
    return NextResponse.json(
      { error: 'Email gönderilirken bir hata oluştu' },
      { status: 500 }
    )
  }
}









