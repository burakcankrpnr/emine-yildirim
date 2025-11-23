import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ForumPage() {
  const categories = await prisma.forumCategory.findMany({
    include: {
      topics: {
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { author: true },
      },
    },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-10 py-10 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary-dark mb-12 text-center">
          Forum
        </h1>
        <div className="space-y-6">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-primary-dark">
                    {category.name}
                  </h2>
                  {category.description && (
                    <p className="text-gray-600 mt-2">{category.description}</p>
                  )}
                </div>
                <Link
                  href={`/forum/${category.slug}`}
                  className="px-4 py-2 bg-primary-dark text-white rounded hover:bg-opacity-90 transition"
                >
                  Tümünü Gör
                </Link>
              </div>
              <div className="space-y-3">
                {category.topics.map((topic: any) => (
                  <Link
                    key={topic.id}
                    href={`/forum/topic/${topic.id}`}
                    className="block p-4 border border-primary-light rounded hover:bg-primary-light transition"
                  >
                    <h3 className="font-semibold text-primary-dark">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {topic.author.name} •{' '}
                      {new Date(topic.createdAt).toLocaleDateString('tr-TR')}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

