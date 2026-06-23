export function AlianzasSection() {
  const alianzas = [
    { name: 'BoA Boliviana de Aviación', abbr: 'BoA', desc: 'Aerolínea de bandera de Bolivia', color: 'wine-gradient' },
    { name: 'Ecojet', abbr: 'ECO', desc: 'Aerolínea boliviana regional', color: 'bg-[#0d0d0d] dark:bg-[#1a1a1a]' },
    { name: 'DGAC Bolivia', abbr: 'DGAC', desc: 'Dirección General de Aeronáutica Civil', color: 'bg-zinc-800' },
    { name: 'OACI', abbr: 'OACI', desc: 'Organización de Aviación Civil Internacional', color: 'bg-zinc-900 dark:bg-zinc-800' },
  ]

  return (
    <section className="py-16 sm:py-20 bg-surface-2 border-y border-border-c">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
          <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">
            Alianzas Estratégicas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-text-1 mb-3">
            Nuestras Alianzas
          </h2>
          <p className="text-text-3 text-sm sm:text-base max-w-2xl mx-auto">
            Colaboramos con las principales aerolíneas para ofrecer oportunidades excepcionales
            a nuestros estudiantes.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {alianzas.map((a, i) => (
            <div
              key={a.name}
              className="rounded-2xl p-5 sm:p-6 card-hover animate-fade-in-up flex flex-col items-center text-center gap-3 bg-surface-1 border border-border-c hover:border-wine/30"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-14 h-14 sm:w-16 sm:h-16 ${a.color} rounded-2xl flex items-center justify-center shadow-md`}>
                <span className="text-white font-black text-xs sm:text-sm tracking-wider">{a.abbr}</span>
              </div>
              <div>
                <h4 className="font-bold text-text-1 text-sm leading-tight">{a.name}</h4>
                <p className="text-text-3 text-xs mt-1">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
