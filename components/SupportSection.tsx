'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

export default function SupportSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [ailePercent, setAilePercent] = useState(0)
  const [evlilikPercent, setEvlilikPercent] = useState(0)
  const [gunlukPercent, setGunlukPercent] = useState(0)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const animatePercentages = useCallback(() => {
    const duration = 2000 // 2 saniye
    const steps = 60
    const interval = duration / steps

    const targets = { aile: 65, evlilik: 95, gunluk: 82 }
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)

      setAilePercent(Math.round(targets.aile * easeOut))
      setEvlilikPercent(Math.round(targets.evlilik * easeOut))
      setGunlukPercent(Math.round(targets.gunluk * easeOut))

      if (currentStep >= steps) {
        clearInterval(timer)
        setAilePercent(targets.aile)
        setEvlilikPercent(targets.evlilik)
        setGunlukPercent(targets.gunluk)
      }
    }, interval)
  }, [])

  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            animatePercentages()
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(currentRef)

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [isVisible, animatePercentages])

  const openVideoModal = useCallback(() => {
    setIsVideoModalOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeVideoModal = useCallback(() => {
    setIsVideoModalOpen(false)
    document.body.style.overflow = 'unset'
  }, [])

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  // ESC tuşu ile modal'ı kapat
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVideoModalOpen) {
        closeVideoModal()
      }
    }

    if (isVideoModalOpen) {
      window.addEventListener('keydown', handleEscape)
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isVideoModalOpen, closeVideoModal])

  return (
    <>
      <section ref={sectionRef} className="bg-white w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full">
          {/* Sol Taraf - Metin İçeriği */}
          <div 
            className="relative px-6 py-10 sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16 lg:py-20 xl:px-20 xl:py-24 flex flex-col justify-center min-h-[500px] sm:min-h-[600px] w-full"
            style={{
              backgroundImage: 'url(/bf-pattern-1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#151110'
            }}
          >
            <div className="relative z-10 max-w-2xl">
              {/* Header */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-6 sm:w-8 h-px bg-white"></div>
                <span className="text-xs sm:text-sm text-white font-sans uppercase tracking-wide">
                  KİMİN DESTEĞE İHTİYACI VAR?
                </span>
              </div>

              {/* Ana Başlık */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-serif text-white mb-4 sm:mb-6 leading-tight">
                Emine Yıldırım&apos;dan psikolojik desteğin faydaları.
              </h2>

              {/* Açıklama Paragrafı */}
              <p className="text-sm sm:text-base md:text-base text-white font-sans mb-6 sm:mb-8 leading-relaxed">
                Psikolojik destek, bireylerin duygusal zorluklarını anlamalarına ve başa çıkma becerileri 
                geliştirmelerine yardımcı olarak, hayat kalitelerini artırır. Aynı zamanda, kişinin kendini 
                keşfetmesini ve daha sağlıklı ilişkiler kurmasını destekleyen güvenli bir alan sunar.
              </p>

              {/* Alt Başlık */}
              <h3 className="text-lg sm:text-xl md:text-xl text-white font-sans mb-6 sm:mb-8">
                En çok desteğe ihtiyaç duyan gruplar
              </h3>

              {/* Progress Bar'lar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Aile İçi Psikolojisi */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm sm:text-base md:text-base text-white font-sans">Aile İçi Psikolojisi</span>
                    <span className="text-sm sm:text-base md:text-base text-white font-bold">{ailePercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-px relative">
                    <div 
                      className="bg-white h-px transition-all duration-300 ease-out"
                      style={{ width: `${ailePercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Evlilik ve Aşk Psikolojisi */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm sm:text-base md:text-base text-white font-sans">Evlilik ve Aşk Psikolojisi</span>
                    <span className="text-sm sm:text-base md:text-base text-white font-bold">{evlilikPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-px relative">
                    <div 
                      className="bg-white h-px transition-all duration-300 ease-out"
                      style={{ width: `${evlilikPercent}%` }}
                    ></div>
                  </div>
                </div>

                {/* Günlük Yaşam Psikolojisi */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm sm:text-base md:text-base text-white font-sans">Günlük Yaşam Psikolojisi</span>
                    <span className="text-sm sm:text-base md:text-base text-white font-bold">{gunlukPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-700 h-px relative">
                    <div 
                      className="bg-white h-px transition-all duration-300 ease-out"
                      style={{ width: `${gunlukPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Video Fragman */}
          <div className="relative w-full min-h-[500px] sm:min-h-[600px] bg-black cursor-pointer group overflow-hidden" onClick={openVideoModal}>
            {/* Arka Plan Video - Fragman gibi otomatik oynatılıyor */}
            <video
              ref={videoRef}
              src="/deneme.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Overlay ve Oynat Butonu */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-[#a47355] flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white">
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white ml-0.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95 p-2 sm:p-4 md:p-6"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full h-full max-w-7xl max-h-[95vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Kapat Butonu */}
            <button
              onClick={closeVideoModal}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full flex items-center justify-center text-white transition-all duration-300"
              aria-label="Videoyu Kapat"
            >
              <svg
                className="w-6 h-6 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {/* Video Player */}
            <video
              src="/deneme.mp4"
              controls
              autoPlay
              className="w-full h-full object-contain rounded-lg"
              style={{ maxHeight: '95vh' }}
            >
              Tarayıcınız video oynatmayı desteklemiyor.
            </video>
          </div>
        </div>
      )}
    </>
  )
}

