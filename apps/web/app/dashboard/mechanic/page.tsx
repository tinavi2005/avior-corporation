'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { DashboardHeader } from '../_components/dashboard-header'
import { Sidebar } from '../_components/sidebar'
import { Loader2, Wrench, ClipboardList, AlertTriangle } from 'lucide-react'

export default function MechanicDashboardPage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) router.push('/login')
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="min-h-screen wine-hero-gradient flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar role="mechanic" />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Aula Virtual — Mecánico" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Welcome banner */}
          <div className="wine-gradient rounded-2xl p-6 text-white mb-6 animate-fade-in-up">
            <h2 className="text-2xl font-black">
              Hola, {user.profile?.firstName || user.email?.split('@')[0]}
            </h2>
            <p className="text-white/60 text-sm mt-1">Panel de mecánico de aviación</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in-up delay-100">
            {[
              { label: 'Aeronaves', value: '0', icon: Wrench },
              { label: 'Mantenimientos', value: '0', icon: ClipboardList },
              { label: 'Pendientes', value: '0', icon: AlertTriangle },
            ].map(({ label, value, icon: Icon }, i) => (
              <div
                key={label}
                className="bg-white dark:bg-card rounded-2xl p-6 border border-border shadow-sm card-hover"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground font-medium">{label}</p>
                  <div className="w-9 h-9 bg-wine/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-4 h-4 text-wine" />
                  </div>
                </div>
                <p className="text-4xl font-black text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
