import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { StatsSection } from '@/components/landing/stats-section'
import { CarrerasSection } from '@/components/landing/carreras-section'
import { WhyAviorSection } from '@/components/landing/why-avior-section'
import { AlianzasSection } from '@/components/landing/alianzas-section'
import { TestimonialsSection } from '@/components/landing/testimonials-section'
import { ContactSection } from '@/components/landing/contact-section'
import { MapSection } from '@/components/landing/map-section'
import { FaqSection } from '@/components/landing/faq-section'
import { Footer } from '@/components/landing/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <CarrerasSection />
      <WhyAviorSection />
      <AlianzasSection />
      <TestimonialsSection />
      <ContactSection />
      <MapSection />
      <FaqSection />
      <Footer />
    </div>
  )
}
