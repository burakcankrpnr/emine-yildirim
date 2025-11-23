import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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

    // Dosya boyutunu kontrol et (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'dan büyük olamaz' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Uploads klasörünü oluştur
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'blog')
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true })
    }

    // Dosya adını oluştur
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
    const filepath = join(uploadsDir, filename)

    // Dosyayı kaydet
    await writeFile(filepath, buffer)

    // Public URL'ini döndür
    const url = `/uploads/blog/${filename}`

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error('Dosya yükleme hatası:', error)
    return NextResponse.json(
      { error: 'Dosya yüklenirken bir hata oluştu' },
      { status: 500 }
    )
  }
}







