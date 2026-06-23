import Link from 'next/link'
import { ChevronDown, ArrowRight, PlayCircle } from 'lucide-react'
import { HeroCarousel } from './hero-carousel'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        <HeroCarousel />
      </div>

      {/* Additional gradient overlay for theme consistency */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-20 pointer-events-none" />

      {/* Animated blobs */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-wine/15 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-wine/10 rounded-full blur-3xl animate-float delay-500" />
      </div>

      {/* Content */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6 sm:mb-8 animate-fade-in-up">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-xs sm:text-sm font-medium">
              La escuela de aviación más grande de Bolivia
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] mb-5 sm:mb-6 animate-fade-in-up delay-100">
            Tu carrera en{' '}
            <span className="relative inline-block">
              <span className="text-red-400">aviación</span>
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-red-400/40 rounded-full" />
            </span>{' '}
            comienza aquí
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-white/70 mb-8 sm:mb-10 max-w-xl leading-relaxed animate-fade-in-up delay-200">
            Formamos pilotos, tripulantes y profesionales aeronáuticos de excelencia.
            Certificados por la DGAC Bolivia — 4 sedes en todo el país.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 animate-fade-in-up delay-300">
            <Link href="/inscripcion"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 wine-gradient text-white text-sm sm:text-base font-bold rounded-xl hover-lift shadow-xl shadow-wine/30 btn-shimmer">
              Inscríbete Ahora <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link href="/carreras"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 glass text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-white/15 transition-all border border-white/20">
              <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              Ver Carreras
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 sm:gap-6 mt-10 sm:mt-12 pt-8 border-t border-white/15 animate-fade-in-up delay-400">
            {['✈️ Certificado DGAC', '⭐ 15+ años', '📍 4 sedes', '🎓 Instructores certificados'].map((b) => (
              <div key={b} className="text-white/60 text-xs sm:text-sm font-medium">{b}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 text-white/40 animate-fade-in-up delay-600">
        <span className="text-[10px] font-medium uppercase tracking-widest">Explorar</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  )
}
