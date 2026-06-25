'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { FileText, PlusCircle, Trash2, Edit2, Clock, Users, ChevronDown, ChevronUp } from 'lucide-react'

type Pregunta = { id: number; texto: string; opciones: string[]; correcta: number }
type Examen = { id: number; titulo: string; materia: string; duracion: number; fechaLimite: string; preguntas: Pregunta[]; publicado: boolean }

const initial: Examen[] = [
  {
    id: 1,
    titulo: 'Examen Parcial — Meteorología',
    materia: 'Meteorología Aeronáutica',
    duracion: 60,
    fechaLimite: '2025-07-10',
    publicado: true,
    preguntas: [
      { id: 1, texto: '¿Qué sigla representa el pronóstico de aeródromo?', opciones: ['METAR','TAF','SIGMET','SPECI'], correcta: 1 },
      { id: 2, texto: '¿Cuántas horas de validez tiene un TAF estándar?', opciones: ['6','12','24','30'], correcta: 2 },
    ],
  },
]

const materias = ['Meteorología Aeronáutica','Navegación y Planificación','Radio Comunicaciones','Inglés Aeronáutico','Reglamentación Aeronáutica']

export default function ExamenesPage() {
  const [examenes, setExamenes] = useState<Examen[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)
  const [form, setForm] = useState({ titulo: '', materia: '', duracion: '60', fechaLimite: '' })
  const [preguntas, setPreguntas] = useState<Pregunta[]>([])
  const [newPregunta, setNewPregunta] = useState({ texto: '', opciones: ['','','',''], correcta: 0 })

  const addPregunta = () => {
    if (!newPregunta.texto || newPregunta.opciones.some(o => !o)) return
    setPreguntas([...preguntas, { ...newPregunta, id: Date.now() }])
    setNewPregunta({ texto: '', opciones: ['','','',''], correcta: 0 })
  }

  const handleCreate = () => {
    if (!form.titulo || !form.materia) return
    setExamenes([...examenes, {
      id: Date.now(),
      titulo: form.titulo,
      materia: form.materia,
      duracion: Number(form.duracion),
      fechaLimite: form.fechaLimite,
      preguntas,
      publicado: false,
    }])
    setForm({ titulo: '', materia: '', duracion: '60', fechaLimite: '' })
    setPreguntas([])
    setShowForm(false)
  }

  const togglePublicar = (id: number) =>
    setExamenes(examenes.map(e => e.id === id ? { ...e, publicado: !e.publicado } : e))

  const handleDelete = (id: number) => setExamenes(examenes.filter(e => e.id !== id))

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine focus:border-wine text-sm bg-white"

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Exámenes" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Gestión de Exámenes</h2>
              <p className="text-gray-500 mt-1 text-sm">Crea y administra los exámenes para tus alumnos.</p>
            </div>
            <button onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-md">
              <PlusCircle className="w-4 h-4" /> Nuevo Examen
            </button>
          </div>

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 animate-fade-in-up">
              <h3 className="font-bold text-[#0d0d0d] mb-5">Crear Nuevo Examen</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})}
                    placeholder="Título del examen" className={inp} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Materia *</label>
                  <select value={form.materia} onChange={e => setForm({...form, materia: e.target.value})}
                    className={`${inp} appearance-none`}>
                    <option value="">Seleccionar materia</option>
                    {materias.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duración (min)</label>
                  <input type="number" value={form.duracion} onChange={e => setForm({...form, duracion: e.target.value})}
                    min="10" max="240" className={inp} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha límite</label>
                  <input type="date" value={form.fechaLimite} onChange={e => setForm({...form, fechaLimite: e.target.value})}
                    className={inp} />
                </div>
              </div>

              {/* Preguntas */}
              <div className="border-t border-gray-100 pt-5">
                <h4 className="font-semibold text-[#0d0d0d] text-sm mb-4">
                  Preguntas ({preguntas.length})
                </h4>

                {preguntas.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {preguntas.map((p, i) => (
                      <div key={p.id} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5">
                        <span className="w-6 h-6 wine-gradient rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">{i+1}</span>
                        <span className="text-sm text-[#0d0d0d] flex-1">{p.texto}</span>
                        <button onClick={() => setPreguntas(preguntas.filter(q => q.id !== p.id))}
                          className="text-red-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add pregunta */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <input value={newPregunta.texto}
                    onChange={e => setNewPregunta({...newPregunta, texto: e.target.value})}
                    placeholder="Texto de la pregunta" className={inp} />
                  <div className="grid grid-cols-2 gap-2">
                    {newPregunta.opciones.map((op, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input type="radio" name="correcta" checked={newPregunta.correcta === i}
                          onChange={() => setNewPregunta({...newPregunta, correcta: i})}
                          className="accent-wine shrink-0" title="Marcar como correcta" />
                        <input value={op}
                          onChange={e => {
                            const ops = [...newPregunta.opciones]; ops[i] = e.target.value
                            setNewPregunta({...newPregunta, opciones: ops})
                          }}
                          placeholder={`Opción ${i+1}${newPregunta.correcta === i ? ' ✓' : ''}`}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-wine" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">Marca el radio junto a la opción correcta</p>
                  <button onClick={addPregunta}
                    className="text-sm text-wine font-semibold hover:underline">
                    + Agregar pregunta
                  </button>
                </div>
              </div>

              <div className="flex gap-3 mt-5">
                <button onClick={handleCreate}
                  className="px-5 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-sm">
                  Crear Examen
                </button>
                <button onClick={() => { setShowForm(false); setPreguntas([]) }}
                  className="px-5 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista */}
          <div className="space-y-4">
            {examenes.map(examen => (
              <div key={examen.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 wine-gradient rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-[#0d0d0d]">{examen.titulo}</h4>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            examen.publicado ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {examen.publicado ? 'Publicado' : 'Borrador'}
                          </span>
                        </div>
                        <p className="text-wine text-xs font-semibold mt-0.5">{examen.materia}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{examen.duracion} min</span>
                          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" />{examen.preguntas.length} preguntas</span>
                          {examen.fechaLimite && <span>Límite: {examen.fechaLimite}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => setExpanded(expanded === examen.id ? null : examen.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                        {expanded === examen.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                      <button onClick={() => togglePublicar(examen.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                          examen.publicado ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'wine-gradient text-white hover:opacity-90'
                        }`}>
                        {examen.publicado ? 'Despublicar' : 'Publicar'}
                      </button>
                      <button onClick={() => handleDelete(examen.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Preguntas expandidas */}
                  {expanded === examen.id && examen.preguntas.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Preguntas</p>
                      {examen.preguntas.map((p, i) => (
                        <div key={p.id} className="bg-gray-50 rounded-xl p-4">
                          <p className="text-sm font-semibold text-[#0d0d0d] mb-2">{i+1}. {p.texto}</p>
                          <div className="grid grid-cols-2 gap-1.5">
                            {p.opciones.map((op, j) => (
                              <div key={j} className={`text-xs px-3 py-1.5 rounded-lg ${
                                j === p.correcta ? 'bg-emerald-100 text-emerald-700 font-semibold' : 'bg-white text-gray-500 border border-gray-100'
                              }`}>
                                {j === p.correcta && '✓ '}{op}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {examenes.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <FileText className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No hay exámenes creados aún.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
