'use client'

import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { BarChart2, TrendingUp, Users, BookOpen, UserCheck, GraduationCap } from 'lucide-react'

const kpis = [
  { label: 'Total Estudiantes',  value: '45',   change: '+5 este mes',  icon: Users,        color: 'wine-gradient' },
  { label: 'Cursos Activos',     value: '3',    change: 'Sin cambios',  icon: BookOpen,     color: 'bg-[#0d0d0d]' },
  { label: 'Tasa de Asistencia', value: '87%',  change: '+2% vs mes ant.', icon: UserCheck, color: 'bg-zinc-800' },
  { label: 'Instructores',       value: '4',    change: '3 activos',    icon: GraduationCap,color: 'bg-zinc-700' },
]

const asistenciaPorCurso = [
  { curso: 'Piloto Comercial',     pct: 91, alumnos: 15 },
  { curso: 'Tripulante de Cabina', pct: 85, alumnos: 20 },
  { curso: 'Despachador de Vuelo', pct: 78, alumnos: 10 },
]

const calificacionesPorCurso = [
  { curso: 'Piloto Comercial',     promedio: 82.4, aprobados: 13, reprobados: 2 },
  { curso: 'Tripulante de Cabina', promedio: 79.1, aprobados: 17, reprobados: 3 },
  { curso: 'Despachador de Vuelo', promedio: 85.0, aprobados: 10, reprobados: 0 },
]

const actividadReciente = [
  { tipo: 'Inscripción', desc: 'Carlos Mamani inscrito en Piloto Comercial', fecha: 'Hoy 09:30', icon: '📝' },
  { tipo: 'Calificación', desc: 'Cap. Flores publicó notas de Meteorología', fecha: 'Hoy 08:15', icon: '📊' },
  { tipo: 'Asistencia', desc: 'Lista tomada — Radio Comunicaciones G-A', fecha: 'Ayer 10:00', icon: '✅' },
  { tipo: 'Examen', desc: 'Nuevo examen publicado: Navegación G-B', fecha: 'Ayer 09:00', icon: '📋' },
  { tipo: 'Inscripción', desc: 'Valeria Torrico inscrita en Tripulante de Cabina', fecha: '22 Jun', icon: '📝' },
]

export default function ReportesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Reportes" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

          <div className="mb-2">
            <h2 className="text-2xl font-black text-[#0d0d0d]">Reportes y Estadísticas</h2>
            <p className="text-gray-500 mt-1 text-sm">Resumen del estado académico de la plataforma.</p>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {kpis.map((k, i) => {
              const Icon = k.icon
              return (
                <div key={k.label} className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm card-hover animate-fade-in-up"
                  style={{ animationDelay: `${i * 75}ms` }}>
                  <div className={`w-10 h-10 ${k.color} rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-[#0d0d0d]">{k.value}</p>
                  <p className="text-sm font-medium text-gray-600 mt-0.5">{k.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{k.change}</p>
                </div>
              )
            })}
          </div>

          {/* Asistencia y Calificaciones */}
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Asistencia */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <UserCheck className="w-5 h-5 text-wine" />
                <h3 className="font-bold text-[#0d0d0d] text-sm">Asistencia por Curso</h3>
              </div>
              <div className="p-5 space-y-4">
                {asistenciaPorCurso.map(c => (
                  <div key={c.curso}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-[#0d0d0d] truncate">{c.curso}</span>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-xs text-gray-400">{c.alumnos} alumnos</span>
                        <span className={`text-xs font-bold ${c.pct >= 85 ? 'text-emerald-600' : c.pct >= 75 ? 'text-amber-500' : 'text-red-500'}`}>{c.pct}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all ${c.pct >= 85 ? 'bg-emerald-500' : c.pct >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calificaciones */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <BarChart2 className="w-5 h-5 text-wine" />
                <h3 className="font-bold text-[#0d0d0d] text-sm">Calificaciones por Curso</h3>
              </div>
              <div className="divide-y divide-gray-50">
                {calificacionesPorCurso.map(c => (
                  <div key={c.curso} className="px-5 py-3.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[#0d0d0d] truncate">{c.curso}</span>
                      <span className="text-lg font-black text-wine ml-2">{c.promedio.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-emerald-600">✓ {c.aprobados} aprobados</span>
                      <span className="text-xs text-red-500">✗ {c.reprobados} reprobados</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
              <TrendingUp className="w-5 h-5 text-wine" />
              <h3 className="font-bold text-[#0d0d0d] text-sm">Actividad Reciente</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {actividadReciente.map((a, i) => (
                <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                  <span className="text-xl shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#0d0d0d] font-medium truncate">{a.desc}</p>
                    <p className="text-xs text-gray-400">{a.tipo}</p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0">{a.fecha}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
