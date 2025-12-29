'use client'

import { useState } from 'react'
import { FaSave, FaTrash } from 'react-icons/fa'

interface HomepageFormProps {
  initialHeroSettings?: {
    subHeading?: string
    mainHeading?: string
    description?: string
    button1Text?: string
    button1Link?: string
    button2Text?: string
    button2Link?: string
    videoUrl?: string
  }
  initialBoxSettings?: {
    leftBoxTitle?: string
    leftBoxDescription?: string
    leftBoxExpertiseTitle?: string
    rightBoxTitle?: string
    rightBoxDescription?: string
  }
  initialQuoteSettings?: {
    quote?: string
    author?: string
  }
  initialVideoSettings?: {
    heroVideoUrl?: string
    supportSectionVideoUrl?: string
    counselingVideoUrl?: string
    counselingVideoPoster?: string
  }
}

export default function HomepageForm({
  initialHeroSettings,
  initialBoxSettings,
  initialQuoteSettings,
  initialVideoSettings,
}: HomepageFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [uploadingVideo, setUploadingVideo] = useState<string | null>(null)
  const [deletingVideo, setDeletingVideo] = useState<string | null>(null)

  // Hero Banner Ayarları
  const [heroSettings, setHeroSettings] = useState({
    subHeading: initialHeroSettings?.subHeading || 'DEĞİŞİM, BİR ADIMLA BAŞLAR;',
    mainHeading: initialHeroSettings?.mainHeading || 'Birlikte güçlü adımlar atalım',
    description: initialHeroSettings?.description || 'Bazen küçük bir adım, büyük bir değişimin başlangıcıdır. Yolculuğunda güçlenmene ve netleşmene destek olmaya hazırım.',
    button1Text: initialHeroSettings?.button1Text || 'Online Danışmanlıklar',
    button1Link: initialHeroSettings?.button1Link || '/danismanliklar/online-danismanlik',
    button2Text: initialHeroSettings?.button2Text || 'Hakkımda',
    button2Link: initialHeroSettings?.button2Link || '/hakkimda',
    videoUrl: initialHeroSettings?.videoUrl || initialVideoSettings?.heroVideoUrl || undefined,
  })

  // Video Ayarları
  const [videoSettings, setVideoSettings] = useState({
    heroVideoUrl: initialVideoSettings?.heroVideoUrl || undefined,
    supportSectionVideoUrl: initialVideoSettings?.supportSectionVideoUrl || undefined,
    counselingVideoUrl: initialVideoSettings?.counselingVideoUrl || undefined,
    counselingVideoPoster: initialVideoSettings?.counselingVideoPoster || undefined,
  })

  // Alt Kutu Ayarları
  const [boxSettings, setBoxSettings] = useState({
    leftBoxTitle: initialBoxSettings?.leftBoxTitle || 'Güçlü bir yarın için; Bugün Başla.',
    leftBoxDescription: initialBoxSettings?.leftBoxDescription || 'Sizlerin zihinsel ve duygusal dengelerinizi desteklemek, günlük yaşamın zorluklarıyla başa çıkmanızı kolaylaştırmak ve kendinizi daha derin bir anlayışla keşfetmenize yardımcı olmak için buradayız. Antalya\'daki ofisimizde ve online danışmanlık hizmetimizle her zaman yanınızdayız.',
    leftBoxExpertiseTitle: initialBoxSettings?.leftBoxExpertiseTitle || 'Uzmanlık Alanlarımız;',
    rightBoxTitle: initialBoxSettings?.rightBoxTitle || 'Size Yakınız, Bize Yazın',
    rightBoxDescription: initialBoxSettings?.rightBoxDescription || 'Sorularınız, önerileriniz veya talepleriniz için buradayız. Size yardımcı olmaktan mutluluk duyarız! ☆',
  })

  // Quote Ayarları
  const [quoteSettings, setQuoteSettings] = useState({
    quote: initialQuoteSettings?.quote || 'Kişinin yaşamını değiştiren en büyük güç, geçmişi değil; geleceğe dair kurduğu anlamlı bir amaçtır.',
    author: initialQuoteSettings?.author || 'Alfred Adler',
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleVideoUpload = async (file: File, videoType: 'hero' | 'support' | 'counseling' | 'poster') => {
    setUploadingVideo(videoType)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      let endpoint = '/api/admin/homepage/upload-video'
      
      // Poster için görsel yükleme endpoint'i kullan
      if (videoType === 'poster') {
        endpoint = '/api/admin/blog/upload'
      } else {
        formData.append('folder', 'emine-yildirim/videos')
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        
        if (videoType === 'hero') {
          setHeroSettings({ ...heroSettings, videoUrl: data.url })
          setVideoSettings({ ...videoSettings, heroVideoUrl: data.url })
        } else if (videoType === 'support') {
          setVideoSettings({ ...videoSettings, supportSectionVideoUrl: data.url })
        } else if (videoType === 'counseling') {
          setVideoSettings({ ...videoSettings, counselingVideoUrl: data.url })
        } else if (videoType === 'poster') {
          setVideoSettings({ ...videoSettings, counselingVideoPoster: data.url })
        }
        
        showToast(
          videoType === 'poster' 
            ? 'Poster başarıyla yüklendi! Lütfen "Kaydet" butonuna tıklayın.' 
            : 'Video başarıyla Cloudinary\'ye yüklendi! Lütfen "Kaydet" butonuna tıklayın.', 
          'success'
        )
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Bilinmeyen hata' }))
        const errorMessage = errorData.error || errorData.message || 'Yükleme sırasında bir hata oluştu'
        console.error('Yükleme hatası:', errorMessage, errorData)
        showToast(errorMessage, 'error')
      }
    } catch (error) {
      console.error('Yükleme hatası:', error)
      showToast('Yükleme sırasında bir hata oluştu', 'error')
    } finally {
      setUploadingVideo(null)
    }
  }

  const handleVideoDelete = async (videoType: 'hero' | 'support' | 'counseling' | 'poster') => {
    if (!confirm(`${videoType === 'poster' ? 'Poster' : 'Video'} silmek istediğinize emin misiniz?`)) {
      return
    }

    setDeletingVideo(videoType)
    try {
      let url: string | undefined = ''
      if (videoType === 'hero') {
        url = heroSettings.videoUrl
      } else if (videoType === 'support') {
        url = videoSettings.supportSectionVideoUrl
      } else if (videoType === 'counseling') {
        url = videoSettings.counselingVideoUrl
      } else if (videoType === 'poster') {
        url = videoSettings.counselingVideoPoster
      }

      if (!url) {
        showToast('Silinecek dosya bulunamadı', 'error')
        return
      }

      const resourceType = videoType === 'poster' ? 'image' : 'video'
      const response = await fetch(
        `/api/admin/homepage/delete-video?url=${encodeURIComponent(url)}&resourceType=${resourceType}`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        // State'i temizle - undefined yap (local dosya fallback yok)
        if (videoType === 'hero') {
          setHeroSettings({ ...heroSettings, videoUrl: undefined })
          setVideoSettings({ ...videoSettings, heroVideoUrl: undefined })
        } else if (videoType === 'support') {
          setVideoSettings({ ...videoSettings, supportSectionVideoUrl: undefined })
        } else if (videoType === 'counseling') {
          setVideoSettings({ ...videoSettings, counselingVideoUrl: undefined })
        } else if (videoType === 'poster') {
          setVideoSettings({ ...videoSettings, counselingVideoPoster: undefined })
        }
        
        // Veritabanına kaydet - güncel state ile
        const updatedHeroSettings = videoType === 'hero' 
          ? { ...heroSettings, videoUrl: undefined }
          : heroSettings
        const updatedVideoSettings = 
          videoType === 'hero' ? { ...videoSettings, heroVideoUrl: undefined }
          : videoType === 'support' ? { ...videoSettings, supportSectionVideoUrl: undefined }
          : videoType === 'counseling' ? { ...videoSettings, counselingVideoUrl: undefined }
          : videoType === 'poster' ? { ...videoSettings, counselingVideoPoster: undefined }
          : videoSettings
        
        const saveResponse = await fetch('/api/admin/homepage', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            heroSubHeading: updatedHeroSettings.subHeading,
            heroMainHeading: updatedHeroSettings.mainHeading,
            heroDescription: updatedHeroSettings.description,
            heroButton1Text: updatedHeroSettings.button1Text,
            heroButton1Link: updatedHeroSettings.button1Link,
            heroButton2Text: updatedHeroSettings.button2Text,
            heroButton2Link: updatedHeroSettings.button2Link,
            heroVideoUrl: updatedHeroSettings.videoUrl,
            leftBoxTitle: boxSettings.leftBoxTitle,
            leftBoxDescription: boxSettings.leftBoxDescription,
            leftBoxExpertiseTitle: boxSettings.leftBoxExpertiseTitle,
            rightBoxTitle: boxSettings.rightBoxTitle,
            rightBoxDescription: boxSettings.rightBoxDescription,
            quoteText: quoteSettings.quote,
            quoteAuthor: quoteSettings.author,
            supportSectionVideoUrl: updatedVideoSettings.supportSectionVideoUrl,
            counselingVideoUrl: updatedVideoSettings.counselingVideoUrl,
            counselingVideoPoster: updatedVideoSettings.counselingVideoPoster,
          }),
        })
        
        if (saveResponse.ok) {
          showToast(`${videoType === 'poster' ? 'Poster' : 'Video'} başarıyla silindi ve kaydedildi!`, 'success')
        } else {
          showToast(`${videoType === 'poster' ? 'Poster' : 'Video'} silindi ama kaydetme hatası oluştu`, 'error')
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Bilinmeyen hata' }))
        const errorMessage = errorData.error || errorData.message || 'Silme sırasında bir hata oluştu'
        console.error('Silme hatası:', errorMessage, errorData)
        showToast(errorMessage, 'error')
      }
    } catch (error) {
      console.error('Silme hatası:', error)
      showToast('Silme sırasında bir hata oluştu', 'error')
    } finally {
      setDeletingVideo(null)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/homepage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          heroSubHeading: heroSettings.subHeading,
          heroMainHeading: heroSettings.mainHeading,
          heroDescription: heroSettings.description,
          heroButton1Text: heroSettings.button1Text,
          heroButton1Link: heroSettings.button1Link,
          heroButton2Text: heroSettings.button2Text,
          heroButton2Link: heroSettings.button2Link,
          heroVideoUrl: heroSettings.videoUrl,
          leftBoxTitle: boxSettings.leftBoxTitle,
          leftBoxDescription: boxSettings.leftBoxDescription,
          leftBoxExpertiseTitle: boxSettings.leftBoxExpertiseTitle,
          rightBoxTitle: boxSettings.rightBoxTitle,
          rightBoxDescription: boxSettings.rightBoxDescription,
          quoteText: quoteSettings.quote,
          quoteAuthor: quoteSettings.author,
          supportSectionVideoUrl: videoSettings.supportSectionVideoUrl,
          counselingVideoUrl: videoSettings.counselingVideoUrl,
          counselingVideoPoster: videoSettings.counselingVideoPoster,
        }),
      })

      if (response.ok) {
        showToast('Ayarlar başarıyla kaydedildi!', 'success')
      } else {
        showToast('Kaydetme sırasında bir hata oluştu', 'error')
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error)
      showToast('Kaydetme sırasında bir hata oluştu', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark break-words">
          Anasayfa İşlemleri
        </h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition whitespace-nowrap flex items-center gap-2 disabled:opacity-50 shrink-0"
        >
          <FaSave />
          {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>

      {/* Toast Bildirimi */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white animate-fade-in`}
        >
          {toast.message}
        </div>
      )}

      <div className="space-y-6 md:space-y-8 overflow-x-hidden">
        {/* Hero Banner Ayarları */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4 md:mb-6 break-words">
            Hero Banner Ayarları
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alt Başlık
              </label>
              <input
                type="text"
                value={heroSettings.subHeading}
                onChange={(e) =>
                  setHeroSettings({ ...heroSettings, subHeading: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ana Başlık
              </label>
              <input
                type="text"
                value={heroSettings.mainHeading}
                onChange={(e) =>
                  setHeroSettings({ ...heroSettings, mainHeading: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Açıklama
              </label>
              <textarea
                value={heroSettings.description}
                onChange={(e) =>
                  setHeroSettings({ ...heroSettings, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. Buton Metni
                </label>
                <input
                  type="text"
                  value={heroSettings.button1Text}
                  onChange={(e) =>
                    setHeroSettings({ ...heroSettings, button1Text: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  1. Buton Linki
                </label>
                <input
                  type="text"
                  value={heroSettings.button1Link}
                  onChange={(e) =>
                    setHeroSettings({ ...heroSettings, button1Link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Buton Metni
                </label>
                <input
                  type="text"
                  value={heroSettings.button2Text}
                  onChange={(e) =>
                    setHeroSettings({ ...heroSettings, button2Text: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  2. Buton Linki
                </label>
                <input
                  type="text"
                  value={heroSettings.button2Link}
                  onChange={(e) =>
                    setHeroSettings({ ...heroSettings, button2Link: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Hero Banner Video
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleVideoUpload(file, 'hero')
                    // Input'u temizle ki aynı dosya tekrar seçilebilsin
                    e.target.value = ''
                  }}
                  disabled={uploadingVideo === 'hero'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
                />
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-gray-700 space-y-1">
                  <p><strong>📦 Yükleme:</strong> Cloudinary - <code className="bg-blue-100 px-1 rounded">emine-yildirim/videos</code> klasörü</p>
                  <p><strong>📏 Maksimum boyut:</strong> 100MB</p>
                  <p><strong>🎬 Desteklenen formatlar:</strong> MP4, WebM, MOV, AVI</p>
                  <p><strong>💡 Not:</strong> Video yüklendikten sonra &quot;Kaydet&quot; butonuna tıklamayı unutmayın!</p>
                </div>
                {uploadingVideo === 'hero' && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-600 font-medium">⏳ Video Cloudinary&apos;ye yükleniyor...</p>
                  </div>
                )}
                {heroSettings.videoUrl ? (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                        <span>✅</span> Video yüklendi
                      </p>
                      <button
                        onClick={() => handleVideoDelete('hero')}
                        disabled={deletingVideo === 'hero'}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 disabled:opacity-50"
                      >
                        <FaTrash />
                        {deletingVideo === 'hero' ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                    <div className="w-full max-w-md mb-2">
                      <video
                        src={heroSettings.videoUrl}
                        className="w-full h-auto max-h-40 rounded-lg border border-gray-300"
                        controls
                        muted
                        preload="metadata"
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      <strong>URL:</strong> <code className="bg-gray-100 px-1 rounded break-all text-[10px]">{heroSettings.videoUrl}</code>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <strong>⚠️ Henüz video yüklenmedi.</strong> Hero Banner&apos;da video gösterilmeyecek. Video yüklemek için yukarıdaki dosya seçiciyi kullanın.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kutu Ayarları */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4 md:mb-6 break-words">
            Alt Kutu Ayarları
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sol Kutu Başlık
              </label>
              <input
                type="text"
                value={boxSettings.leftBoxTitle}
                onChange={(e) =>
                  setBoxSettings({ ...boxSettings, leftBoxTitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sol Kutu Açıklama
              </label>
              <textarea
                value={boxSettings.leftBoxDescription}
                onChange={(e) =>
                  setBoxSettings({ ...boxSettings, leftBoxDescription: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Uzmanlık Alanları Başlığı
              </label>
              <input
                type="text"
                value={boxSettings.leftBoxExpertiseTitle}
                onChange={(e) =>
                  setBoxSettings({ ...boxSettings, leftBoxExpertiseTitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sağ Kutu Başlık
              </label>
              <input
                type="text"
                value={boxSettings.rightBoxTitle}
                onChange={(e) =>
                  setBoxSettings({ ...boxSettings, rightBoxTitle: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sağ Kutu Açıklama
              </label>
              <textarea
                value={boxSettings.rightBoxDescription}
                onChange={(e) =>
                  setBoxSettings({ ...boxSettings, rightBoxDescription: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
          </div>
        </div>

        {/* Quote Ayarları */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4 md:mb-6 break-words">
            Alıntı (Quote) Ayarları
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alıntı Metni
              </label>
              <textarea
                value={quoteSettings.quote}
                onChange={(e) =>
                  setQuoteSettings({ ...quoteSettings, quote: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Yazar
              </label>
              <input
                type="text"
                value={quoteSettings.author}
                onChange={(e) =>
                  setQuoteSettings({ ...quoteSettings, author: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark"
              />
            </div>
          </div>
        </div>

        {/* Video Ayarları */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 overflow-x-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-primary-dark mb-4 md:mb-6 break-words">
            Video Ayarları
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Support Section Video (Sağ Taraf Video)
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleVideoUpload(file, 'support')
                    // Input'u temizle ki aynı dosya tekrar seçilebilsin
                    e.target.value = ''
                  }}
                  disabled={uploadingVideo === 'support'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
                />
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-gray-700 space-y-1">
                  <p><strong>📦 Yükleme:</strong> Cloudinary - <code className="bg-blue-100 px-1 rounded">emine-yildirim/videos</code> klasörü</p>
                  <p><strong>📏 Maksimum boyut:</strong> 100MB</p>
                  <p><strong>🎬 Desteklenen formatlar:</strong> MP4, WebM, MOV, AVI</p>
                  <p><strong>💡 Not:</strong> Video yüklendikten sonra &quot;Kaydet&quot; butonuna tıklamayı unutmayın!</p>
                </div>
                {uploadingVideo === 'support' && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-600 font-medium">⏳ Video Cloudinary&apos;ye yükleniyor...</p>
                  </div>
                )}
                {videoSettings.supportSectionVideoUrl ? (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                        <span>✅</span> Video yüklendi
                      </p>
                      <button
                        onClick={() => handleVideoDelete('support')}
                        disabled={deletingVideo === 'support'}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 disabled:opacity-50"
                      >
                        <FaTrash />
                        {deletingVideo === 'support' ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                    <div className="w-full max-w-md mb-2">
                      <video
                        src={videoSettings.supportSectionVideoUrl}
                        className="w-full h-auto max-h-40 rounded-lg border border-gray-300"
                        controls
                        muted
                        preload="metadata"
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      <strong>URL:</strong> <code className="bg-gray-100 px-1 rounded break-all text-[10px]">{videoSettings.supportSectionVideoUrl}</code>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <strong>⚠️ Henüz video yüklenmedi.</strong> Support Section&apos;da default video gösterilecek. Video yüklemek için yukarıdaki dosya seçiciyi kullanın.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Counseling Video (Modal Video)
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleVideoUpload(file, 'counseling')
                    // Input'u temizle ki aynı dosya tekrar seçilebilsin
                    e.target.value = ''
                  }}
                  disabled={uploadingVideo === 'counseling'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
                />
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-xs text-gray-700 space-y-1">
                  <p><strong>📦 Yükleme:</strong> Cloudinary - <code className="bg-blue-100 px-1 rounded">emine-yildirim/videos</code> klasörü</p>
                  <p><strong>📏 Maksimum boyut:</strong> 100MB</p>
                  <p><strong>🎬 Desteklenen formatlar:</strong> MP4, WebM, MOV, AVI</p>
                  <p><strong>💡 Not:</strong> Video yüklendikten sonra &quot;Kaydet&quot; butonuna tıklamayı unutmayın!</p>
                </div>
                {uploadingVideo === 'counseling' && (
                  <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <p className="text-sm text-blue-600 font-medium">⏳ Video Cloudinary&apos;ye yükleniyor...</p>
                  </div>
                )}
                {videoSettings.counselingVideoUrl ? (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-green-700 flex items-center gap-2">
                        <span>✅</span> Video yüklendi
                      </p>
                      <button
                        onClick={() => handleVideoDelete('counseling')}
                        disabled={deletingVideo === 'counseling'}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 disabled:opacity-50"
                      >
                        <FaTrash />
                        {deletingVideo === 'counseling' ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                    <div className="w-full max-w-md mb-2">
                      <video
                        src={videoSettings.counselingVideoUrl}
                        className="w-full h-auto max-h-40 rounded-lg border border-gray-300"
                        controls
                        muted
                        preload="metadata"
                      />
                    </div>
                    <p className="text-xs text-gray-600">
                      <strong>URL:</strong> <code className="bg-gray-100 px-1 rounded break-all text-[10px]">{videoSettings.counselingVideoUrl}</code>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <strong>⚠️ Henüz video yüklenmedi.</strong> Counseling Section&apos;da default video gösterilecek. Video yüklemek için yukarıdaki dosya seçiciyi kullanın.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Counseling Video Poster (Thumbnail)
              </label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleVideoUpload(file, 'poster')
                  }}
                  disabled={uploadingVideo === 'poster'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
                />
                <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-600 space-y-1">
                  <p><strong>📦 Yükleme:</strong> Cloudinary - <code className="bg-gray-200 px-1 rounded">emine-yildirim/blog</code> klasörü</p>
                  <p><strong>📏 Maksimum boyut:</strong> 10MB</p>
                  <p><strong>🖼️ Desteklenen formatlar:</strong> JPG, PNG, WebP, GIF</p>
                  <p><strong>💡 Önerilen boyut:</strong> 1920x1080 veya 16:9 oranı</p>
                </div>
                {uploadingVideo === 'poster' && (
                  <p className="text-sm text-blue-600 font-medium">⏳ Yükleniyor...</p>
                )}
                {videoSettings.counselingVideoPoster && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">Mevcut poster:</p>
                      <button
                        onClick={() => handleVideoDelete('poster')}
                        disabled={deletingVideo === 'poster'}
                        className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2 disabled:opacity-50"
                      >
                        <FaTrash />
                        {deletingVideo === 'poster' ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                    <div className="w-full max-w-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={videoSettings.counselingVideoPoster}
                        alt="Poster"
                        className="w-full h-auto max-h-40 rounded-lg border border-gray-300 object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

