import { Suspense } from 'react'
import LoginFormWrapper from './login-form-wrapper'

export default function LoginPage() {
  return (
    <main className="min-h-screen wine-hero-gradient flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#6b0f1a]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#6b0f1a]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6b0f1a]/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={
          <div className="flex items-center justify-center p-10">
            <div className="w-8 h-8 border-2 border-[#6b0f1a] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <LoginFormWrapper />
        </Suspense>
      </div>
    </main>
  )
}
