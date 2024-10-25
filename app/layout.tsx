import type { Metadata } from 'next'
import { JetBrains_Mono as JetBrainsMono } from 'next/font/google'
import './ui/globals.css'
import { LanguageProvider } from './components/language-context'

const jetBrainsMono = JetBrainsMono({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Eduardo Lustosa',
  description: 'Personal portfolio of Eduardo Lustosa',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.className} flex h-screen items-center justify-center bg-main-orange antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
