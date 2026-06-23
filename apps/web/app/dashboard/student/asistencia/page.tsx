'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { CheckCircle2, XCircle, AlertTriangle, Clock, FileText } from 'lucide-react'

type AsistenciaStatus = 'presente' | 'ausente' | 'retraso' | 'licencia'

const statusConfig: Record<AsistenciaStatus, { icon: React.ComponentType<{className?: string}>, label: string, color: string, bg: string }> = {
  presente: { icon: CheckCircle2, label: 'Presente', color: 'text-green-600', bg: 'bg-green-50' },
  ausente: { icon: XCircle, label: 'Ausente', color: 'text-red-600', bg: 'bg-red-50' },
  retraso: { icon: Clock, label: 'Retraso', color: 'text-amber-600', bg: 'bg-amber-50' },
  licencia: { icon: FileText, label: 'Licencia', color: 'text-wine', bg: 'bg-wine-pale' },
}

const registros = [
  { fecha: '2025-06-20', materia: 'Meteorología', status: 'presente' as AsistenciaStatus },
  { fecha: '2025-06-19', materia: 'Navegación', status: 'retraso' as AsistenciaStatus },
  { fecha: '2025-06-18', materia: 'Radio Comunicaciones', status: 'presente' as AsistenciaStatus },
  { fecha: '2025-06-17', materia: 'Inglés Aeronáutico', status: 'ausente' as AsistenciaStatus },
  { fecha: '2025-06-16', materia: 'Reglamentación', status: 'licencia' as AsistenciaStatus },
  { fecha: '2025-06-13', materia: 'Meteorología', status: 'presente' as AsistenciaStatus },
]

const stats = {
  presente: registros.filter((r) => r.status === 'presente').length,
  ausente: registros.filter((r) => r.status === 'ausente').length,
  retraso: registros.filter((r) => r.status === 'retraso').length,
  licencia: registros.filter((r) => r.status === 'licencia').length,
}

const total = registros.length
const pct = total > 0 ? Math.round((stats.presente / total) * 100) : 0

export default function AsistenciaPage() {
  const [showLicenciaForm, setShowLicenciaForm] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Mi Asistencia" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Gestión de Asistencia</h2>
              <p className="text-gray-500 mt-1">Historial de asistencia y solicitud de licencias.</p>
            </div>
            <button
              onClick={() => setShowLicenciaForm(!showLicenciaForm)}
              className="flex items-center gap-2 px-4 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all shadow-md"
            >
              <FileText className="w-4 h-4" />
              Solicitar Licencia
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {(Object.entries(stats) as [AsistenciaStatus, number][]).map(([status, count]) => {
              const cfg = statusConfig[status]
              const Icon = cfg.icon
              return (
                <div key={status} className={`${cfg.bg} rounded-2xl p-4 border border-transparent`}>
                  <div className={`${cfg.color} flex items-center gap-2 mb-1`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">{cfg.label}</span>
                  </div>
                  <p className={`text-3xl font-black ${cfg.color}`}>{count}</p>
                  <p className="text-xs text-gray-500 mt-0.5">de {total} clases</p>
                </div>
              )
            })}
          </div>

          {/* Porcentaje */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-gray-700">Porcentaje de asistencia</span>
              <span className={`text-2xl font-black ${pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-amber-500' : 'text-red-600'}`}>
                {pct}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all ${pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${pct}%` }}
              />
            </div>
            {pct < 75 && (
              <div className="flex items-center gap-2 mt-3 text-amber-600 text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>Atención: tu asistencia está por debajo del mínimo requerido (75%).</span>
              </div>
            )}
          </div>

          {/* Formulario licencia */}
          {showLicenciaForm && (
            <div className="bg-wine-pale border border-wine/20 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-wine mb-4">Solicitud de Licencia</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Fecha inicio</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Fecha fin</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700 block mb-1">Motivo</label>
                  <textarea rows={3} placeholder="Describe el motivo de la licencia..." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine resize-none" />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button className="px-5 py-2.5 wine-gradient text-white font-semibold text-sm rounded-xl hover:opacity-90 transition-all">
                  Enviar Solicitud
                </button>
                <button onClick={() => setShowLicenciaForm(false)} className="px-5 py-2.5 bg-white text-gray-600 font-semibold text-sm rounded-xl border border-gray-200 hover:bg-gray-50 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Registro Detallado</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase">Fecha</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase">Materia</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-gray-400 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {registros.map((r, i) => {
                  const cfg = statusConfig[r.status]
                  const Icon = cfg.icon
                  return (
                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm text-gray-600 font-medium">{r.fecha}</td>
                      <td className="px-6 py-3 text-sm text-gray-800 font-semibold">{r.materia}</td>
                      <td className="px-6 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                          <Icon className="w-3 h-3" />
                          {cfg.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
