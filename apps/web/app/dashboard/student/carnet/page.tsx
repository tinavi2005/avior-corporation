'use client'

import { useAuth } from '@/lib/auth/provider'
import { DashboardHeader } from '../../_components/dashboard-header'
import { Sidebar } from '../../_components/sidebar'
import { Download, QrCode, Shield } from 'lucide-react'

export default function CarnetPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar role="student" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Carnet Estudiantil Digital" />
        <main className="flex-1 p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900">Mi Carnet Digital</h2>
            <p className="text-gray-500 mt-1">Carnet estudiantil oficial de Avior Escuela de Aviación</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Card front */}
            <div
              className="w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
              style={{ aspectRatio: '1.586' }}
            >
              <div className="avior-gradient h-full p-6 flex flex-col justify-between">
                {/* Top */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 wine-gradient rounded-full flex items-center justify-center">
                      <span className="text-white font-black text-xs">AV</span>
                    </div>
                    <div>
                      <p className="text-white font-black text-xs">AVIOR</p>
                      <p className="text-white/60 text-xs" style={{ fontSize: '9px' }}>ESCUELA DE AVIACIÓN</p>
                    </div>
                  </div>
                  <Shield className="w-5 h-5 text-white/40" />
                </div>

                {/* Content */}
                <div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2 text-white text-xl font-black">
                    {(user?.profile?.firstName || 'E').charAt(0)}
                  </div>
                  <p className="text-white font-black text-lg leading-tight">
                    {user?.profile?.firstName || 'Estudiante'} {user?.profile?.lastName || ''}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">Carrera en curso</p>
                </div>

                {/* Bottom */}
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/50 text-xs">ID Estudiante</p>
                    <p className="text-white font-mono font-bold text-sm">
                      {user?.id?.slice(0, 12).toUpperCase() || 'AV-000000'}
                    </p>
                  </div>
                  <div className="bg-white/20 rounded-lg p-1.5">
                    <QrCode className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Info panel */}
            <div className="flex-1 space-y-4">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">Datos del Estudiante</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Nombre completo', value: `${user?.profile?.firstName || '--'} ${user?.profile?.lastName || ''}` },
                    { label: 'Correo electrónico', value: user?.email || '--' },
                    { label: 'Institución', value: 'Avior Escuela de Aviación' },
                    { label: 'Estado', value: 'Activo' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span className="text-gray-400 font-medium">{row.label}</span>
                      <span className="text-gray-800 font-semibold">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="flex items-center gap-2 w-full justify-center px-6 py-3 wine-gradient text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-md">
                <Download className="w-5 h-5" />
                Descargar Carnet PDF
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
