import { Star, Quote } from 'lucide-react'

const testimonials = [
  { name: 'Carlos Mamani',   role: 'Piloto Comercial — BoA',           text: 'Gracias a Avior hoy vuelo para Boliviana de Aviación. La formación fue excelente y los instructores siempre estuvieron pendientes de mi progreso.', stars: 5, city: 'La Paz',      initial: 'C' },
  { name: 'Valeria Torrico', role: 'Tripulante de Cabina — Amaszonas', text: 'El programa de Tripulante de Cabina me abrió las puertas que necesitaba. En 6 meses ya estaba trabajando en mi sueño.', stars: 5, city: 'Cochabamba', initial: 'V' },
  { name: 'Jorge Vásquez',   role: 'Despachador de Vuelo',             text: 'La teoría y práctica que recibí en Avior me preparó perfectamente para el mundo real. Los horarios flexibles me permitieron estudiar y trabajar.', stars: 5, city: 'Tarija',      initial: 'J' },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Testimonios</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0d0d] mb-4">Ellos ya vuelan con nosotros</h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">Más de 2,000 profesionales aeronáuticos formados en Avior.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name}
              className="bg-gray-50 border border-gray-100 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 hover:shadow-xl hover:border-wine/20 hover:-translate-y-1 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${i * 150}ms` }}>
              <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-wine/20 group-hover:text-wine/40 transition-colors mb-4" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-wine text-wine" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 wine-gradient rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="text-[#0d0d0d] font-bold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role} · {t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
