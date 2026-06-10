'use client'

import { useSearchParams } from 'next/navigation'
import LoginForm from './login-form'

export default function LoginFormWrapper() {
  const searchParams = useSearchParams()
  const urlError = searchParams.get('error')
  const details = searchParams.get('details')

  const initialError = (() => {
    if (!urlError) return null

    const baseMessages: Record<string, string> = {
      oauth_failed: 'OAuth falló',
      missing_verifier: 'Sesión expirada, intenta de nuevo',
      exchange_failed: 'Error al intercambiar código de autorización',
      callback_error: 'Error en el callback de autenticación',
    }

    const base = baseMessages[urlError] || 'Error de autenticación'
    return details ? `${base}: ${decodeURIComponent(details)}` : base
  })()

  return <LoginForm initialError={initialError} />
}
