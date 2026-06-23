'use client'

import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

const calificaciones = [
  {
    materia: 'Meteorología Aeronáutica',
    instructor: 'Cap. Flores',
    notas: [
      { tipo: 'Tarea 1', nota: 85, fecha: '2025-05-10' },
      { tipo: 'Examen Parcial', nota: 78, fecha: '2025-05-25' },
      { tipo: 'Tarea 2', nota: 90, fecha: '2025-06-05' },
    ],
  },
  {
    materia: 'Navegación y Planificación',
    instructor: 'Cap. Quispe',
    notas: [
      { tipo: 'Práctica 1', nota: 92, fecha: '2025-05-12' },
      { tipo: 'Examen Parcial', nota: 88, fecha: '2025-05-28' },
    ],
  },
  {
    materia: 'Radio Comunicaciones',
    instructor: 'Lic. Saavedra',
    notas: [
      { tipo: 'Evaluación 1', nota: 70, fecha: '2025-06-01' },
    ],
  },
]

function getGradeColor(nota: number) {
  if (nota >= 90) return 'text-green-600 bg-green-50'
  if (nota >= 75) return 'text-wine bg-wine-pale'
  if (nota >= 60) return 'text-amber-600 bg-amber-50'
  return 'text-red-600 bg-red-50'
}

export default function CalificacionesPage() {
  const allNotas = calificaciones.flatMap((m) => m.notas.map((n) => n.nota))
  const promedioGeneral = allNotas.length > 0
    ? (allNotas.reduce((a, b) => a + b, 0) / allNotas.length).toFixed(1)
    : '--'

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Calificaciones" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900">Mis Calificaciones</h2>
            <p className="text-gray-500 mt-1">Resultados de tareas, exámenes y evaluaciones.</p>
          </div>

          {/* Promedio general card */}
          <div className="wine-gradient rounded-2xl p-6 mb-8 flex items-center gap-6">
            <div>
              <p className="text-white/60 text-sm font-medium mb-1">Promedio General</p>
              <p className="text-5xl font-black text-white">{promedioGeneral}</p>
            </div>
            <div className="h-14 w-px bg-white/20" />
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-white/50 text-xs">Materias</p>
                <p className="text-white font-bold text-lg">{calificaciones.length}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Evaluaciones</p>
                <p className="text-white font-bold text-lg">{allNotas.length}</p>
              </div>
              <div>
                <p className="text-white/50 text-xs">Aprobados</p>
                <p className="text-[#f5a623] font-bold text-lg">{allNotas.filter((n) => n >= 51).length}</p>
              </div>
            </div>
          </div>

          {/* Por materia */}
          <div className="space-y-5">
            {calificaciones.map((mat) => {
              const prom = mat.notas.reduce((a, b) => a + b.nota, 0) / mat.notas.length
              return (
                <div key={mat.materia} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{mat.materia}</h3>
                      <p className="text-sm text-gray-400">{mat.instructor}</p>
                    </div>
                    <div className={`text-xl font-black px-4 py-2 rounded-xl ${getGradeColor(prom)}`}>
                      {prom.toFixed(1)}
                    </div>
                  </div>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-6 py-2.5 text-xs font-bold text-gray-400 uppercase">Evaluación</th>
                        <th className="text-left px-6 py-2.5 text-xs font-bold text-gray-400 uppercase">Fecha</th>
                        <th className="text-right px-6 py-2.5 text-xs font-bold text-gray-400 uppercase">Nota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {mat.notas.map((nota, i) => (
                        <tr key={i} className="hover:bg-gray-50/50">
                          <td className="px-6 py-3 text-sm font-medium text-gray-800">{nota.tipo}</td>
                          <td className="px-6 py-3 text-sm text-gray-400">{nota.fecha}</td>
                          <td className="px-6 py-3 text-right">
                            <span className={`inline-block text-sm font-black px-3 py-1 rounded-lg ${getGradeColor(nota.nota)}`}>
                              {nota.nota}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
