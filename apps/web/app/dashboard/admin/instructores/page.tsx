'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { GraduationCap, PlusCircle, Search, Edit2, Trash2, BookOpen, Users, MoreVertical, X } from 'lucide-react'

type Instructor = {
  id: number
  nombre: string
  email: string
  materias: string[]
  grupos: number
  estado: 'activo' | 'inactivo'
  licencia: string
}

const initialInstructores: Instructor[] = [
  { id: 1, nombre: 'Cap. Roberto Flores',  email: 'r.flores@avior.edu.bo',   materias: ['Meteorología Aeronáutica','Navegación y Planificación'], grupos: 3, estado: 'activo', licencia: 'ATPL – 8,500 hrs' },
  { id: 2, nombre: 'Lic. Ana Saavedra',    email: 'a.saavedra@avior.edu.bo', materias: ['Radio Comunicaciones','Reglamentación Aeronáutica'],    grupos: 2, estado: 'activo', licencia: 'Administración Aeronáutica' },
  { id: 3, nombre: 'Cap. Luis Quispe',     email: 'l.quispe@avior.edu.bo',   materias: ['Navegación y Planificación','Inglés Aeronáutico'],       grupos: 2, estado: 'activo', licencia: 'ATPL – 6,200 hrs' },
  { id: 4, nombre: 'Cmdt. Sandra Vargas',  email: 's.vargas@avior.edu.bo',   materias: ['Seguridad en Cabina','Primeros Auxilios Aeronáuticos'],  grupos: 1, estado: 'inactivo', licencia: 'Cabina – 12 años' },
]

const todasMaterias = ['Meteorología Aeronáutica','Navegación y Planificación','Radio Comunicaciones','Inglés Aeronáutico','Reglamentación Aeronáutica','Seguridad en Cabina','Primeros Auxilios Aeronáuticos']

export default function InstructoresAdminPage() {
  const [instructores, setInstructores] = useState<Instructor[]>(initialInstructores)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', materias: [] as string[], licencia: '' })
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const filtered = instructores.filter(i =>
    i.nombre.toLowerCase().includes(search.toLowerCase()) ||
    i.email.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => {
    setEditId(null)
    setForm({ nombre: '', email: '', materias: [], licencia: '' })
    setShowForm(true)
  }

  const openEdit = (inst: Instructor) => {
    setEditId(inst.id)
    setForm({ nombre: inst.nombre, email: inst.email, materias: inst.materias, licencia: inst.licencia })
    setShowForm(true)
    setMenuOpen(null)
  }

  const handleSave = () => {
    if (!form.nombre || !form.email) return
    if (editId) {
      setInstructores(instructores.map(i => i.id === editId ? { ...i, ...form } : i))
    } else {
      setInstructores([...instructores, { id: Date.now(), ...form, grupos: 0, estado: 'activo' }])
    }
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setInstructores(instructores.filter(i => i.id !== id))
    setMenuOpen(null)
  }

  const toggleEstado = (id: number) => {
    setInstructores(instructores.map(i =>
      i.id === id ? { ...i, estado: i.estado === 'activo' ? 'inactivo' : 'activo' } : i
    ))
    setMenuOpen(null)
  }

  const toggleMateria = (m: string) => {
    setForm(prev => ({
      ...prev,
      materias: prev.materias.includes(m)
        ? prev.materias.filter(x => x !== m)
        : [...prev.materias, m],
    }))
  }

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine focus:border-wine text-sm bg-white"

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Instructores" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Instructores</h2>
              <p className="text-gray-500 mt-1 text-sm">Gestiona los instructores de la plataforma.</p>
            </div>
            <button onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-md shrink-0">
              <PlusCircle className="w-4 h-4" /> Nuevo Instructor
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Total',    value: instructores.length },
              { label: 'Activos',  value: instructores.filter(i => i.estado === 'activo').length },
              { label: 'Inactivos',value: instructores.filter(i => i.estado === 'inactivo').length },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-[#0d0d0d]">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Form modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg animate-scale-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#0d0d0d] text-lg">{editId ? 'Editar Instructor' : 'Nuevo Instructor'}</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                    <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})}
                      placeholder="Cap. Nombre Apellido" className={inp} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email institucional *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                      placeholder="nombre@avior.edu.bo" className={inp} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Licencia / Credencial</label>
                    <input value={form.licencia} onChange={e => setForm({...form, licencia: e.target.value})}
                      placeholder="ej: ATPL – 5,000 hrs" className={inp} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Materias asignadas</label>
                    <div className="flex flex-wrap gap-2">
                      {todasMaterias.map(m => (
                        <button key={m} type="button"
                          onClick={() => toggleMateria(m)}
                          className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                            form.materias.includes(m)
                              ? 'wine-gradient text-white border-transparent'
                              : 'border-gray-200 text-gray-600 hover:border-wine hover:text-wine'
                          }`}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={handleSave}
                    className="flex-1 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-sm">
                    {editId ? 'Guardar Cambios' : 'Crear Instructor'}
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 bg-gray-100 text-gray-600 font-semibold text-sm rounded-xl hover:bg-gray-200 transition-all">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre o email..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine bg-white text-sm" />
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100">
              <div className="col-span-4 text-xs font-bold text-gray-400 uppercase">Instructor</div>
              <div className="col-span-4 text-xs font-bold text-gray-400 uppercase">Materias</div>
              <div className="col-span-2 text-xs font-bold text-gray-400 uppercase">Estado</div>
              <div className="col-span-2 text-xs font-bold text-gray-400 uppercase text-right">Acciones</div>
            </div>

            <div className="divide-y divide-gray-50">
              {filtered.map(inst => (
                <div key={inst.id} className="px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center justify-between sm:grid sm:grid-cols-12 sm:gap-4">
                    {/* Instructor */}
                    <div className="sm:col-span-4 flex items-center gap-3">
                      <div className="w-9 h-9 wine-gradient rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {inst.nombre.charAt(inst.nombre.indexOf(' ') + 1)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-[#0d0d0d] text-sm truncate">{inst.nombre}</p>
                        <p className="text-xs text-gray-400 truncate">{inst.email}</p>
                        <p className="text-xs text-wine/70 truncate">{inst.licencia}</p>
                      </div>
                    </div>
                    {/* Materias */}
                    <div className="hidden sm:flex sm:col-span-4 flex-wrap gap-1">
                      {inst.materias.slice(0, 2).map(m => (
                        <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full truncate max-w-[120px]">{m}</span>
                      ))}
                      {inst.materias.length > 2 && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{inst.materias.length - 2}</span>
                      )}
                    </div>
                    {/* Estado */}
                    <div className="hidden sm:flex sm:col-span-2">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        inst.estado === 'activo'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {inst.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                    {/* Actions */}
                    <div className="sm:col-span-2 flex justify-end">
                      <div className="relative">
                        <button onClick={() => setMenuOpen(menuOpen === inst.id ? null : inst.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        {menuOpen === inst.id && (
                          <div className="absolute right-0 mt-1 w-40 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-scale-in">
                            <button onClick={() => openEdit(inst)}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              <Edit2 className="w-3.5 h-3.5" /> Editar
                            </button>
                            <button onClick={() => toggleEstado(inst.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              {inst.estado === 'activo' ? '⏸ Desactivar' : '▶ Activar'}
                            </button>
                            <button onClick={() => handleDelete(inst.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                              <Trash2 className="w-3.5 h-3.5" /> Eliminar
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-10 text-center">
                  <GraduationCap className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-sm">No se encontraron instructores.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
