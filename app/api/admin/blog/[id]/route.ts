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
    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: { author: true },
    })

    if (!post) {
      return NextResponse.json({ error: 'Blog yazısı bulunamadı' }, { status: 404 })
    }

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error('Blog yazısı getirme hatası:', error)
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
    const { title, content, excerpt, image, published } = body

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        content,
        excerpt: excerpt || null,
        image: image || null,
        published: published || false,
      },
    })

    return NextResponse.json(post, { status: 200 })
  } catch (error) {
    console.error('Blog yazısı güncelleme hatası:', error)
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
    await prisma.blogPost.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Blog yazısı silme hatası:', error)
    return NextResponse.json(
      { error: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}







