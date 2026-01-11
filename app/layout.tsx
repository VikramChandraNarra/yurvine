import type { Metadata } from 'next'
import { Syne, Rock_Salt, Playfair_Display } from 'next/font/google'
import './globals.css'

const syne = Syne({ 
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-syne',
})

const rockSalt = Rock_Salt({ 
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rock-salt',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  weight: ['400', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'yurvine',
  description: 'YURVINE | Musician Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${rockSalt.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
