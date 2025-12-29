'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface BlogPost {
  id: string
  title: string
  content: string
  image: string | null
  createdAt: Date
  author: {
    name: string
  }
}

interface BlogSliderProps {
  posts: BlogPost[]
}

// Okuma süresini hesaplayan fonksiyon (ortalama 200 kelime/dakika)
function calculateReadTime(content: string): string {
  // HTML etiketlerini temizle
  const textContent = content.replace(/<[^>]*>/g, '')
  const wordCount = textContent.trim().split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)
  return `${readTime} MİN READ`
}

// Tarihi formatla
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Yazar avatar'ı için baş harflerini al
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export default function BlogSlider({ posts }: BlogSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)
  const [isDragging, setIsDragging] = useState(false)
  const [translateX, setTranslateX] = useState(0)
  const dragStartX = useRef(0)
  const dragStartIndex = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasMoved = useRef(false)

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Her seferinde 1 kart geçiş için toplam slide sayısı
  const totalSlides = Math.max(0, posts.length - itemsPerView + 1)
  const maxIndex = Math.max(0, totalSlides - 1)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? maxIndex : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
  }

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    hasMoved.current = false
    dragStartX.current = e.pageX
    dragStartIndex.current = currentIndex
    setTranslateX(0)
  }

  // Global mouse move ve up handlers
  const translateXRef = useRef(0)
  
  useEffect(() => {
    translateXRef.current = translateX
  }, [translateX])

  useEffect(() => {
    if (!isDragging) return

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const x = e.pageX
      const walk = x - dragStartX.current // Piksel cinsinden hareket
      
      // Eğer 5px'den fazla hareket edildiyse, bu bir drag işlemi
      if (Math.abs(walk) > 5) {
        hasMoved.current = true
      }
      
      translateXRef.current = walk
      setTranslateX(walk)
    }

    const handleGlobalMouseUp = () => {
      const finalTranslateX = translateXRef.current
      const wasDragging = hasMoved.current
      setIsDragging(false)
      
      // Eğer yeterince sürüklendiyse, bir sonraki/önceki slide'a geç
      const threshold = 50
      if (finalTranslateX < -threshold) {
        // Sağa sürüklendi (ileri)
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
      } else if (finalTranslateX > threshold) {
        // Sola sürüklendi (geri)
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
      
      // Kısa bir gecikme sonra reset (link tıklamasını engellemek için)
      setTimeout(() => {
        hasMoved.current = false
      }, 100)
      
      setTranslateX(0)
      translateXRef.current = 0
    }

    document.addEventListener('mousemove', handleGlobalMouseMove, { passive: false })
    document.addEventListener('mouseup', handleGlobalMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove)
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging, maxIndex])

  // Touch handlers (mobil için)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    hasMoved.current = false
    dragStartX.current = e.touches[0].pageX
    dragStartIndex.current = currentIndex
    setTranslateX(0)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.touches[0].pageX
    const walk = x - dragStartX.current
    
    // Eğer 5px'den fazla hareket edildiyse, bu bir drag işlemi
    if (Math.abs(walk) > 5) {
      hasMoved.current = true
    }
    
    setTranslateX(walk)
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    const finalTranslateX = translateX
    setIsDragging(false)
    
    const threshold = 50
    if (finalTranslateX < -threshold) {
      // Sağa sürüklendi (ileri)
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    } else if (finalTranslateX > threshold) {
      // Sola sürüklendi (geri)
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
    
    // Kısa bir gecikme sonra reset
    setTimeout(() => {
      hasMoved.current = false
    }, 100)
    
    setTranslateX(0)
  }

  // Otomatik slider geçişi (5 saniyede bir) - sadece drag yapılmıyorsa
  useEffect(() => {
    if (totalSlides > 1 && !isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [totalSlides, maxIndex, isDragging])

  // Her kart için slide oluştur (tek tek geçiş için)
  const cardWidth = 100 / itemsPerView // Her kartın genişliği yüzdesi

  return (
    <div className="relative">
      {/* Slider Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-300 ease-out"
          style={{
            transform: isDragging 
              ? `translateX(calc(-${currentIndex * cardWidth}% + ${translateX}px))`
              : `translateX(-${currentIndex * cardWidth}%)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="flex-shrink-0"
              style={{ width: `${cardWidth}%` }}
            >
              <div className="px-3 h-full">
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block h-full flex flex-col"
                  style={{
                    pointerEvents: isDragging ? 'none' : 'auto',
                  }}
                  onClick={(e) => {
                    // Eğer sürükleme yapıldıysa link'e tıklamayı engelle
                    if (hasMoved.current) {
                      e.preventDefault()
                      e.stopPropagation()
                    }
                  }}
                  onMouseDown={(e) => {
                    // Link içindeki mouse down'u da yakala ama drag'i başlatma
                    e.stopPropagation()
                  }}
                >
                    {/* Görsel */}
                    {post.image ? (
                      <div className="relative h-48 w-full flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#764e45] to-[#5a3a33] flex-shrink-0"></div>
                    )}
                    
                    {/* İçerik */}
                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      {/* Blog ikonu ve okuma süresi */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg 
                            className="w-4 h-4 text-[#764e45]" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                          </svg>
                          <span className="text-xs md:text-sm text-[#764e45] font-semibold">
                            Blog
                          </span>
                        </div>
                        <span className="text-xs md:text-sm text-gray-500 font-medium">
                          {calculateReadTime(post.content)}
                        </span>
                      </div>
                      
                      {/* Başlık */}
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 line-clamp-3 leading-tight flex-1">
                        {post.title}
                      </h3>
                      
                      {/* Yazar ve Tarih */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-200 mt-auto">
                        {/* Avatar */}
                        <div className="w-8 h-8 rounded-full bg-[#764e45] flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-white font-semibold">
                            {getInitials(post.author.name)}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm text-gray-600 font-medium truncate">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {totalSlides > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-[30%] -translate-y-1/2 z-10 bg-white rounded-full p-2.5 md:p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Önceki slide"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#764e45]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-[30%] -translate-y-1/2 z-10 bg-white rounded-full p-2.5 md:p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Sonraki slide"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#764e45]" />
          </button>
        </>
      )}

      {/* Slider Indicators - Profesyonel Tasarım */}
      {totalSlides > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          {/* Önceki buton */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-gray-100 active:bg-gray-200'
            }`}
            aria-label="Önceki"
          >
            <FaChevronLeft className="w-4 h-4 text-[#764e45]" />
          </button>

          {/* Göstergeler - Sadece yakın olanları göster */}
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(totalSlides, 5) }).map((_, index) => {
              // Aktif göstergeyi merkeze al
              let displayIndex = index
              if (totalSlides > 5) {
                const start = Math.max(0, Math.min(currentIndex - 2, totalSlides - 5))
                displayIndex = start + index
              }
              
              const isActive = displayIndex === currentIndex
              
              return (
                <button
                  key={displayIndex}
                  onClick={() => goToSlide(displayIndex)}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'bg-[#764e45] w-8 h-2'
                      : 'bg-gray-300 hover:bg-gray-400 w-2 h-2'
                  }`}
                  aria-label={`Slide ${displayIndex + 1}`}
                />
              )
            })}
          </div>

          {/* Sonraki buton */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className={`p-2 rounded-full transition-all ${
              currentIndex >= maxIndex
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-gray-100 active:bg-gray-200'
            }`}
            aria-label="Sonraki"
          >
            <FaChevronRight className="w-4 h-4 text-[#764e45]" />
          </button>

          {/* Sayı göstergesi */}
          <span className="text-xs text-gray-500 ml-2">
            {currentIndex + 1} / {totalSlides}
          </span>
        </div>
      )}
    </div>
  )
}

