import { Navbar } from '@/components/landing/navbar'
import { Footer } from '@/components/landing/footer'
import { ContactSection } from '@/components/landing/contact-section'
import { MapSection } from '@/components/landing/map-section'
import { Phone, Mail, MessageCircle } from 'lucide-react'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="wine-hero-gradient pt-28 sm:pt-36 pb-16 sm:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-wine/10 rounded-full blur-3xl animate-float delay-300" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-red-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 block animate-fade-in-up">Comunicación Directa</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 animate-fade-in-up delay-100">Contáctanos</h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto mb-8 animate-fade-in-up delay-200">
            Estamos aquí para responder tus preguntas y ayudarte a iniciar tu carrera en aviación.
          </p>
          <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-3 animate-fade-in-up delay-300">
            <a href="https://wa.me/59175496739" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm hover-lift shadow-md">
              <MessageCircle className="w-4 h-4" />WhatsApp +591 75496739
            </a>
            <a href="tel:+59162530806"
              className="inline-flex items-center justify-center gap-2 glass text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm hover:bg-white/15">
              <Phone className="w-4 h-4" />+591 62530806
            </a>
            <a href="mailto:avior.corporation@gmail.com"
              className="inline-flex items-center justify-center gap-2 glass text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm hover:bg-white/15">
              <Mail className="w-4 h-4" />avior.corporation@gmail.com
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
      <MapSection />
      <Footer />
    </div>
  )
}
