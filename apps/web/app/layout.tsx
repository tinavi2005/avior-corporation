import type { Metadata } from 'next';
import './globals.css';
import { AuthProviderWrapper } from '@/lib/auth/provider-wrapper';

export const metadata: Metadata = {
  title: 'Vale Integrador - CRM Académico',
  description: 'Sistema de gestión académica multi-rol',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
      </body>
    </html>
  );
}