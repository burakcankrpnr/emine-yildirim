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

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 })
    }

    // Dosya tipini kontrol et
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Sadece resim dosyaları yüklenebilir' }, { status: 400 })
    }

    // Dosya boyutunu kontrol et (10MB - Cloudinary limiti daha yüksek)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 10MB\'dan büyük olamaz' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Cloudinary'ye yükle
    const { url } = await uploadToCloudinary(buffer, 'emine-yildirim/blog', 'image')

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}









