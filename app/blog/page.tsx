import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog Yazıları - Psikolog Emine Yıldırım',
  description: 'Psikoloji, danışmanlık ve kişisel gelişim konularında güncel blog yazıları',
}

const POSTS_PER_PAGE = 6

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const currentPage = Number(searchParams.page) || 1
  const skip = (currentPage - 1) * POSTS_PER_PAGE

  // Toplam blog sayısını al
  const totalPosts = await prisma.blogPost.count({
    where: { published: true },
  })

  // Sayfalanmış blog yazılarını al
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true },
    skip,
    take: POSTS_PER_PAGE,
  })

  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

  return (
    <div className="min-h-screen bg-primary-lighter">
      {/* Banner Section */}
      <section 
        className="relative h-[250px] md:h-[300px] overflow-hidden"
        style={{
          backgroundImage: 'url(/bg-pattern-2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#764e45]/80 z-0"></div>

        {/* İçerik */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-3xl mx-auto text-center">
              {/* Sub-heading */}
              <div className="mb-3">
                <p className="text-xs md:text-sm text-white font-semibold uppercase tracking-wide">
                  BLOG YAZILARI
                </p>
              </div>
              
              {/* Ana Başlık */}
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-3">
                Her hafta, psikoloji için motivasyon kaynağı
              </h1>
              
              {/* Açıklama */}
              <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                Farklı yaşam zorluklarıyla başa çıkmak için rehber niteliğinde yazılarımızı okuyarak, kendinizi daha iyi hissedin.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-4 ">
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {post.image && (
                    <div className="relative w-full h-48">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-primary-dark mb-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Sayfalandırma */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {/* Önceki Sayfa */}
                {currentPage > 1 ? (
                  <Link
                    href={`/blog?page=${currentPage - 1}`}
                    className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-primary-dark font-semibold"
                  >
                    Önceki
                  </Link>
                ) : (
                  <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed">
                    Önceki
                  </span>
                )}

                {/* Sayfa Numaraları */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // İlk sayfa, son sayfa, mevcut sayfa ve yakın sayfaları göster
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Link
                          key={page}
                          href={`/blog?page=${page}`}
                          className={`px-4 py-2 rounded-lg shadow-md hover:shadow-xl transition-shadow font-semibold ${
                            page === currentPage
                              ? 'bg-[#764e45] text-white'
                              : 'bg-white text-primary-dark'
                          }`}
                        >
                          {page}
                        </Link>
                      )
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 text-gray-400">
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                {/* Sonraki Sayfa */}
                {currentPage < totalPages ? (
                  <Link
                    href={`/blog?page=${currentPage + 1}`}
                    className="px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow text-primary-dark font-semibold"
                  >
                    Sonraki
                  </Link>
                ) : (
                  <span className="px-4 py-2 bg-gray-100 rounded-lg text-gray-400 cursor-not-allowed">
                    Sonraki
                  </span>
                )}
              </div>
            )}

            
          </>
        ) : (
          <p className="text-center text-gray-600 mt-12">
            Henüz blog yazısı bulunmamaktadır.
          </p>
        )}
      </div>
    </div>
  )
}

