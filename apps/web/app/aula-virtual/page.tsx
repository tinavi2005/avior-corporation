import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/server'
import Link from 'next/link'
import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { GraduationCap, Users, BookOpen, Shield, ArrowRight, Lock, CheckCircle } from 'lucide-react'

const features = [
  {
    role: 'Estudiante',
    icon: GraduationCap,
    desc: 'Todo lo que necesitas para tu formación',
    featured: false,
    items: [
      'Ver y descargar materiales de clase',
      'Entregar tareas y proyectos',
      'Rendir exámenes en línea',
      'Calificaciones en tiempo real',
      'Horario interactivo personalizado',
      'Solicitar licencias y permisos',
      'Carnet estudiantil digital',
      'Chat con instructores',
      'Notificaciones personalizadas',
    ],
  },
  {
    role: 'Instructor',
    icon: BookOpen,
    desc: 'Control total de tu clase y alumnos',
    featured: true,
    items: [
      'Publicar temas y materiales',
      'Crear y calificar tareas',
      'Generar exámenes en línea',
      'Llamar lista de asistencia',
      'Registrar ausencias, retrasos y licencias',
      'Calificar estudiantes',
      'Ver historial académico del alumno',
      'Chat individual y grupal',
      'Notificaciones a grupos',
    ],
  },
  {
    role: 'Administrador',
    icon: Shield,
    desc: 'Gestión completa de la plataforma',
    featured: false,
    items: [
      'Asignar cursos y materias',
      'Gestionar horarios e instructores',
      'Crear y editar clases',
      'Administrar inscripciones',
      'Control de accesos y roles',
      'Reportes académicos globales',
      'Gestión de usuarios',
      'Aprobar licencias y solicitudes',
      'Configuración del sistema',
    ],
  },
]

export default async function AulaVirtualLandingPage() {
  let user = null
  try { user = await getCurrentUser() } catch { /* not authenticated */ }
  if (user) redirect(`/dashboard/${user.role || 'student'}`)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="wine-hero-gradient pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-wine/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/3 rounded-full blur-3xl animate-float delay-500" />
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 animate-fade-in-up">
            <GraduationCap className="w-4 h-4 text-red-400" />
            <span className="text-white/80 text-xs sm:text-sm font-medium">Plataforma Educativa — Avior SRL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 animate-fade-in-up delay-100">
            Aula Virtual
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-10 animate-fade-in-up delay-200">
            Accede a tu espacio de aprendizaje, calificaciones, horarios, tareas y más.
            Disponible 24/7 desde cualquier dispositivo.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center animate-fade-in-up delay-300">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 wine-gradient text-white font-bold rounded-xl hover-lift btn-shimmer shadow-xl shadow-wine/30 text-sm sm:text-base"
            >
              <Lock className="w-4 h-4 sm:w-5 sm:h-5" />
              Ingresar al Aula
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-all text-sm sm:text-base border border-white/20"
            >
              Solicitar Acceso
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features by role ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Funcionalidades</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d0d0d] mb-4">¿Qué puedes hacer?</h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Una plataforma completa con herramientas diseñadas para cada rol.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.role}
                  className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 card-hover animate-fade-in-up ${
                    f.featured
                      ? 'wine-gradient text-white shadow-xl shadow-wine/20'
                      : 'bg-white border border-gray-100 shadow-sm'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${f.featured ? 'bg-white/15' : 'wine-gradient shadow-sm'} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${f.featured ? 'text-white' : 'text-white'}`} />
                  </div>
                  <h3 className={`text-lg sm:text-xl font-black mb-1 ${f.featured ? 'text-white' : 'text-[#0d0d0d]'}`}>{f.role}</h3>
                  <p className={`text-xs sm:text-sm mb-5 sm:mb-6 ${f.featured ? 'text-white/55' : 'text-gray-400'}`}>{f.desc}</p>
                  <ul className="space-y-2.5">
                    {f.items.map((item) => (
                      <li key={item} className={`flex items-start gap-2 text-xs sm:text-sm ${f.featured ? 'text-white/75' : 'text-gray-600'}`}>
                        <CheckCircle className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${f.featured ? 'text-red-300' : 'text-wine'}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#0d0d0d] py-14 sm:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
            ¿Eres estudiante o instructor de Avior SRL?
          </h2>
          <p className="text-white/40 text-sm sm:text-base mb-7">
            Ingresa con tus credenciales institucionales o usa el acceso demo.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-8 py-4 wine-gradient text-white font-bold text-sm sm:text-base rounded-xl hover-lift btn-shimmer shadow-xl shadow-wine/20"
          >
            Iniciar Sesión <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
