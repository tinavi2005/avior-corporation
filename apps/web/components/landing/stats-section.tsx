const stats = [
  { value: '15+', label: 'Años de experiencia' },
  { value: '2,000+', label: 'Egresados exitosos' },
  { value: '4', label: 'Sedes en Bolivia' },
  { value: '95%', label: 'Tasa de empleabilidad' },
]

export function StatsSection() {
  return (
    <section className="bg-[#0d0d0d] py-12 sm:py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group opacity-start animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#6b0f1a] mb-1.5 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-white/50 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
