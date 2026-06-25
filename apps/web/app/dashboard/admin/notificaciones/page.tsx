'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Bell, Send, Users, GraduationCap, BookOpen, Trash2, CheckCircle2 } from 'lucide-react'

type Destinatario = 'todos' | 'estudiantes' | 'instructores'
type Notif = { id: number; titulo: string; mensaje: string; destinatario: Destinatario; fecha: string; leida: boolean }

const initial: Notif[] = [
  { id: 1, titulo: 'Inicio de clases', mensaje: 'Las clases del nuevo período comienzan el lunes 30 de junio. Asegúrate de revisar tu horario.', destinatario: 'todos', fecha: '2025-06-20 09:00', leida: false },
  { id: 2, titulo: 'Actualización de materiales', mensaje: 'Se han subido nuevos materiales para Meteorología Aeronáutica en el aula virtual.', destinatario: 'estudiantes', fecha: '2025-06-19 14:30', leida: true },
  { id: 3, titulo: 'Reunión de instructores', mensaje: 'Reunión de coordinación el viernes 27 a las 10:00 en la sala principal.', destinatario: 'instructores', fecha: '2025-06-18 11:00', leida: true },
]

const destLabel: Record<Destinatario, string> = { todos: 'Todos', estudiantes: 'Estudiantes', instructores: 'Instructores' }
const destColor: Record<Destinatario, string> = {
  todos:        'bg-wine/10 text-wine border border-wine/20',
  estudiantes:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  instructores: 'bg-zinc-100 text-zinc-700 border border-zinc-200',
}
const destIcon: Record<Destinatario, React.ComponentType<{className?: string}>> = {
  todos: Users, estudiantes: BookOpen, instructores: GraduationCap,
}

export default function NotificacionesPage() {
  const [notifs, setNotifs] = useState<Notif[]>(initial)
  const [showForm, setShowForm] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ titulo: '', mensaje: '', destinatario: 'todos' as Destinatario })

  const handleSend = () => {
    if (!form.titulo || !form.mensaje) return
    const nueva: Notif = {
      id: Date.now(),
      ...form,
      fecha: new Date().toLocaleString('es-BO', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      leida: false,
    }
    setNotifs([nueva, ...notifs])
    setForm({ titulo: '', mensaje: '', destinatario: 'todos' })
    setShowForm(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  const markRead = (id: number) => setNotifs(notifs.map(n => n.id === id ? { ...n, leida: true } : n))
  const deleteNotif = (id: number) => setNotifs(notifs.filter(n => n.id !== id))

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm bg-white"

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Notificaciones" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Notificaciones</h2>
              <p className="text-gray-500 mt-1 text-sm">Envía avisos a estudiantes e instructores.</p>
            </div>
            <button onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-md shrink-0">
              <Send className="w-4 h-4" /> Nueva Notificación
            </button>
          </div>

          {/* Feedback */}
          {sent && (
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 mb-4 animate-scale-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-emerald-700 text-sm font-medium">¡Notificación enviada exitosamente!</p>
            </div>
          )}

          {/* Form */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 animate-fade-in-up">
              <h3 className="font-bold text-[#0d0d0d] mb-5">Redactar Notificación</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                  <input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})}
                    placeholder="Asunto de la notificación" className={inp} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                  <textarea value={form.mensaje} onChange={e => setForm({...form, mensaje: e.target.value})}
                    rows={4} placeholder="Escribe el mensaje aquí..." className={`${inp} resize-none`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Destinatarios</label>
                  <div className="flex gap-2 flex-wrap">
                    {(['todos','estudiantes','instructores'] as Destinatario[]).map(d => {
                      const Icon = destIcon[d]
                      return (
                        <button key={d} type="button" onClick={() => setForm({...form, destinatario: d})}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                            form.destinatario === d ? 'wine-gradient text-white border-transparent' : 'border-gray-200 text-gray-600 hover:border-wine hover:text-wine'
                          }`}>
                          <Icon className="w-4 h-4" />{destLabel[d]}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-5">
                <button onClick={handleSend}
                  className="flex items-center gap-2 px-5 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-sm">
                  <Send className="w-4 h-4" /> Enviar
                </button>
                <button onClick={() => setShowForm(false)}
                  className="px-5 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200">Cancelar</button>
              </div>
            </div>
          )}

          {/* Stats strip */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Total enviadas', value: notifs.length },
              { label: 'Sin leer', value: notifs.filter(n => !n.leida).length },
              { label: 'Leídas', value: notifs.filter(n => n.leida).length },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <p className="text-2xl font-black text-[#0d0d0d]">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* List */}
          <div className="space-y-3">
            {notifs.map(n => {
              const Icon = destIcon[n.destinatario]
              return (
                <div key={n.id}
                  className={`bg-white rounded-2xl border shadow-sm p-5 transition-all ${n.leida ? 'border-gray-100' : 'border-wine/20 shadow-wine/5'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.leida ? 'bg-gray-100' : 'wine-gradient shadow-sm'}`}>
                      <Bell className={`w-5 h-5 ${n.leida ? 'text-gray-400' : 'text-white'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-bold text-sm ${n.leida ? 'text-gray-700' : 'text-[#0d0d0d]'}`}>{n.titulo}</h4>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${destColor[n.destinatario]}`}>
                            {destLabel[n.destinatario]}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed">{n.mensaje}</p>
                      <p className="text-xs text-gray-400 mt-2">{n.fecha}</p>
                    </div>
                    <div className="flex flex-col gap-1.5 shrink-0">
                      {!n.leida && (
                        <button onClick={() => markRead(n.id)}
                          className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-500 transition-colors" title="Marcar como leída">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => deleteNotif(n.id)}
                        className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
            {notifs.length === 0 && (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                <Bell className="w-10 h-10 text-gray-200 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Sin notificaciones enviadas.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
