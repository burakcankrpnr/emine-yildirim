import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import TestimonialsList from './TestimonialsList'

async function checkAuth() {
  const cookieStore = await cookies()
  const auth = cookieStore.get('admin-auth')
  return auth?.value === 'true'
}

export default async function AdminTestimonials() {
  const isAuthenticated = await checkAuth()

  if (!isAuthenticated) {
    redirect('/admin/login')
  }

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-10 py-6 md:py-10">
      <div className="container mx-auto px-4">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm md:text-base text-[#764e45] hover:text-[#5a3a33] mb-4 md:mb-6 transition"
        >
          <span>←</span>
          <span>Geri Dön</span>
        </Link>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-dark mb-6 md:mb-8">Yorumlar</h1>
        <TestimonialsList testimonials={testimonials} />
      </div>
    </div>
  )
}

