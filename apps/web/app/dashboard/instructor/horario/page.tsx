'use client'

import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Clock, BookOpen } from 'lucide-react'

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const horas = ['07:00','08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00']

const clases = [
  { dia: 'Lunes',     hora: '08:00', materia: 'Meteorología Aeronáutica',  salon: 'Aula 1',  grupo: 'G-A', color: 'bg-wine/10 border-l-4 border-wine text-wine' },
  { dia: 'Lunes',     hora: '09:00', materia: 'Meteorología Aeronáutica',  salon: 'Aula 1',  grupo: 'G-A', color: 'bg-wine/10 border-l-4 border-wine text-wine' },
  { dia: 'Martes',    hora: '10:00', materia: 'Navegación y Planificación', salon: 'Aula 2',  grupo: 'G-B', color: 'bg-zinc-100 border-l-4 border-zinc-400 text-zinc-700' },
  { dia: 'Miércoles', hora: '08:00', materia: 'Radio Comunicaciones',       salon: 'Lab 1',   grupo: 'G-A', color: 'bg-zinc-200 border-l-4 border-zinc-600 text-zinc-800' },
  { dia: 'Jueves',    hora: '14:00', materia: 'Inglés Aeronáutico',         salon: 'Aula 3',  grupo: 'G-C', color: 'bg-stone-100 border-l-4 border-stone-400 text-stone-700' },
  { dia: 'Viernes',   hora: '09:00', materia: 'Meteorología Aeronáutica',   salon: 'Aula 1',  grupo: 'G-B', color: 'bg-wine/10 border-l-4 border-wine text-wine' },
]

export default function HorarioInstructorPage() {
  const materias = [...new Set(clases.map(c => c.materia))]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Mi Horario" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="mb-6">
            <h2 className="text-2xl font-black text-[#0d0d0d]">Mi Horario de Clases</h2>
            <p className="text-gray-500 mt-1 text-sm">Vista semanal de tus clases asignadas.</p>
          </div>

          {/* Resumen */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Clases esta semana', value: clases.length },
              { label: 'Horas semanales',   value: clases.length },
              { label: 'Materias',          value: materias.length },
              { label: 'Grupos',            value: [...new Set(clases.map(c => c.grupo))].length },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-[#0d0d0d]">{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tabla */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase w-20">
                    <Clock className="w-4 h-4" />
                  </th>
                  {dias.map(d => (
                    <th key={d} className="text-center p-4 text-sm font-bold text-[#0d0d0d]">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {horas.map(hora => (
                  <tr key={hora} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-3 text-xs font-mono text-gray-400 font-medium">{hora}</td>
                    {dias.map(dia => {
                      const clase = clases.find(c => c.dia === dia && c.hora === hora)
                      return (
                        <td key={dia} className="p-2">
                          {clase ? (
                            <div className={`${clase.color} rounded-lg px-3 py-2 text-xs`}>
                              <p className="font-bold leading-tight truncate">{clase.materia}</p>
                              <p className="opacity-70 mt-0.5">{clase.salon} · {clase.grupo}</p>
                            </div>
                          ) : <div className="h-8" />}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="mt-5 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Mis Materias</p>
            <div className="flex flex-wrap gap-2">
              {clases.reduce<{materia: string; color: string}[]>((acc, c) => {
                if (!acc.find(x => x.materia === c.materia)) acc.push({ materia: c.materia, color: c.color })
                return acc
              }, []).map(m => (
                <div key={m.materia} className={`${m.color} px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold`}>
                  <BookOpen className="w-3 h-3" />{m.materia}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
