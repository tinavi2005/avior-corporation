import { Suspense } from 'react'
import VerifyFormWrapper from './verify-form-wrapper'

export default function VerifyPage() {
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
        <VerifyFormWrapper />
      </Suspense>
    </main>
  )
}
