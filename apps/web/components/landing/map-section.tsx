import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

const sedes = [
  {
    name: 'Base Central — La Paz', city: 'La Paz',
    address: 'Av. 6 de Agosto, entre Pedro Salazar y Lisimaco Gutiérrez #2530',
    reference: 'Frente al banco Mutual La Primera',
    phone: '+591 62530806', hours: 'Lun-Vie 08:30–12:30 · 14:30–18:30',
    mapUrl: 'https://share.google/8F7z2ivxUMmCvyG1b', featured: true,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.515!2d-68.13618!3d-16.50571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20e7ba9e85a7%3A0x8bfc6e0cb5e7f0c5!2sAv.%206%20de%20Agosto%202530%2C%20La%20Paz!5e0!3m2!1ses!2sbo!4v1719000000000',
  },
  {
    name: 'Satélite Cochabamba', city: 'Cochabamba',
    address: 'Calle Lanza, La Paz y Cochabamba',
    reference: 'Cochabamba, Bolivia',
    phone: '+591 75496739', hours: 'Lun-Vie 08:30–17:10',
    mapUrl: 'https://share.google/x05iBZsDlinWfNpkt', featured: false,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.384!2d-66.15682!3d-17.38895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93e37231b5bbead9%3A0x1b5a04e4c4f4e9d5!2sCochabamba!5e0!3m2!1ses!2sbo!4v1719000000001',
  },
  {
    name: 'Satélite Tarija', city: 'Tarija',
    address: 'Calle Ramón Rojas, entre Ingavi y Madrid #573',
    reference: 'Cerca Plaza Uriondo',
    phone: '+591 75145330', hours: 'Lun-Vie 08:30–12:30 · 14:30–18:30',
    mapUrl: 'https://share.google/hmNciJBJSQgHJKMClN', featured: false,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3786.8!2d-64.72820!3d-21.53550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941b2b7d5e3a0001%3A0x1234567890abcdef!2sCalle%20Ram%C3%B3n%20Rojas%20573%2C%20Tarija!5e0!3m2!1ses!2sbo!4v1719000000002',
  },
  {
    name: 'Satélite Sucre', city: 'Sucre',
    address: 'Calle J. Pérez, entre La Paz y Azurduy #342',
    reference: 'Frente al Supermercado SAS',
    phone: '+591 69322199', hours: 'Lun-Vie 08:30–12:30 · 14:30–18:30',
    mapUrl: 'https://share.google/hjhpoIRw9NTCWBQzz', featured: false,
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3792.5!2d-65.25990!3d-19.04780!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93fbb4b3f6c68001%3A0xabcdef1234567890!2sCalle%20J.%20P%C3%A9rez%20342%2C%20Sucre!5e0!3m2!1ses!2sbo!4v1719000000003',
  },
]

export function MapSection() {
  return (
    <section id="ubicaciones" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Cobertura Nacional</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0d0d] mb-4">Nuestras Bases</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">Presentes en cuatro ciudades de Bolivia para que te formes donde vives.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
          {sedes.map((sede, i) => (
            <div key={sede.name}
              className={`rounded-2xl overflow-hidden border card-hover animate-fade-in-up ${
                sede.featured ? 'border-wine/30 shadow-xl shadow-wine/10' : 'border-gray-100 shadow-sm'
              }`}
              style={{ animationDelay: `${i * 100}ms` }}>
              {/* Map iframe */}
              <div className="relative h-48 sm:h-56 bg-gray-100">
                <iframe
                  src={sede.embedUrl}
                  width="100%" height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa ${sede.name}`}
                  className="absolute inset-0"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                    sede.featured ? 'wine-gradient text-white' : 'bg-white text-[#0d0d0d]'
                  }`}>{sede.city}</span>
                </div>
              </div>
              {/* Info */}
              <div className="p-5 sm:p-6 bg-white">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className={`font-black text-base sm:text-lg leading-tight ${sede.featured ? 'text-wine' : 'text-[#0d0d0d]'}`}>
                    {sede.name}
                  </h3>
                  <a href={sede.mapUrl} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-wine hover:underline">
                    Ver en Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="space-y-2.5">
                  <div className="flex gap-2.5">
                    <MapPin className="w-4 h-4 text-wine mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#0d0d0d]">{sede.address}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{sede.reference}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-wine shrink-0" />
                    <a href={`tel:${sede.phone.replace(/\s/g,'')}`}
                      className="text-sm font-semibold text-[#0d0d0d] hover:text-wine transition-colors">
                      {sede.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-wine mt-0.5 shrink-0" />
                    <p className="text-xs text-gray-400 leading-relaxed">{sede.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
