'use client'

import { useState, useEffect, useRef } from 'react'
import TestimonialForm from './TestimonialForm'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

interface Testimonial {
  id: string
  name: string
  email: string
  comment: string | null
  createdAt: Date
}

interface TestimonialsClientProps {
  testimonials: Testimonial[]
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
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
      if (window.innerWidth < 640) {
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
  const totalSlides = Math.max(0, testimonials.length - itemsPerView + 1)
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
      const walk = x - dragStartX.current
      
      if (Math.abs(walk) > 5) {
        hasMoved.current = true
      }
      
      translateXRef.current = walk
      setTranslateX(walk)
    }

    const handleGlobalMouseUp = () => {
      const finalTranslateX = translateXRef.current
      setIsDragging(false)
      
      const threshold = 50
      if (finalTranslateX < -threshold) {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
      } else if (finalTranslateX > threshold) {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
      
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
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    } else if (finalTranslateX > threshold) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }
    
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

  const cardWidth = 100 / itemsPerView

  return (
    <>
      <section className="py-12   bg-gradient-to-br from-[#f9f7f7] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#764e45] mb-8 sm:mb-10 md:mb-12">
              Danışanlarımızın Görüşleri
            </h2>
            {testimonials.length > 0 ? (
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
                    className="flex items-stretch transition-transform duration-300 ease-out"
                    style={{
                      transform: isDragging 
                        ? `translateX(calc(-${currentIndex * cardWidth}% + ${translateX}px))`
                        : `translateX(-${currentIndex * cardWidth}%)`,
                      transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    }}
                  >
                    {testimonials.map((testimonial) => (
                      <div
                        key={testimonial.id}
                        className="flex-shrink-0 flex"
                        style={{ width: `${cardWidth}%` }}
                      >
                        <div className="px-2 sm:px-3 md:px-4 w-full flex pb-2">
                          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 h-full w-full flex flex-col">
                            <div className="mb-4 sm:mb-6 flex-shrink-0">
                              <svg
                                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#764e45] opacity-50"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                              </svg>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed flex-grow min-h-0">
                              &ldquo;{testimonial.comment || ''}&rdquo;
                            </p>
                            <div className="border-t pt-3 sm:pt-4 mt-auto flex-shrink-0">
                              <p className="font-bold text-sm sm:text-base text-[#764e45]">{testimonial.name}</p>
                              <p className="text-xs sm:text-sm text-gray-600 mt-1">{testimonial.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                {testimonials.length > itemsPerView && (
                  <>
                    <button
                      onClick={prevSlide}
                      disabled={currentIndex === 0}
                      className="absolute left-0 sm:-left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                      aria-label="Önceki"
                    >
                      <FaChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-[#764e45]" />
                    </button>
                    <button
                      onClick={nextSlide}
                      disabled={currentIndex >= maxIndex}
                      className="absolute right-0 sm:-right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed z-10"
                      aria-label="Sonraki"
                    >
                      <FaChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#764e45]" />
                    </button>
                  </>
                )}

                {/* Dots Indicator */}
                {testimonials.length > itemsPerView && (
                  <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                          index === currentIndex
                            ? 'bg-[#764e45] w-6 sm:w-8'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-base sm:text-lg text-gray-600">Henüz yorum bulunmamaktadır.</p>
              </div>
            )}
            <div className="text-center mt-8 sm:mt-10 md:mt-12">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 bg-[#764e45] text-white text-base sm:text-lg md:text-xl font-semibold rounded-lg hover:bg-[#5a3a33] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sende Yorum Yaz
              </button>
            </div>
          </div>
        </div>
      </section>

      <TestimonialForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
