'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { DashboardHeader } from '../_components/dashboard-header'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        <p>Cargando sesión...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <DashboardHeader title="Vale Integrador - Administrador" />

      <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Bienvenido, {user.profile?.firstName || user.email}
          </h2>
          <p style={{ fontSize: '16px', color: '#666' }}>Panel de administración</p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px',
          }}
        >
          <div
            style={{
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
            }}
          >
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Usuarios</p>
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>0</p>
          </div>
          <div
            style={{
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
            }}
          >
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Cursos Activos</p>
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>0</p>
          </div>
          <div
            style={{
              padding: '24px',
              borderRadius: '8px',
              border: '1px solid #e5e5e5',
              backgroundColor: 'white',
            }}
          >
            <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Inscripciones</p>
            <p style={{ fontSize: '48px', fontWeight: 'bold' }}>0</p>
          </div>
        </div>
      </main>
    </div>
  )
}
