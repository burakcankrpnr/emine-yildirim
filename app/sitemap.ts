import { MetadataRoute } from 'next'

// Prisma'yı dinamik import ediyoruz, hata durumunda sitemap yine de çalışsın
let prisma: any = null
try {
  const prismaModule = require('@/lib/prisma')
  prisma = prismaModule.prisma
} catch (error) {
  // Prisma yüklenemezse sessizce devam et
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Her iki domain için de çalışacak şekilde baseUrl'i al
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psikologemineyildirim.com'
  
  // Tarih formatını ISO string'e çeviriyoruz
  const now = new Date().toISOString()

  // Statik sayfalar
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkimda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/forum`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/cift-ve-aile-danismanligi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/cocuk-ergen-psikolojisi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/ebeveyn-danismanligi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/yetiskin-psikolojisi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/danismanliklar/online-danismanlik`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Eğer Prisma yüklenemediyse sadece statik sayfaları döndür
  if (!prisma) {
    return staticPages
  }

  // Dinamik içerik (blog, forum)
  try {
    const [blogPosts, forumCategories, forumTopics] = await Promise.allSettled([
      prisma.blogPost.findMany({
        where: { published: true },
        select: {
          id: true,
          updatedAt: true,
        },
      }),
      prisma.forumCategory.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      prisma.forumTopic.findMany({
        select: {
          id: true,
          updatedAt: true,
        },
      }),
    ])

    const blogPages: MetadataRoute.Sitemap = 
      blogPosts.status === 'fulfilled'
        ? blogPosts.value.map((post: any) => ({
            url: `${baseUrl}/blog/${post.id}`,
            lastModified: post.updatedAt instanceof Date 
              ? post.updatedAt.toISOString() 
              : new Date(post.updatedAt).toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
          }))
        : []

    const forumPages: MetadataRoute.Sitemap =
      forumCategories.status === 'fulfilled'
        ? forumCategories.value.map((category: any) => ({
            url: `${baseUrl}/forum/${category.slug}`,
            lastModified: category.updatedAt instanceof Date
              ? category.updatedAt.toISOString()
              : new Date(category.updatedAt).toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.6,
          }))
        : []

    const forumTopicPages: MetadataRoute.Sitemap =
      forumTopics.status === 'fulfilled'
        ? forumTopics.value.map((topic: any) => ({
            url: `${baseUrl}/forum/topic/${topic.id}`,
            lastModified: topic.updatedAt instanceof Date
              ? topic.updatedAt.toISOString()
              : new Date(topic.updatedAt).toISOString(),
            changeFrequency: 'weekly' as const,
            priority: 0.5,
          }))
        : []

    return [...staticPages, ...blogPages, ...forumPages, ...forumTopicPages]
  } catch (error) {
    console.error('Sitemap oluşturulurken hata:', error)
    // Hata durumunda bile statik sayfaları döndür
    return staticPages
  }
}

