'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Calendar, PlusCircle, Clock, Trash2, X } from 'lucide-react'

type Clase = {
  id: number
  materia: string
  instructor: string
  dia: string
  horaInicio: string
  horaFin: string
  aula: string
  grupo: string
}

const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes']
const horas = ['07:00','08:00','09:00','10:00','11:00','12:00','14:00','15:00','16:00','17:00','18:00']
const materias = ['Meteorología Aeronáutica','Navegación y Planificación','Radio Comunicaciones','Inglés Aeronáutico','Reglamentación Aeronáutica','Seguridad en Cabina']
const instructores = ['Cap. Roberto Flores','Lic. Ana Saavedra','Cap. Luis Quispe','Cmdt. Sandra Vargas']

const colorByIdx = [
  'bg-wine/10 border-l-4 border-wine text-wine',
  'bg-zinc-100 border-l-4 border-zinc-500 text-zinc-700',
  'bg-stone-100 border-l-4 border-stone-500 text-stone-700',
  'bg-gray-100 border-l-4 border-gray-500 text-gray-700',
]

const initial: Clase[] = [
  { id: 1, materia: 'Meteorología Aeronáutica', instructor: 'Cap. Roberto Flores', dia: 'Lunes', horaInicio: '08:00', horaFin: '10:00', aula: 'Aula 1', grupo: 'G-A' },
  { id: 2, materia: 'Navegación y Planificación', instructor: 'Cap. Luis Quispe', dia: 'Martes', horaInicio: '10:00', horaFin: '12:00', aula: 'Aula 2', grupo: 'G-B' },
  { id: 3, materia: 'Radio Comunicaciones', instructor: 'Lic. Ana Saavedra', dia: 'Miércoles', horaInicio: '08:00', horaFin: '10:00', aula: 'Lab 1', grupo: 'G-A' },
  { id: 4, materia: 'Inglés Aeronáutico', instructor: 'Cap. Roberto Flores', dia: 'Jueves', horaInicio: '14:00', horaFin: '16:00', aula: 'Aula 3', grupo: 'G-C' },
]

export default function HorariosAdminPage() {
  const [clases, setClases] = useState<Clase[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [selectedDia, setSelectedDia] = useState('Todos')
  const [form, setForm] = useState({ materia: '', instructor: '', dia: 'Lunes', horaInicio: '08:00', horaFin: '09:00', aula: '', grupo: '' })

  const handleCreate = () => {
    if (!form.materia || !form.instructor) return
    setClases([...clases, { id: Date.now(), ...form }])
    setForm({ materia: '', instructor: '', dia: 'Lunes', horaInicio: '08:00', horaFin: '09:00', aula: '', grupo: '' })
    setShowForm(false)
  }

  const filtered = selectedDia === 'Todos' ? clases : clases.filter(c => c.dia === selectedDia)
  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm bg-white"

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Horarios" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Gestión de Horarios</h2>
              <p className="text-gray-500 mt-1 text-sm">Asigna y organiza los horarios de clases.</p>
            </div>
            <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-md shrink-0">
              <PlusCircle className="w-4 h-4" /> Nueva Clase
            </button>
          </div>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#0d0d0d] text-lg">Nueva Clase</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Materia *</label>
                    <select value={form.materia} onChange={e => setForm({...form, materia: e.target.value})} className={`${inp} appearance-none`}>
                      <option value="">Seleccionar materia</option>
                      {materias.map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructor *</label>
                    <select value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} className={`${inp} appearance-none`}>
                      <option value="">Seleccionar instructor</option>
                      {instructores.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Día</label>
                      <select value={form.dia} onChange={e => setForm({...form, dia: e.target.value})} className={`${inp} appearance-none`}>
                        {dias.map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Inicio</label>
                      <select value={form.horaInicio} onChange={e => setForm({...form, horaInicio: e.target.value})} className={`${inp} appearance-none`}>
                        {horas.map(h => <option key={h}>{h}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
                      <select value={form.horaFin} onChange={e => setForm({...form, horaFin: e.target.value})} className={`${inp} appearance-none`}>
                        {horas.map(h => <option key={h}>{h}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aula</label>
                      <input value={form.aula} onChange={e => setForm({...form, aula: e.target.value})} placeholder="Aula 1" className={inp} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grupo</label>
                      <input value={form.grupo} onChange={e => setForm({...form, grupo: e.target.value})} placeholder="G-A" className={inp} />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={handleCreate} className="flex-1 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-sm">Crear Clase</button>
                  <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200">Cancelar</button>
                </div>
              </div>
            </div>
          )}

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-5">
            {['Todos', ...dias].map(d => (
              <button key={d} onClick={() => setSelectedDia(d)}
                className={`px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${selectedDia === d ? 'wine-gradient text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-wine hover:text-wine'}`}>
                {d}
              </button>
            ))}
          </div>

          {/* Classes grid */}
          <div className="space-y-3">
            {filtered.map((clase, i) => (
              <div key={clase.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 wine-gradient rounded-xl flex items-center justify-center shrink-0 shadow-sm">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0d0d0d]">{clase.materia}</h4>
                      <p className="text-xs text-wine font-semibold">{clase.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="font-semibold text-[#0d0d0d]">{clase.dia}</span>
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" />{clase.horaInicio}–{clase.horaFin}</span>
                    </div>
                    <div className="hidden md:flex flex-col items-end text-right">
                      <span className="text-xs text-gray-500">{clase.aula}</span>
                      <span className="text-xs font-semibold text-gray-700">{clase.grupo}</span>
                    </div>
                    <button onClick={() => setClases(clases.filter(c => c.id !== clase.id))}
                      className="p-2 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {/* Mobile details */}
                <div className="sm:hidden mt-3 pt-3 border-t border-gray-100 flex gap-4 text-xs text-gray-500">
                  <span>{clase.dia} · {clase.horaInicio}–{clase.horaFin}</span>
                  <span>{clase.aula} · {clase.grupo}</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No hay clases programadas{selectedDia !== 'Todos' ? ` para el ${selectedDia}` : ''}.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
