'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { DashboardHeader } from '../_components/dashboard-header'
import { Sidebar } from '../_components/sidebar'
import {
  Users, BookOpen, Calendar, BarChart2,
  GraduationCap, Settings, Bell, UserCheck,
  ArrowRight, Loader2, TrendingUp,
} from 'lucide-react'
import Link from 'next/link'

const adminActions = [
  { href: '/dashboard/admin/usuarios',       icon: Users,         label: 'Usuarios',       desc: 'Crear y editar cuentas',    delay: 0 },
  { href: '/dashboard/admin/cursos',         icon: BookOpen,      label: 'Cursos',         desc: 'Asignar y configurar',      delay: 50 },
  { href: '/dashboard/admin/horarios',       icon: Calendar,      label: 'Horarios',       desc: 'Programar clases',          delay: 100 },
  { href: '/dashboard/admin/instructores',   icon: GraduationCap, label: 'Instructores',   desc: 'Asignar y gestionar',       delay: 150 },
  { href: '/dashboard/admin/reportes',       icon: BarChart2,     label: 'Reportes',       desc: 'Estadísticas globales',     delay: 200 },
  { href: '/dashboard/admin/notificaciones', icon: Bell,          label: 'Notificaciones', desc: 'Enviar avisos',             delay: 250 },
  { href: '/dashboard/admin/configuracion',  icon: Settings,      label: 'Configuración',  desc: 'Ajustes del sistema',       delay: 300 },
]

const stats = [
  { label: 'Total Usuarios',   value: '0', icon: Users,         sub: 'registrados',   delay: 0 },
  { label: 'Cursos Activos',   value: '0', icon: BookOpen,      sub: 'en curso',      delay: 75 },
  { label: 'Instructores',     value: '0', icon: GraduationCap, sub: 'activos',       delay: 150 },
  { label: 'Inscripciones',    value: '0', icon: UserCheck,     sub: 'este período',  delay: 225 },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [isLoading, user, router])

  if (isLoading) return (
    <div className="min-h-screen wine-hero-gradient flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  )
  if (!user) return null

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Aula Virtual — Administración" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Welcome banner */}
          <div className="wine-hero-gradient rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden animate-fade-in-up">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/4 rounded-full" />
            <div className="absolute -right-4 -bottom-8 w-28 h-28 bg-white/3 rounded-full" />
            <div className="relative">
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-1">Panel de Administración</p>
              <h2 className="text-xl sm:text-2xl font-black">
                Hola, {user.profile?.firstName || user.email?.split('@')[0]} 🛡️
              </h2>
              <p className="text-white/40 text-sm mt-1">Gestiona toda la plataforma educativa de Avior SRL.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => {
              const Icon = s.icon
              return (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${s.delay}ms` }}
                >
                  <div className="w-9 h-9 wine-gradient rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">{s.value}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              )
            })}
          </div>

          {/* Actions grid */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Gestión del Sistema</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {adminActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="bg-white rounded-2xl p-4 border border-gray-100 card-hover group flex flex-col gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${action.delay + 300}ms` }}
                  >
                    <div className="w-9 h-9 wine-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-xs leading-tight">{action.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-wine transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '500ms' }}>
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-50">
              <h3 className="font-bold text-gray-900 text-sm">Actividad Reciente</h3>
              <Link href="/dashboard/admin/reportes" className="text-xs text-wine font-semibold hover:underline flex items-center gap-1">
                Ver todo <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="p-8 text-center">
              <TrendingUp className="w-10 h-10 text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Sin actividad reciente.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
