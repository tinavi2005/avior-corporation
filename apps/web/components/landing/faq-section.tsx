'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: '¿Cuáles son los requisitos para inscribirse?', a: 'Bachillerato completo, certificado médico aeronáutico, fotocopia de CI y dos fotos de carnet. Para Piloto se requiere examen médico Clase 1 o 2 emitido por la DGAC Bolivia.' },
  { q: '¿La escuela está certificada por alguna autoridad aeronáutica?', a: 'Sí. Avior SRL está certificada por la DGAC Bolivia y cumple con los estándares de la OACI (Organización de Aviación Civil Internacional).' },
  { q: '¿Puedo estudiar si uso lentes?', a: 'Para Tripulante de Cabina y Despachador de Vuelo sí. Para Piloto, el examen médico determina la aptitud visual. En algunos casos se acepta el uso de lentes con limitaciones.' },
  { q: '¿Qué tan demandadas son estas carreras?', a: 'Alta demanda en Bolivia y Latinoamérica. BoA, Amaszonas y otras aerolíneas contratan regularmente egresados de Avior. Nuestra tasa de empleabilidad supera el 95%.' },
  { q: '¿Necesito saber inglés para comenzar?', a: 'No para iniciar. Para Piloto Comercial el inglés aeronáutico es requisito de licencia, por lo que incluimos módulos de inglés técnico en el programa.' },
]

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Preguntas Frecuentes</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0d0d] mb-4">Resolvemos tus dudas</h2>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {faqs.map((faq, i) => (
            <div key={i}
              className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 animate-fade-in-up ${open === i ? 'border-wine/30 shadow-md' : 'border-gray-100 shadow-sm'}`}
              style={{ animationDelay: `${i * 80}ms` }}>
              <button
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                onClick={() => setOpen(open === i ? null : i)}>
                <span className="font-semibold text-[#0d0d0d] text-sm sm:text-base leading-snug">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-wine shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
                <p className="px-5 sm:px-6 pb-5 text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
