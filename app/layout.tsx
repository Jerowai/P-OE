import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'PIOE – Personal Interview Optimization Engine',
  description: 'Stop guessing. Start optimizing. A personalized hiring engine that learns your profile and increases your interview probability.',
  keywords: ['resume optimization', 'job search', 'interview preparation', 'AI hiring', 'remote jobs'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
