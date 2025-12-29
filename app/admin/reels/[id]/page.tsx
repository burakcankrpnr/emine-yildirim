'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

// Toast Notification Component
function Toast({ message, type, isVisible, onClose }: { message: string; type: 'success' | 'error'; isVisible: boolean; onClose: () => void }) {
  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div
        className={`p-4 rounded-lg shadow-2xl flex items-center gap-3 ${
          type === 'success'
            ? 'bg-green-100 border-2 border-green-400 text-green-800'
            : 'bg-red-100 border-2 border-red-400 text-red-800'
        }`}
      >
        <span className="text-2xl flex-shrink-0">{type === 'success' ? '✓' : '✗'}</span>
        <p className="text-sm font-semibold flex-1">{message}</p>
        <button
          onClick={onClose}
          className="text-xl font-bold hover:opacity-70 transition-opacity flex-shrink-0"
          aria-label="Kapat"
        >
          ×
        </button>
      </div>
    </div>
  )
}

const reelSchema = z.object({
  url: z.string().url('Geçerli bir URL giriniz'),
  title: z.string().optional(),
  order: z.number().int().min(0).default(0),
  active: z.boolean().default(true),
})

type ReelFormData = z.infer<typeof reelSchema>

interface InstagramReel {
  id: string
  url: string
  title: string | null
  order: number
  active: boolean
}

export default function EditReel() {
  const router = useRouter()
  const params = useParams()
  const reelId = params.id as string
  const [reel, setReel] = useState<InstagramReel | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setIsToastVisible(true)
    setTimeout(() => {
      setIsToastVisible(false)
      setTimeout(() => setToast(null), 300)
    }, 3000)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReelFormData>({
    resolver: zodResolver(reelSchema),
  })

  useEffect(() => {
    const fetchReel = async () => {
      try {
        const response = await fetch(`/api/admin/reels/${reelId}`)
        if (response.ok) {
          const data = await response.json()
          setReel(data)
          reset({
            url: data.url,
            title: data.title || '',
            order: data.order,
            active: data.active,
          })
        } else {
          showToast('Reel bulunamadı', 'error')
          setTimeout(() => {
            router.push('/admin/reels')
          }, 2000)
        }
      } catch (error) {
        console.error('Reel getirme hatası:', error)
        showToast('Reel yüklenirken bir hata oluştu', 'error')
      } finally {
        setIsLoading(false)
      }
    }

    if (reelId) {
      fetchReel()
    }
  }, [reelId, reset, router])

  const onSubmit = async (data: ReelFormData) => {
    if (!reel) return

    setIsSubmitting(true)
    try {
      const response = await fetch(`/api/admin/reels/${reelId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        showToast('Reels başarıyla güncellendi', 'success')
        setTimeout(() => {
          router.push('/admin/reels')
        }, 1000)
      } else {
        const errorData = await response.json()
        showToast(errorData.error || 'Reels güncellenirken bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Reels güncelleme hatası:', error)
      showToast('Reels güncellenirken bir hata oluştu', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Bu reels&apos;i silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/reels/${reelId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Reels başarıyla silindi', 'success')
        setTimeout(() => {
          router.push('/admin/reels')
        }, 1000)
      } else {
        const errorData = await response.json()
        showToast(errorData.error || 'Reels silinirken bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Reels silme hatası:', error)
      showToast('Reels silinirken bir hata oluştu', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary-lighter py-6 md:py-10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-primary-dark text-lg">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!reel) {
    return null
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={isToastVisible}
          onClose={() => {
            setIsToastVisible(false)
            setTimeout(() => setToast(null), 300)
          }}
        />
      )}
      <div className="min-h-screen bg-primary-lighter py-6 md:py-10">
        <div className="container mx-auto px-4">
          <Link
            href="/admin/reels"
            className="inline-flex items-center gap-2 text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] mb-4 md:mb-6 transition"
          >
            <span>←</span>
            <span>Geri Dön</span>
          </Link>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 md:mb-8">
            Reels Düzenle
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 md:p-8 rounded-lg shadow-md space-y-6"
          >
            <div>
              <label className="block text-primary-dark font-semibold mb-2">
                Instagram Reels URL <span className="text-red-500">*</span>
              </label>
              <input
                {...register('url')}
                type="url"
                placeholder="https://www.instagram.com/reel/..."
                className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
              {errors.url && (
                <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
              )}
              <p className="text-xs text-gray-600 mt-1">
                Instagram Reels URL&apos;sini buraya yapıştırın. Örnek: https://www.instagram.com/reel/ABC123/
              </p>
            </div>
            <div>
              <label className="block text-primary-dark font-semibold mb-2">Başlık (Opsiyonel)</label>
              <input
                {...register('title')}
                type="text"
                placeholder="Reels başlığı"
                className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-primary-dark font-semibold mb-2">Sıra</label>
              <input
                {...register('order', { valueAsNumber: true })}
                type="number"
                min="0"
                className="w-full px-4 py-2 border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
              <p className="text-xs text-gray-600 mt-1">
                Reels&apos;lerin görüntülenme sırası (düşük sayı önce görünür)
              </p>
            </div>
            <div className="flex items-center">
              <input
                {...register('active')}
                type="checkbox"
                id="active"
                className="mr-2"
              />
              <label htmlFor="active" className="text-primary-dark font-semibold">
                Aktif (Görüntülenebilir)
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
              >
                Sil
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

