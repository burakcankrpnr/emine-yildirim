import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { FaBlog, FaEnvelope, FaInstagram, FaStar, FaHome } from 'react-icons/fa'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export default async function AdminDashboard() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-6 md:py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 md:mb-12">
          Admin Paneli
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link
            href="/admin/homepage"
            className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaHome className="text-2xl md:text-3xl text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-primary-dark">
                Anasayfa İşlemleri
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600">Anasayfa içeriklerini yönetin</p>
          </Link>
          <Link
            href="/admin/blog"
            className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaBlog className="text-2xl md:text-3xl text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-primary-dark">
                Blog Yönetimi
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600">Blog yazılarını yönetin</p>
          </Link>
          <Link
            href="/admin/messages"
            className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaEnvelope className="text-2xl md:text-3xl text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-primary-dark">
                Mesajlar
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600">İletişim formu mesajlarını görüntüleyin</p>
          </Link>
          <Link
            href="/admin/reels"
            className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaInstagram className="text-2xl md:text-3xl text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-primary-dark">
                Instagram Reels
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600">Instagram reels&apos;leri yönetin</p>
          </Link>
          <Link
            href="/admin/testimonials"
            className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaStar className="text-2xl md:text-3xl text-primary" />
              <h2 className="text-xl md:text-2xl font-semibold text-primary-dark">
                Yorumlar
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600">Danışan yorumlarını yönetin</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

