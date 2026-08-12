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

const SITE_URL = 'https://siriconstructions.example'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SIRI Constructions and Developers | Architecture, Engineering & Financial Validation in Hassan, Karnataka',
    template: '%s | SIRI Constructions and Developers',
  },
  description:
    'SIRI Constructions and Developers, a JRK Group company founded in 2015, is an architectural and engineering firm offering integrated construction and financial validation & compliance services in Hassan, Karnataka.',
  keywords: [
    'construction company in Hassan',
    'architectural firm Hassan Karnataka',
    'engineering firm Hassan',
    'building contractors in Hassan',
    'civil contractors in Hassan',
    'residential construction Hassan',
    'commercial construction Hassan',
    'turnkey construction Hassan',
    'financial validation firm Hassan',
    'regulatory compliance construction Karnataka',
    'JRK Group',
  ],
  authors: [{ name: 'SIRI Constructions and Developers' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'SIRI Constructions and Developers',
    title: 'SIRI Constructions and Developers | Engineering Precision. Architectural Excellence.',
    description:
      'Architecture, engineering, construction and financial validation & compliance in Hassan, Karnataka. A JRK Group company, founded in 2015.',
    images: [{ url: '/images/hero-main.png', width: 1200, height: 630, alt: 'SIRI Constructions and Developers project' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SIRI Constructions and Developers | Engineering Precision. Architectural Excellence.',
    description: 'Architecture, engineering, construction and financial validation & compliance in Hassan, Karnataka.',
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
  name: 'SIRI Constructions and Developers',
  description:
    'Architectural and engineering firm founded in 2015, part of the JRK Group, offering integrated construction and financial validation & compliance services in Hassan, Karnataka, India.',
  url: SITE_URL,
  telephone: '+91 XXXXX XXXXX',
  email: 'hello@siriconstructions.example',
  foundingDate: '2015',
  parentOrganization: {
    '@type': 'Organization',
    name: 'JRK Group',
  },
  areaServed: 'Hassan, Karnataka, India',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Malnad Nursing Home, K R Puram',
    addressLocality: 'Hassan',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  knowsAbout: [
    'Residential Construction',
    'Commercial Construction',
    'Civil Works',
    'Turnkey Construction',
    'Structural Works',
    'Financial Validation & Audit',
    'Regulatory Compliance',
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
