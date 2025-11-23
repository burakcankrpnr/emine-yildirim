'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const testimonialSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  comment: z.string().optional(),
})

type TestimonialFormData = z.infer<typeof testimonialSchema>

interface TestimonialFormProps {
  isOpen: boolean
  onClose: () => void
}

// Toast Notification Component
function Toast({ message, type, isVisible, onClose }: { message: string; type: 'success' | 'error'; isVisible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000) // 5 saniye sonra otomatik kapanır
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 md:pr-4 z-[60] w-full max-w-md px-4 md:px-0 animate-slide-down">
      <div
        className={`p-3 sm:p-4 rounded-lg shadow-2xl flex items-start sm:items-center justify-between gap-2 ${
          type === 'success'
            ? 'bg-green-100 border-2 border-green-400 text-green-800'
            : 'bg-red-100 border-2 border-red-400 text-red-800'
        }`}
      >
        <div className="flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
          <span className="text-xl sm:text-2xl flex-shrink-0">{type === 'success' ? '✓' : '✗'}</span>
          <p className="text-xs sm:text-sm md:text-base font-semibold flex-1 break-words">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-2 sm:ml-4 text-xl sm:text-2xl font-bold hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
    </div>
  )
}

export default function TestimonialForm({ isOpen, onClose }: TestimonialFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setIsToastVisible(true)
  }

  const hideToast = () => {
    setIsToastVisible(false)
    setTimeout(() => setToast(null), 300)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
  })

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        showToast('Yorumunuz başarıyla gönderildi! Yorumunuz kontrol edilip uygun olduğunda en kısa sürede paylaşılacaktır. Teşekkür ederiz.', 'success')
        reset()
        // Sayfayı yenile ki yeni yorum görünsün
        router.refresh()
        setTimeout(() => {
          onClose()
        }, 3000)
      } else {
        showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error')
      }
    } catch (error) {
      console.error('Yorum gönderme hatası:', error)
      showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
      reset()
    }
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={isToastVisible}
          onClose={hideToast}
        />
      )}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4"
        onClick={handleBackdropClick}
      >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 sm:p-6 md:p-8 lg:p-12">
          <div className="flex justify-between items-start mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#764e45] mb-2 sm:mb-4">
              Yorumunuzu Paylaşın
            </h2>
            <button
              onClick={() => {
                onClose()
                reset()
              }}
              className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl flex-shrink-0 ml-2"
            >
              ×
            </button>
          </div>
          <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 md:mb-8">
            Deneyimlerinizi bizimle paylaşarak, daha iyi hizmet verebilmemize katkı sağlayabilirsiniz. Her yorumunuz bizim için çok değerli, fikirlerinizi öğrenmekten mutluluk duyarız!
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm sm:text-base text-[#764e45] font-semibold mb-1 sm:mb-2">
                Adınız
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent"
              />
              {errors.name && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm sm:text-base text-[#764e45] font-semibold mb-1 sm:mb-2">
                E-posta adresiniz
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm sm:text-base text-[#764e45] font-semibold mb-1 sm:mb-2">
                Yorumunuz (tercihe bağlı)
              </label>
              <textarea
                {...register('comment')}
                id="comment"
                rows={5}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent resize-none"
              />
              {errors.comment && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.comment.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 py-2.5 sm:py-3 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition font-semibold disabled:opacity-50 text-sm sm:text-base"
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

