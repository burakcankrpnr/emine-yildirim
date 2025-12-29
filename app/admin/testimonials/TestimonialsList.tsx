'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa'

interface Testimonial {
  id: string
  name: string
  email: string
  comment: string | null
  approved: boolean
  createdAt: Date
}

interface TestimonialsListProps {
  testimonials: Testimonial[]
}

// Confirmation Modal Component
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  type,
  testimonialName,
  isLoading,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  type: 'approve' | 'reject' | 'delete'
  testimonialName: string
  isLoading: boolean
}) {
  if (!isOpen) return null

  const config = {
    approve: {
      title: 'Yorumu Onayla',
      message: 'Bu yorumu onaylamak istediğinize emin misiniz?',
      icon: FaCheckCircle,
      iconColor: 'text-green-500',
      buttonColor: 'bg-green-500 hover:bg-green-600',
      buttonText: 'Onayla',
    },
    reject: {
      title: 'Yorumu Reddet',
      message: 'Bu yorumu reddetmek istediğinize emin misiniz?',
      icon: FaTimesCircle,
      iconColor: 'text-yellow-500',
      buttonColor: 'bg-yellow-500 hover:bg-yellow-600',
      buttonText: 'Reddet',
    },
    delete: {
      title: 'Yorumu Sil',
      message: 'Bu yorumu kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      icon: FaTrash,
      iconColor: 'text-red-500',
      buttonColor: 'bg-red-500 hover:bg-red-600',
      buttonText: 'Sil',
    },
  }

  const { title, message, icon: Icon, iconColor, buttonColor, buttonText } = config[type]

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className={`mb-4 ${iconColor}`}>
            <Icon className="text-5xl md:text-6xl" />
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-primary-dark mb-2">{title}</h3>
          <p className="text-sm md:text-base text-gray-700 mb-2">{message}</p>
          {testimonialName && (
            <p className="text-sm md:text-base font-semibold text-primary-dark">
              <span className="text-gray-600">Yorum Sahibi:</span> {testimonialName}
            </p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-semibold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            İptal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 md:px-6 py-2 md:py-3 ${buttonColor} text-white rounded-lg transition font-semibold text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? 'İşleniyor...' : buttonText}
          </button>
        </div>
      </div>
    </div>
  )
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

export default function TestimonialsList({ testimonials }: TestimonialsListProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending'>('all')
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [isToastVisible, setIsToastVisible] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    type: 'approve' | 'reject' | 'delete'
    testimonialId: string | null
    testimonialName: string
  }>({
    isOpen: false,
    type: 'approve',
    testimonialId: null,
    testimonialName: '',
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setIsToastVisible(true)
  }

  const hideToast = () => {
    setIsToastVisible(false)
    setTimeout(() => setToast(null), 300)
  }

  const openConfirmModal = (type: 'approve' | 'reject' | 'delete', id: string, name: string) => {
    setConfirmModal({
      isOpen: true,
      type,
      testimonialId: id,
      testimonialName: name,
    })
  }

  const closeConfirmModal = () => {
    setConfirmModal({
      isOpen: false,
      type: 'approve',
      testimonialId: null,
      testimonialName: '',
    })
  }

  const handleApprove = async (id: string) => {
    setUpdatingId(id)
    closeConfirmModal()
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      })

      if (response.ok) {
        showToast('Yorum başarıyla onaylandı', 'success')
        router.refresh()
      } else {
        showToast('Yorum onaylanırken bir hata oluştu', 'error')
      }
    } catch (error) {
      showToast('Yorum onaylanırken bir hata oluştu', 'error')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleReject = async (id: string) => {
    setUpdatingId(id)
    closeConfirmModal()
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false }),
      })

      if (response.ok) {
        showToast('Yorum reddedildi', 'success')
        router.refresh()
      } else {
        showToast('Yorum reddedilirken bir hata oluştu', 'error')
      }
    } catch (error) {
      showToast('Yorum reddedilirken bir hata oluştu', 'error')
    } finally {
      setUpdatingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    closeConfirmModal()
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        showToast('Yorum başarıyla silindi', 'success')
        router.refresh()
      } else {
        showToast('Yorum silinirken bir hata oluştu', 'error')
      }
    } catch (error) {
      showToast('Yorum silinirken bir hata oluştu', 'error')
    } finally {
      setDeletingId(null)
    }
  }

  const handleConfirm = () => {
    if (!confirmModal.testimonialId) return

    if (confirmModal.type === 'approve') {
      handleApprove(confirmModal.testimonialId)
    } else if (confirmModal.type === 'reject') {
      handleReject(confirmModal.testimonialId)
    } else if (confirmModal.type === 'delete') {
      handleDelete(confirmModal.testimonialId)
    }
  }

  // Filter testimonials
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (testimonial.comment && testimonial.comment.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'approved' && testimonial.approved) ||
      (filterStatus === 'pending' && !testimonial.approved)

    return matchesSearch && matchesFilter
  })

  // Statistics
  const stats = {
    total: testimonials.length,
    approved: testimonials.filter((t) => t.approved).length,
    pending: testimonials.filter((t) => !t.approved).length,
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 border-blue-500">
          <div className="text-xs md:text-sm text-gray-600 mb-1">Toplam Yorum</div>
          <div className="text-xl md:text-2xl font-bold text-[#764e45]">{stats.total}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 border-green-500">
          <div className="text-xs md:text-sm text-gray-600 mb-1">Onaylanan</div>
          <div className="text-xl md:text-2xl font-bold text-green-600">{stats.approved}</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-3 md:p-4 border-l-4 border-yellow-500">
          <div className="text-xs md:text-sm text-gray-600 mb-1">Beklemede</div>
          <div className="text-xl md:text-2xl font-bold text-yellow-600">{stats.pending}</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="İsim, email veya yorum ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#764e45] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg font-medium transition ${
                filterStatus === 'all'
                  ? 'bg-[#764e45] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg font-medium transition ${
                filterStatus === 'approved'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Onaylanan
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 md:px-4 py-2 text-xs md:text-sm rounded-lg font-medium transition ${
                filterStatus === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Beklemede
            </button>
          </div>
        </div>
      </div>

      {/* Testimonials Table */}
      {filteredTestimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center text-sm md:text-base text-gray-600">
          {testimonials.length === 0
            ? 'Henüz yorum bulunmamaktadır.'
            : 'Arama kriterlerinize uygun yorum bulunamadı.'}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#764e45] to-[#5a3a33] text-white">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold">Ad</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold">Email</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold">Yorum</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold">Durum</th>
                    <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base font-semibold">Tarih</th>
                    <th className="px-4 lg:px-6 py-3 text-center text-sm lg:text-base font-semibold">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTestimonials.map((testimonial) => (
                    <tr
                      key={testimonial.id}
                      className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 lg:px-6 py-3 text-sm lg:text-base font-medium">{testimonial.name}</td>
                      <td className="px-4 lg:px-6 py-3 text-sm lg:text-base text-gray-600 break-all">{testimonial.email}</td>
                      <td className="px-4 lg:px-6 py-3 text-sm lg:text-base max-w-xs">
                        <p className="truncate">{testimonial.comment || '-'}</p>
                        {testimonial.comment && testimonial.comment.length > 50 && (
                          <button
                            onClick={() => setSelectedTestimonial(testimonial)}
                            className="text-[#764e45] hover:underline text-xs mt-1"
                          >
                            Devamını oku...
                          </button>
                        )}
                      </td>
                      <td className="px-4 lg:px-6 py-3">
                        <span
                          className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-medium ${
                            testimonial.approved
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {testimonial.approved ? 'Onaylandı' : 'Beklemede'}
                        </span>
                      </td>
                      <td className="px-4 lg:px-6 py-3 text-sm lg:text-base text-gray-600">
                        {new Date(testimonial.createdAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-4 lg:px-6 py-3">
                        <div className="flex items-center justify-center gap-2">
                          {!testimonial.approved && (
                            <button
                              onClick={() => openConfirmModal('approve', testimonial.id, testimonial.name)}
                              disabled={updatingId === testimonial.id}
                              className="px-3 py-1.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              title="Onayla"
                            >
                              {updatingId === testimonial.id ? '...' : '✓'}
                            </button>
                          )}
                          {testimonial.approved && (
                            <button
                              onClick={() => openConfirmModal('reject', testimonial.id, testimonial.name)}
                              disabled={updatingId === testimonial.id}
                              className="px-3 py-1.5 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                              title="Reddet"
                            >
                              {updatingId === testimonial.id ? '...' : '✗'}
                            </button>
                          )}
                          <button
                            onClick={() => openConfirmModal('delete', testimonial.id, testimonial.name)}
                            disabled={deletingId === testimonial.id}
                            className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            title="Sil"
                          >
                            {deletingId === testimonial.id ? '...' : '🗑'}
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
            {filteredTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-primary-dark mb-1 text-sm">{testimonial.name}</h3>
                    <p className="text-xs text-gray-600 break-all">{testimonial.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      testimonial.approved
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {testimonial.approved ? 'Onaylandı' : 'Beklemede'}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <p className="text-gray-600 mb-1">Yorum:</p>
                    <p className="text-gray-800 line-clamp-2">{testimonial.comment || '-'}</p>
                    {testimonial.comment && testimonial.comment.length > 50 && (
                      <button
                        onClick={() => setSelectedTestimonial(testimonial)}
                        className="text-[#764e45] hover:underline text-xs mt-1"
                      >
                        Devamını oku...
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Tarih:</span>
                    <span className="text-primary-dark">
                      {new Date(testimonial.createdAt).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    {!testimonial.approved && (
                      <button
                        onClick={() => openConfirmModal('approve', testimonial.id, testimonial.name)}
                        disabled={updatingId === testimonial.id}
                        className="px-3 py-1.5 bg-green-500 text-white text-xs rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title="Onayla"
                      >
                        {updatingId === testimonial.id ? '...' : '✓ Onayla'}
                      </button>
                    )}
                    {testimonial.approved && (
                      <button
                        onClick={() => openConfirmModal('reject', testimonial.id, testimonial.name)}
                        disabled={updatingId === testimonial.id}
                        className="px-3 py-1.5 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        title="Reddet"
                      >
                        {updatingId === testimonial.id ? '...' : '✗ Reddet'}
                      </button>
                    )}
                    <button
                      onClick={() => openConfirmModal('delete', testimonial.id, testimonial.name)}
                      disabled={deletingId === testimonial.id}
                      className="px-3 py-1.5 bg-red-500 text-white text-xs rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      title="Sil"
                    >
                      {deletingId === testimonial.id ? '...' : '🗑 Sil'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeConfirmModal}
        onConfirm={handleConfirm}
        type={confirmModal.type}
        testimonialName={confirmModal.testimonialName}
        isLoading={
          (confirmModal.type === 'approve' || confirmModal.type === 'reject') &&
          updatingId === confirmModal.testimonialId
            ? true
            : confirmModal.type === 'delete' && deletingId === confirmModal.testimonialId
            ? true
            : false
        }
      />

      {/* Modal for Full Comment */}
      {selectedTestimonial && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTestimonial(null)}
        >
      <div
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-4 md:p-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-lg md:text-xl font-bold text-[#764e45]">{selectedTestimonial.name}</h3>
            <p className="text-xs md:text-sm text-gray-600 break-all">{selectedTestimonial.email}</p>
          </div>
          <button
            onClick={() => setSelectedTestimonial(null)}
            className="text-gray-500 hover:text-gray-700 text-xl md:text-2xl flex-shrink-0"
          >
            ×
          </button>
        </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Yorum:</p>
              <p className="text-gray-800 whitespace-pre-wrap">{selectedTestimonial.comment || '-'}</p>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>
                Tarih:{' '}
                {new Date(selectedTestimonial.createdAt).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedTestimonial.approved
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {selectedTestimonial.approved ? 'Onaylandı' : 'Beklemede'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

