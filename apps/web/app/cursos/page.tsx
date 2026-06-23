import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { Clock, Users, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const cursos = [
  { category: 'Pilotaje', items: [
    { name: 'Curso de Radio Comunicaciones', duration: '1 mes', students: '10–15', desc: 'Aprende el lenguaje aeronáutico y los procedimientos de comunicación VHF para operar en aeropuertos nacionales e internacionales.', level: 'Básico' },
    { name: 'Inglés Aeronáutico OACI', duration: '3 meses', students: '8–12', desc: 'Preparación para el examen de nivel de idioma OACI requerido para la licencia de piloto. Niveles del 1 al 6.', level: 'Intermedio' },
    { name: 'Actualización Meteorológica', duration: '2 semanas', students: '10–20', desc: 'Interpretación de METAR, TAF, SIGMET y pronósticos para planificación de vuelo.', level: 'Avanzado' },
  ]},
  { category: 'Seguridad y Emergencias', items: [
    { name: 'Primeros Auxilios Aeronáuticos', duration: '2 meses', students: '15–20', desc: 'Técnicas de primeros auxilios aplicadas al entorno de aviación. Obligatorio para tripulantes de cabina.', level: 'Básico' },
    { name: 'Seguridad de la Aviación', duration: '1 mes', students: '10–20', desc: 'Normas de seguridad OACI/IATA, procedimientos contra interferencia ilícita y protección de aeronaves.', level: 'Básico' },
  ]},
  { category: 'Operaciones', items: [
    { name: 'Planificación de Vuelo Avanzada', duration: '6 semanas', students: '8–12', desc: 'Software moderno de planificación, cálculo de performance y rutas de vuelo internacionales.', level: 'Avanzado' },
    { name: 'Gestión de Recursos (CRM)', duration: '3 semanas', students: '10–15', desc: 'Comunicación efectiva, toma de decisiones y gestión del error en cabina de mando. Obligatorio por DGAC.', level: 'Intermedio' },
  ]},
]

const levelBadge: Record<string, string> = {
  Básico:     'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800',
  Intermedio: 'bg-muted text-muted-foreground border border-border',
  Avanzado:   'bg-wine/10 text-wine dark:text-red-400 border border-wine/20',
}

export default function CursosPage() {
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
          <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 block animate-fade-in-up">Formación Continua</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 animate-fade-in-up delay-100">Cursos Especializados</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Capacitación y actualización para profesionales de la aviación. Mejora tus competencias y mantente al día con la industria.
          </p>
        </div>
      </section>

      {/* Cursos */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
          {cursos.map((cat, ci) => (
            <div key={cat.category} className="animate-fade-in-up" style={{ animationDelay: `${ci * 80}ms` }}>
              <div className="flex items-center gap-3 mb-7">
                <span className="w-1 h-7 sm:h-8 wine-gradient rounded-full" />
                <h2 className="text-xl sm:text-2xl font-black text-foreground">{cat.category}</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {cat.items.map((curso, i) => (
                  <div key={curso.name}
                    className="bg-card border border-border rounded-2xl p-5 sm:p-6 card-hover flex flex-col animate-fade-in-up shadow-sm"
                    style={{ animationDelay: `${ci * 80 + i * 60}ms` }}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 wine-gradient rounded-xl flex items-center justify-center shadow-sm">
                        <BookOpen className="w-5 h-5 text-white" />
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${levelBadge[curso.level]}`}>
                        {curso.level}
                      </span>
                    </div>
                    <h3 className="font-bold text-card-foreground text-base sm:text-lg mb-2 leading-snug">{curso.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">{curso.desc}</p>
                    <div className="flex items-center gap-4 mt-5 pt-4 border-t border-border">
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Clock className="w-3.5 h-3.5" />{curso.duration}
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                        <Users className="w-3.5 h-3.5" />{curso.students} alumnos
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0d0d] dark:bg-black/80 py-14 sm:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">¿No encuentras el curso que necesitas?</h2>
          <p className="text-white/40 text-sm sm:text-base mb-7">Contáctanos y diseñamos un programa a medida para ti o tu empresa.</p>
          <Link href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 wine-gradient text-white font-bold rounded-xl hover-lift btn-shimmer shadow-lg shadow-wine/20">
            Consultar disponibilidad <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
