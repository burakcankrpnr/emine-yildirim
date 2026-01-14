import type { Metadata } from 'next'
import { Montserrat, Dancing_Script } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://psikologemineyildirim.com.tr'),
  title: {
    default: 'Antalya Psikolog | Psikolog Emine Yıldırım | Psikolojik Danışmanlık',
    template: '%s | Psikolog Emine Yıldırım | Antalya'
  },
  description: 'Antalya\'nın en iyi psikoloğu Emine Yıldırım. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online psikolojik danışmanlık. Antalya merkez ofis ve online randevu.',
  keywords: [
    'Antalya psikolog',
    'psikolog Antalya',
    'Antalya psikolojik danışman',
    'psikolog emine yıldırım',
    'Antalya en iyi psikolog',
    'Antalya psikolog randevu',
    'yetişkin psikolog Antalya',
    'çocuk psikolog Antalya',
    'ergen psikolog Antalya',
    'aile terapisi Antalya',
    'çift terapisi Antalya',
    'online psikolog',
    'online terapi',
    'psikolojik danışmanlık Antalya',
    'psikolog muayenehane Antalya',
    'ebeveyn danışmanlığı Antalya',
  ],
  authors: [{ name: 'Emine Yıldırım' }],
  creator: 'Emine Yıldırım',
  publisher: 'Emine Yıldırım',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/logo.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/logo.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: 'Psikolog Emine Yıldırım | Antalya',
    title: 'Antalya Psikolog | Psikolog Emine Yıldırım | En İyi Psikolojik Danışmanlık',
    description: 'Antalya\'nın en iyi psikoloğu Emine Yıldırım. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online psikolojik danışmanlık. ☎ 0532 649 91 46',
    images: [
      {
        url: '/kapak.jpg',
        width: 1200,
        height: 630,
        alt: 'Psikolog Emine Yıldırım - Antalya Psikolog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antalya Psikolog | Psikolog Emine Yıldırım',
    description: 'Antalya\'nın en iyi psikoloğu. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online danışmanlık. Randevu: 0532 649 91 46',
    images: ['/kapak.jpg'],
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

  // LocalBusiness Schema - Yerel SEO için kritik
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Psikolog Emine Yıldırım',
    alternateName: 'Antalya Psikolog Emine Yıldırım',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/kapak.jpg`,
    description: 'Antalya\'nın en iyi psikoloğu. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online psikolojik danışmanlık hizmetleri.',
    priceRange: '$$',
    telephone: '+905326499146',
    email: 'emineyildirimpsikolog@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Antalya Merkez',
      addressLocality: 'Antalya',
      addressRegion: 'Antalya',
      postalCode: '07000',
      addressCountry: 'TR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '36.8969',
      longitude: '30.7133',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Antalya',
      },
      {
        '@type': 'Country',
        name: 'Türkiye',
      }
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      // Instagram, Facebook, LinkedIn gibi sosyal medya linkleri buraya eklenebilir
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Psikolojik Danışmanlık Hizmetleri',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Yetişkin Psikolojisi',
            description: 'Yetişkinler için profesyonel psikolojik destek ve terapi hizmeti',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Çocuk ve Ergen Psikolojisi',
            description: 'Çocuk ve ergenler için uzman psikolojik danışmanlık',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Aile ve Çift Terapisi',
            description: 'Aile ve çiftler için profesyonel terapi hizmeti',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Online Psikolojik Danışmanlık',
            description: 'Online video görüşme ile psikolojik destek',
          },
        },
      ],
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'Psikolog Emine Yıldırım',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Antalya\'nın en iyi psikolojik danışmanlık hizmeti. Profesyonel psikolog eşliğinde yetişkin, çocuk, ergen ve aile terapisi.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Antalya',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+905326499146',
      contactType: 'Customer Service',
      areaServed: 'TR',
      availableLanguage: ['Turkish'],
    },
    sameAs: [
      // Instagram, Facebook, LinkedIn gibi sosyal medya linkleri buraya eklenebilir
    ],
  }

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/#person`,
    name: 'Emine Yıldırım',
    givenName: 'Emine',
    familyName: 'Yıldırım',
    jobTitle: 'Psikolog',
    description: 'Psikolog Emine Yıldırım - Antalya\'da profesyonel psikolojik destek, terapi ve danışmanlık hizmetleri sunmaktadır.',
    url: baseUrl,
    image: `${baseUrl}/kapak.jpg`,
    telephone: '+905326499146',
    email: 'emineyildirimpsikolog@gmail.com',
    worksFor: {
      '@id': `${baseUrl}/#organization`,
    },
    knowsAbout: [
      'Psikoloji',
      'Klinik Psikoloji',
      'Yetişkin Psikolojisi',
      'Çocuk Psikolojisi',
      'Ergen Psikolojisi',
      'Aile Terapisi',
      'Çift Terapisi',
      'Evlilik Danışmanlığı',
      'Ebeveyn Danışmanlığı',
      'Online Terapi',
      'Psikolojik Danışmanlık',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Antalya',
      addressRegion: 'Antalya',
      addressCountry: 'TR',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Antalya',
      },
      {
        '@type': 'Country',
        name: 'Türkiye',
      }
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'Psikolog Emine Yıldırım | Antalya',
    alternateName: 'Antalya Psikolog',
    url: baseUrl,
    description: 'Antalya\'nın en iyi psikoloğu Emine Yıldırım. Yetişkin, çocuk, ergen psikolojisi, aile ve çift terapisi, online psikolojik danışmanlık hizmetleri.',
    inLanguage: 'tr-TR',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="tr" className={`${montserrat.variable} ${dancingScript.variable}`}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

