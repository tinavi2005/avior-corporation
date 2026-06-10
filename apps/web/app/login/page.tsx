import { Suspense } from 'react'
import LoginFormWrapper from './login-form-wrapper'

export default function LoginPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      backgroundColor: '#fafafa'
    }}>
      <Suspense fallback={<div style={{ color: '#666' }}>Cargando...</div>}>
        <LoginFormWrapper />
      </Suspense>
    </main>
  )
}
