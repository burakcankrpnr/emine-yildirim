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
    // Örnek: https://res.cloudinary.com/dyn0dtehh/video/upload/v1767013995/emine-yildirim/videos/k9bjgt4bhdbumy1i5eud.mp4

    // Basit ve güvenilir yöntem: /upload/ sonrasını al
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex !== -1) {
      let afterUpload = url.substring(uploadIndex + '/upload/'.length)
      
      // Version numarasını kaldır (v1234567890/)
      afterUpload = afterUpload.replace(/^v\d+\//, '')
      
      // Transformation'ları kontrol et ve kaldır (eğer varsa)
      // Transformation pattern: q_auto,f_auto,w_1920/ gibi (virgül veya sayısal değerler içerir)
      // Folder yapısı transformation değildir (emine-yildirim/videos/ gibi)
      // Transformation genellikle w_, h_, q_, f_, c_, g_ gibi prefix'ler içerir
      if (afterUpload.match(/^(q_|f_|w_|h_|c_|g_|dpr_)/)) {
        // Transformation varsa, ilk /'a kadar olan kısmı kaldır
        afterUpload = afterUpload.replace(/^[^/]+\//, '')
      }
      
      // Format uzantısını kaldır
      const publicId = afterUpload.replace(/\.[^.]+$/, '')
      
      console.log('Extracted Public ID:', publicId, 'from URL:', url)
      
      return publicId || null
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
    if (!url || !url.includes('cloudinary.com')) {
      return null
    }

    // Cloudinary URL formatı: https://res.cloudinary.com/{cloud_name}/video/upload/...
    // /upload/ öncesini al ve /video/upload ekle
    const uploadIndex = url.indexOf('/upload/')
    if (uploadIndex === -1) {
      return null
    }

    // /upload/ öncesini al (https://res.cloudinary.com/dyn0dtehh/video)
    const base = url.substring(0, uploadIndex)
    // Base URL: https://res.cloudinary.com/dyn0dtehh/video/upload
    const baseUrl = base + '/upload'
    
    console.log('getBaseUrl:', { url, base, baseUrl })
    
    return baseUrl
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

  console.log('getOptimizedVideoSources Debug:', {
    url,
    baseUrl,
    publicId,
    hasBaseUrl: !!baseUrl,
    hasPublicId: !!publicId,
  })

  // Eğer parse edilemediyse, orijinal URL'i kullan
  if (!baseUrl || !publicId) {
    console.warn('Cloudinary URL parse edilemedi, orijinal URL kullanılıyor:', {
      url,
      baseUrl,
      publicId,
    })
    return [{ src: url, type: 'video/mp4' }]
  }

  // Farklı çözünürlükler için source'lar - responsive ve mobil optimizasyonlu
  // q_auto: otomatik kalite optimizasyonu
  // f_auto: otomatik format seçimi (webm, mp4)
  // w_*: genişlik (mobil için daha küçük)
  // c_fill: crop fill (aspect ratio korur)
  // g_auto: otomatik gravity (merkez)
  // h_*: yükseklik (aspect ratio korumak için)
  // dpr_auto: device pixel ratio için otomatik optimizasyon
  
  // Video için transformation'lar - daha basit ve güvenilir
  // Video için c_fill ve g_auto kullanmayalım, sadece boyut ve kalite ayarları yapalım
  return [
    // Desktop - yüksek çözünürlük (1920x1080)
    {
      src: `${baseUrl}/q_auto,f_auto,w_1920,h_1080/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 1024px)',
    },
    // Tablet - orta çözünürlük (1280x720)
    {
      src: `${baseUrl}/q_auto,f_auto,w_1280,h_720/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 768px) and (max-width: 1023px)',
    },
    // Mobil - küçük dosya boyutu (640x360) - daha hızlı yükleme
    {
      src: `${baseUrl}/q_auto:low,f_auto,w_640,h_360/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(min-width: 481px) and (max-width: 767px)',
    },
    // Küçük mobil cihazlar - en küçük versiyon (480x270) - çok hızlı yükleme
    {
      src: `${baseUrl}/q_auto:low,f_auto,w_480,h_270/${publicId}.mp4`,
      type: 'video/mp4',
      media: '(max-width: 480px)',
    },
    // Fallback - orijinal video (her cihaz için, özellikle eski tarayıcılar)
    {
      src: url, // Orijinal URL'i fallback olarak kullan
      type: 'video/mp4',
    },
  ]
}

