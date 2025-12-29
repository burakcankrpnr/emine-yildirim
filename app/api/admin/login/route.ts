import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: 'Email veya şifre hatalı' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json(
        { message: 'Email veya şifre hatalı' },
        { status: 401 }
      )
    }

    // Basit session (production'da NextAuth kullanılmalı)
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 gün
    })

    return response
  } catch (error) {
    console.error('Login hatası:', error)
    return NextResponse.json(
      { message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

