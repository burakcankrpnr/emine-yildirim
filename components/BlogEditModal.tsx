'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const blogSchema = z.object({
  title: z.string().min(3, 'Başlık en az 3 karakter olmalıdır'),
  content: z.string().min(10, 'İçerik en az 10 karakter olmalıdır'),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().default(false),
})

type BlogFormData = z.infer<typeof blogSchema>

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string | null
  image: string | null
  published: boolean
}

interface BlogEditModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost | null
}

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
    <div className="fixed top-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-0 md:pr-4 z-[60] w-full max-w-md px-4 md:px-0 animate-slide-down">
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

export default function BlogEditModal({ isOpen, onClose, post }: BlogEditModalProps) {
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
    reset,
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      image: '',
      published: false,
    },
  })

  const imageUrl = watch('image')

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        image: post.image || '',
        published: post.published,
      })
      setImagePreview(post.image || null)
    }
  }, [post, reset])

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
    if (!post) return

    // Değişiklik kontrolü
    const hasChanges = 
      data.title !== post.title ||
      data.content !== post.content ||
      (data.excerpt || '') !== (post.excerpt || '') ||
      (data.image || '') !== (post.image || '') ||
      data.published !== post.published

    if (!hasChanges) {
      showToast('Herhangi bir değişiklik yapılmadı', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const responseData = await response.json()
        showToast('Blog yazısı başarıyla güncellendi', 'success')
        router.refresh()
        setTimeout(() => {
          onClose()
          reset()
        }, 1000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        showToast(errorData.error || 'Blog yazısı güncellenirken bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Blog yazısı güncelleme hatası:', error)
      showToast('Blog yazısı güncellenirken bir hata oluştu', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen || !post) return null

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
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
      <div
        className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">Blog Yazısını Düzenle</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl md:text-3xl"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div>
            <label className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">Başlık</label>
            <input
              {...register('title')}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
            />
            {errors.title && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">Özet</label>
            <input
              {...register('excerpt')}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
            />
          </div>

          <div>
            <label className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">Görsel</label>
            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
              />
              {isUploading && (
                <p className="text-sm text-gray-600">Yükleniyor...</p>
              )}
              {imagePreview && (
                <div className="mt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
            <label className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">İçerik</label>
            <textarea
              {...register('content')}
              rows={10}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none"
            />
            {errors.content && (
              <p className="text-red-500 text-xs md:text-sm mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              {...register('published')}
              type="checkbox"
              id="published"
              className="mr-2"
            />
            <label htmlFor="published" className="text-primary-dark font-semibold text-sm md:text-base">
              Yayınla
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition font-semibold text-sm md:text-base disabled:opacity-50"
            >
              {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold text-sm md:text-base"
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

