"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { testimonials } from "@/lib/site-data"

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const paginate = useCallback((dir: number) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const id = setInterval(() => paginate(1), 7000)
    return () => clearInterval(id)
  }, [paginate])

  const t = testimonials[index]

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <div className="mb-14 flex items-center gap-4">
          <span className="h-px w-10 bg-accent" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Client Voices
          </span>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={index}
              custom={direction}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-6 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-accent" aria-hidden>
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="font-display text-pretty text-2xl font-medium leading-snug text-foreground md:text-4xl">
                {'"'}
                {t.review}
                {'"'}
              </p>
              <footer className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 font-display text-lg font-bold text-accent">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {t.type} &middot; {t.location}
                  </div>
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1)
                setIndex(i)
              }}
              aria-label={`Show testimonial ${i + 1}`}
              className="group py-2"
            >
              <span
                className={`block h-0.5 transition-all duration-300 ${
                  i === index ? "w-10 bg-accent" : "w-5 bg-border group-hover:bg-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
