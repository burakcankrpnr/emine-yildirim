import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topicId, content } = body

    // TODO: Kullanıcı kimlik doğrulaması ekle
    // Şimdilik ilk kullanıcıyı alıyoruz
    const user = await prisma.user.findFirst()

    if (!user) {
      return NextResponse.json(
        { error: 'Kullanıcı bulunamadı' },
        { status: 401 }
      )
    }

    const reply = await prisma.forumReply.create({
      data: {
        topicId,
        content,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    })

    return NextResponse.json(reply, { status: 201 })
  } catch (error) {
    console.error('Forum yanıt hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

