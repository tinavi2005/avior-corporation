'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { ClipboardList, Calendar, CheckCircle2, Clock, Upload, AlertCircle } from 'lucide-react'

type Estado = 'pendiente' | 'entregada' | 'vencida'

type Tarea = {
  id: number
  titulo: string
  materia: string
  descripcion: string
  fechaLimite: string
  estado: Estado
  entregado?: string
}

const tareasData: Tarea[] = [
  {
    id: 1,
    titulo: 'Análisis de cartas sinópticas',
    materia: 'Meteorología Aeronáutica',
    descripcion: 'Descargar e interpretar 3 cartas sinópticas de los últimos 7 días. Incluir análisis de frentes y sistemas de presión.',
    fechaLimite: '2025-07-05',
    estado: 'pendiente',
  },
  {
    id: 2,
    titulo: 'Ejercicio de navegación triangular',
    materia: 'Navegación y Planificación',
    descripcion: 'Calcular rutas entre 3 aeropuertos usando la regla de navegación. Presentar en formato PDF.',
    fechaLimite: '2025-07-01',
    estado: 'entregada',
    entregado: '2025-06-28',
  },
  {
    id: 3,
    titulo: 'Práctica de fraseología VHF',
    materia: 'Radio Comunicaciones',
    descripcion: 'Grabación de 5 minutos de práctica de fraseología aeronáutica con procedimientos estándar.',
    fechaLimite: '2025-06-20',
    estado: 'vencida',
  },
]

const estadoConfig: Record<Estado, { label: string; icon: React.ComponentType<{className?: string}>; cls: string }> = {
  pendiente: { label: 'Pendiente', icon: Clock,         cls: 'bg-amber-50 text-amber-700 border border-amber-200' },
  entregada: { label: 'Entregada', icon: CheckCircle2,  cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  vencida:   { label: 'Vencida',   icon: AlertCircle,   cls: 'bg-red-50 text-red-600 border border-red-200' },
}

export default function StudentTareasPage() {
  const [selectedTarea, setSelectedTarea] = useState<Tarea | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [submitted, setSubmitted] = useState<number[]>([2]) // id 2 ya entregada

  const handleSubmit = (tareaId: number) => {
    if (!file) return
    setSubmitted([...submitted, tareaId])
    setFile(null)
    setSelectedTarea(null)
    alert('¡Tarea entregada exitosamente!')
  }

  const pendientes = tareasData.filter(t => t.estado === 'pendiente')
  const entregadas = tareasData.filter(t => t.estado === 'entregada' || submitted.includes(t.id))
  const vencidas   = tareasData.filter(t => t.estado === 'vencida' && !submitted.includes(t.id))

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Mis Tareas" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-[#0d0d0d]">Mis Tareas</h2>
            <p className="text-gray-500 mt-1 text-sm">Revisa y entrega tus tareas asignadas.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8">
            {[
              { label: 'Pendientes', value: pendientes.length, cls: 'border-l-4 border-l-amber-400 bg-white' },
              { label: 'Entregadas', value: entregadas.length, cls: 'border-l-4 border-l-emerald-500 bg-white' },
              { label: 'Vencidas',   value: vencidas.length,   cls: 'border-l-4 border-l-red-500 bg-white' },
            ].map(s => (
              <div key={s.label} className={`${s.cls} rounded-xl p-4 shadow-sm border border-gray-100`}>
                <p className="text-2xl sm:text-3xl font-black text-[#0d0d0d]">{s.value}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tareas list */}
          <div className="space-y-4">
            {tareasData.map((tarea) => {
              const isSubmitted = submitted.includes(tarea.id)
              const efectivo: Estado = isSubmitted ? 'entregada' : tarea.estado
              const cfg = estadoConfig[efectivo]
              const Icon = cfg.icon
              return (
                <div key={tarea.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden card-hover">
                  <div className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          efectivo === 'entregada' ? 'bg-emerald-100' :
                          efectivo === 'vencida'   ? 'bg-red-100' : 'wine-gradient'
                        }`}>
                          <ClipboardList className={`w-5 h-5 ${
                            efectivo === 'entregada' ? 'text-emerald-600' :
                            efectivo === 'vencida'   ? 'text-red-500' : 'text-white'
                          }`} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#0d0d0d]">{tarea.titulo}</h4>
                          <p className="text-wine text-xs font-semibold mt-0.5">{tarea.materia}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${cfg.cls}`}>
                        <Icon className="w-3 h-3" />{cfg.label}
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{tarea.descripcion}</p>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Límite: <strong className={efectivo === 'vencida' ? 'text-red-500' : 'text-gray-700'}>{tarea.fechaLimite}</strong>
                      </span>
                      {tarea.entregado && (
                        <span className="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Entregada el {tarea.entregado}
                        </span>
                      )}
                    </div>

                    {/* Entrega */}
                    {efectivo === 'pendiente' && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        {selectedTarea?.id === tarea.id ? (
                          <div className="space-y-3">
                            <label className="block w-full">
                              <div className="border-2 border-dashed border-gray-200 hover:border-wine rounded-xl p-4 text-center cursor-pointer transition-colors">
                                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                <p className="text-sm text-gray-500">
                                  {file ? file.name : 'Haz clic para subir archivo'}
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">PDF, DOC, DOCX, JPG, PNG</p>
                              </div>
                              <input type="file" className="hidden"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={e => setFile(e.target.files?.[0] || null)} />
                            </label>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSubmit(tarea.id)}
                                disabled={!file}
                                className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm">
                                <Upload className="w-4 h-4" />Entregar
                              </button>
                              <button
                                onClick={() => { setSelectedTarea(null); setFile(null) }}
                                className="px-4 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all">
                                Cancelar
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedTarea(tarea)}
                            className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-sm">
                            <Upload className="w-4 h-4" />Entregar Tarea
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
