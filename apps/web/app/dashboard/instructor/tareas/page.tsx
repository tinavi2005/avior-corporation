'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { PlusCircle, ClipboardList, Calendar, Users, Trash2, Edit2 } from 'lucide-react'

type Tarea = {
  id: number
  titulo: string
  materia: string
  descripcion: string
  fechaLimite: string
  entregados: number
  total: number
}

const tareasInicio: Tarea[] = [
  {
    id: 1,
    titulo: 'Análisis de cartas sinópticas',
    materia: 'Meteorología Aeronáutica',
    descripcion: 'Descargar e interpretar 3 cartas sinópticas de los últimos 7 días.',
    fechaLimite: '2025-06-28',
    entregados: 3,
    total: 5,
  },
  {
    id: 2,
    titulo: 'Ejercicio de navegación triangular',
    materia: 'Navegación y Planificación',
    descripcion: 'Calcular rutas entre 3 aeropuertos usando la regla de navegación.',
    fechaLimite: '2025-07-01',
    entregados: 1,
    total: 5,
  },
]

export default function TareasInstructorPage() {
  const [tareas, setTareas] = useState<Tarea[]>(tareasInicio)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ titulo: '', materia: '', descripcion: '', fechaLimite: '' })

  const handleCreate = () => {
    if (!form.titulo || !form.materia) return
    setTareas([...tareas, {
      id: Date.now(),
      ...form,
      entregados: 0,
      total: 5,
    }])
    setForm({ titulo: '', materia: '', descripcion: '', fechaLimite: '' })
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setTareas(tareas.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Tareas" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Gestión de Tareas</h2>
              <p className="text-gray-500 mt-1">Crea, edita y revisa las tareas de tus alumnos.</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-5 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Nueva Tarea
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-5">Crear Nueva Tarea</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Título *</label>
                  <input
                    value={form.titulo}
                    onChange={(e) => setForm({ ...form, titulo: e.target.value })}
                    placeholder="Título de la tarea"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Materia *</label>
                  <select
                    value={form.materia}
                    onChange={(e) => setForm({ ...form, materia: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine bg-white"
                  >
                    <option value="">Seleccionar materia</option>
                    <option>Meteorología Aeronáutica</option>
                    <option>Navegación y Planificación</option>
                    <option>Radio Comunicaciones</option>
                    <option>Inglés Aeronáutico</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Fecha límite</label>
                  <input
                    type="date"
                    value={form.fechaLimite}
                    onChange={(e) => setForm({ ...form, fechaLimite: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Descripción</label>
                  <input
                    value={form.descripcion}
                    onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    placeholder="Instrucciones breves..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleCreate} className="px-5 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all">
                  Crear Tarea
                </button>
                <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de tareas */}
          <div className="space-y-4">
            {tareas.map((tarea) => {
              const pct = Math.round((tarea.entregados / tarea.total) * 100)
              return (
                <div key={tarea.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                        <ClipboardList className="w-5 h-5 text-amber-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{tarea.titulo}</h4>
                        <p className="text-sm text-wine font-medium mt-0.5">{tarea.materia}</p>
                        <p className="text-sm text-gray-500 mt-1">{tarea.descripcion}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            Límite: {tarea.fechaLimite || 'Sin fecha'}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-400">
                            <Users className="w-3.5 h-3.5" />
                            {tarea.entregados}/{tarea.total} entregados
                          </div>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">Progreso de entregas</span>
                            <span className="text-xs font-bold text-gray-600">{pct}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className="wine-gradient h-2 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button className="p-2 hover:bg-wine-pale rounded-lg transition-colors text-wine">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tarea.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}

            {tareas.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <ClipboardList className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400">No hay tareas creadas aún.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
