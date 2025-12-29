import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Sayfa Bulunamadı | Psikolog Emine Yıldırım',
  description: 'Aradığınız sayfa bulunamadı. Ana sayfaya dönerek istediğiniz bilgilere ulaşabilirsiniz.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-primary-lighter flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Sayısı */}
          <div className="mb-8">
            <h1 className="text-9xl md:text-[12rem] font-bold text-[#764e45] leading-none">
              404
            </h1>
          </div>

          {/* Başlık */}
          <h2 className="text-3xl md:text-4xl font-serif text-primary-dark mb-4">
            Sayfa Bulunamadı
          </h2>

          {/* Açıklama */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek istediğiniz bilgilere ulaşabilirsiniz.
          </p>

          {/* Buton */}
          <div className="flex justify-center items-center">
            <Link
              href="/"
              className="px-8 py-4 bg-[#764e45] text-white rounded-lg hover:bg-[#5a3a33] transition-colors font-semibold text-lg shadow-lg"
            >
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

