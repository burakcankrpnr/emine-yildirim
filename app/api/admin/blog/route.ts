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
    const { title, content, excerpt, image, published } = body

    // İlk kullanıcıyı al (admin)
    const user = await prisma.user.findFirst()

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const post = await prisma.blogPost.create({
      data: {
        title,
        content,
        excerpt: excerpt || null,
        image: image || null,
        published: published || false,
        authorId: user.id,
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Blog oluşturma hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

