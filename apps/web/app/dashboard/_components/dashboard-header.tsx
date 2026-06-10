'use client'

import { useAuth } from '@/lib/auth/provider'

export function DashboardHeader({ title }: { title: string }) {
  const { user, signOut } = useAuth()

  return (
    <header
      style={{
        borderBottom: '1px solid #e5e5e5',
        backgroundColor: 'white',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '14px', color: '#666' }}>
          {user?.profile?.firstName || user?.email}
        </span>
        <span
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
          }}
        >
          {user?.role}
        </span>
        <button
          onClick={signOut}
          style={{
            padding: '8px 16px',
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Cerrar Sesión
        </button>
      </div>
    </header>
  )
}
