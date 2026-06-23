'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { api, type Enrollment, type Grade } from '@/lib/api/client'
import { DashboardHeader } from '../_components/dashboard-header'
import { Sidebar } from '../_components/sidebar'
import {
  BookOpen, BarChart2, Calendar, CreditCard,
  ClipboardList, UserCheck, MessageSquare, TrendingUp,
  Clock, CheckCircle2, ArrowRight, Loader2,
} from 'lucide-react'
import Link from 'next/link'

const quickLinks = [
  { href: '/dashboard/student/horario',        icon: Calendar,     label: 'Mi Horario',     color: 'wine-gradient' },
  { href: '/dashboard/student/tareas',         icon: ClipboardList,label: 'Tareas',          color: 'bg-zinc-800' },
  { href: '/dashboard/student/calificaciones', icon: BarChart2,    label: 'Calificaciones', color: 'bg-zinc-700' },
  { href: '/dashboard/student/asistencia',     icon: UserCheck,    label: 'Asistencia',     color: 'bg-zinc-900' },
  { href: '/dashboard/student/carnet',         icon: CreditCard,   label: 'Carnet',         color: 'bg-brand-dark' },
  { href: '/dashboard/student/chat',           icon: MessageSquare,label: 'Chat',           color: 'bg-zinc-800' },
]

export default function StudentDashboardPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
  }, [authLoading, user, router])

  useEffect(() => {
    if (user) {
      api.getStudentEnrollments(user.id).catch((): Enrollment[] => []).then(setEnrollments)
      api.getStudentGrades(user.id).catch((): Grade[] => []).then(setGrades)
      api.getCourses().catch((): any[] => []).then(setCourses).finally(() => setDataLoading(false))
    }
  }, [user])

  if (authLoading) return (
    <div className="min-h-screen wine-hero-gradient flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-white animate-spin" />
    </div>
  )
  if (!user) return null

  const avg = grades.length ? grades.reduce((s, g) => s + g.grade, 0) / grades.length : 0
  const activeEnrollments = enrollments.filter(e => e.status === 'active').length

  const stats = [
    { label: 'Cursos Inscritos', value: enrollments.length, sub: `${activeEnrollments} activos`, icon: BookOpen, delay: 0 },
    { label: 'Promedio', value: avg > 0 ? avg.toFixed(1) : '—', sub: `${grades.length} notas`, icon: TrendingUp, delay: 75 },
    { label: 'Tareas pendientes', value: '0', sub: 'Al día', icon: ClipboardList, delay: 150 },
    { label: 'Asistencia', value: '95%', sub: 'Este mes', icon: CheckCircle2, delay: 225 },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Aula Virtual — Estudiante" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          {/* Welcome banner */}
          <div className="wine-gradient rounded-2xl p-5 sm:p-6 text-white relative overflow-hidden animate-fade-in-up">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/5 rounded-full" />
            <div className="absolute -right-4 -bottom-6 w-24 h-24 bg-white/5 rounded-full" />
            <div className="relative">
              <h2 className="text-xl sm:text-2xl font-black">
                Hola, {user.profile?.firstName || user.email?.split('@')[0]} 👋
              </h2>
              <p className="text-white/60 text-sm mt-1">Bienvenido a tu aula virtual. Tu progreso te espera.</p>
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
                  <p className="text-2xl sm:text-3xl font-black text-gray-900">{dataLoading ? '—' : s.value}</p>
                  <p className="text-xs sm:text-sm font-medium text-gray-500 mt-0.5">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
                </div>
              )
            })}
          </div>

          {/* Quick access */}
          <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest mb-3">Acceso Rápido</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
              {quickLinks.map((ql, i) => {
                const Icon = ql.icon
                return (
                  <Link
                    key={ql.href}
                    href={ql.href}
                    className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-2xl p-3 sm:p-4 card-hover group text-center"
                    style={{ animationDelay: `${350 + i * 50}ms` }}
                  >
                    <div className={`w-9 h-9 sm:w-10 sm:h-10 ${ql.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="text-[10px] sm:text-xs font-medium text-gray-500 leading-tight">{ql.label}</span>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Courses */}
          <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Mis Cursos</h3>
              {enrollments.length > 0 && (
                <Link href="/dashboard/student/horario" className="text-xs text-wine font-semibold hover:underline flex items-center gap-1">
                  Ver horario <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
            {dataLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 text-wine animate-spin" />
              </div>
            ) : enrollments.length === 0 ? (
              <div className="bg-white rounded-2xl p-8 sm:p-10 text-center border border-gray-100">
                <BookOpen className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium text-sm">Sin cursos inscritos aún.</p>
                <p className="text-gray-400 text-xs mt-1">Contacta a tu asesor académico.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {enrollments.map((en, i) => {
                  const course = courses.find(c => c.id === en.courseId)
                  return (
                    <div
                      key={en.id}
                      className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 card-hover animate-fade-in-up"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-9 h-9 wine-gradient rounded-xl flex items-center justify-center shadow-sm">
                          <BookOpen className="w-4 h-4 text-white" />
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                          en.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {en.status === 'active' ? 'Activo' : en.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm">{course?.name || 'Curso'}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{course?.code || '—'}</p>
                      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-400">
                        <Clock className="w-3 h-3" /> Activo
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
