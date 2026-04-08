// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import { Playfair_Display, Libre_Baskerville } from 'next/font/google'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { theme } from '@/theme'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
})

const baskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Ignorami',
  description: 'News for people who are paying attention.',
  metadataBase: new URL('https://ignorami.com'),
  alternates: {
    canonical: 'https://ignorami.com',
  },
  openGraph: {
    title: 'Ignorami',
    description: 'Journalism, but worse.',
    url: 'https://ignorami.com',
    siteName: 'Ignorami',
    images: [
      {
        url: 'https://ignorami.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ignorami',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ignorami',
    description: 'Journalism, but worse.',
    images: ['https://ignorami.com/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${baskerville.variable}`}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8146019382037486"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="light">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  )
}
