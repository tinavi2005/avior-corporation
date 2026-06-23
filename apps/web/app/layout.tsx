import type { Metadata } from 'next'
import './globals.css'
import { AuthProviderWrapper } from '@/lib/auth/provider-wrapper'

export const metadata: Metadata = {
  title: 'Avior SRL — Escuela de Aviación Bolivia',
  description: 'Formamos pilotos, tripulantes y profesionales aeronáuticos certificados por la DGAC Bolivia. Sedes en La Paz, Cochabamba, Tarija y Sucre.',
  icons: { icon: '/img/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-white text-[#0d0d0d] font-sans antialiased">
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
      </body>
    </html>
  )
}
