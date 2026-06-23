import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { Plane, Users, Radio, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const carreras = [
  {
    id: 'piloto', icon: Plane,
    title: 'Piloto Comercial / Privado', subtitle: 'La carrera más completa de la aviación',
    duration: '18 – 24 meses',
    description: 'Conviértete en piloto certificado por la DGAC Bolivia. Nuestro programa cubre desde el vuelo básico hasta el vuelo instrumental, con instrucción en aeronaves reales.',
    materias: ['Meteorología Aeronáutica','Navegación y Planificación de Vuelo','Reglamentación Aeronáutica','Inglés Aeronáutico','Vuelo Visual (VFR)','Vuelo Instrumental (IFR)','Operaciones en Aeropuerto','Factores Humanos en Aviación'],
    requisitos: ['Bachillerato completo','Mínimo 17 años de edad','Certificado médico aeronáutico Clase 1 o 2','Fotocopia de CI vigente','2 fotos de carnet'],
  },
  {
    id: 'tripulante', icon: Users,
    title: 'Tripulante de Cabina', subtitle: 'La imagen profesional de la aerolínea',
    duration: '6 meses',
    description: 'Formación integral como Sobrecargo / Auxiliar de vuelo. Aprende primeros auxilios aeronáuticos, seguridad a bordo, atención al pasajero y procedimientos de emergencia.',
    materias: ['Seguridad en Cabina','Primeros Auxilios Aeronáuticos','Servicio a Bordo','Procedimientos de Emergencia','Normas de Seguridad DGAC','Inglés Funcional','Relaciones Humanas','Manejo de Crisis'],
    requisitos: ['Bachillerato completo','Mínimo 18 años','Estatura mínima 1.58 m / 1.65 m','Certificado médico','Buena presencia'],
  },
  {
    id: 'despachador', icon: Radio,
    title: 'Despachador de Vuelo', subtitle: 'El controlador operacional de tierra',
    duration: '8 meses',
    description: 'Planifica y autoriza operaciones de vuelo desde tierra. El Despachador es corresponsable con el Piloto del vuelo seguro. Alta demanda en aerolíneas y aeropuertos.',
    materias: ['Planificación de Vuelo','Meteorología Aplicada','Reglamentación Aeronáutica','Performance de Aeronaves','Sistemas de Aeronaves','Control Operacional','Comunicaciones','Inglés Aeronáutico'],
    requisitos: ['Bachillerato completo','Mínimo 18 años','Certificado médico','Fotocopia de CI vigente','2 fotos de carnet'],
  },
]

export default function CarrerasPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="wine-hero-gradient pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-wine/10 rounded-full blur-3xl animate-float delay-300" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 block animate-fade-in-up">
            Formación Aeronáutica
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 animate-fade-in-up delay-100">
            Nuestras Carreras
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Programas certificados por la DGAC Bolivia, diseñados para los estándares internacionales de la aviación civil.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          {carreras.map((carrera, index) => {
            const Icon = carrera.icon
            const reversed = index % 2 === 1
            return (
              <div key={carrera.id} id={carrera.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-start animate-fade-in-up ${reversed ? 'lg:[direction:rtl]' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}>

                {/* Info panel */}
                <div className={`wine-gradient rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-white ${reversed ? 'lg:[direction:ltr]' : ''}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/15 rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <p className="text-white/50 text-xs sm:text-sm font-medium mb-1">{carrera.subtitle}</p>
                  <h2 className="text-2xl sm:text-3xl font-black mb-4">{carrera.title}</h2>
                  <div className="flex items-center gap-2 mb-5 text-white/70 text-sm">
                    <Clock className="w-4 h-4 text-red-300" />
                    <span>Duración: <strong className="text-white">{carrera.duration}</strong></span>
                  </div>
                  <p className="text-white/65 text-sm leading-relaxed mb-7">{carrera.description}</p>
                  <p className="text-red-300 text-xs font-bold uppercase tracking-widest mb-3">Requisitos de ingreso</p>
                  <ul className="space-y-2">
                    {carrera.requisitos.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-white/70 text-sm">
                        <CheckCircle className="w-4 h-4 text-red-300 mt-0.5 shrink-0" />{r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Materias */}
                <div className={reversed ? 'lg:[direction:ltr]' : ''}>
                  <p className="text-xs font-bold uppercase tracking-widest text-wine dark:text-red-400 mb-4">Contenido del Programa</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-8">
                    {carrera.materias.map((m) => (
                      <div key={m}
                        className="flex items-center gap-3 bg-muted hover:bg-wine/5 dark:hover:bg-wine/10 border border-border hover:border-wine/30 rounded-xl px-4 py-3 transition-all duration-200 group">
                        <div className="w-1.5 h-1.5 bg-wine dark:bg-red-400 rounded-full shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="text-sm font-medium text-foreground">{m}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/inscripcion"
                    className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 wine-gradient text-white font-bold rounded-xl hover-lift btn-shimmer shadow-lg shadow-wine/20 text-sm sm:text-base">
                    Inscribirme en esta carrera <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0d0d] dark:bg-black/80 py-14 sm:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">¿Listo para despegar?</h2>
          <p className="text-white/40 text-sm sm:text-base mb-7">Únete a más de 2,000 profesionales aeronáuticos formados en Avior SRL.</p>
          <Link href="/inscripcion"
            className="inline-flex items-center gap-2 px-8 py-4 wine-gradient text-white font-bold rounded-xl hover-lift btn-shimmer shadow-lg shadow-wine/20">
            Inscríbete Ahora <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
