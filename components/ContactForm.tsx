'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { FaPhone } from 'react-icons/fa'

const contactSchema = z.object({
  name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  subject: z.string().min(3, 'Konu en az 3 karakter olmalıdır'),
  message: z.string().min(10, 'Mesaj en az 10 karakter olmalıdır'),
})

type ContactFormData = z.infer<typeof contactSchema>

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 md:pr-4 z-50 w-full max-w-md px-4 md:px-0 animate-slide-down">
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

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setIsToastVisible(true)
  }

  const hideToast = () => {
    setIsToastVisible(false)
    setTimeout(() => setToast(null), 300) // Animasyon için kısa bir gecikme
  }

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        reset()
        showToast('Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.', 'success')
      } else {
        showToast('Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan iletişim numaramızdan ulaşın.', 'error')
      }
    } catch (error) {
      showToast('Bir hata oluştu. Lütfen tekrar deneyin veya doğrudan iletişim numaramızdan ulaşın.', 'error')
    } finally {
      setIsSubmitting(false)
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
      <section
        id="iletisim"
        className="py-12 relative bg-gradient-to-br from-[#f9f7f7] to-white"
        style={{
          backgroundImage: 'url(/form-bg-pattern.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-[#764e45] mb-2">
                Size Yakınız, Bize Yazın
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-3">
                Sorularınız, önerileriniz veya talepleriniz için buradayız.
              </p>
              <div className="mt-3">
                <p className="text-sm font-semibold text-[#764e45]">WHATSAPP DANIŞMA HATTI</p>
                <a href="tel:05326499146" className="flex items-center justify-center gap-2 text-lg md:text-xl font-bold text-[#764e45] hover:underline">
                  <FaPhone className="text-[#764e45] text-lg md:text-xl" />
                  +90 532 649 91 46
                </a>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-xl">
            <h3 className="text-lg md:text-xl font-bold text-[#764e45] mb-4 text-center">
              Danışmanlık hizmetlerimizle size destek olmak için hazırız.
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-[#764e45] font-medium mb-1 text-sm">
                  Adınız
                </label>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  placeholder="Adınızı giriniz"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-[#764e45] font-medium mb-1 text-sm">
                  E-posta adresiniz
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="E-posta adresinizi giriniz"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-[#764e45] font-medium mb-1 text-sm">
                  Konu
                </label>
                <input
                  {...register('subject')}
                  type="text"
                  id="subject"
                  placeholder="Konuyu giriniz"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent"
                />
                {errors.subject && (
                  <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-[#764e45] font-medium mb-1 text-sm">
                  İletiniz
                </label>
                <textarea
                  {...register('message')}
                  id="message"
                  rows={4}
                  placeholder="Mesajınızı giriniz..."
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent resize-none"
                />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition font-medium text-sm disabled:opacity-50 shadow-md"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

