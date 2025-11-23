'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod' // @ts-ignore
import { z } from 'zod'

// Toast Notification Component
function Toast({ message, type, isVisible, onClose }: { message: string; type: 'success' | 'error'; isVisible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 md:pr-4 z-50 w-full max-w-md px-4 md:px-0 animate-slide-down">
      <div
        className={`p-3 md:p-4 rounded-lg shadow-2xl flex items-center gap-3 w-full ${
          type === 'success'
            ? 'bg-green-100 border-2 border-green-400 text-green-800'
            : 'bg-red-100 border-2 border-red-400 text-red-800'
        }`}
      >
        <span className="text-xl md:text-2xl flex-shrink-0">{type === 'success' ? '✓' : '✗'}</span>
        <p className="text-xs md:text-sm font-semibold flex-1 break-words">{message}</p>
        <button
          onClick={onClose}
          className="text-lg md:text-xl font-bold hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
    </div>
  )
}

const blogSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır'),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalıdır'),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().default(false),
})

type BlogFormData = z.infer<typeof blogSchema>

export default function NewBlogPost() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
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
    setValue,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
  })

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/blog/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setValue('image', data.url)
        setImagePreview(data.url)
        showToast('Görsel başarıyla yüklendi', 'success')
        return data.url
      } else {
        showToast('Dosya yüklenirken bir hata oluştu', 'error')
        return null
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error)
      showToast('Dosya yüklenirken bir hata oluştu', 'error')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleFileUpload(file)
    }
  }

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        showToast('Blog yazısı başarıyla oluşturuldu', 'success')
        setTimeout(() => {
          router.push('/admin/blog')
        }, 1000)
      } else {
        showToast('Blog yazısı oluşturulurken bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Blog yazısı oluşturma hatası:', error)
      showToast('Blog yazısı oluşturulurken bir hata oluştu', 'error')
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
      <div className="min-h-screen bg-primary-lighter py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary-dark mb-8">Yeni Blog Yazısı</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <div>
            <label className="block text-primary-dark font-semibold mb-2">Başlık</label>
            <input
              {...register('title')}
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label className="block text-primary-dark font-semibold mb-2">Özet</label>
            <input
              {...register('excerpt')}
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
            />
          </div>
          <div>
            <label className="block text-primary-dark font-semibold mb-2">Görsel</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
              />
              {isUploading && (
                <p className="text-sm text-gray-600">Yükleniyor...</p>
              )}
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded-lg"
                  />
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-primary-dark font-semibold mb-2">İçerik</label>
            <textarea
              {...register('content')}
              rows={15}
              className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <input
              {...register('published')}
              type="checkbox"
              id="published"
              className="mr-2"
            />
            <label htmlFor="published" className="text-primary-dark font-semibold">
              Yayınla
            </label>
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

