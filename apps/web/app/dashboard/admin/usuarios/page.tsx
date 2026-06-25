'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Users, PlusCircle, Search, Edit2, Trash2, MoreVertical, X } from 'lucide-react'

type Rol = 'admin' | 'instructor' | 'student' | 'coordinator'
type Usuario = { id: number; nombre: string; email: string; rol: Rol; estado: 'activo' | 'inactivo' }

const rolLabel: Record<Rol, string> = { admin: 'Administrador', instructor: 'Instructor', student: 'Estudiante', coordinator: 'Coordinador' }
const rolColor: Record<Rol, string> = {
  admin: 'bg-wine/10 text-wine border border-wine/20',
  instructor: 'bg-zinc-100 text-zinc-700 border border-zinc-200',
  student: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  coordinator: 'bg-stone-100 text-stone-700 border border-stone-200',
}

const initialUsers: Usuario[] = [
  { id: 1, nombre: 'Admin Avior',       email: 'admin@avior.edu.bo',       rol: 'admin',       estado: 'activo' },
  { id: 2, nombre: 'Cap. Roberto F.',   email: 'r.flores@avior.edu.bo',    rol: 'instructor',  estado: 'activo' },
  { id: 3, nombre: 'Carlos Mamani',     email: 'c.mamani@avior.edu.bo',    rol: 'student',     estado: 'activo' },
  { id: 4, nombre: 'Valeria Torrico',   email: 'v.torrico@avior.edu.bo',   rol: 'student',     estado: 'activo' },
  { id: 5, nombre: 'Lic. Ana Saavedra', email: 'a.saavedra@avior.edu.bo',  rol: 'coordinator', estado: 'activo' },
]

export default function UsuariosPage() {
  const [users, setUsers] = useState<Usuario[]>(initialUsers)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ nombre: '', email: '', rol: 'student' as Rol })
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const filtered = users.filter(u =>
    u.nombre.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  const openCreate = () => { setEditId(null); setForm({ nombre: '', email: '', rol: 'student' }); setShowForm(true) }
  const openEdit = (u: Usuario) => { setEditId(u.id); setForm({ nombre: u.nombre, email: u.email, rol: u.rol }); setShowForm(true); setMenuOpen(null) }

  const handleSave = () => {
    if (!form.nombre || !form.email) return
    if (editId) setUsers(users.map(u => u.id === editId ? { ...u, ...form } : u))
    else setUsers([...users, { id: Date.now(), ...form, estado: 'activo' }])
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Usuarios" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Usuarios</h2>
              <p className="text-gray-500 mt-1 text-sm">Gestiona los usuarios de la plataforma.</p>
            </div>
            <button onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-md shrink-0">
              <PlusCircle className="w-4 h-4" /> Nuevo Usuario
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {(['admin','instructor','student','coordinator'] as Rol[]).map(r => (
              <div key={r} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-[#0d0d0d]">{users.filter(u => u.rol === r).length}</p>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rolColor[r]}`}>{rolLabel[r]}</span>
              </div>
            ))}
          </div>

          {showForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md animate-scale-in">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-bold text-[#0d0d0d] text-lg">{editId ? 'Editar Usuario' : 'Nuevo Usuario'}</h3>
                  <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} placeholder="Nombre completo"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="email@avior.edu.bo"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                    <select value={form.rol} onChange={e => setForm({...form, rol: e.target.value as Rol})}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm bg-white">
                      {Object.entries(rolLabel).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
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
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar usuario..."
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine bg-white text-sm" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-50">
              {filtered.map(u => (
                <div key={u.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 wine-gradient rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {u.nombre.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#0d0d0d] text-sm">{u.nombre}</p>
                      <p className="text-xs text-gray-400">{u.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full hidden sm:inline-flex ${rolColor[u.rol]}`}>
                      {rolLabel[u.rol]}
                    </span>
                    <div className="relative">
                      <button onClick={() => setMenuOpen(menuOpen === u.id ? null : u.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      {menuOpen === u.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-scale-in">
                          <button onClick={() => openEdit(u)} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            <Edit2 className="w-3.5 h-3.5" /> Editar
                          </button>
                          <button onClick={() => { setUsers(users.filter(x => x.id !== u.id)); setMenuOpen(null) }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5" /> Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="p-8 text-center"><Users className="w-8 h-8 text-gray-200 mx-auto mb-2" /><p className="text-gray-400 text-sm">Sin usuarios.</p></div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
