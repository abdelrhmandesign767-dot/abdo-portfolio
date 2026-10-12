import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: 'Abdelrahman Elsayed — Graphic Designer',
    template: '%s — Abdelrahman Elsayed',
  },
  description: 'Portfolio of Abdelrahman Elsayed: sports poster series, product ad campaigns and technical overlay design. Posters that stop the scroll.',
  keywords: ['graphic designer', 'sports posters', 'ad campaigns', 'poster design', 'Abdelrahman Elsayed'],
  authors: [{ name: 'Abdelrahman Elsayed' }],
  openGraph: {
    type: 'website',
    title: 'Abdelrahman Elsayed — Graphic Designer',
    description: 'Sports poster series, product ad campaigns and technical overlay design.',
    images: ['/work/webp/work-27.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdelrahman Elsayed — Graphic Designer',
    description: 'Posters that stop the scroll.',
    images: ['/work/webp/work-27.webp'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
