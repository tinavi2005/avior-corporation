'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { PlusCircle, ClipboardList, Calendar, Users, Trash2, Edit2, X, Save } from 'lucide-react'

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
  { id: 1, titulo: 'Análisis de cartas sinópticas', materia: 'Meteorología Aeronáutica', descripcion: 'Descargar e interpretar 3 cartas sinópticas de los últimos 7 días.', fechaLimite: '2025-06-28', entregados: 3, total: 5 },
  { id: 2, titulo: 'Ejercicio de navegación triangular', materia: 'Navegación y Planificación', descripcion: 'Calcular rutas entre 3 aeropuertos usando la regla de navegación.', fechaLimite: '2025-07-01', entregados: 1, total: 5 },
]

const MATERIAS = ['Meteorología Aeronáutica','Navegación y Planificación','Radio Comunicaciones','Inglés Aeronáutico']
const EMPTY_FORM = { titulo: '', materia: '', descripcion: '', fechaLimite: '' }

export default function TareasInstructorPage() {
  const [tareas, setTareas] = useState<Tarea[]>(tareasInicio)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState<{ titulo?: string; materia?: string }>({})

  const validate = () => {
    const e: { titulo?: string; materia?: string } = {}
    if (!form.titulo.trim()) e.titulo = 'El título es requerido'
    if (!form.materia) e.materia = 'Selecciona una materia'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const openCreate = () => {
    setEditId(null)
    setForm(EMPTY_FORM)
    setErrors({})
    setShowForm(true)
  }

  const openEdit = (t: Tarea) => {
    setEditId(t.id)
    setForm({ titulo: t.titulo, materia: t.materia, descripcion: t.descripcion, fechaLimite: t.fechaLimite })
    setErrors({})
    setShowForm(true)
  }

  const handleSave = () => {
    if (!validate()) return
    if (editId !== null) {
      setTareas(tareas.map(t => t.id === editId ? { ...t, ...form } : t))
    } else {
      setTareas([...tareas, { id: Date.now(), ...form, entregados: 0, total: 5 }])
    }
    setShowForm(false)
  }

  const handleDelete = (id: number) => setTareas(tareas.filter(t => t.id !== id))

  const inp = (hasErr?: boolean) =>
    `w-full px-4 py-2.5 border ${hasErr ? 'border-red-400 bg-red-50' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm bg-white`

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Tareas" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Gestión de Tareas</h2>
              <p className="text-gray-500 mt-1 text-sm">Crea, edita y revisa las tareas de tus alumnos.</p>
            </div>
            <button onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-md">
              <PlusCircle className="w-4 h-4" /> Nueva Tarea
            </button>
          </div>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#0d0d0d] text-lg">
                    {editId !== null ? 'Editar Tarea' : 'Nueva Tarea'}
                  </h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Título *</label>
                    <input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})}
                      placeholder="Título de la tarea" className={inp(!!errors.titulo)} />
                    {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Materia *</label>
                    <select value={form.materia} onChange={e => setForm({...form, materia: e.target.value})}
                      className={`${inp(!!errors.materia)} appearance-none`}>
                      <option value="">Seleccionar materia</option>
                      {MATERIAS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {errors.materia && <p className="text-red-500 text-xs mt-1">{errors.materia}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Fecha límite</label>
                    <input type="date" value={form.fechaLimite} onChange={e => setForm({...form, fechaLimite: e.target.value})}
                      className={inp()} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">Descripción</label>
                    <textarea value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})}
                      rows={3} placeholder="Instrucciones para los alumnos..." className={`${inp()} resize-none`} />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={handleSave}
                    className="flex items-center gap-2 flex-1 justify-center py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-sm">
                    <Save className="w-4 h-4" />
                    {editId !== null ? 'Guardar Cambios' : 'Crear Tarea'}
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Lista */}
          <div className="space-y-4">
            {tareas.map(tarea => {
              const pct = tarea.total > 0 ? Math.round((tarea.entregados / tarea.total) * 100) : 0
              return (
                <div key={tarea.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 wine-gradient rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                        <ClipboardList className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#0d0d0d] truncate">{tarea.titulo}</h4>
                        <p className="text-sm text-wine font-medium mt-0.5">{tarea.materia}</p>
                        {tarea.descripcion && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{tarea.descripcion}</p>}
                        <div className="flex items-center gap-4 mt-3">
                          {tarea.fechaLimite && (
                            <div className="flex items-center gap-1.5 text-xs text-gray-400">
                              <Calendar className="w-3.5 h-3.5" />
                              Límite: {tarea.fechaLimite}
                            </div>
                          )}
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
                            <div className="wine-gradient h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => openEdit(tarea)}
                        className="p-2 hover:bg-wine-pale rounded-lg transition-colors text-wine" title="Editar">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(tarea.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400" title="Eliminar">
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
                <p className="text-gray-400 text-sm">No hay tareas creadas.</p>
                <button onClick={openCreate} className="mt-3 text-sm text-wine font-semibold hover:underline">
                  + Crear la primera tarea
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
