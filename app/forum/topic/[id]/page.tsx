import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ForumReplies from '@/components/ForumReplies'

export default async function ForumTopicPage({
  params,
}: {
  params: { id: string }
}) {
  const topic = await prisma.forumTopic.findUnique({
    where: { id: params.id },
    include: {
      author: true,
      category: true,
      replies: {
        include: { author: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!topic) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-primary-lighter py-10 py-10 py-10 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                {topic.category.name}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-primary-dark mb-4">
              {topic.title}
            </h1>
            <div className="text-gray-600 mb-6">
              <p>
                {topic.author.name} •{' '}
                {new Date(topic.createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
            <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
              {topic.content}
            </div>
          </div>
          <ForumReplies topicId={topic.id} initialReplies={topic.replies} />
        </div>
      </div>
    </div>
  )
}

