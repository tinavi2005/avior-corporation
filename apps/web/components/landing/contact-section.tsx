'use client'

import { useState } from 'react'
import { MessageCircle, User, Phone, MapPin, BookOpen, ChevronDown } from 'lucide-react'

const cities = ['La Paz', 'Cochabamba', 'Tarija', 'Sucre', 'Otro país']
const careers = ['Piloto Comercial / Privado', 'Tripulante de Cabina', 'Despachador de Vuelo', 'Información General', 'Otro']

export function ContactSection() {
  const [form, setForm] = useState({ nombre: '', telefono: '', ciudad: '', carrera: '', mensaje: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = encodeURIComponent(`Hola, me contacto desde avior.edu.bo\n\n👤 *Nombre:* ${form.nombre}\n📞 *Teléfono:* ${form.telefono}\n📍 *Ciudad:* ${form.ciudad}\n✈️ *Carrera:* ${form.carrera}\n💬 *Mensaje:* ${form.mensaje || 'Sin mensaje adicional'}`)
    window.open(`https://wa.me/59175496739?text=${text}`, '_blank')
  }

  const inp = "w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/30 focus:border-wine transition-all text-[#0d0d0d] placeholder-gray-400 text-sm bg-white"

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14 animate-fade-in-up">
          <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Contáctanos</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0d0d] mb-4">Estamos aquí para ayudarte</h2>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">Completa el formulario y un asesor te contactará vía WhatsApp.</p>
        </div>

        <div className="max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: '150ms' }}>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 bg-green-600 rounded-2xl flex items-center justify-center shadow-md">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#0d0d0d]">Envíanos un Mensaje</h3>
                <p className="text-xs text-gray-400">Respuesta inmediata por WhatsApp</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input type="text" placeholder="Nombre Completo" required value={form.nombre}
                  onChange={e => setForm({...form, nombre: e.target.value})} className={`${inp} pl-11`} />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input type="tel" placeholder="Teléfono / WhatsApp" required value={form.telefono}
                  onChange={e => setForm({...form, telefono: e.target.value})} className={`${inp} pl-11`} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select required value={form.ciudad} onChange={e => setForm({...form, ciudad: e.target.value})}
                    className={`${inp} pl-11 pr-8 appearance-none`}>
                    <option value="">Ciudad</option>
                    {cities.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  <select required value={form.carrera} onChange={e => setForm({...form, carrera: e.target.value})}
                    className={`${inp} pl-11 pr-8 appearance-none`}>
                    <option value="">Carrera</option>
                    {careers.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <textarea placeholder="Mensaje (Opcional)" rows={3} value={form.mensaje}
                onChange={e => setForm({...form, mensaje: e.target.value})} className={`${inp} resize-none`} />
              <button type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 btn-shimmer">
                <MessageCircle className="w-5 h-5" />Enviar por WhatsApp
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
