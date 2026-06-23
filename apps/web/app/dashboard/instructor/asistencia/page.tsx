'use client'

import { useState } from 'react'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { CheckCircle2, XCircle, Clock, FileText, Save } from 'lucide-react'

type Estado = 'presente' | 'ausente' | 'retraso' | 'licencia'

const alumnos = [
  { id: '1', nombre: 'Carlos Mamani', ci: '8521456' },
  { id: '2', nombre: 'Valeria Torrico', ci: '9632147' },
  { id: '3', nombre: 'Jorge Vásquez', ci: '7845213' },
  { id: '4', nombre: 'María Flores', ci: '8963214' },
  { id: '5', nombre: 'Roberto Quispe', ci: '7412365' },
]

const estadoConfig: Record<Estado, { label: string; activeColor: string; icon: React.ComponentType<{className?: string}> }> = {
  presente: { label: 'P', activeColor: 'bg-green-500 text-white', icon: CheckCircle2 },
  retraso: { label: 'R', activeColor: 'bg-amber-500 text-white', icon: Clock },
  ausente: { label: 'A', activeColor: 'bg-red-500 text-white', icon: XCircle },
  licencia: { label: 'L', activeColor: 'bg-wine text-white', icon: FileText },
}

export default function AsistenciaInstructorPage() {
  const today = new Date().toISOString().split('T')[0]
  const [fecha, setFecha] = useState(today)
  const [materia, setMateria] = useState('Meteorología Aeronáutica')
  const [asistencia, setAsistencia] = useState<Record<string, Estado>>(
    Object.fromEntries(alumnos.map((a) => [a.id, 'presente']))
  )
  const [saved, setSaved] = useState(false)

  const setEstado = (alumnoId: string, estado: Estado) => {
    setAsistencia({ ...asistencia, [alumnoId]: estado })
    setSaved(false)
  }

  const handleGuardar = () => {
    // Would call API here
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const conteo = {
    presente: Object.values(asistencia).filter((e) => e === 'presente').length,
    retraso: Object.values(asistencia).filter((e) => e === 'retraso').length,
    ausente: Object.values(asistencia).filter((e) => e === 'ausente').length,
    licencia: Object.values(asistencia).filter((e) => e === 'licencia').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="instructor" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Pasar Lista" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Registro de Asistencia</h2>
              <p className="text-gray-500 mt-1">Marca la asistencia de tus alumnos.</p>
            </div>
            <button
              onClick={handleGuardar}
              className={`flex items-center gap-2 px-5 py-2.5 font-semibold text-sm rounded-xl transition-all shadow-md ${
                saved ? 'bg-green-500 text-white' : 'wine-gradient text-white hover:opacity-90'
              }`}
            >
              <Save className="w-4 h-4" />
              {saved ? '¡Guardado!' : 'Guardar Lista'}
            </button>
          </div>

          {/* Filters */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Materia</label>
              <select
                value={materia}
                onChange={(e) => setMateria(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine bg-white"
              >
                <option>Meteorología Aeronáutica</option>
                <option>Navegación y Planificación</option>
                <option>Radio Comunicaciones</option>
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {(Object.entries(conteo) as [Estado, number][]).map(([estado, count]) => {
              const cfg = estadoConfig[estado]
              const Icon = cfg.icon
              return (
                <div key={estado} className="bg-white rounded-xl p-3 border border-gray-100 text-center shadow-sm">
                  <p className="text-xl font-black text-gray-900">{count}</p>
                  <p className="text-xs text-gray-400 capitalize">{estado}</p>
                </div>
              )
            })}
          </div>

          {/* Student list */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 grid grid-cols-12 gap-4">
              <div className="col-span-5 text-xs font-bold text-gray-400 uppercase">Alumno</div>
              <div className="col-span-3 text-xs font-bold text-gray-400 uppercase">C.I.</div>
              <div className="col-span-4 text-xs font-bold text-gray-400 uppercase">Estado</div>
            </div>
            <div className="divide-y divide-gray-50">
              {alumnos.map((alumno) => {
                const estadoActual = asistencia[alumno.id]
                return (
                  <div key={alumno.id} className="px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-8 h-8 wine-gradient rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {alumno.nombre.charAt(0)}
                      </div>
                      <span className="font-semibold text-gray-800 text-sm">{alumno.nombre}</span>
                    </div>
                    <div className="col-span-3 text-sm text-gray-400">{alumno.ci}</div>
                    <div className="col-span-4 flex gap-1.5">
                      {(Object.entries(estadoConfig) as [Estado, typeof estadoConfig[Estado]][]).map(([estado, cfg]) => (
                        <button
                          key={estado}
                          onClick={() => setEstado(alumno.id, estado)}
                          title={estado}
                          className={`w-8 h-8 rounded-lg font-bold text-xs transition-all ${
                            estadoActual === estado
                              ? cfg.activeColor
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {cfg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            P = Presente · R = Retraso · A = Ausente · L = Licencia
          </p>
        </main>
      </div>
    </div>
  )
}
