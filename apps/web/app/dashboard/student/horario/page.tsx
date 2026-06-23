'use client'

import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Clock, BookOpen } from 'lucide-react'

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const horarios = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']

// Mock schedule data
const clases = [
  { dia: 'Lunes', hora: '08:00', materia: 'Meteorología', instructor: 'Cap. Flores', color: 'bg-wine-pale border-wine/40 text-wine' },
  { dia: 'Lunes', hora: '09:00', materia: 'Meteorología', instructor: 'Cap. Flores', color: 'bg-wine-pale border-wine/40 text-wine' },
  { dia: 'Martes', hora: '10:00', materia: 'Navegación', instructor: 'Cap. Quispe', color: 'bg-green-100 border-green-400 text-green-800' },
  { dia: 'Miércoles', hora: '08:00', materia: 'Radio Comunicaciones', instructor: 'Lic. Saavedra', color: 'bg-amber-100 border-amber-400 text-amber-800' },
  { dia: 'Jueves', hora: '14:00', materia: 'Inglés Aeronáutico', instructor: 'Prof. Lima', color: 'bg-zinc-100 border-zinc-400 text-zinc-800' },
  { dia: 'Viernes', hora: '09:00', materia: 'Reglamentación', instructor: 'Cap. Flores', color: 'bg-red-100 border-red-400 text-red-800' },
]

export default function HorarioPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Mi Horario" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900">Horario Interactivo</h2>
            <p className="text-gray-500 mt-1">Tu horario de clases de la semana actual.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left p-4 text-xs font-bold text-gray-400 uppercase w-20">
                    <Clock className="w-4 h-4" />
                  </th>
                  {dias.map((d) => (
                    <th key={d} className="text-center p-4 text-sm font-bold text-gray-700">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {horarios.map((hora) => (
                  <tr key={hora} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-3 text-xs font-mono text-gray-400 font-medium">{hora}</td>
                    {dias.map((dia) => {
                      const clase = clases.find((c) => c.dia === dia && c.hora === hora)
                      return (
                        <td key={dia} className="p-2">
                          {clase ? (
                            <div className={`${clase.color} border-l-4 rounded-lg px-3 py-2`}>
                              <p className="text-xs font-bold leading-tight">{clase.materia}</p>
                              <p className="text-xs opacity-70 mt-0.5">{clase.instructor}</p>
                            </div>
                          ) : (
                            <div className="h-8" />
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Leyenda */}
          <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-700 text-sm mb-3">Materias Inscritas</h3>
            <div className="flex flex-wrap gap-3">
              {[...new Set(clases.map((c) => c.materia))].map((materia) => {
                const clase = clases.find((c) => c.materia === materia)!
                return (
                  <div key={materia} className={`${clase.color} border-l-4 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold`}>
                    <BookOpen className="w-3 h-3" />
                    {materia}
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
