'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Settings, Save, CheckCircle2, School, Bell, Shield, Mail } from 'lucide-react'

export default function ConfiguracionPage() {
  const [saved, setSaved] = useState(false)
  const [config, setConfig] = useState({
    nombreInstitucion: 'Avior SRL — Escuela de Aviación',
    emailContacto: 'avior.corporation@gmail.com',
    telefonoPrincipal: '+591 62530806',
    whatsapp: '+591 75496739',
    minimoAsistencia: '75',
    notaMinima: '51',
    notifNuevasTareas: true,
    notifCalificaciones: true,
    notifAsistencia: true,
    notifExamenes: true,
    registroPublico: false,
    verificarEmail: true,
    sesionDuracion: '8',
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inp = "w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine text-sm bg-white"

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button type="button" onClick={() => onChange(!value)}
      className={`w-11 h-6 rounded-full transition-all duration-200 relative ${value ? 'wine-gradient' : 'bg-gray-200'}`}>
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-200 ${value ? 'left-5.5 translate-x-0.5' : 'left-0.5'}`} />
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="admin" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Configuración" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-5">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-[#0d0d0d]">Configuración del Sistema</h2>
              <p className="text-gray-500 mt-1 text-sm">Ajustes generales de la plataforma educativa.</p>
            </div>
            <button onClick={handleSave}
              className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all shadow-md ${
                saved ? 'bg-emerald-500 text-white' : 'wine-gradient text-white hover:opacity-90'
              }`}>
              {saved ? <><CheckCircle2 className="w-4 h-4" />¡Guardado!</> : <><Save className="w-4 h-4" />Guardar</>}
            </button>
          </div>

          {/* Sección: Institución */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 wine-gradient rounded-xl flex items-center justify-center shadow-sm">
                <School className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-[#0d0d0d]">Información de la Institución</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la institución</label>
                <input value={config.nombreInstitucion} onChange={e => setConfig({...config, nombreInstitucion: e.target.value})} className={inp} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email de contacto</label>
                <input type="email" value={config.emailContacto} onChange={e => setConfig({...config, emailContacto: e.target.value})} className={inp} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono principal</label>
                <input value={config.telefonoPrincipal} onChange={e => setConfig({...config, telefonoPrincipal: e.target.value})} className={inp} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp de soporte</label>
                <input value={config.whatsapp} onChange={e => setConfig({...config, whatsapp: e.target.value})} className={inp} />
              </div>
            </div>
          </div>

          {/* Sección: Académico */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-[#0d0d0d] rounded-xl flex items-center justify-center shadow-sm">
                <Settings className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-[#0d0d0d]">Parámetros Académicos</h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asistencia mínima (%)</label>
                <input type="number" min="50" max="100" value={config.minimoAsistencia}
                  onChange={e => setConfig({...config, minimoAsistencia: e.target.value})} className={inp} />
                <p className="text-xs text-gray-400 mt-1">Porcentaje mínimo para aprobar</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nota mínima de aprobación</label>
                <input type="number" min="0" max="100" value={config.notaMinima}
                  onChange={e => setConfig({...config, notaMinima: e.target.value})} className={inp} />
                <p className="text-xs text-gray-400 mt-1">Sobre 100 puntos</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración de sesión (horas)</label>
                <input type="number" min="1" max="24" value={config.sesionDuracion}
                  onChange={e => setConfig({...config, sesionDuracion: e.target.value})} className={inp} />
                <p className="text-xs text-gray-400 mt-1">Tiempo antes de cerrar sesión</p>
              </div>
            </div>
          </div>

          {/* Sección: Notificaciones */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-zinc-800 rounded-xl flex items-center justify-center shadow-sm">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-[#0d0d0d]">Notificaciones Automáticas</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'notifNuevasTareas',   label: 'Nuevas tareas asignadas', desc: 'Notificar a estudiantes cuando se publique una tarea' },
                { key: 'notifCalificaciones', label: 'Calificaciones publicadas', desc: 'Notificar cuando el instructor publique notas' },
                { key: 'notifAsistencia',     label: 'Resumen de asistencia', desc: 'Enviar resumen semanal de asistencia' },
                { key: 'notifExamenes',       label: 'Próximos exámenes', desc: 'Recordatorio 24 horas antes de un examen' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#0d0d0d]">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <Toggle
                    value={config[item.key as keyof typeof config] as boolean}
                    onChange={v => setConfig({...config, [item.key]: v})}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sección: Seguridad */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 bg-zinc-700 rounded-xl flex items-center justify-center shadow-sm">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-bold text-[#0d0d0d]">Seguridad y Acceso</h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'registroPublico', label: 'Registro público', desc: 'Permitir que usuarios se registren sin invitación' },
                { key: 'verificarEmail', label: 'Verificar email', desc: 'Requerir verificación de correo al registrarse' },
              ].map(item => (
                <div key={item.key} className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#0d0d0d]">{item.label}</p>
                    <p className="text-xs text-gray-400">{item.desc}</p>
                  </div>
                  <Toggle
                    value={config[item.key as keyof typeof config] as boolean}
                    onChange={v => setConfig({...config, [item.key]: v})}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Save bottom */}
          <div className="flex justify-end pb-4">
            <button onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 font-bold text-sm rounded-xl transition-all shadow-lg ${
                saved ? 'bg-emerald-500 text-white' : 'wine-gradient text-white hover:opacity-90'
              }`}>
              {saved ? <><CheckCircle2 className="w-4 h-4" />¡Guardado!</> : <><Save className="w-4 h-4" />Guardar Configuración</>}
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}
