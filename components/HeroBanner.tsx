'use client'

import Image from 'next/image'
import { FaWhatsapp, FaPhone } from 'react-icons/fa'
import { useEffect, useRef, useMemo, useState } from 'react'
import { getOptimizedVideoSources } from '@/lib/video-utils'

interface HeroBannerProps {
  videoUrl?: string
  subHeading?: string
  mainHeading?: string
  description?: string
  button1Text?: string
  button1Link?: string
  button2Text?: string
  button2Link?: string
}

export default function HeroBanner({
  videoUrl,
  subHeading = 'DEĞİŞİM, BİR ADIMLA BAŞLAR;',
  mainHeading = 'Birlikte güçlü adımlar atalım',
  description = 'Bazen küçük bir adım, büyük bir değişimin başlangıcıdır. Yolculuğunda güçlenmene ve netleşmene destek olmaya hazırım.',
  button1Text = 'Online Danışmanlıklar',
  button1Link = '/danismanliklar/online-danismanlik',
  button2Text = 'Hakkımda',
  button2Link = '/hakkimda',
}: HeroBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  // Cloudinary video URL'lerini optimize et - sadece Cloudinary URL'leri için
  const isCloudinaryUrl = videoUrl?.includes('cloudinary.com') || false
  const videoSources = useMemo(() => {
    if (!videoUrl) return []
    if (isCloudinaryUrl) {
      return getOptimizedVideoSources(videoUrl)
    }
    // Eğer Cloudinary değilse ama URL varsa, direkt kullan (fallback)
    return [{ src: videoUrl, type: 'video/mp4' }]
  }, [videoUrl, isCloudinaryUrl])

  // Debug için
  useEffect(() => {
    console.log('HeroBanner Props:', {
      videoUrl,
      hasVideoUrl: !!videoUrl,
      videoUrlLength: videoUrl?.length,
      isCloudinaryUrl,
      videoSourcesCount: videoSources.length,
      videoError,
    })
    if (videoUrl) {
      console.log('HeroBanner Video URL:', videoUrl)
      console.log('Is Cloudinary:', isCloudinaryUrl)
      console.log('Video Sources:', videoSources)
    } else {
      console.warn('HeroBanner: videoUrl yok!')
    }
  }, [videoUrl, isCloudinaryUrl, videoSources, videoError])

  // Video otomatik oynatma için - mobil optimizasyonlu
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoUrl) return

    // Mobil cihazlar için video ayarları - tüm platformlar için uyumlu
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', 'true')
    video.setAttribute('webkit-playsinline', 'true')
    video.setAttribute('x5-playsinline', 'true')
    // iOS için özel ayarlar
    video.setAttribute('webkit-playsinline', 'true')
    // Android için özel ayarlar
    video.setAttribute('x-webkit-airplay', 'allow')
    
    let isPlaying = false
    let playAttempted = false
    
    const playVideo = async () => {
      // Eğer zaten oynatılmaya çalışılıyorsa veya oynatılıyorsa, tekrar deneme
      if (isPlaying || playAttempted) {
        return
      }
      
      try {
        playAttempted = true
        
        // Video zaten oynatılıyorsa, tekrar oynatma
        if (!video.paused) {
          isPlaying = true
          playAttempted = false
          return
        }
        
        // Video hazır değilse bekle (load() çağırma - gereksiz yeniden yüklemeyi önle)
        if (video.readyState < 2) {
          await new Promise(resolve => setTimeout(resolve, 300))
        }
        
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          isPlaying = true
          playAttempted = false
        }
      } catch (error: any) {
        // AbortError'ı görmezden gel (video yüklenirken normal)
        if (error?.name !== 'AbortError') {
          console.log('Video otomatik oynatma engellendi:', error)
        }
        playAttempted = false
      }
    }
    
    // Video yükleme durumunu takip et - sadeleştirilmiş
    const handleCanPlay = () => {
      if (!isPlaying && !playAttempted) {
        playVideo()
      }
    }
    
    const handleError = (e: Event) => {
      console.error('Video yükleme hatası:', e)
      setVideoError(true)
    }

    const handleLoadedMetadata = () => {
      // Video metadata yüklendi
    }
    
    const handlePlaying = () => {
      isPlaying = true
      playAttempted = false
    }
    
    const handlePause = () => {
      isPlaying = false
    }

    // Sadece gerekli event listener'ları ekle
    video.addEventListener('canplay', handleCanPlay, { once: true })
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('error', handleError)
    video.addEventListener('playing', handlePlaying)
    video.addEventListener('pause', handlePause)

    // Eğer video zaten yüklenmişse hemen oynat
    if (video.readyState >= 3) {
      playVideo()
    }

    // Intersection Observer - video görünür olduğunda oynat
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isPlaying && !playAttempted) {
            playVideo()
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(video)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('error', handleError)
      video.removeEventListener('playing', handlePlaying)
      video.removeEventListener('pause', handlePause)
      observer.disconnect()
      isPlaying = false
      playAttempted = false
    }
  }, [videoUrl]) // Sadece videoUrl değiştiğinde çalışsın - videoSources'u kaldırdık

  // Video URL değiştiğinde state'leri sıfırla
  useEffect(() => {
    setVideoError(false)
  }, [videoUrl])

  // Metni kelimelerine ayırıp animasyonlu render eden fonksiyon - kelimeler bölünmez
  const renderAnimatedText = (text: string, baseDelay: number = 0, delayPerChar: number = 30) => {
    let globalCharIndex = 0
    const words = text.split(' ')
    
    return words.map((word, wordIndex) => {
      const wordChars = word.split('').map((char, localCharIndex) => {
        const delay = baseDelay + globalCharIndex * delayPerChar
        globalCharIndex++
        return (
          <span
            key={`${wordIndex}-${localCharIndex}`}
            className="inline-block animate-char-fade-in"
            style={{
              animationDelay: `${delay}ms`,
            }}
          >
            {char}
          </span>
        )
      })
      
      globalCharIndex++ // Boşluk için
      
      return (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {wordChars}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      )
    })
  }

  return (
    <>
      <section className="relative w-full h-screen min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] overflow-hidden">
        {/* Arka plan video - videoUrl varsa göster */}
        {videoUrl && videoUrl.trim() !== '' && !videoError && (
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            <video
              key={videoUrl} // videoUrl değiştiğinde video elementini yeniden oluştur
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              // Cloudinary URL'leri için src attribute'u kullanma, sadece <source> tag'leri kullan
              // Local dosyalar için direkt src kullan
              {...(isCloudinaryUrl ? {} : { src: videoUrl })}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              webkit-playsinline="true"
              x5-playsinline="true"
              style={{
                objectPosition: 'center center',
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
              }}
              onLoadedData={() => {
                console.log('Video onLoadedData')
              }}
              onCanPlay={() => {
                console.log('Video onCanPlay')
              }}
              onError={(e) => {
                console.error('Video onError:', e)
                setVideoError(true)
              }}
            >
              {/* Cloudinary URL'leri için responsive source'lar - mobil, tablet, desktop için optimize edilmiş */}
              {isCloudinaryUrl && videoSources.length > 0 && (
                videoSources.map((source, index) => (
                  <source
                    key={`source-${index}`}
                    src={source.src}
                    type={source.type}
                    media={source.media}
                  />
                ))
              )}
              {/* Local dosyalar için fallback (eğer Cloudinary değilse) */}
              {!isCloudinaryUrl && videoUrl && (
                <source key="local-source" src={videoUrl} type="video/mp4" />
              )}
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
            <div className="absolute inset-0 bg-black/20 md:bg-black/10" />
          </div>
        )}
        {/* Video hata durumunda veya video yoksa arka plan rengi */}
        {(!videoUrl || videoUrl.trim() === '' || videoError) && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#764e45] via-[#8b6b5f] to-[#5a3a33]">
            {/* Development modunda video yoksa uyarı göster */}
            {process.env.NODE_ENV === 'development' && !videoUrl && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm z-20">
                ⚠️ Video URL bulunamadı! Admin panelinden video yükleyin.
              </div>
            )}
          </div>
        )}
        {/* Video yoksa arka plan rengi */}
        {!videoUrl && (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#764e45] via-[#8b6b5f] to-[#5a3a33]" />
        )}

        {/* İçerik */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-4xl mx-auto">
              {/* Sol taraf - Metin ve Butonlar */}
              <div className="text-left space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
                {/* Küçük başlık */}
                <p className="sub-heading single text-xs sm:text-sm md:text-base lg:text-lg text-white font-bold tracking-wide uppercase">
                  {renderAnimatedText(subHeading, 0, 30)}
                </p>

                {/* Ana başlık */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
                  {renderAnimatedText(mainHeading, 300, 40)}
                </h1>

                {/* Paragraf */}
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-relaxed md:leading-relaxed lg:leading-loose max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
                  {renderAnimatedText(description, 800, 15)}
                </p>

                {/* Butonlar */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-3 md:gap-4 lg:gap-5 pt-2 sm:pt-3 md:pt-4 lg:pt-6 animate-fade-in-up animation-delay-600">
                  <a
                    href={button1Link}
                    className="w-full sm:w-auto text-center px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition-all duration-300 font-semibold text-sm sm:text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {button1Text}
                  </a>
                  <a
                    href={button2Link}
                    className="w-full sm:w-auto text-center px-5 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 bg-white text-[#764e45] rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold text-sm sm:text-sm md:text-base lg:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {button2Text}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Alt İçerik Kutuları - HeroBanner'ın altında, slider'ın üstüne gelecek */}
      <div className="relative -mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 z-[5] px-4 md:pb-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-7xl mx-auto">
            {/* Sol Kutu - Beyaz - İki Sütun */}
            <div className="bg-white rounded-lg p-5 md:p-6 lg:p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Sol Sütun - Açıklama */}
                <div>
                  <h2 className="text-base md:text-lg lg:text-xl font-bold text-gray-800 mb-2 md:mb-3">
                    Güçlü bir yarın için; Bugün Başla.
                  </h2>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3 md:mb-4">
                    Sizlerin zihinsel ve duygusal dengelerinizi desteklemek, günlük yaşamın zorluklarıyla başa çıkmanızı kolaylaştırmak ve kendinizi daha derin bir anlayışla keşfetmenize yardımcı olmak için buradayız. Antalya&apos;daki ofisimizde ve online danışmanlık hizmetimizle her zaman yanınızdayız.
                  </p>
                </div>

                {/* Sağ Sütun - Uzmanlık Alanları */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">
                    Uzmanlık Alanlarımız;
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    {[
                      'Yetişkin Psikolojisi',
                      'Aile ve Çift Psikolojisi',
                      'Çocuk ve Ergen Psikolojisi',
                      'Ebeveyn Danışmanlığı',
                      'Online Psikolojik Danışmanlık'
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <span className="text-[#764e45] mt-0.5 md:mt-1 flex-shrink-0">
                          <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-sm md:text-base text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sağ Kutu - Kahverengi */}
            <div className="bg-[#764e45] rounded-lg p-5 md:p-6 lg:p-8 shadow-lg">
              <h2 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">
                Size Yakınız, Bize Yazın
              </h2>
              <p className="text-sm md:text-base text-white/90 leading-relaxed mb-4 md:mb-6">
                Sorularınız, önerileriniz veya talepleriniz için buradayız. Size yardımcı olmaktan mutluluk duyarız! ☆
              </p>
              
              {/* WhatsApp Bölümü */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8b6b5f] flex items-center justify-center flex-shrink-0">
                    <FaWhatsapp className="text-white text-lg md:text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">
                      WHATSAPP DANIŞMA HATTI
                    </p>
                    <a 
                      href="https://wa.me/+905326499146" 
                      className="text-white text-lg md:text-xl font-bold hover:underline block"
                    >
                      +90 532 649 91 46
                    </a>
                  </div>
                </div>
              </div>

              {/* İletişim Bölümü */}
              <div>
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8b6b5f] flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-white text-lg md:text-xl" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-xs md:text-sm uppercase tracking-wide mb-1 md:mb-2">
                      İLETİŞİM DANIŞMA HATTI
                    </p>
                    <a 
                      href="tel:+905326499146" 
                      className="text-white text-lg md:text-xl font-bold hover:underline block"
                    >
                      +90 532 649 91 46
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
