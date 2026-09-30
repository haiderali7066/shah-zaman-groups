import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })

export const metadata: Metadata = {
  title: 'Shah Zaman Groups | Growing with purpose',
  description: 'Explore the ventures of Shah Zaman Groups — agriculture, livestock, construction, and development.',
  generator: 'Devntom Solutions',
  icons: {
    icon: [
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/logo.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Header/>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Footer/>
      </body>
    </html>
  )
}
