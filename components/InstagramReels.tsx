'use client'

import { useState, useEffect, useRef } from 'react'

interface InstagramReel {
  id: string
  url: string
  title: string | null
  order: number
  active: boolean
}

interface InstagramReelsProps {
  reels: InstagramReel[]
}

export default function InstagramReels({ reels }: InstagramReelsProps) {
  const [visibleReels, setVisibleReels] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer ile component görünür olduğunda videoları yükle ve oynat
  useEffect(() => {
    const currentRef = sectionRef.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const reelId = entry.target.getAttribute('data-reel-id')
            if (reelId) {
              setVisibleReels((prev) => {
                const newSet = new Set(prev)
                newSet.add(reelId)
                return newSet
              })
            }
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    const reelElements = currentRef.querySelectorAll('[data-reel-id]')
    reelElements.forEach((el) => observer.observe(el))

    return () => {
      reelElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  if (reels.length === 0) {
    return null
  }

  // Instagram URL'sinden shortcode çıkarma
  const getShortcode = (url: string) => {
    const match = url.match(/\/reel\/([^/?]+)/)
    return match ? match[1] : null
  }

  // Instagram embed URL oluşturma - UI elementlerini gizlemek için parametreler ekle
  const getEmbedUrl = (url: string) => {
    const shortcode = getShortcode(url)
    if (shortcode) {
      // hidecaption=1 ile caption ve bazı UI elementlerini gizle
      return `https://www.instagram.com/reel/${shortcode}/embed/?hidecaption=1&embed_host=www.instagram.com`
    }
    return null
  }

  // Instagram'a yönlendirme
  const handleReelClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            Sosyal Medyadan Bizi Takip Edin
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Instagram&apos;da en son paylaşımlarımızı ve videolarımızı kaçırmayın!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reels.map((reel) => {
            const embedUrl = getEmbedUrl(reel.url)
            const isVisible = visibleReels.has(reel.id)
            
            return (
              <div
                key={reel.id}
                data-reel-id={reel.id}
                className="rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleReelClick(reel.url)}
              >
                <div className="aspect-[9/16] bg-gray-200 relative overflow-hidden">
                  {embedUrl && isVisible ? (
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allow="encrypted-media; autoplay;"
                      title={reel.title || 'Instagram Reel'}
                      loading="lazy"
                      style={{
                        border: 'none',
                        overflow: 'hidden',
                      }}
                    />
                  ) : embedUrl ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                      <div className="text-center p-4">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-white animate-pulse"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <p className="text-white font-semibold">Yükleniyor...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
                      <div className="text-center p-4">
                        <svg
                          className="w-16 h-16 mx-auto mb-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <p className="text-white font-semibold">Instagram&apos;da İzle</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
