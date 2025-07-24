import type { Metadata } from "next"
import { Mulish, Open_Sans } from "next/font/google"
import "../styles/globals.css"

const mulish = Mulish({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-mulish',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: "nRev AI",
  description: "nRev AI is a workflow automation platform for GTM teams",
  icons: {
    icon: [
      { url: '/favicon/favicon.ico' },
      { url: '/favicon/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" type="image/x-icon" />
      </head>
      <body className={`${mulish.variable} ${openSans.variable}`}>{children}</body>
    </html>
  )
} 