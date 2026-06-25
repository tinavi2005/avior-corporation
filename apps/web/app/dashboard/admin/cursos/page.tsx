'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { BookOpen, PlusCircle, Search, Edit2, Trash2, MoreVertical, X, Users, Clock } from 'lucide-react'

type Curso = {
  id: number
  nombre: string
  codigo: string
  descripcion: string
  duracion: string
  alumnos: number
  estado: 'activo' | 'inactivo'
}

const initial: Curso[] = [
  { id: 1, nombre: 'Piloto Comercial', codigo: 'PC-01', descripcion: 'Carrera completa de piloto comercial certificado DGAC.', duracion: '24 meses', alumnos: 15, estado: 'activo' },
  { id: 2, nombre: 'Tripulante de Cabina', codigo: 'TC-01', descripcion: 'Formación integral como Sobrecargo o Auxiliar de vuelo.', duracion: '6 meses', alumnos: 20, estado: 'activo' },
  { id: 3, nombre: 'Despachador de Vuelo', codigo: 'DV-01', descripcion: 'Control operacional de vuelos desde tierra.', duracion: '8 meses', alumnos: 10, estado: 'activo' },
  { id: 4, nombre: 'Radio Comunicaciones', codigo: 'RC-01', descripcion: 'Curso de fraseología aeronáutica VHF.', duracion: '1 mes', alumnos: 8, estado: 'inactivo' },
]

export default function CursosAdminPage() {
  const [cursos, setCursos] = useState<Curso[]>(initial)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', codigo: '', descripcion: '', duracion: '' })

  const filtered = cursos.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase()) ||
    c.codigo.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setEditId(null); setForm({ nombre: '', codigo: '', descripcion: '', duracion: '' }); setShowForm(true) }
  const openEdit = (c: Curso) => { setEditId(c.id); setForm({ nombre: c.nombre, codigo: c.codigo, descripcion: c.descripcion, duracion: c.duracion }); setShowForm(true); setMenuOpen(null) }
  const handleSave = () => {
    if (!form.nombre) return
    if (editId) setCursos(cursos.map(c => c.id === editId ? { ...c, ...form } : c))
    else setCursos([...cursos, { id: Date.now(), ...form, alumnos: 0, estado: 'activo' }])
    setShowForm(false)
  }
  const handleDelete = (id: number) => { setCursos(cursos.filter(c => c.id !== id)); setMenuOpen(null) }
  const toggleEstado = (id: number) => { setCursos(cursos.map(c => c.id === id ? { ...c, estado: c.estado === 'activo' ? 'inactivo' : 'activo' } : c)); setMenuOpen(null) }

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm bg-white"

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Cursos" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Cursos y Materias</h2>
              <p className="text-gray-500 mt-1 text-sm">Gestiona los programas académicos.</p>
            </div>
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-md shrink-0">
              <PlusCircle className="w-4 h-4" /> Nuevo Curso
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { label: 'Total cursos', value: cursos.length },
              { label: 'Activos', value: cursos.filter(c => c.estado === 'activo').length },
              { label: 'Total alumnos', value: cursos.reduce((s, c) => s + c.alumnos, 0) },
              { label: 'Inactivos', value: cursos.filter(c => c.estado === 'inactivo').length },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-[#0d0d0d]">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#0d0d0d] text-lg">{editId ? 'Editar Curso' : 'Nuevo Curso'}</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                      <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre del curso" className={inp} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
                      <input value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} placeholder="PC-01" className={inp} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duración</label>
                    <input value={form.duracion} onChange={e => setForm({...form, duracion: e.target.value})} placeholder="ej: 6 meses" className={inp} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})} rows={3} placeholder="Descripción del curso..."
                      className={`${inp} resize-none`} />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={handleSave} className="flex-1 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-sm">
                    {editId ? 'Guardar' : 'Crear'}
                  </button>
                  <button onClick={() => setShowForm(false)} className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200">Cancelar</button>
                </div>
              </div>
            </div>
          )}

          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar curso..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine bg-white text-sm" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(curso => (
              <div key={curso.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 card-hover">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 wine-gradient rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${curso.estado === 'activo' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-500'}`}>
                      {curso.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </span>
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === curso.id ? null : curso.id)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpen === curso.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-scale-in">
                          <button onClick={() => openEdit(curso)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"><Edit2 className="w-3.5 h-3.5" /> Editar</button>
                          <button onClick={() => toggleEstado(curso.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">{curso.estado === 'activo' ? '⏸ Desactivar' : '▶ Activar'}</button>
                          <button onClick={() => handleDelete(curso.id)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Eliminar</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-[#0d0d0d] mb-0.5">{curso.nombre}</h4>
                <p className="text-xs text-wine font-semibold mb-2">{curso.codigo}</p>
                <p className="text-gray-500 text-xs leading-relaxed mb-3">{curso.descripcion}</p>
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <span className="flex items-center gap-1.5 text-xs text-gray-400"><Clock className="w-3.5 h-3.5" />{curso.duracion || '—'}</span>
                  <span className="flex items-center gap-1.5 text-xs text-gray-400"><Users className="w-3.5 h-3.5" />{curso.alumnos} alumnos</span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-gray-100">
                <BookOpen className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No se encontraron cursos.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
