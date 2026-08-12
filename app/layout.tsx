import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['500', '600', '700', '800', '900'],
})

const SITE_URL = 'https://siriconstruction.example'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Siri Construction | Residential & Civil Construction in Hassan, Karnataka',
    template: '%s | Siri Construction',
  },
  description:
    'Siri Construction is a residential and civil construction company in Hassan, Karnataka. Quality house construction, commercial building, turnkey and civil works built for generations.',
  keywords: [
    'construction company in Hassan',
    'house construction in Hassan',
    'building contractors in Hassan',
    'civil contractors in Hassan',
    'residential construction Hassan',
    'commercial construction Hassan',
    'turnkey construction Hassan',
    'house builders Hassan Karnataka',
  ],
  authors: [{ name: 'Siri Construction' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Siri Construction',
    title: 'Siri Construction | Building Spaces That Last',
    description:
      'Residential and civil construction in Hassan, Karnataka. Quality construction, thoughtful execution, built for generations.',
    images: [{ url: '/images/hero-main.png', width: 1200, height: 630, alt: 'Siri Construction project' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siri Construction | Building Spaces That Last',
    description: 'Residential and civil construction in Hassan, Karnataka.',
    images: ['/images/hero-main.png'],
  },
  robots: { index: true, follow: true },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1a1a18',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': SITE_URL,
  name: 'Siri Construction',
  description:
    'Residential and civil construction company in Hassan, Karnataka, India.',
  url: SITE_URL,
  telephone: '+91 XXXXX XXXXX',
  email: 'hello@siriconstruction.example',
  areaServed: 'Hassan, Karnataka, India',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hassan',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Residential Construction',
    'Commercial Construction',
    'Civil Works',
    'Turnkey Construction',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} bg-background`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
