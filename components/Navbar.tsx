'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/hakkimda', label: 'Hakkımda' },
    { href: '/blog', label: 'Blog' },
    { href: '/iletisim', label: 'İletişim' },
  ]

  const counselingLinks = [
    { href: '/danismanliklar/cift-ve-aile-danismanligi', label: 'Aile ve Çift Danışmanlığı' },
    { href: '/danismanliklar/cocuk-ergen-psikolojisi', label: 'Çocuk - Ergen Psikolojisi' },
    { href: '/danismanliklar/ebeveyn-danismanligi', label: 'Ebeveyn Danışmanlığı' },
    { href: '/danismanliklar/yetiskin-psikolojisi', label: 'Yetişkin Psikolojisi' },
    { href: '/danismanliklar/online-danismanlik', label: 'Online Danışmanlık' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  const isCounselingActive = pathname?.startsWith('/danismanliklar')

  // Mobil menü açıldığında body scroll'unu engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
      // Menü kapandığında dropdown'ı da kapat
      setIsMobileDropdownOpen(false)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <nav className="shadow-md sticky z-30 bg-[#fdfdfd]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo Bölümü */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/emine-yildirim.png"
                alt="Emine Yıldırım Logo"
                width={200}
                height={200}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Navigasyon Linkleri */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className={`relative text-base transition-colors ${
                isActive('/')
                  ? 'text-[#8B4513] font-medium'
                  : 'text-[#666666] hover:text-[#8B4513]'
              } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                isActive('/')
                  ? 'after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              Ana Sayfa
            </Link>
            
            <Link
              href="/hakkimda"
              className={`relative text-base transition-colors ${
                isActive('/hakkimda')
                  ? 'text-[#8B4513] font-medium'
                  : 'text-[#666666] hover:text-[#8B4513]'
              } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                isActive('/hakkimda')
                  ? 'after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              Hakkımda
            </Link>
            
            {/* Danışmanlıklar Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                type="button"
                className={`relative text-base transition-colors cursor-pointer bg-transparent border-none p-0 ${
                  isCounselingActive || isDropdownOpen
                    ? 'text-[#8B4513] font-medium'
                    : 'text-[#666666] hover:text-[#8B4513]'
                } after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                  isCounselingActive || isDropdownOpen
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                Danışmanlıklar
              </button>
              
              {/* Dropdown Menu */}
              <div
                className={`absolute top-full left-0 w-64 z-50 pt-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isDropdownOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}
              >
                  {/* Görünmez hover köprüsü - dropdown ile link arasındaki boşluk */}
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {counselingLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          pathname === link.href
                            ? 'text-[#8B4513] font-medium bg-[#f5f0eb]'
                            : 'text-[#666666] hover:text-[#8B4513] hover:bg-[#f5f0eb]'
                        }`}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
            </div>
            
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-base transition-colors ${
                  isActive(link.href)
                    ? 'text-[#8B4513] font-medium'
                    : 'text-[#666666] hover:text-[#8B4513]'
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                  isActive(link.href)
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Sağ Taraf - Randevu Bölümü */}
          <div className="hidden lg:flex items-center space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#f5f0eb] border border-[#d4c4b0] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#8B4513]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[#666666] text-xs">RANDEVU AL</span>
                <a href="tel:05326499146" className="text-[#333333] font-bold text-sm hover:text-[#8B4513] transition-colors">
                  +90 532 649 91 46
                </a>
              </div>
            </div>
          </div>

          {/* Mobil Menü Butonu */}
          <button
            className="lg:hidden text-[#333333]"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobil Menü Overlay */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Mobil Menü */}
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-50 lg:hidden flex flex-col">
              {/* Mobil Menü Header */}
              <div className="bg-gray-100 px-4 py-2.5 flex justify-between items-center border-b border-gray-200">
                <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                  <div className="relative h-12 w-auto">
                    <Image
                      src="/emine-yildirim.png"
                      alt="Emine Yıldırım Logo"
                      width={80}
                      height={80}
                      className="object-contain h-full w-auto"
                      priority
                    />
                  </div>
                </Link>
                <button
                  className="text-[#333333] p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Menüyü Kapat"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Mobil Menü İçerik */}
              <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
            <Link
              href="/"
                  className={`relative block text-base transition-colors py-2 ${
                isActive('/')
                  ? 'text-[#8B4513] font-medium'
                  : 'text-[#666666]'
              } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                isActive('/')
                  ? 'after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Ana Sayfa
            </Link>
            
            <Link
              href="/hakkimda"
                  className={`relative block text-base transition-colors py-2 ${
                isActive('/hakkimda')
                  ? 'text-[#8B4513] font-medium'
                  : 'text-[#666666]'
              } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                isActive('/hakkimda')
                  ? 'after:scale-x-100'
                  : 'after:scale-x-0 hover:after:scale-x-100'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Hakkımda
            </Link>
            
                {/* Mobil Danışmanlıklar Dropdown */}
            <div>
              <button
                type="button"
                    onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                    className={`relative flex items-center justify-between w-full text-base transition-colors cursor-pointer bg-transparent border-none p-0 text-left py-2 ${
                      isCounselingActive || isMobileDropdownOpen
                    ? 'text-[#8B4513] font-medium'
                    : 'text-[#666666]'
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                      isCounselingActive || isMobileDropdownOpen
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                    <span>Danışmanlıklar</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isMobileDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
              </button>
                  
                  {/* Dropdown Content with Animation */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isMobileDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
              <div className="pl-4 mt-2 space-y-2">
                {counselingLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                          className={`block text-sm transition-colors py-1.5 ${
                      pathname === link.href
                        ? 'text-[#8B4513] font-medium'
                              : 'text-[#666666] hover:text-[#8B4513]'
                    }`}
                          onClick={() => {
                            setIsOpen(false)
                            setIsMobileDropdownOpen(false)
                          }}
                  >
                    {link.label}
                  </Link>
                ))}
                    </div>
              </div>
            </div>
            
            {navLinks.slice(2).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                    className={`relative block text-base transition-colors py-2 ${
                  isActive(link.href)
                    ? 'text-[#8B4513] font-medium'
                    : 'text-[#666666]'
                } after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#8B4513] after:origin-left after:transition-transform after:duration-300 ${
                  isActive(link.href)
                    ? 'after:scale-x-100'
                    : 'after:scale-x-0 hover:after:scale-x-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-gray-200">
              <a href="tel:05326499146" className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#f5f0eb] border border-[#d4c4b0] flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-[#8B4513]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#666666] text-xs">RANDEVU AL</span>
                  <span className="text-[#333333] font-bold text-sm">+90 532 649 91 46</span>
                </div>
              </a>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </nav>
  )
}

