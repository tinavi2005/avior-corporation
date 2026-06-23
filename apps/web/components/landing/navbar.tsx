'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',          label: 'Inicio',     external: false },
  { href: '/carreras',  label: 'Carreras',   external: false },
  { href: '/cursos',    label: 'Cursos',     external: false },
  { href: '/conocenos', label: 'Conócenos',  external: false },
  { href: '/contacto',  label: 'Contacto',   external: false },
  { href: 'https://academia.aviorcorporation.com.bo/?lang=es', label: 'Plataforma', external: true },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = scrolled
    ? 'bg-white/96 backdrop-blur-md shadow-lg border-b border-gray-100'
    : 'bg-transparent'

  const linkClass = scrolled
    ? 'text-[#0d0d0d] hover:text-wine hover:bg-wine-pale'
    : 'text-white/90 hover:text-white hover:bg-white/10'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image src="/img/logo.png" alt="Avior SRL" fill
                className="object-contain group-hover:scale-105 transition-transform" priority />
            </div>
            <div className="hidden xs:block">
              <span className={`text-base sm:text-lg font-black tracking-wide transition-colors ${scrolled ? 'text-wine' : 'text-white'}`}>
                AVIOR
              </span>
              <p className="text-[10px] font-bold tracking-widest uppercase text-red-400">SRL</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className={`px-3 xl:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${linkClass}`}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}
                  className={`px-3 xl:px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${linkClass}`}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link href="/aula-virtual"
              className={`px-4 py-2 text-sm font-semibold rounded-xl border-2 transition-all duration-200 ${
                scrolled
                  ? 'border-wine text-wine hover:bg-wine hover:text-white'
                  : 'border-white/60 text-white hover:bg-white hover:text-wine'
              }`}>
              Aula Virtual
            </Link>
            <Link href="/inscripcion"
              className="px-4 xl:px-5 py-2 text-sm font-bold rounded-xl wine-gradient text-white hover:opacity-90 transition-all shadow-md btn-shimmer">
              Inscríbete
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-[#0d0d0d] hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-[#0d0d0d] rounded-2xl mb-4 py-2 border border-white/10">
            {navLinks.map((link) =>
              link.external ? (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center px-5 py-3 text-white/80 font-semibold hover:bg-white/5 hover:text-white transition-colors text-sm"
                  onClick={() => setIsOpen(false)}>
                  {link.label}
                </a>
              ) : (
                <Link key={link.href} href={link.href}
                  className="flex items-center px-5 py-3 text-white/80 font-semibold hover:bg-white/5 hover:text-white transition-colors text-sm"
                  onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              )
            )}
            <div className="border-t border-white/10 mt-2 pt-3 px-4 pb-1 flex flex-col gap-2">
              <Link href="/aula-virtual"
                className="text-center py-3 border-2 border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm"
                onClick={() => setIsOpen(false)}>
                Aula Virtual
              </Link>
              <Link href="/inscripcion"
                className="text-center py-3 wine-gradient text-white font-bold rounded-xl text-sm btn-shimmer"
                onClick={() => setIsOpen(false)}>
                Inscríbete Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
