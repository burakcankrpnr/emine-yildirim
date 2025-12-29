'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BlogEditModal from '@/components/BlogEditModal'

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

interface Post {
  id: string
  title: string
  content: string
  excerpt: string | null
  image: string | null
  published: boolean
  createdAt: Date
  author: {
    name: string
  }
}

interface BlogListProps {
  posts: Post[]
}

export default function BlogList({ posts }: BlogListProps) {
  const router = useRouter()
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deletePost, setDeletePost] = useState<{ id: string; title: string } | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
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

  const handleEdit = (post: Post) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }

  const handleDeleteClick = (post: Post) => {
    setDeletePost({ id: post.id, title: post.title })
    setIsDeleteModalOpen(true)
  }

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false)
    setDeletePost(null)
  }

  const handleDeleteConfirm = async () => {
    if (!deletePost) return

    setDeletingId(deletePost.id)
    try {
      const response = await fetch(`/api/admin/blog/${deletePost.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Blog yazısı başarıyla silindi', 'success')
        router.refresh()
        setIsDeleteModalOpen(false)
        setDeletePost(null)
      } else {
        showToast('Blog yazısı silinirken bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Blog yazısı silme hatası:', error)
      showToast('Blog yazısı silinirken bir hata oluştu', 'error')
    } finally {
      setDeletingId(null)
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

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-light">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Başlık</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Yazar</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Durum</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Tarih</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-t border-primary-light hover:bg-primary-lighter transition">
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">{post.title}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">{post.author.name}</td>
                  <td className="px-4 lg:px-6 py-4">
                    <span
                      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                        post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {post.published ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                    {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] font-medium transition"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDeleteClick(post)}
                        disabled={deletingId === post.id}
                        className="text-sm md:text-base text-red-600 hover:text-red-800 font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deletingId === post.id ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-primary-dark mb-2 text-base">{post.title}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Yazar:</span>
                <span className="text-primary-dark">{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Durum:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    post.published
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {post.published ? 'Yayında' : 'Taslak'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Tarih:</span>
                <span className="text-primary-dark">
                  {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="flex-1 px-4 py-2 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition text-sm font-medium"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDeleteClick(post)}
                  disabled={deletingId === post.id}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === post.id ? 'Siliniyor...' : 'Sil'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
          Henüz blog yazısı bulunmamaktadır.
        </div>
      )}

      <BlogEditModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={selectedPost}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && deletePost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-3 md:p-4"
          onClick={handleDeleteCancel}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 md:p-6 lg:p-8 mx-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 md:w-6 md:h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
                  Blog Yazısını Sil
                </h3>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1">
                  Bu işlem geri alınamaz
                </p>
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <p className="text-xs md:text-sm lg:text-base text-gray-700 break-words">
                <span className="font-semibold">&quot;{deletePost.title}&quot;</span> başlıklı blog yazısını silmek istediğinize emin misiniz?
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId === deletePost.id}
                className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-xs md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === deletePost.id ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
              <button
                onClick={handleDeleteCancel}
                disabled={deletingId === deletePost.id}
                className="flex-1 px-3 md:px-4 py-2 md:py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-xs md:text-sm lg:text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

