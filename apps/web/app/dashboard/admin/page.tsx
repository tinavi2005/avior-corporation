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
  { href: '/dashboard/admin/usuarios',       icon: Users,         label: 'Usuarios',       desc: 'Crear y editar cuentas' },
  { href: '/dashboard/admin/cursos',         icon: BookOpen,      label: 'Cursos',         desc: 'Asignar y configurar' },
  { href: '/dashboard/admin/horarios',       icon: Calendar,      label: 'Horarios',       desc: 'Programar clases' },
  { href: '/dashboard/admin/instructores',   icon: GraduationCap, label: 'Instructores',   desc: 'Asignar y gestionar' },
  { href: '/dashboard/admin/reportes',       icon: BarChart2,     label: 'Reportes',       desc: 'Estadísticas globales' },
  { href: '/dashboard/admin/notificaciones', icon: Bell,          label: 'Notificaciones', desc: 'Enviar avisos' },
  { href: '/dashboard/admin/configuracion',  icon: Settings,      label: 'Configuración',  desc: 'Ajustes del sistema' },
]

const stats = [
  { label: 'Total Usuarios',   value: '45', icon: Users,         sub: 'registrados' },
  { label: 'Cursos Activos',   value: '3',  icon: BookOpen,      sub: 'en curso' },
  { label: 'Instructores',     value: '4',  icon: GraduationCap, sub: 'activos' },
  { label: 'Inscripciones',    value: '45', icon: UserCheck,     sub: 'este período' },
]

const actividadReciente = [
  { icon: '📝', desc: 'Carlos Mamani inscrito en Piloto Comercial',           fecha: 'Hoy 09:30' },
  { icon: '📊', desc: 'Cap. Flores publicó calificaciones de Meteorología',   fecha: 'Hoy 08:15' },
  { icon: '✅', desc: 'Lista de asistencia tomada — Radio Comunicaciones G-A', fecha: 'Ayer 10:00' },
  { icon: '📋', desc: 'Nuevo examen publicado: Navegación G-B',               fecha: 'Ayer 09:00' },
  { icon: '📝', desc: 'Valeria Torrico inscrita en Tripulante de Cabina',     fecha: '22 Jun' },
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

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

          {/* Welcome */}
          <div className="wine-hero-gradient rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden animate-fade-in-up">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/4 rounded-full pointer-events-none" />
            <div className="absolute -right-4 -bottom-8 w-28 h-28 bg-white/3 rounded-full pointer-events-none" />
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
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.label}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 card-hover animate-fade-in-up shadow-sm"
                  style={{ animationDelay: `${i * 75}ms` }}>
                  <div className="w-9 h-9 wine-gradient rounded-xl flex items-center justify-center mb-3 shadow-sm">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-[#0d0d0d]">{s.value}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mt-0.5">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              )
            })}
          </div>

          {/* Actions */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Gestión del Sistema</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
              {adminActions.map((action, i) => {
                const Icon = action.icon
                return (
                  <Link key={action.href} href={action.href}
                    className="bg-white rounded-2xl p-4 border border-gray-100 card-hover group flex flex-col gap-3 shadow-sm animate-fade-in-up"
                    style={{ animationDelay: `${i * 40 + 300}ms` }}>
                    <div className="w-9 h-9 wine-gradient rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-[#0d0d0d] text-xs leading-tight">{action.label}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{action.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-wine transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Two columns: Actividad + Accesos rápidos */}
          <div className="grid lg:grid-cols-2 gap-5 animate-fade-in-up" style={{ animationDelay: '450ms' }}>

            {/* Actividad reciente */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-wine" />
                  <h3 className="font-bold text-[#0d0d0d] text-sm">Actividad Reciente</h3>
                </div>
                <Link href="/dashboard/admin/reportes" className="text-xs text-wine font-semibold hover:underline flex items-center gap-1">
                  Ver todo <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="divide-y divide-gray-50">
                {actividadReciente.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                    <span className="text-lg shrink-0">{a.icon}</span>
                    <p className="text-sm text-[#0d0d0d] flex-1 min-w-0 truncate">{a.desc}</p>
                    <span className="text-xs text-gray-400 shrink-0">{a.fecha}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accesos directos */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-50">
                <Settings className="w-4 h-4 text-wine" />
                <h3 className="font-bold text-[#0d0d0d] text-sm">Accesos Directos</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {[
                  { href: '/dashboard/admin/usuarios',     label: 'Nuevo usuario',           icon: Users },
                  { href: '/dashboard/admin/cursos',       label: 'Gestionar cursos',         icon: BookOpen },
                  { href: '/dashboard/admin/horarios',     label: 'Programar horarios',       icon: Calendar },
                  { href: '/dashboard/admin/notificaciones',label: 'Enviar notificación',     icon: Bell },
                  { href: '/dashboard/admin/reportes',     label: 'Ver reportes completos',   icon: BarChart2 },
                ].map(item => {
                  const Icon = item.icon
                  return (
                    <Link key={item.href} href={item.href}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group">
                      <div className="w-8 h-8 wine-gradient rounded-lg flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-[#0d0d0d] flex-1">{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-wine transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
