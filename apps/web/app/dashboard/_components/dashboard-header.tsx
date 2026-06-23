'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/lib/auth/provider'
import { Bell, LogOut, User, ChevronDown } from 'lucide-react'

const roleLabel: Record<string, string> = {
  admin: 'Administrador', instructor: 'Instructor', student: 'Estudiante',
  coordinator: 'Coordinador', secretary: 'Secretaría', mechanic: 'Mecánico',
}
const roleBadge: Record<string, string> = {
  admin:       'bg-wine/10 text-wine border border-wine/20',
  instructor:  'bg-zinc-800 text-zinc-300 border border-zinc-700',
  student:     'bg-zinc-100 text-zinc-700 border border-zinc-200',
  coordinator: 'bg-zinc-800 text-zinc-300 border border-zinc-700',
  secretary:   'bg-zinc-100 text-zinc-600 border border-zinc-200',
  mechanic:    'bg-zinc-100 text-zinc-600 border border-zinc-200',
}

export function DashboardHeader({ title }: { title: string }) {
  const { user, signOut } = useAuth()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const role = user?.role || 'student'
  const initials = (user?.profile?.firstName || user?.email || 'U').charAt(0).toUpperCase()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center justify-between h-14 sm:h-16 px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-3 lg:gap-4 pl-10 lg:pl-0">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="relative w-8 h-8 group-hover:scale-105 transition-transform">
              <Image src="/img/logo.png" alt="Avior SRL" fill className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="font-black text-wine text-xs tracking-widest uppercase">Avior SRL</span>
            </div>
          </Link>
          <div className="h-4 w-px bg-gray-200 hidden sm:block" />
          <h1 className="text-xs sm:text-sm font-semibold text-gray-500 hidden sm:block truncate max-w-xs">{title}</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false) }}
              className="relative p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 wine-gradient rounded-full animate-pulse" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-scale-in">
                <div className="px-4 py-3 border-b border-gray-50">
                  <p className="font-bold text-gray-900 text-sm">Notificaciones</p>
                </div>
                <div className="p-4 text-center">
                  <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                  <p className="text-gray-400 text-xs">Sin notificaciones nuevas</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false) }}
              className="flex items-center gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 wine-gradient rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                {initials}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-gray-900 leading-tight">
                  {user?.profile?.firstName || user?.email?.split('@')[0]}
                </p>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${roleBadge[role] || roleBadge.student}`}>
                  {roleLabel[role] || role}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 hidden md:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-1.5 z-50 animate-scale-in">
                <div className="px-4 py-2.5 border-b border-gray-50 mb-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.profile?.firstName} {user?.profile?.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  <User className="w-4 h-4 text-gray-400" />
                  Mi Perfil
                </button>
                <button
                  onClick={() => { setProfileOpen(false); signOut() }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-wine hover:bg-wine-pale transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
