'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { galleryCategories, type GalleryItem } from '@/lib/gallery'
import { Reveal, RevealLines } from './reveal'

export function GallerySection() {
  const [active, setActive] = useState<string>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [items, setItems] = useState<GalleryItem[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let activeRequest = true
    fetch('/api/gallery')
      .then(async (response) => {
        if (!response.ok) throw new Error('Gallery unavailable')
        return response.json() as Promise<{ items: GalleryItem[] }>
      })
      .then((data) => {
        if (!activeRequest) return
        setItems(data.items)
        setStatus('ready')
      })
      .catch(() => {
        if (activeRequest) setStatus('error')
      })

    return () => { activeRequest = false }
  }, [])

  const filtered =
    active === 'All'
      ? items
      : items.filter((g) => g.category === active)

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? i : (i + 1) % filtered.length))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox, filtered.length])

  const current = lightbox !== null ? filtered[lightbox] : null

  return (
    <section id="gallery" className="bg-charcoal py-24 text-warm-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
                <span className="h-px w-8 bg-bronze" /> Gallery
              </span>
            </Reveal>
            <RevealLines
              className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
              lines={['A closer look', 'at our craft.']}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', ...galleryCategories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                className={`rounded-sm border px-4 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                  active === c
                    ? 'border-bronze bg-bronze text-warm-white'
                    : 'border-white/20 text-warm-white/60 hover:border-white/50 hover:text-warm-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {status === 'loading' && <p className="py-12 text-sm text-warm-white/60">Loading gallery…</p>}
          {status === 'error' && <p className="py-12 text-sm text-warm-white/60">Our gallery is temporarily unavailable. Please try again shortly.</p>}
          {status === 'ready' && filtered.length === 0 && <p className="py-12 text-sm text-warm-white/60">No images are available in this category yet.</p>}
          {status === 'ready' && filtered.map((item, i) => (
            <motion.button
              key={item._id}
              layout
              type="button"
              onClick={() => setLightbox(i)}
              className="group mb-4 block w-full overflow-hidden rounded-sm break-inside-avoid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="relative">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={800}
                  height={i % 3 === 0 ? 1000 : 700}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/80 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="text-left">
                    <p className="text-xs uppercase tracking-widest text-bronze">{item.category}</p>
                    <p className="font-display text-lg font-bold uppercase tracking-tight">{item.title}</p>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/90 p-4 backdrop-blur-md md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-5 top-5 z-10 text-sm uppercase tracking-widest text-warm-white/70 hover:text-warm-white"
              aria-label="Close"
            >
              Close ✕
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length))
              }}
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-warm-white hover:border-white/60 md:left-8"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox((i) => (i === null ? i : (i + 1) % filtered.length))
              }}
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-warm-white hover:border-white/60 md:right-8"
              aria-label="Next image"
            >
              →
            </button>

            <motion.div
              key={current._id}
              className="relative max-h-[85vh] w-full max-w-4xl"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.imageUrl}
                alt={current.title}
                width={1200}
                height={900}
                className="mx-auto max-h-[80vh] w-auto rounded-sm object-contain"
              />
              <div className="mt-4 text-center">
                <p className="text-xs uppercase tracking-widest text-bronze">{current.category}</p>
                <p className="font-display text-xl font-bold uppercase tracking-tight">{current.title}</p>
                {current.description && <p className="text-sm text-warm-white/60">{current.description}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
