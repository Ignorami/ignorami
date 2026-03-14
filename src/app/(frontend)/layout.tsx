// src/app/(frontend)/layout.tsx
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Playfair_Display, Libre_Baskerville } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${baskerville.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="site-footer">
          <p>© {new Date().getFullYear()} Ignorami. All rights reserved, apparently.</p>
        </footer>
      </body>
    </html>
  )
}
