import { prisma } from '@/lib/prisma'
import TestimonialForm from './TestimonialForm'
import TestimonialsClient from './TestimonialsClient'

export default async function Testimonials() {
  // Veritabanından onaylanmış yorumları çek
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  })

  return <TestimonialsClient testimonials={testimonials} />
}
