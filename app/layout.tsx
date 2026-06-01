import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/lib/auth-context'
import { Header } from '@/components/header'
import './globals.css'

const geist = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'DebatiendoAndo - Plataforma de Debates',
  description: 'Crea y participa en debates sobre los temas que más importan. Vota, comenta y comparte tus opiniones.',
  keywords: ['debates', 'opiniones', 'foro', 'discusión', 'comunidad'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="min-h-screen font-sans antialiased">
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
