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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${baskerville.variable}`}>
      <head>{/* <ColorSchemeScript /> */}</head>
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
