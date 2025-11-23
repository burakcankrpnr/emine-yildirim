'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}

interface MessagesListProps {
  messages: ContactMessage[]
}

// Toast Notification Component
function Toast({ message, type, isVisible, onClose }: { message: string; type: 'success' | 'error'; isVisible: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 5000)
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

// Email Send Modal Component
function EmailSendModal({ 
  isOpen, 
  onClose, 
  recipientEmail, 
  recipientName,
  onEmailSent 
}: { 
  isOpen: boolean
  onClose: () => void
  recipientEmail: string
  recipientName: string
  onEmailSent: () => void
}) {
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSending, setIsSending] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !message.trim()) {
      showToast('Lütfen konu ve mesaj alanlarını doldurun', 'error')
      return
    }

    setIsSending(true)
    try {
      const response = await fetch('/api/admin/messages/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipientEmail,
          subject,
          message,
        }),
      })

      if (response.ok) {
        showToast('Email başarıyla gönderildi', 'success')
        setSubject('')
        setMessage('')
        setTimeout(() => {
          onEmailSent()
          onClose()
        }, 2000)
      } else {
        const errorData = await response.json().catch(() => ({}))
        showToast(errorData.error || 'Email gönderilirken bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Email gönderme hatası:', error)
      showToast('Email gönderilirken bir hata oluştu', 'error')
    } finally {
      setIsSending(false)
    }
  }

  if (!isOpen) return null

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
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">Email Gönder</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl md:text-3xl"
            >
              ×
            </button>
          </div>

          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">Alıcı:</p>
            <p className="font-semibold text-primary-dark">{recipientName}</p>
            <p className="text-sm text-gray-600">{recipientEmail}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">
                Konu
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                placeholder="Email konusu"
                required
              />
            </div>

            <div>
              <label className="block text-primary-dark font-semibold mb-2 text-sm md:text-base">
                Mesaj
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={10}
                className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-primary-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark resize-none"
                placeholder="Mesajınızı buraya yazın..."
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isSending}
                className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition font-semibold text-sm md:text-base disabled:opacity-50"
              >
                {isSending ? 'Gönderiliyor...' : 'Gönder'}
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

export default function MessagesList({ messages }: MessagesListProps) {
  const router = useRouter()
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsDetailModalOpen(true)
  }

  const handleSendEmail = (message: ContactMessage) => {
    setSelectedMessage(message)
    setIsEmailModalOpen(true)
  }

  const handleEmailSent = () => {
    router.refresh()
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary-light">
              <tr>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Ad</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Email</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Konu</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Tarih</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">Durum</th>
                <th className="px-4 lg:px-6 py-3 text-left text-sm lg:text-base text-primary-dark font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className="border-t border-primary-light hover:bg-primary-lighter transition"
                >
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">{message.name}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base break-all">{message.email}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">{message.subject}</td>
                  <td className="px-4 lg:px-6 py-4 text-sm lg:text-base">
                    {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <span
                      className={`px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm ${
                        message.read
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {message.read ? 'Okundu' : 'Yeni'}
                    </span>
                  </td>
                  <td className="px-4 lg:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleViewMessage(message)}
                        className="text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] font-medium transition"
                      >
                        Görüntüle
                      </button>
                      <button
                        onClick={() => handleSendEmail(message)}
                        className="text-sm md:text-base text-blue-600 hover:text-blue-800 font-medium transition"
                      >
                        İletişime Geç
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
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-primary-dark mb-2 text-base">{message.subject}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Ad:</span>
                <span className="text-primary-dark">{message.name}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600">Email:</span>
                <span className="text-primary-dark break-all">{message.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Tarih:</span>
                <span className="text-primary-dark">
                  {new Date(message.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Durum:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    message.read
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {message.read ? 'Okundu' : 'Yeni'}
                </span>
              </div>
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleViewMessage(message)}
                  className="flex-1 px-4 py-2 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition text-sm font-medium"
                >
                  Görüntüle
                </button>
                <button
                  onClick={() => handleSendEmail(message)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition text-sm font-medium"
                >
                  İletişime Geç
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
          Henüz mesaj bulunmamaktadır.
        </div>
      )}

      {/* Message Detail Modal */}
      {isDetailModalOpen && selectedMessage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setIsDetailModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">Mesaj Detayı</h2>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl md:text-3xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ad</p>
                <p className="font-semibold text-primary-dark">{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-primary-dark break-all">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Konu</p>
                <p className="font-semibold text-primary-dark">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tarih</p>
                <p className="text-primary-dark">
                  {new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Mesaj</p>
                <p className="text-primary-dark whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleSendEmail(selectedMessage)}
                className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition font-semibold text-sm md:text-base"
              >
                İletişime Geç
              </button>
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="flex-1 px-4 md:px-6 py-2 md:py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold text-sm md:text-base"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email Send Modal */}
      {isEmailModalOpen && selectedMessage && (
        <EmailSendModal
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          recipientEmail={selectedMessage.email}
          recipientName={selectedMessage.name}
          onEmailSent={handleEmailSent}
        />
      )}
    </>
  )
}







