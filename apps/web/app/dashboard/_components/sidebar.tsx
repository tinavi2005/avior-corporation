'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, BookOpen, Calendar, ClipboardList,
  MessageSquare, Bell, CreditCard, Users, Settings,
  FileText, BarChart2, UserCheck, GraduationCap, X, Menu,
} from 'lucide-react'

type NavItem = { href: string; label: string; icon: React.ComponentType<{ className?: string }> }

const studentNav: NavItem[] = [
  { href: '/dashboard/student',                 label: 'Inicio',          icon: LayoutDashboard },
  { href: '/dashboard/student/horario',         label: 'Mi Horario',      icon: Calendar },
  { href: '/dashboard/student/tareas',          label: 'Tareas',          icon: ClipboardList },
  { href: '/dashboard/student/calificaciones',  label: 'Calificaciones',  icon: BarChart2 },
  { href: '/dashboard/student/asistencia',      label: 'Asistencia',      icon: UserCheck },
  { href: '/dashboard/student/carnet',          label: 'Carnet Digital',  icon: CreditCard },
  { href: '/dashboard/student/chat',            label: 'Chat',            icon: MessageSquare },
  { href: '/dashboard/student/notificaciones',  label: 'Notificaciones',  icon: Bell },
]

const instructorNav: NavItem[] = [
  { href: '/dashboard/instructor',                  label: 'Inicio',         icon: LayoutDashboard },
  { href: '/dashboard/instructor/asistencia',       label: 'Pasar Lista',    icon: UserCheck },
  { href: '/dashboard/instructor/tareas',           label: 'Tareas',         icon: ClipboardList },
  { href: '/dashboard/instructor/examenes',         label: 'Exámenes',       icon: FileText },
  { href: '/dashboard/instructor/calificaciones',   label: 'Calificaciones', icon: BarChart2 },
  { href: '/dashboard/instructor/chat',             label: 'Chat',           icon: MessageSquare },
  { href: '/dashboard/instructor/horario',          label: 'Horario',        icon: Calendar },
]

const adminNav: NavItem[] = [
  { href: '/dashboard/admin',                   label: 'Inicio',         icon: LayoutDashboard },
  { href: '/dashboard/admin/usuarios',          label: 'Usuarios',       icon: Users },
  { href: '/dashboard/admin/cursos',            label: 'Cursos',         icon: BookOpen },
  { href: '/dashboard/admin/horarios',          label: 'Horarios',       icon: Calendar },
  { href: '/dashboard/admin/instructores',      label: 'Instructores',   icon: GraduationCap },
  { href: '/dashboard/admin/reportes',          label: 'Reportes',       icon: BarChart2 },
  { href: '/dashboard/admin/notificaciones',    label: 'Notificaciones', icon: Bell },
  { href: '/dashboard/admin/configuracion',     label: 'Configuración',  icon: Settings },
]

const navByRole: Record<string, NavItem[]> = {
  student: studentNav, instructor: instructorNav,
  admin: adminNav, coordinator: adminNav, secretary: adminNav, mechanic: studentNav,
}

function SidebarContent({ role, onClose }: { role: string; onClose?: () => void }) {
  const pathname = usePathname()
  const navItems = navByRole[role] || studentNav

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 group-hover:scale-105 transition-transform shrink-0">
            <Image src="/img/logo.png" alt="Avior SRL" fill className="object-contain" />
          </div>
          <div>
            <p className="font-black text-white text-sm tracking-wide">AVIOR</p>
            <p className="text-wine-light text-[10px] font-semibold tracking-widest uppercase">SRL · Aula Virtual</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
        {navItems.map((item, i) => {
          const Icon = item.icon
          const exact = item.href === `/dashboard/${role}`
          const isActive = exact ? pathname === item.href : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 animate-fade-in-up`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200 ${
                isActive ? 'wine-gradient shadow-md' : 'bg-white/8 group-hover:bg-white/12'
              }`}>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-white/60'}`} />
              </span>
              <span className={isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white/90'}>{item.label}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/8">
        <p className="text-white/20 text-xs text-center">© 2025 Avior SRL</p>
      </div>
    </div>
  )
}

export function Sidebar({ role }: { role: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 wine-gradient rounded-xl flex items-center justify-center shadow-lg"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-4 h-4 text-white" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside className={`lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d0d] border-r border-white/8 transform transition-transform duration-300 ease-spring ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent role={role} onClose={() => setMobileOpen(false)} />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-60 xl:w-64 bg-[#0d0d0d] border-r border-white/8 flex-shrink-0 flex-col min-h-screen sticky top-0">
        <SidebarContent role={role} />
      </aside>
    </>
  )
}
