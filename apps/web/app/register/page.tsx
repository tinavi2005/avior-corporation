import RegisterForm from './register-form'

export default function RegisterPage() {
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
      <RegisterForm />
    </main>
  )
}
