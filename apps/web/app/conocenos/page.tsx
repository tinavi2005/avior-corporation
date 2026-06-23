import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { GalleryCarousel } from '@/components/landing/gallery-carousel'
import { Shield, Target, Eye, GraduationCap, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const valores = [
  { icon: Shield,        title: 'Seguridad',   desc: 'La seguridad es nuestra prioridad número uno, en todo proceso de enseñanza y operación.' },
  { icon: Target,        title: 'Excelencia',  desc: 'Formamos profesionales al más alto nivel, comprometidos con los estándares internacionales.' },
  { icon: Eye,           title: 'Integridad',  desc: 'Actuamos con transparencia, honestidad y ética en todos nuestros actos.' },
  { icon: GraduationCap, title: 'Innovación',  desc: 'Renovamos constantemente nuestros programas para adaptarnos a la industria moderna.' },
]

const equipo = [
  { nombre: 'Capitán Roberto Flores', cargo: 'Director Académico',      lic: 'ATPL – 8,500 hrs' },
  { nombre: 'Lic. Ana Saavedra',      cargo: 'Coordinadora Académica', lic: 'Administración Aeronáutica' },
  { nombre: 'Cap. Luis Quispe',       cargo: 'Instructor de Vuelo',    lic: 'ATPL – 6,200 hrs' },
  { nombre: 'Cmdt. Sandra Vargas',    cargo: 'Instructora Tripulación', lic: 'Cabina – 12 años' },
]

const hitos = [
  { year: '2009', evento: 'Fundación de Avior Escuela de Aviación en La Paz' },
  { year: '2011', evento: 'Obtención de certificación DGAC Bolivia' },
  { year: '2014', evento: 'Apertura de sede en Cochabamba' },
  { year: '2017', evento: 'Apertura de sedes en Tarija y Sucre' },
  { year: '2019', evento: 'Reconocimiento como la mayor escuela de aviación de Bolivia' },
  { year: '2022', evento: 'Lanzamiento del Aula Virtual integrada' },
  { year: '2025', evento: '2,000+ egresados en toda Bolivia' },
]

export default function ConocenosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="wine-hero-gradient pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-wine/10 rounded-full blur-3xl animate-float delay-400" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 block animate-fade-in-up">Nuestra Institución</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 animate-fade-in-up delay-100">Conócenos</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Más de 15 años formando los profesionales aeronáuticos de Bolivia. Historia, misión y el equipo detrás del sueño de volar.
          </p>
        </div>
      </section>

      {/* Misión & Visión */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
            <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-7 sm:p-8 shadow-sm border-l-4 border-l-wine card-hover animate-slide-left">
              <p className="text-xs font-bold uppercase tracking-widest text-wine dark:text-red-400 mb-3">Misión</p>
              <h3 className="text-xl sm:text-2xl font-black text-card-foreground mb-4">Nuestra Misión</h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Formar profesionales aeronáuticos de excelencia con los más altos estándares de seguridad, disciplina y compromiso, certificados por la DGAC Bolivia.
              </p>
            </div>
            <div className="wine-gradient rounded-2xl sm:rounded-3xl p-7 sm:p-8 shadow-lg card-hover animate-slide-right">
              <p className="text-xs font-bold uppercase tracking-widest text-red-300 mb-3">Visión</p>
              <h3 className="text-xl sm:text-2xl font-black text-white mb-4">Nuestra Visión</h3>
              <p className="text-white/65 leading-relaxed text-sm sm:text-base">
                Ser reconocida como la institución de formación aeronáutica líder en Latinoamérica, referente de calidad y excelencia educativa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 sm:py-24 bg-[#0d0d0d] dark:bg-black/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Pilares</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Nuestros Valores</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {valores.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={v.title}
                  className="bg-white/5 border border-white/8 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-wine/50 transition-all duration-300 group cursor-default card-hover animate-fade-in-up"
                  style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-wine/20 group-hover:wine-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-red-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="font-black text-white text-base sm:text-lg mb-2">{v.title}</h4>
                  <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="text-wine dark:text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Trayectoria</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Nuestra Historia</h2>
          </div>
          <div className="relative">
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-0.5 bg-wine/15 rounded-full" />
            <div className="space-y-6 sm:space-y-8">
              {hitos.map((h, i) => (
                <div key={h.year} className="flex items-start gap-4 sm:gap-6 pl-14 sm:pl-16 relative animate-fade-in-up"
                  style={{ animationDelay: `${i * 70}ms` }}>
                  <div className="absolute left-0 w-10 h-10 sm:w-12 sm:h-12 wine-gradient rounded-full flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md shadow-wine/20">
                    {h.year.slice(2)}
                  </div>
                  <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex-1 card-hover">
                    <span className="text-wine dark:text-red-400 font-bold text-xs">{h.year}</span>
                    <p className="text-card-foreground text-sm mt-0.5">{h.evento}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <span className="text-wine dark:text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Equipo</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Nuestros Profesionales</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">Instructores y personal con experiencia real en la industria aeronáutica.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {equipo.map((m, i) => (
              <div key={m.nombre}
                className="bg-card border border-border rounded-2xl p-6 text-center card-hover animate-fade-in-up shadow-sm"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-14 h-14 sm:w-16 sm:h-16 wine-gradient rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-black shadow-md shadow-wine/20">
                  {m.nombre.split(' ').pop()?.charAt(0)}
                </div>
                <h4 className="font-bold text-card-foreground text-sm">{m.nombre}</h4>
                <p className="text-wine dark:text-red-400 text-xs font-semibold mt-1">{m.cargo}</p>
                <p className="text-muted-foreground text-xs mt-1.5">{m.lic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-wine dark:text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Galería</span>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Nuestra Escuela en Imágenes</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm sm:text-base">Momentos, instalaciones y graduaciones que forman parte de nuestra historia.</p>
          </div>
          <GalleryCarousel />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0d0d] dark:bg-black/80 py-14 sm:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Forma parte de la familia Avior</h2>
          <p className="text-white/40 text-sm sm:text-base mb-7">Únete a los profesionales aeronáuticos más destacados de Bolivia.</p>
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
