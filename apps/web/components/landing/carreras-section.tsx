import Link from 'next/link'
import { ArrowRight, Plane, Users, Radio, Clock } from 'lucide-react'

const carreras = [
  { icon: Plane,  title: 'Piloto Comercial / Privado', duration: '18 - 24 meses', href: '/carreras#piloto',
    description: 'Domina el vuelo desde cero. Formación teórica y práctica certificada por la DGAC Bolivia para pilotar aeronaves comerciales o privadas.' },
  { icon: Users,  title: 'Tripulante de Cabina', duration: '6 meses', href: '/carreras#tripulante',
    description: 'Conviértete en el profesional que garantiza la seguridad y bienestar de los pasajeros a bordo. Alta demanda en aerolíneas.' },
  { icon: Radio,  title: 'Despachador de Vuelo', duration: '8 meses', href: '/carreras#despachador',
    description: 'Planifica y controla operaciones de vuelo desde tierra. Una carrera técnica esencial en la industria aeronáutica moderna.' },
]

export function CarrerasSection() {
  return (
    <section id="carreras" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Formación Aeronáutica</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0d0d] mb-4">Nuestras Carreras</h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-2xl mx-auto">
            Programas certificados por la DGAC Bolivia, diseñados para los estándares internacionales de la aviación civil.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {carreras.map((carrera, i) => {
            const Icon = carrera.icon
            return (
              <div key={carrera.title}
                className="group bg-white border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-wine/20 transition-all duration-300 hover:-translate-y-2 flex flex-col animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms` }}>
                <div className="h-1.5 wine-gradient group-hover:h-2 transition-all duration-300" />
                <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-50 group-hover:wine-gradient rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:scale-110">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-wine group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-[#0d0d0d] mb-2 group-hover:text-wine transition-colors">{carrera.title}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-xs font-semibold text-gray-400">{carrera.duration}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{carrera.description}</p>
                  <Link href={carrera.href}
                    className="mt-5 sm:mt-6 inline-flex items-center gap-1.5 text-wine font-bold text-sm group-hover:gap-3 transition-all duration-300">
                    Ver programa <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-8 sm:mt-12 animate-fade-in-up delay-400">
          <Link href="/carreras"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 wine-gradient text-white font-bold rounded-xl hover-lift shadow-lg shadow-wine/20 btn-shimmer text-sm sm:text-base">
            Ver todas las carreras <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
