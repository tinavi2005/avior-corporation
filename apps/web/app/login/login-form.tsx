'use client'

import { useState } from 'react'

interface LoginFormProps {
  initialError: string | null
}

export default function LoginForm({ initialError }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(initialError)

  async function handleOAuthLogin(provider: 'google' | 'github') {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider })
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.message || `Error al iniciar OAuth con ${provider}`)
        setIsLoading(false)
      }
    } catch {
      setError('Error de conexión')
      setIsLoading(false)
    }
  }

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        window.location.href = '/dashboard'
      } else if (data.requireEmailVerification) {
        window.location.href = `/verify?email=${encodeURIComponent(email)}`
      } else {
        setError(data.message || 'Credenciales inválidas')
        setIsLoading(false)
      }
    } catch {
      setError('Error de conexión')
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '400px',
      padding: '24px',
      borderRadius: '8px',
      border: '1px solid #e5e5e5',
      backgroundColor: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
        Vale Integrador
      </h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', textAlign: 'center' }}>
        Inicia sesión para continuar
      </p>

      {error && (
        <div style={{
          padding: '12px', marginBottom: '16px', borderRadius: '6px',
          backgroundColor: '#fef2f2', color: '#dc2626', fontSize: '14px',
          border: '1px solid #fecaca'
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => handleOAuthLogin('google')}
          disabled={isLoading}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: isLoading ? '#9ca3af' : '#1a1a1a',
            color: 'white', border: 'none', borderRadius: '6px',
            fontSize: '16px', fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {isLoading ? 'Redirigiendo...' : 'Continuar con Google'}
        </button>

        <button
          onClick={() => handleOAuthLogin('github')}
          disabled={isLoading}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: isLoading ? '#9ca3af' : '#24292f',
            color: 'white', border: 'none', borderRadius: '6px',
            fontSize: '16px', fontWeight: '600',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78.015-.795 1.47-.015 2.52 1.365 2.865 1.935 1.68 2.82 4.365 2.025 5.43 1.545.165-1.2.63-2.025 1.14-2.49-3.99-.45-8.16-1.995-8.16-8.865 0-1.95.705-3.555 1.86-4.815-.195-.465-.84-2.325.18-4.845 1.485-.465 4.875 1.86 4.875 1.86 1.41-.39 2.925-.585 4.425-.585s3.015.195 4.425.585c0 0 3.39-2.325 4.875-1.86 1.02 2.52.375 4.38.18 4.845 1.155 1.26 1.86 2.85 1.86 4.815 0 6.885-4.185 8.4-8.175 8.865.66.57 1.23 1.665 1.23 3.375 0 2.43-.015 4.395-.015 4.995 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          {isLoading ? 'Redirigiendo...' : 'Continuar con GitHub'}
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <div style={{ flex: 1, borderTop: '1px solid #e5e5e5' }} />
        <span style={{ padding: '0 10px', color: '#666', fontSize: '12px' }}>O</span>
        <div style={{ flex: 1, borderTop: '1px solid #e5e5e5' }} />
      </div>

      <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Contraseña</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', backgroundColor: isLoading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>
      </form>

      <p style={{ fontSize: '12px', color: '#888', marginTop: '16px', textAlign: 'center' }}>
        ¿No tienes cuenta? <a href="/register" style={{ color: '#3b82f6' }}>Regístrate aquí</a>
      </p>
    </div>
  )
}
