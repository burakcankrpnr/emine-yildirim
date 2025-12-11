import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Kategori sayfasını dinamik yap
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ForumCategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await prisma.forumCategory.findUnique({
    where: { slug: params.slug },
    include: {
      topics: {
        include: { author: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-10 py-10 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary-dark mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-gray-600 mb-8">{category.description}</p>
        )}
        <div className="space-y-4">
          {category.topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/forum/topic/${topic.id}`}
              className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-primary-dark mb-2">
                {topic.title}
              </h2>
              <p className="text-gray-600 mb-3 line-clamp-2">{topic.content}</p>
              <p className="text-sm text-gray-500">
                {topic.author.name} •{' '}
                {new Date(topic.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

