import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import MessagesList from './MessagesList'
import { FaInfoCircle } from 'react-icons/fa'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export default async function AdminMessages() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' },
  })

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
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 md:mb-8">İletişim Mesajları</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 md:p-5 rounded-lg mb-6 md:mb-8 flex items-start gap-3">
          <FaInfoCircle className="text-blue-500 text-xl md:text-2xl flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm md:text-base text-blue-800 font-semibold mb-1">İletişim Bilgisi</p>
            <p className="text-xs md:text-sm text-blue-700">
              Mesajlara yanıt vermek için <strong>&quot;İletişime Geç&quot;</strong> butonunu kullanarak mail üzerinden iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
        
        <MessagesList messages={messages} />
      </div>
    </div>
  )
}

