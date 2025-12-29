/**
 * Video URL utility fonksiyonları - Client-side safe
 * Cloudinary SDK'sını kullanmadan sadece URL manipülasyonu yapar
 */

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

