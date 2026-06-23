'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { DashboardHeader } from '../_components/dashboard-header'
import { Sidebar } from '../_components/sidebar'
import {
  BookOpen, Users, Calendar, ClipboardList,
  FileText, BarChart2, MessageSquare, UserCheck,
  ArrowRight, Loader2, AlertCircle,
} from 'lucide-react'
import Link from 'next/link'

const quickActions = [
  { href: '/dashboard/instructor/asistencia',     icon: UserCheck,    label: 'Pasar Lista',    color: 'wine-gradient' },
  { href: '/dashboard/instructor/tareas',         icon: ClipboardList,label: 'Nueva Tarea',    color: 'bg-zinc-800' },
  { href: '/dashboard/instructor/examenes',       icon: FileText,     label: 'Nuevo Examen',   color: 'bg-zinc-700' },
  { href: '/dashboard/instructor/calificaciones', icon: BarChart2,    label: 'Calificaciones', color: 'bg-zinc-900' },
  { href: '/dashboard/instructor/chat',           icon: MessageSquare,label: 'Chat',           color: 'bg-brand-dark' },
  { href: '/dashboard/instructor/horario',        icon: Calendar,     label: 'Mi Horario',     color: 'bg-zinc-800' },
]

const pendingItems = [
  { tipo: 'Tareas por calificar',   materia: 'Meteorología',        cantidad: 3 },
  { tipo: 'Asistencia pendiente',   materia: 'Radio Comunicaciones', cantidad: 1 },
  { tipo: 'Exámenes por revisar',   materia: 'Navegación',          cantidad: 2 },
]

const stats = [
  { label: 'Mis Clases',  value: '0', icon: BookOpen,     delay: 0 },
  { label: 'Estudiantes', value: '0', icon: Users,        delay: 75 },
  { label: 'Tareas',      value: '0', icon: ClipboardList,delay: 150 },
  { label: 'Exámenes',    value: '0', icon: FileText,     delay: 225 },
]

export default function InstructorDashboardPage() {
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
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Aula Virtual — Instructor" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Welcome */}
          <div className="bg-[#0d0d0d] rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden animate-fade-in-up">
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/3 rounded-full" />
            <div className="absolute -right-2 -bottom-4 w-20 h-20 bg-wine/10 rounded-full" />
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-black">
                Hola, {user.profile?.firstName || user.email?.split('@')[0]} ✈️
              </h2>
              <p className="text-white/40 text-sm mt-1">Panel de control del instructor — Avior SRL</p>
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
                  <div className="w-9 h-9 bg-[#0d0d0d] rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-3xl font-black text-gray-900">{s.value}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">{s.label}</p>
                </div>
              )
            })}
          </div>

          {/* Quick actions */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Acciones Rápidas</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {quickActions.map((qa, i) => {
                const Icon = qa.icon
                return (
                  <Link
                    key={qa.href}
                    href={qa.href}
                    className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 card-hover group text-center"
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 ${qa.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500 leading-tight">{qa.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Two columns */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in-up" style={{ animationDelay: '350ms' }}>
            {/* Pendientes */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Pendientes</h3>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
                {pendingItems.map((item, i) => (
                  <div key={item.tipo} className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-wine shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{item.tipo}</p>
                        <p className="text-xs text-gray-400">{item.materia}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full wine-gradient text-white shadow-sm">
                      {item.cantidad}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Próximas clases */}
            <div>
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Próximas Clases</h3>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
                <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Sin clases programadas próximamente.</p>
                <Link href="/dashboard/instructor/horario" className="inline-flex items-center gap-1.5 mt-3 text-xs text-wine font-semibold hover:underline">
                  Ver horario <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
