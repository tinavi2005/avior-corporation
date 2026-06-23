'use client'

import { useState, useEffect } from 'react'

interface VerifyFormProps {
  initialEmail: string
}

export default function VerifyForm({ initialEmail }: VerifyFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [resent, setResent] = useState(false)

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail)
  }, [initialEmail])

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      })

      const data = await res.json()

      if (res.ok) {
        window.location.href = '/dashboard'
      } else {
        setError(data.message || 'Código inválido o expirado')
        setIsLoading(false)
      }
    } catch {
      setError('Error de conexión')
      setIsLoading(false)
    }
  }

  async function handleResend() {
    setResent(false)
    setError(null)
    try {
      const res = await fetch('/api/auth/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setResent(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.message || 'No se pudo reenviar el código')
      }
    } catch {
      setError('Error al reenviar el código')
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
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
        Verificar Email
      </h1>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', textAlign: 'center' }}>
        Ingresa el código de 6 dígitos que enviamos a tu correo
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

      {resent && (
        <div style={{
          padding: '12px', marginBottom: '16px', borderRadius: '6px',
          backgroundColor: '#dcfce7', color: '#166534', fontSize: '14px',
          border: '1px solid #86efac'
        }}>
          Código reenviado. Revisa tu correo.
        </div>
      )}

      <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Email</label>
          <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label htmlFor="otp" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Código de verificación</label>
          <input id="otp" type="text" inputMode="numeric" maxLength={6} required value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="123456" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box', textAlign: 'center', letterSpacing: '4px' }} />
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', backgroundColor: isLoading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          {isLoading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>

      <div style={{ marginTop: '16px', textAlign: 'center' }}>
        <button onClick={handleResend} style={{ background: 'none', border: 'none', color: '#3b82f6', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}>
          Reenviar código
        </button>
      </div>

      <p style={{ fontSize: '12px', color: '#888', marginTop: '16px', textAlign: 'center' }}>
        <a href="/login" style={{ color: '#3b82f6' }}>← Volver al inicio de sesión</a>
      </p>
    </div>
  )
}
