'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const IMAGES = Array.from({ length: 25 }, (_, i) => `/img/gallery-${i + 1}.jpeg`)

export function GalleryCarousel() {
  const [start, setStart] = useState(0)

  const perPage = 3 // desktop shows 3; mobile shows 1 via CSS
  const total = IMAGES.length

  const prev = useCallback(() => {
    setStart((s) => (s - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setStart((s) => (s + 1) % total)
  }, [total])

  // Visible indices (wrap around)
  const visible = [0, 1, 2].map((offset) => (start + offset) % total)

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 wine-gradient rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 wine-gradient rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Images grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-2">
        {visible.map((imgIdx, col) => (
          <div
            key={`${imgIdx}-${col}`}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md card-hover"
          >
            <Image
              src={IMAGES[imgIdx]}
              alt={`Avior galería ${imgIdx + 1}`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-5">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(i)}
            className={`rounded-full transition-all duration-300 ${
              i === start ? 'w-5 h-1.5 bg-wine' : 'w-1.5 h-1.5 bg-gray-300 hover:bg-wine/50'
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
