'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      setIsLoading(false)
      return
    }

    if (form.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.firstName,
          lastName: form.lastName,
        })
      })

      const data = await res.json()

      if (res.ok) {
        if (data.requireEmailVerification) {
          router.push(`/verify?email=${encodeURIComponent(data.email)}`)
        } else {
          window.location.href = '/dashboard'
        }
      } else {
        setError(data.message || 'Error al registrar')
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
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>
        Crear Cuenta
      </h1>
      <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', textAlign: 'center' }}>
        Regístrate para acceder a Vale Integrador
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

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1 }}>
            <label htmlFor="firstName" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Nombre</label>
            <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={handleChange} placeholder="Juan" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label htmlFor="lastName" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Apellido</label>
            <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={handleChange} placeholder="Pérez" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="tu@email.com" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Contraseña</label>
          <input id="password" name="password" type="password" required value={form.password} onChange={handleChange} placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label htmlFor="confirmPassword" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>Confirmar Contraseña</label>
          <input id="confirmPassword" name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '16px', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" disabled={isLoading} style={{ width: '100%', padding: '12px', backgroundColor: isLoading ? '#9ca3af' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '4px' }}>
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <p style={{ fontSize: '12px', color: '#888', marginTop: '16px', textAlign: 'center' }}>
        ¿Ya tienes cuenta? <a href="/login" style={{ color: '#3b82f6' }}>Inicia sesión aquí</a>
      </p>
    </div>
  )
}
