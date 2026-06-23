'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Save, Edit3, Check } from 'lucide-react'

const alumnos = [
  { id: '1', nombre: 'Carlos Mamani' },
  { id: '2', nombre: 'Valeria Torrico' },
  { id: '3', nombre: 'Jorge Vásquez' },
  { id: '4', nombre: 'María Flores' },
  { id: '5', nombre: 'Roberto Quispe' },
]

const evaluaciones = ['Tarea 1', 'Tarea 2', 'Examen Parcial', 'Práctica', 'Examen Final']

function getGradeColor(nota: number | null) {
  if (nota === null) return 'text-gray-300'
  if (nota >= 90) return 'text-green-600'
  if (nota >= 75) return 'text-wine'
  if (nota >= 51) return 'text-amber-500'
  return 'text-red-600'
}

export default function CalificacionesInstructorPage() {
  const [notas, setNotas] = useState<Record<string, Record<string, number | null>>>(
    Object.fromEntries(
      alumnos.map((a) => [
        a.id,
        Object.fromEntries(
          evaluaciones.map((e) => [e, Math.random() > 0.3 ? Math.floor(Math.random() * 50) + 50 : null])
        ),
      ])
    )
  )
  const [editingCell, setEditingCell] = useState<{ alumnoId: string; eval: string } | null>(null)
  const [saved, setSaved] = useState(false)

  const handleEdit = (alumnoId: string, ev: string, value: string) => {
    const num = value === '' ? null : Math.min(100, Math.max(0, parseInt(value)))
    setNotas((prev) => ({
      ...prev,
      [alumnoId]: { ...prev[alumnoId], [ev]: isNaN(num as number) ? null : num },
    }))
  }

  const handleSave = () => {
    setEditingCell(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Calificaciones" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Registro de Calificaciones</h2>
              <p className="text-gray-500 mt-1">Edita las notas haciendo clic en cada celda.</p>
            </div>
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all shadow-md ${
                saved ? 'bg-green-500 text-white' : 'wine-gradient text-white hover:opacity-90'
              }`}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? '¡Guardado!' : 'Guardar'}
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-5 py-3 text-xs font-bold text-gray-400 uppercase sticky left-0 bg-gray-50">
                    Alumno
                  </th>
                  {evaluaciones.map((ev) => (
                    <th key={ev} className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase whitespace-nowrap">
                      {ev}
                    </th>
                  ))}
                  <th className="text-center px-4 py-3 text-xs font-bold text-gray-400 uppercase">Promedio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {alumnos.map((alumno) => {
                  const notasAlumno = notas[alumno.id]
                  const valid = Object.values(notasAlumno).filter((n) => n !== null) as number[]
                  const prom = valid.length > 0 ? valid.reduce((a, b) => a + b, 0) / valid.length : null

                  return (
                    <tr key={alumno.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-3 sticky left-0 bg-white hover:bg-gray-50/50">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 wine-gradient rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {alumno.nombre.charAt(0)}
                          </div>
                          <span className="font-semibold text-gray-800 text-sm whitespace-nowrap">{alumno.nombre}</span>
                        </div>
                      </td>
                      {evaluaciones.map((ev) => {
                        const nota = notasAlumno[ev]
                        const isEditing = editingCell?.alumnoId === alumno.id && editingCell?.eval === ev

                        return (
                          <td key={ev} className="px-3 py-2 text-center">
                            {isEditing ? (
                              <input
                                type="number"
                                min={0}
                                max={100}
                                value={nota ?? ''}
                                onChange={(e) => handleEdit(alumno.id, ev, e.target.value)}
                                onBlur={() => setEditingCell(null)}
                                autoFocus
                                className="w-14 text-center px-2 py-1 border border-wine rounded-lg text-sm focus:outline-none"
                              />
                            ) : (
                              <button
                                onClick={() => setEditingCell({ alumnoId: alumno.id, eval: ev })}
                                className={`w-14 py-1 rounded-lg text-sm font-bold hover:bg-gray-100 transition-colors ${getGradeColor(nota)}`}
                              >
                                {nota !== null ? nota : <span className="text-gray-300">--</span>}
                              </button>
                            )}
                          </td>
                        )
                      })}
                      <td className="px-4 py-3 text-center">
                        <span className={`text-base font-black ${getGradeColor(prom)}`}>
                          {prom !== null ? prom.toFixed(1) : '--'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            Haz clic en cualquier nota para editarla. Notas de 0 a 100.
          </p>
        </main>
      </div>
    </div>
  )
}
