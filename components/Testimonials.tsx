import { prisma } from '@/lib/prisma'
import TestimonialForm from './TestimonialForm'
import TestimonialsClient from './TestimonialsClient'

// Next.js cache'ini devre dışı bırak - her requestte yeni veri çek
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Testimonials() {
  // Veritabanından onaylanmış yorumları çek
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  })

  return <TestimonialsClient testimonials={testimonials} />
}
