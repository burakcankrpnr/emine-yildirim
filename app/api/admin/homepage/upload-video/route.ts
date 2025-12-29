import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { uploadToCloudinary } from '@/lib/cloudinary'

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
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string || 'emine-yildirim/videos'

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    // Dosya tipini kontrol et
    if (!file.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Sadece video dosyaları yüklenebilir' }, { status: 400 })
    }

    // Dosya boyutunu kontrol et (100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 100MB\'dan büyük olamaz' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Cloudinary'ye yükle
    try {
      const { url } = await uploadToCloudinary(buffer, folder, 'video')
      return NextResponse.json({ url }, { status: 200 })
    } catch (cloudinaryError: any) {
      console.error('Cloudinary upload hatası:', cloudinaryError)
      throw new Error(
        cloudinaryError?.message || 
        cloudinaryError?.error?.message || 
        'Cloudinary yükleme hatası'
      )
    }
  } catch (error: any) {
    console.error('Video yükleme hatası:', error)
    const errorMessage = error?.message || error?.error || 'Video yüklenirken bir hata oluştu'
    return NextResponse.json(
      { error: errorMessage, details: error?.stack },
      { status: 500 }
    )
  }
}

