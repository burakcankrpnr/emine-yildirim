'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    // Sayfaya cursor: none ekle
    document.body.style.cursor = 'none'

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true)
      // Yeni ripple efekti ekle
      const newRipple = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      }
      setRipples((prev) => [...prev, newRipple])
      // Ripple'ı 600ms sonra kaldır
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 600)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    // Hoverable elementleri bul
    const hoverableElements = document.querySelectorAll('a, button, input, textarea, select')
    hoverableElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    window.addEventListener('mousemove', updateCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', updateCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      hoverableElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Ripple Effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none z-50 animate-ripple"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-4 h-4 rounded-full border-2 border-primary-dark" />
        </div>
      ))}

      {/* Inner Cursor Dot */}
      <div
        className="fixed pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.1s ease-out',
        }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isClicking
              ? 'w-3 h-3 bg-primary-dark'
              : isHovering
              ? 'w-8 h-8 bg-primary-dark'
              : 'w-4 h-4 bg-primary-dark'
          }`}
        />
      </div>

      {/* Outer Cursor Ring */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-200 ${
            isClicking
              ? 'w-10 h-10 border-primary-dark opacity-70'
              : isHovering
              ? 'w-12 h-12 border-primary-light'
              : 'w-6 h-6 border-primary-light'
          }`}
        />
      </div>
    </>
  )
}

