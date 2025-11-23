import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CustomCursor from '@/components/CustomCursor'
import WhatsAppButton from '@/components/WhatsAppButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://psikologemineyildirim.com.tr'),
  title: {
    default: 'Antalya Psikolog - Psikolog Emine Yıldırım',
    template: '%s | Psikolog Emine Yıldırım'
  },
  description: 'Antalya\'da profesyonel psikolojik destek hizmetleri. Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
  keywords: ['Antalya psikolog', 'psikolog emine yıldırım', 'psikolog', 'psikolojik danışmanlık', 'aile terapisi', 'çocuk psikologu', 'online terapi'],
  authors: [{ name: 'Emine Yıldırım' }],
  creator: 'Emine Yıldırım',
  publisher: 'Emine Yıldırım',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Psikolog Emine Yıldırım',
    title: 'Antalya Psikolog - Psikolog Emine Yıldırım',
    description: 'Antalya\'da profesyonel psikolojik destek hizmetleri. Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
    images: [
      {
        url: '/psikolog.jpg',
        width: 1200,
        height: 630,
        alt: 'Psikolog Emine Yıldırım',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Psikolog - Psikolog Emine Yıldırım',
    description: 'Antalya\'da profesyonel psikolojik destek hizmetleri.  Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
    images: ['/psikolog.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console verification code buraya eklenecek
    // google: 'verification-code',
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://psikologemineyildirim.com.tr'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Psikolog Emine Yıldırım',
    url: baseUrl,
    logo: `${baseUrl}/emine-yildirim.png`,
    description: 'Antalya\'da profesyonel psikolojik destek hizmetleri.  Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Antalya',
      addressCountry: 'TR',
    },
    sameAs: [
      // Instagram, Facebook, LinkedIn gibi sosyal medya linkleri buraya eklenebilir
    ],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Emine Yıldırım',
    jobTitle: ' Psikolog',
    description: ' Psikolog Emine Yıldırım - Antalya\'da profesyonel psikolojik destek hizmetleri sunmaktadır.',
    url: baseUrl,
    image: `${baseUrl}/psikolog.jpg`,
    knowsAbout: [
      'Psikoloji',
      'Psikoloji',
      'Yetişkin Psikolojisi',
      'Çocuk Psikolojisi',
      'Ergen Psikolojisi',
      'Aile Terapisi',
      'Çift Terapisi',
      'Online Terapi',
    ],
    areaServed: {
      '@type': 'City',
      name: 'Antalya',
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Psikolog Emine Yıldırım',
    url: baseUrl,
    description: 'Antalya\'da profesyonel psikolojik destek hizmetleri.  Psikolog Emine Yıldırım ile yetişkin, çocuk, ergen ve aile psikolojisi alanlarında uzman hizmet.',
    publisher: {
      '@type': 'Organization',
      name: 'Psikolog Emine Yıldırım',
    },
  }

  return (
    <html lang="tr" className={montserrat.variable}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

