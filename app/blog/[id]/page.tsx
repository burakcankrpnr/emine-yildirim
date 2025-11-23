import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: { author: true },
  })

  if (!post || !post.published) {
    return {
      title: 'Yazı Bulunamadı',
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psikologemineyildirim.com.tr'
  const postUrl = `${siteUrl}/blog/${params.id}`
  const imageUrl = post.image ? `${siteUrl}${post.image}` : `${siteUrl}/psikolog.jpg`

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
    keywords: [],
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      url: postUrl,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: [post.author.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160).replace(/<[^>]*>/g, ''),
      images: [imageUrl],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: { author: true },
  })

  if (!post || !post.published) {
    notFound()
  }

  return (
    <article className="min-h-screen bg-primary-lighter py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          {post.image && (
            <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold text-primary-dark mb-4">
            {post.title}
          </h1>
          <div className="text-gray-600 mb-8">
            <p>
              {post.author.name} •{' '}
              {new Date(post.createdAt).toLocaleString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  )
}

