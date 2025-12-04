import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import BlogSlider from './BlogSlider'

// Next.js cache'ini devre dışı bırak - her requestte yeni veri çek
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Okuma süresini hesaplayan fonksiyon (ortalama 200 kelime/dakika)
function calculateReadTime(content: string): string {
  // HTML etiketlerini temizle
  const textContent = content.replace(/<[^>]*>/g, '')
  const wordCount = textContent.trim().split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)
  return `${readTime} MİN READ`
}

// Tarihi formatla
function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// Yazar avatar'ı için baş harflerini al
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Blog kartı component'i
function BlogCard({ post, calculateReadTime, formatDate, getInitials }: any) {
  return (
    <Link
      href={`/blog/${post.id}`}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden block h-full flex flex-col"
    >
      {/* Görsel */}
      {post.image ? (
        <div className="relative h-48 w-full flex-shrink-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-[#764e45] to-[#5a3a33] flex-shrink-0"></div>
      )}
      
      {/* İçerik */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        {/* Blog ikonu ve okuma süresi */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4 text-[#764e45]" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
            </svg>
            <span className="text-xs md:text-sm text-[#764e45] font-semibold">
              Blog
            </span>
          </div>
          <span className="text-xs md:text-sm text-gray-500 font-medium">
            {calculateReadTime(post.content)}
          </span>
        </div>
        
        {/* Başlık */}
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 line-clamp-3 leading-tight flex-1">
          {post.title}
        </h3>
        
        {/* Yazar ve Tarih */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-200 mt-auto">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#764e45] flex items-center justify-center flex-shrink-0">
            <span className="text-xs text-white font-semibold">
              {getInitials(post.author.name)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-gray-600 font-medium truncate">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default async function BlogSection() {
  // Veritabanından tüm yayınlanmış blog yazılarını çek
  const blogPosts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  })

  const hasMoreThanThree = blogPosts.length > 3

  return (
    <section 
      className="relative py-12 "
      style={{
        backgroundImage: 'url(/bg-pattern-2.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Başlık Bölümü - Fotoğraftaki gibi iki sütunlu */}
          <div className="mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-start">
              {/* Sol Sütun */}
              <div className="space-y-4 md:space-y-6">
                {/* Sub-heading */}
                <div className="sub-heading single">
                  <p className="text-xs md:text-sm lg:text-base text-[#764e45] font-semibold uppercase tracking-wide">
                    BLOG YAZILARI
                  </p>
                </div>
                
                {/* Ana Başlık */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-900 leading-tight">
                  Her hafta, psikoloji için motivasyon kaynağı.
                </h2>
              </div>

              {/* Sağ Sütun - Dikey çizgi ile ayrılmış */}
              <div className="relative pl-6 lg:pl-8 border-l-2 border-[#764e45]/30">
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed text-justify">
                  Farklı yaşam zorluklarıyla başa çıkmak için rehber niteliğinde yazılarımızı okuyarak, 
                  kendinizi daha iyi hissedin.
                </p>
              </div>
            </div>
          </div>

          {blogPosts.length > 0 ? (
            hasMoreThanThree ? (
              <BlogSlider 
                posts={blogPosts}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
                {blogPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    calculateReadTime={calculateReadTime}
                    formatDate={formatDate}
                    getInitials={getInitials}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                Henüz blog yazısı bulunmamaktadır.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

