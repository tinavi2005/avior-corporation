import Link from 'next/link'
import { GraduationCap, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 wine-gradient rounded-xl flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-black">AVIOR</span>
                <p className="text-[10px] text-red-400 font-semibold tracking-widest uppercase">SRL</p>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5 max-w-xs">
              La escuela de aviación más grande de Bolivia. Formando profesionales aeronáuticos de excelencia.
            </p>
            {/* Socials */}
            <div className="flex gap-2">
              {[
                { href: 'https://www.tiktok.com/@aviorcorporation', label: 'TikTok', path: 'M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.41a8.16 8.16 0 0 0 4.77 1.52V7.49a4.85 4.85 0 0 1-1-.8z' },
                { href: 'https://www.instagram.com/avior.corporation', label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { href: 'https://www.facebook.com/aviorcorporation', label: 'Facebook', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center hover:wine-gradient hover:border-transparent transition-all duration-300">
                  <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d={s.path}/></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Navegación</h4>
            <ul className="space-y-2">
              {['/', '/carreras', '/cursos', '/conocenos', '/contacto', '/aula-virtual'].map((href, i) => (
                <li key={href}>
                  <Link href={href} className="text-white/35 hover:text-white text-sm transition-colors hover:translate-x-0.5 inline-block">
                    {['Inicio','Carreras','Cursos','Conócenos','Contacto','Aula Virtual'][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Carreras */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Carreras</h4>
            <ul className="space-y-2">
              {['Piloto Comercial','Piloto Privado','Tripulante de Cabina','Despachador de Vuelo'].map(c => (
                <li key={c}>
                  <Link href="/carreras" className="text-white/35 hover:text-white text-sm transition-colors">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <a href="tel:+59162530806" className="text-white/35 hover:text-white text-sm block transition-colors">+591 62530806 (La Paz)</a>
                  <a href="tel:+59175496739" className="text-white/35 hover:text-white text-sm block transition-colors">+591 75496739 (WhatsApp)</a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-400 shrink-0" />
                <a href="mailto:avior.corporation@gmail.com" className="text-white/35 hover:text-white text-xs transition-colors break-all">
                  avior.corporation@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                <span className="text-white/35 text-sm">La Paz · Cbba · Tarija · Sucre</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs text-center sm:text-left">
            © 2025 Avior SRL — Escuela de Aviación. Todos los derechos reservados.
          </p>
          <p className="text-white/15 text-xs">Bolivia ✈️</p>
        </div>
      </div>
    </footer>
  )
}
