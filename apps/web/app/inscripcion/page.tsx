import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { ContactSection } from '@/components/landing/contact-section'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const pasos = [
  { n: 1, title: 'Envía tu consulta',      desc: 'Completa el formulario o escríbenos por WhatsApp. Un asesor te contactará en menos de 24 horas.' },
  { n: 2, title: 'Asesoría académica',      desc: 'Conversación personalizada para elegir la carrera ideal según tu perfil y objetivos.' },
  { n: 3, title: 'Entrega de documentos',  desc: 'Presenta tus documentos en cualquiera de nuestras 4 sedes o de forma digital.' },
  { n: 4, title: '¡Comienza a volar!',      desc: 'Inicia tu carrera y únete a la familia Avior SRL. Tu futuro en la aviación comienza aquí.' },
]

const docs = [
  'Bachillerato completo (fotocopia)',
  'Cédula de identidad vigente (fotocopia)',
  '2 fotografías de carnet actuales',
  'Certificado médico básico',
  'Formulario de inscripción (lo proporcionamos)',
  'Pago de matrícula',
]

export default function InscripcionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="wine-hero-gradient pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-wine/20 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/3 rounded-full blur-3xl animate-float delay-400" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 block animate-fade-in-up">
            Inicio de Carrera
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 animate-fade-in-up delay-100">
            Inscríbete Ahora
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto animate-fade-in-up delay-200">
            El proceso es simple y rápido. En 4 pasos puedes comenzar tu carrera en aviación.
          </p>
        </div>
      </section>

      {/* ── Pasos ── */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-wine text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 block">Proceso</span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d0d0d]">¿Cómo inscribirse?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {pasos.map((paso, i) => (
              <div
                key={paso.n}
                className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 text-center card-hover animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 sm:w-12 sm:h-12 wine-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-lg font-black shadow-md shadow-wine/20">
                  {paso.n}
                </div>
                <h4 className="font-bold text-[#0d0d0d] mb-2 text-sm sm:text-base">{paso.title}</h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Documentos ── */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border-l-4 border-l-wine animate-fade-in-up">
            <p className="text-xs font-bold uppercase tracking-widest text-wine mb-2">Documentos</p>
            <h3 className="text-xl sm:text-2xl font-black text-[#0d0d0d] mb-6">Documentos requeridos</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {docs.map((doc) => (
                <div key={doc} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-wine mt-0.5 shrink-0" />
                  <span className="text-gray-700 text-xs sm:text-sm">{doc}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400 text-xs mt-5 border-t border-gray-100 pt-4">
              * Los requisitos específicos varían según la carrera. Tu asesor te indicará los documentos adicionales.
            </p>
          </div>
        </div>
      </section>

      <ContactSection />

      {/* ── CTA ── */}
      <section className="bg-[#0d0d0d] py-14 sm:py-20 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">¿Tienes dudas?</h2>
          <p className="text-white/40 text-sm sm:text-base mb-7">
            Nuestros asesores están disponibles para orientarte en todo el proceso.
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 px-8 py-4 wine-gradient text-white font-bold rounded-xl hover-lift btn-shimmer shadow-lg shadow-wine/20"
          >
            Hablar con un asesor <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
