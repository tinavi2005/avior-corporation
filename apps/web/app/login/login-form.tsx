'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff, Shield, BookOpen, Users, Loader2, ChevronRight } from 'lucide-react'

interface LoginFormProps {
  initialError: string | null
}

const DEMO_ACCOUNTS = [
  {
    role: 'Administrador',
    email: 'admin@avior.edu.bo',
    password: 'demo123',
    icon: Shield,
    color: 'from-avior-wine to-avior-wine-dark',
    badge: 'bg-red-900/30 text-red-300 border-red-800',
    desc: 'Gestión completa del sistema',
  },
  {
    role: 'Instructor',
    email: 'instructor@avior.edu.bo',
    password: 'demo123',
    icon: BookOpen,
    color: 'from-gray-800 to-gray-900',
    badge: 'bg-gray-700/30 text-gray-300 border-gray-600',
    desc: 'Gestión de clases y alumnos',
  },
  {
    role: 'Estudiante',
    email: 'estudiante@avior.edu.bo',
    password: 'demo123',
    icon: Users,
    color: 'from-zinc-800 to-zinc-900',
    badge: 'bg-zinc-700/30 text-zinc-300 border-zinc-600',
    desc: 'Ver mis cursos y calificaciones',
  },
]

export default function LoginForm({ initialError }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingDemo, setLoadingDemo] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(initialError)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
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
      setError('Error de conexión. Intenta de nuevo.')
      setIsLoading(false)
    }
  }

  async function handleDemoLogin(account: typeof DEMO_ACCOUNTS[0]) {
    setLoadingDemo(account.role)
    if (typeof window !== 'undefined') {
      const demoUser = {
        id: `demo-${account.role.toLowerCase()}-001`,
        email: account.email,
        role: account.role === 'Administrador' ? 'admin' : account.role === 'Instructor' ? 'instructor' : 'student',
        profile: {
          firstName: account.role === 'Administrador' ? 'Admin' : account.role === 'Instructor' ? 'Cap. Roberto' : 'Carlos',
          lastName: 'Demo',
        },
      }
      sessionStorage.setItem('avior_demo_user', JSON.stringify(demoUser))
      window.location.href = `/dashboard/${demoUser.role}`
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 mb-4 animate-scale-in">
          <Image src="/img/logo.png" alt="Avior SRL" width={80} height={80} className="object-contain" priority />
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Avior <span className="text-red-400">SRL</span>
        </h1>
        <p className="text-white/50 text-sm mt-1 tracking-widest uppercase">Aula Virtual · Escuela de Aviación</p>
      </div>

      {/* Card */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">

        {error && (
          <div className="mb-5 flex items-start gap-3 bg-red-950/60 border border-red-800/50 rounded-xl p-4 animate-scale-in">
            <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-1.5">
              Correo institucional
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@avior.edu.bo"
              required
              className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#6b0f1a] focus:ring-2 focus:ring-[#6b0f1a]/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 pr-12 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#6b0f1a] focus:ring-2 focus:ring-[#6b0f1a]/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full wine-gradient text-white font-bold py-3.5 rounded-xl btn-shimmer hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#6b0f1a]/30 transition-all"
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Ingresando...</>
            ) : (
              <><ChevronRight className="w-4 h-4" /> Iniciar Sesión</>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/30 text-xs font-medium uppercase tracking-widest">Acceso Demo</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Demo accounts */}
        <div className="space-y-2.5">
          {DEMO_ACCOUNTS.map((account, i) => {
            const Icon = account.icon
            const isThisLoading = loadingDemo === account.role
            return (
              <button
                key={account.role}
                onClick={() => handleDemoLogin(account)}
                disabled={loadingDemo !== null}
                style={{ animationDelay: `${i * 100}ms` }}
                className={`w-full opacity-start animate-fade-in-up flex items-center gap-3 p-3 rounded-xl border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 transition-all group disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className={`w-9 h-9 bg-gradient-to-br ${account.color} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                  {isThisLoading
                    ? <Loader2 className="w-4 h-4 text-white animate-spin" />
                    : <Icon className="w-4 h-4 text-white" />
                  }
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-semibold">{account.role}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded border ${account.badge} font-medium`}>demo</span>
                  </div>
                  <p className="text-white/40 text-xs">{account.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all" />
              </button>
            )
          })}
        </div>

        <p className="text-white/25 text-xs text-center mt-5">
          ¿Problemas para ingresar?{' '}
          <a href="https://wa.me/59175496739" target="_blank" rel="noopener noreferrer" className="text-red-400/70 hover:text-red-400 transition-colors">
            Contacta soporte
          </a>
        </p>
      </div>

      <p className="text-center text-white/20 text-xs mt-6">
        © 2025 Avior SRL — Escuela de Aviación Bolivia
      </p>
    </div>
  )
}
