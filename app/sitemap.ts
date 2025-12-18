import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psikologemineyildirim.com.tr'

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/forum`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/cift-ve-aile-danismanligi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/cocuk-ergen-psikolojisi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/ebeveyn-danismanligi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/yetiskin-psikolojisi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/online-danismanlik`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Blog yazıları
  try {
    const blogPosts = await prisma.blogPost.findMany({
      where: { published: true },
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    // Forum kategorileri
    const forumCategories = await prisma.forumCategory.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const forumPages: MetadataRoute.Sitemap = forumCategories.map((category) => ({
      url: `${baseUrl}/forum/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

    // Forum topic'leri
    const forumTopics = await prisma.forumTopic.findMany({
      select: {
        id: true,
        updatedAt: true,
      },
    })

    const forumTopicPages: MetadataRoute.Sitemap = forumTopics.map((topic) => ({
      url: `${baseUrl}/forum/topic/${topic.id}`,
      lastModified: topic.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.5,
    }))

    return [...staticPages, ...blogPages, ...forumPages, ...forumTopicPages]
  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error)
    return staticPages
  }
}

