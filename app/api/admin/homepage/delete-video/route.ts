import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { deleteFromCloudinary } from '@/lib/cloudinary'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

// URL'den Cloudinary public ID'yi çıkar
function extractPublicIdFromUrl(url: string): string | null {
  try {
    // Cloudinary URL formatı: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/{transformations}/{version}/{public_id}.{format}
    // veya: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
    
    // Eğer URL Cloudinary URL'si değilse (local dosya gibi), null döndür
    if (!url.includes('cloudinary.com')) {
      return null
    }

    // URL'den public ID'yi çıkar
    const match = url.match(/\/upload\/[^\/]+\/(.+?)(?:\.[^.]+)?$/)
    if (match) {
      // Version numarasını ve format uzantısını kaldır
      let publicId = match[1]
      // Eğer başında v{number}/ varsa onu kaldır
      publicId = publicId.replace(/^v\d+\//, '')
      // Format uzantısını kaldır
      publicId = publicId.replace(/\.[^.]+$/, '')
      return publicId
    }

    // Alternatif format: /upload/v{version}/{public_id}
    const altMatch = url.match(/\/upload\/v\d+\/(.+?)(?:\.[^.]+)?$/)
    if (altMatch) {
      let publicId = altMatch[1]
      publicId = publicId.replace(/\.[^.]+$/, '')
      return publicId
    }

    return null
  } catch (error) {
    console.error('Public ID çıkarma hatası:', error)
    return null
  }
}

export async function DELETE(request: NextRequest) {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const resourceType = searchParams.get('resourceType') || 'video' // 'video' veya 'image'

    if (!url) {
      return NextResponse.json({ error: 'URL parametresi gerekli' }, { status: 400 })
    }

    // URL'den public ID'yi çıkar
    const publicId = extractPublicIdFromUrl(url)

    if (!publicId) {
      // Eğer Cloudinary URL'si değilse (local dosya), sadece başarılı döndür
      return NextResponse.json({ 
        message: 'Local dosya, Cloudinary\'den silme gerekmiyor',
        skipped: true 
      }, { status: 200 })
    }

    // Cloudinary'den sil
    try {
      await deleteFromCloudinary(publicId, resourceType as 'image' | 'video' | 'raw')
      return NextResponse.json({ 
        message: resourceType === 'image' ? 'Görsel başarıyla silindi' : 'Video başarıyla silindi',
        publicId 
      }, { status: 200 })
    } catch (cloudinaryError: any) {
      console.error('Cloudinary silme hatası:', cloudinaryError)
      // Eğer dosya zaten silinmişse veya bulunamazsa, yine de başarılı döndür
      if (cloudinaryError?.message?.includes('not found') || 
          cloudinaryError?.http_code === 404) {
        return NextResponse.json({ 
          message: 'Dosya zaten silinmiş veya bulunamadı',
          skipped: true 
        }, { status: 200 })
      }
      throw cloudinaryError
    }
  } catch (error: any) {
    console.error('Video silme hatası:', error)
    const errorMessage = error?.message || error?.error || 'Video silinirken bir hata oluştu'
    return NextResponse.json(
      { error: errorMessage, details: error?.stack },
      { status: 500 }
    )
  }
}

