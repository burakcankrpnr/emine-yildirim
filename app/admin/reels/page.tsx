import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

// Admin panelinde her zaman güncel veri göster
export const dynamic = 'force-dynamic'
export const revalidate = 0

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export default async function AdminReels() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  const reels = await prisma.instagramReel.findMany({
    orderBy: { order: 'asc' },
  })

  // Instagram URL'sinden shortcode çıkarma
  const getShortcode = (url: string) => {
    const match = url.match(/\/reel\/([^/?]+)/)
    return match ? match[1] : null
  }

  // Instagram embed URL oluşturma
  const getEmbedUrl = (url: string) => {
    const shortcode = getShortcode(url)
    if (shortcode) {
      return `https://www.instagram.com/reel/${shortcode}/embed/?hidecaption=1&embed_host=www.instagram.com`
    }
    return null
  }

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-10 py-6 md:py-10 ">
      <div className="container mx-auto px-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] mb-4 md:mb-6 transition"
        >
          <span>←</span>
          <span>Geri Dön</span>
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark">Instagram Reels</h1>
          <Link
            href="/admin/reels/new"
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition whitespace-nowrap"
          >
            Yeni Reels Ekle
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="bg-white p-4 md:p-6 rounded-lg shadow-md"
            >
              <div className="aspect-[9/16] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                {getEmbedUrl(reel.url) ? (
                  <iframe
                    src={getEmbedUrl(reel.url) || ''}
                    className="w-full h-full rounded-lg"
                    allow="encrypted-media"
                    title={reel.title || 'Instagram Reel'}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <p className="text-gray-600 text-sm">Geçersiz URL</p>
                  </div>
                )}
              </div>
              <h3 className="font-semibold text-primary-dark mb-2 text-sm md:text-base">
                {reel.title || 'Başlıksız'}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2">Sıra: {reel.order}</p>
              <p className="text-xs md:text-sm text-gray-600 mb-4">
                Durum: {reel.active ? 'Aktif' : 'Pasif'}
              </p>
              <Link
                href={`/admin/reels/${reel.id}`}
                className="inline-block px-4 py-2 text-xs md:text-sm bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition"
              >
                Düzenle
              </Link>
            </div>
          ))}
        </div>
        {reels.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-600">
            Henüz reel eklenmemiş.
          </div>
        )}
      </div>
    </div>
  )
}

