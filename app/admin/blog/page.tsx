import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import BlogList from './BlogList'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export default async function AdminBlog() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  })

  return (
    <div className="min-h-screen bg-primary-lighter  py-6 md:py-10 ">
      <div className="container mx-auto px-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] mb-4 md:mb-6 transition"
        >
          <span>←</span>
          <span>Geri Dön</span>
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark">Blog Yönetimi</h1>
          <Link
            href="/admin/blog/new"
            className="px-4 py-2 md:px-6 md:py-3 text-sm md:text-base bg-primary-dark text-white rounded-lg hover:bg-opacity-90 transition whitespace-nowrap"
          >
            Yeni Yazı Ekle
          </Link>
        </div>
        
        <BlogList posts={posts} />
      </div>
    </div>
  )
}

