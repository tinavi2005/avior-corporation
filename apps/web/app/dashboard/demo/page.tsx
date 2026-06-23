'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { Suspense } from 'react'
import { Loader2, GraduationCap } from 'lucide-react'

// Demo users that bypass real auth
const DEMO_USERS: Record<string, {
  id: string; email: string; role: string
  profile: { firstName: string; lastName: string }
}> = {
  administrador: {
    id: 'demo-admin-001',
    email: 'admin@avior.edu.bo',
    role: 'admin',
    profile: { firstName: 'Admin', lastName: 'Avior' },
  },
  instructor: {
    id: 'demo-instructor-001',
    email: 'instructor@avior.edu.bo',
    role: 'instructor',
    profile: { firstName: 'Cap. Roberto', lastName: 'Flores' },
  },
  estudiante: {
    id: 'demo-student-001',
    email: 'estudiante@avior.edu.bo',
    role: 'student',
    profile: { firstName: 'Carlos', lastName: 'Mamani' },
  },
}

function DemoRedirectContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setDemoUser } = useAuth() as any

  useEffect(() => {
    const role = searchParams.get('role') || 'estudiante'
    const demoUser = DEMO_USERS[role] || DEMO_USERS.estudiante

    // Store demo user in sessionStorage so the auth provider can pick it up
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('avior_demo_user', JSON.stringify(demoUser))
    }

    // Short delay for visual feedback, then redirect
    const timer = setTimeout(() => {
      router.push(`/dashboard/${demoUser.role}`)
    }, 1200)

    return () => clearTimeout(timer)
  }, [searchParams, router])

  const role = searchParams.get('role') || 'estudiante'
  const demoUser = DEMO_USERS[role] || DEMO_USERS.estudiante

  return (
    <div className="min-h-screen wine-hero-gradient flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 wine-gradient rounded-2xl shadow-lg mb-5 animate-pulse-glow">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-white text-xl font-bold mb-2">
          Ingresando como {demoUser.profile.firstName}
        </h2>
        <p className="text-white/50 text-sm mb-6">
          Modo demo · {demoUser.role}
        </p>
        <Loader2 className="w-6 h-6 text-[#6b0f1a] animate-spin mx-auto" />
      </div>
    </div>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen wine-hero-gradient flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    }>
      <DemoRedirectContent />
    </Suspense>
  )
}
