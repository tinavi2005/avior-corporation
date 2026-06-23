import { MapPin, Phone, Clock } from 'lucide-react'

const bases = [
  {
    name: 'Base Central',
    subtitle: 'La Paz',
    address: 'Av. 6 de Agosto, entre Pedro Salazar y Lisimaco Gutiérrez #2530',
    reference: 'Frente al banco Mutual La Primera',
    phone: '+591 62530806',
    hours: 'Lun-Vie 08:30 a 12:30 · 14:30 a 18:30',
    featured: true,
  },
  {
    name: 'Satélite Cochabamba',
    subtitle: 'Cochabamba',
    address: 'Av. Segunda, esquina Marina Nuñez del Prado',
    reference: 'A 3 cuadras del Mercado 10 de Febrero',
    phone: '+591 77218909',
    hours: 'Lun-Vie 08:30 a 17:10',
    featured: false,
  },
  {
    name: 'Satélite Tarija',
    subtitle: 'Tarija',
    address: 'Calle Ramón Rojas, entre Ingavi y Madrid #573',
    reference: 'Cerca Plaza Uriondo',
    phone: '+591 75145330',
    hours: 'Lun-Vie 08:30 a 12:30 · 14:30 a 18:30',
    featured: false,
  },
  {
    name: 'Satélite Sucre',
    subtitle: 'Sucre',
    address: 'Calle J. Pérez, entre La Paz y Azurduy #342',
    reference: 'Frente al Supermercado SAS',
    phone: '+591 69322199',
    hours: 'Lun-Vie 08:30 a 12:30 · 14:30 a 18:30',
    featured: false,
  },
]

export function BasesSection() {
  return (
    <section id="bases" className="py-16 sm:py-24 bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">
            Cobertura Nacional
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Nuestras Bases
          </h2>
          <p className="text-white/40 text-sm sm:text-base max-w-2xl mx-auto">
            Presente en cuatro ciudades de Bolivia para que te formes donde vives.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {bases.map((base, i) => (
            <div
              key={base.name}
              className={`rounded-2xl p-5 sm:p-6 card-hover animate-fade-in-up ${
                base.featured
                  ? 'wine-gradient text-white shadow-xl shadow-wine/20'
                  : 'bg-white/5 border border-white/10 text-white hover:border-wine/40'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                base.featured ? 'bg-white/20 text-white' : 'bg-white/8 text-white/60'
              }`}>
                {base.subtitle}
              </span>

              <h3 className="text-base sm:text-lg font-black mt-3 mb-4">{base.name}</h3>

              <div className="space-y-3">
                <div className="flex gap-2.5">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <div>
                    <p className={`text-sm font-medium leading-snug ${base.featured ? 'text-white' : 'text-white/80'}`}>
                      {base.address}
                    </p>
                    <p className={`text-xs mt-0.5 ${base.featured ? 'text-white/60' : 'text-white/40'}`}>
                      {base.reference}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 shrink-0 text-red-400" />
                  <a href={`tel:${base.phone.replace(/\s/g,'')}`}
                    className={`text-sm font-semibold hover:underline ${base.featured ? 'text-white' : 'text-white/80'}`}>
                    {base.phone}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                  <p className={`text-xs leading-relaxed ${base.featured ? 'text-white/70' : 'text-white/40'}`}>
                    {base.hours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
