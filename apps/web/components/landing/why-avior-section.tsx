import { Shield, Award, Globe, BookOpen, Users, Clock } from 'lucide-react'

const features = [
  { icon: Shield, title: 'Certificados por DGAC', desc: 'Programas aprobados por la Dirección General de Aeronáutica Civil de Bolivia.' },
  { icon: Award, title: 'Instructores de élite', desc: 'Pilotos y profesionales activos con miles de horas de vuelo.' },
  { icon: Globe, title: 'Reconocimiento internacional', desc: 'Titulaciones reconocidas a nivel latinoamericano.' },
  { icon: BookOpen, title: 'Metodología moderna', desc: 'Teoría actualizada con práctica en simuladores y aeronaves reales.' },
  { icon: Users, title: 'Red de egresados', desc: '+2,000 profesionales. Conexión con aerolíneas nacionales e internacionales.' },
  { icon: Clock, title: 'Horarios flexibles', desc: 'Clases adaptadas para que puedas estudiar y trabajar al mismo tiempo.' },
]

export function WhyAviorSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div className="opacity-start animate-slide-in-left">
            <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">
              ¿Por qué elegirnos?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-5 sm:mb-6 leading-tight">
              La más grande de Bolivia,{' '}
              <span className="text-[#6b0f1a]">la mejor del país</span>
            </h2>
            <p className="text-sm sm:text-base text-white/50 leading-relaxed mb-6 sm:mb-8">
              Avior Escuela de Aviación es la institución líder en formación aeronáutica en Bolivia.
              Con más de 15 años y 4 sedes estratégicas, ofrecemos la mejor educación para tu futuro.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-2xl sm:text-3xl font-black text-[#6b0f1a]">DGAC</span>
                <span className="text-xs text-white/40 font-medium">Certificado oficialmente</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                <span className="text-2xl sm:text-3xl font-black text-white">#1</span>
                <span className="text-xs text-white/40 font-medium">En Bolivia por estudiantes</span>
              </div>
            </div>
          </div>

          {/* Right — Feature grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 opacity-start animate-slide-in-right">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="bg-white/5 border border-white/8 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:bg-white/8 hover:border-[#6b0f1a]/40 transition-all duration-300 group cursor-default"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#6b0f1a]/20 group-hover:bg-[#6b0f1a] rounded-lg sm:rounded-xl flex items-center justify-center mb-2.5 sm:mb-3 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-bold text-white text-xs sm:text-sm mb-1">{f.title}</h4>
                  <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
