import { v2 as cloudinary } from 'cloudinary'

// Cloudinary yapılandırması - lazy loading ile
let isConfigured = false

function configureCloudinary() {
  // Eğer zaten yapılandırılmışsa tekrar yapma
  if (isConfigured) {
    return
  }

  // Önce CLOUDINARY_URL'yi kontrol et
  if (process.env.CLOUDINARY_URL) {
    // CLOUDINARY_URL varsa SDK otomatik olarak kullanır, ama yine de config yapalım
    cloudinary.config({
      secure: true,
    })
    isConfigured = true
    return
  }

  // CLOUDINARY_URL yoksa ayrı değişkenleri kullan
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      'Cloudinary yapılandırması eksik! Lütfen .env dosyanıza şunları ekleyin:\n' +
      'CLOUDINARY_CLOUD_NAME="dyn0dtehh"\n' +
      'CLOUDINARY_API_KEY="232257585894853"\n' +
      'CLOUDINARY_API_SECRET="1FeVxm3zJs9tR6YQpHZ6twHPFh8"\n' +
      'veya\n' +
      'CLOUDINARY_URL="cloudinary://232257585894853:1FeVxm3zJs9tR6YQpHZ6twHPFh8@dyn0dtehh"'
    )
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })
  
  isConfigured = true
}

export async function uploadToCloudinary(
  file: Buffer,
  folder: string = 'emine-yildirim',
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<{ url: string; publicId: string }> {
  // Config'i lazy loading ile yap - sadece kullanıldığında
  configureCloudinary()

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
        overwrite: true,
        invalidate: true,
      },
      (error, result) => {
        if (error) {
          // Daha açıklayıcı hata mesajı
          if (error.message?.includes('api key') || error.message?.includes('api_key')) {
            reject(new Error(
              'Cloudinary API key bulunamadı! Lütfen .env dosyanızı kontrol edin.\n' +
              'Gerekli değişkenler: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET'
            ))
          } else {
            reject(error)
          }
        } else if (result) {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          })
        } else {
          reject(new Error('Upload sonucu alınamadı'))
        }
      }
    )

    uploadStream.end(file)
  })
}

export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'video' | 'raw' = 'image'
): Promise<void> {
  // Config'i lazy loading ile yap - sadece kullanıldığında
  configureCloudinary()
  
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    })
  } catch (error) {
    console.error('Cloudinary silme hatası:', error)
    throw error
  }
}

/**
 * Cloudinary video URL'sinden public ID'yi çıkarır
 */
function extractPublicIdFromUrl(url: string): string | null {
  try {
    if (!url.includes('cloudinary.com')) {
      return null
    }

    // URL formatı: https://res.cloudinary.com/{cloud_name}/video/upload/{transformations}/{version}/{public_id}.{format}
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/)
    if (match) {
      let publicId = match[1]
      publicId = publicId.replace(/^v\d+\//, '')
      publicId = publicId.replace(/\.[^.]+$/, '')
      return publicId
    }

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

/**
 * Cloudinary video URL'sinden base URL'i çıkarır
 */
function getBaseUrl(url: string): string | null {
  try {
    if (!url.includes('cloudinary.com')) {
      return null
    }

    const parts = url.split('/upload/')
    if (parts.length === 2) {
      return parts[0] + '/upload'
    }
    return null
  } catch (error) {
    console.error('Base URL çıkarma hatası:', error)
    return null
  }
}

/**
 * Mobil cihazlar için optimize edilmiş video URL'leri oluşturur
 * @param url - Cloudinary video URL'si
 * @returns Farklı çözünürlükler için source objeleri dizisi
 */
export function getOptimizedVideoSources(url: string): Array<{
  src: string
  type: string
  media?: string
}> {
  // Eğer Cloudinary URL'si değilse, direkt döndür
  if (!url || !url.includes('cloudinary.com')) {
    return [{ src: url, type: 'video/mp4' }]
  }

  const baseUrl = getBaseUrl(url)
  const publicId = extractPublicIdFromUrl(url)

  if (!baseUrl || !publicId) {
    return [{ src: url, type: 'video/mp4' }]
  }

  // Farklı çözünürlükler için source'lar
  // q_auto: otomatik kalite
  // f_auto: otomatik format (webm, mp4)
  // w_*: genişlik
  // c_fill: crop fill
  // g_auto: otomatik gravity
  
  return [
    {
      src: `${baseUrl}/q_auto,f_auto,w_1920,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 1024px)',
    },
    {
      src: `${baseUrl}/q_auto,f_auto,w_1280,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 768px)',
    },
    {
      src: `${baseUrl}/q_auto,f_auto,w_768,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(max-width: 767px)',
    },
    // Fallback - en küçük versiyon
    {
      src: `${baseUrl}/q_auto,f_auto,w_480,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
    },
  ]
}

export { cloudinary }

