'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// gallery-1 to gallery-25 (no logo)
const IMAGES = Array.from({ length: 25 }, (_, i) => `/img/gallery-${i + 1}.jpeg`)

export function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  const go = useCallback((idx: number) => {
    if (transitioning) return
    setTransitioning(true)
    setCurrent((idx + IMAGES.length) % IMAGES.length)
    setTimeout(() => setTransitioning(false), 500)
  }, [transitioning])

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 5000)
    return () => clearInterval(t)
  }, [current, go])

  return (
    <div className="relative w-full h-full">
      {/* Images */}
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <Image
            src={src}
            alt={`Avior foto ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 z-20" />

      {/* Controls */}
      <button
        onClick={() => go(current - 1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => go(current + 1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
            aria-label={`Ir a foto ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
