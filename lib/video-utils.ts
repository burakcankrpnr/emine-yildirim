/**
 * Video URL utility fonksiyonları - Client-side safe
 * Cloudinary SDK'sını kullanmadan sadece URL manipülasyonu yapar
 */

/**
 * Cloudinary video URL'sinden public ID'yi çıkarır
 */
function extractPublicIdFromUrl(url: string): string | null {
  try {
    if (!url || !url.includes('cloudinary.com')) {
      return null
    }

    // Cloudinary URL formatları:
    // https://res.cloudinary.com/{cloud_name}/video/upload/{transformations}/{version}/{public_id}.{format}
    // https://res.cloudinary.com/{cloud_name}/video/upload/v{version}/{public_id}.{format}
    // https://res.cloudinary.com/{cloud_name}/video/upload/{public_id}.{format}

    // Önce /upload/ sonrasını al
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex === -1) {
      return null
    }

    const afterUpload = url.substring(uploadIndex + '/upload/'.length)
    
    // Version numarasını ve transformation'ları temizle
    // v{number}/ veya transformation'ları kaldır
    let publicId = afterUpload
    
    // Version numarasını kaldır (v1234567890/)
    publicId = publicId.replace(/^v\d+\//, '')
    
    // Transformation'ları kaldır (q_auto,f_auto,w_1920/ gibi)
    // Transformation'lar genellikle / ile bitiyor
    if (publicId.includes('/')) {
      const parts = publicId.split('/')
      // Son kısım public ID olmalı
      publicId = parts[parts.length - 1]
    }
    
    // Format uzantısını kaldır (.mp4, .webm, vb.)
    publicId = publicId.replace(/\.[^.]+$/, '')
    
    return publicId || null
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
    if (!url || !url.includes('cloudinary.com')) {
      return null
    }

    // /upload/ öncesini al
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex === -1) {
      return null
    }

    const base = url.substring(0, uploadIndex)
    return base + '/upload'
  } catch (error) {
    console.error('Base URL çıkarma hatası:', error)
    return null
  }
}

/**
 * Mobil cihazlar için optimize edilmiş video URL'leri oluşturur
 * @param url - Cloudinary video URL'si veya normal video URL'si
 * @returns Farklı çözünürlükler için source objeleri dizisi
 */
export function getOptimizedVideoSources(url: string): Array<{
  src: string
  type: string
  media?: string
}> {
  // Eğer URL yoksa veya Cloudinary URL'si değilse, direkt döndür
  if (!url) {
    return []
  }

  if (!url.includes('cloudinary.com')) {
    // Normal video URL'si - direkt kullan
    return [{ src: url, type: 'video/mp4' }]
  }

  const baseUrl = getBaseUrl(url)
  const publicId = extractPublicIdFromUrl(url)

  // Eğer parse edilemediyse, orijinal URL'i kullan
  if (!baseUrl || !publicId) {
    console.warn('Cloudinary URL parse edilemedi, orijinal URL kullanılıyor:', url)
    return [{ src: url, type: 'video/mp4' }]
  }

  // Farklı çözünürlükler için source'lar
  // q_auto: otomatik kalite optimizasyonu
  // f_auto: otomatik format seçimi (webm, mp4)
  // w_*: genişlik (mobil için daha küçük)
  // c_fill: crop fill
  // g_auto: otomatik gravity (merkez)
  // h_*: yükseklik (aspect ratio korumak için)
  
  return [
    // Desktop - yüksek çözünürlük
    {
      src: `${baseUrl}/q_auto,f_auto,w_1920,h_1080,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 1024px)',
    },
    // Tablet
    {
      src: `${baseUrl}/q_auto,f_auto,w_1280,h_720,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 768px) and (max-width: 1023px)',
    },
    // Mobil - küçük dosya boyutu
    {
      src: `${baseUrl}/q_auto:low,f_auto,w_768,h_432,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(max-width: 767px)',
    },
    // Fallback - en küçük versiyon (her cihaz için)
    {
      src: `${baseUrl}/q_auto:low,f_auto,w_480,h_270,c_fill,g_auto/${publicId}.mp4`,
      type: 'video/mp4',
    },
  ]
}

