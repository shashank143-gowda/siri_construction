'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { process } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState(0)
  const n = process.length

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${n * 90}%`,
          scrub: true,
          pin: pinRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress)
            setActive(Math.min(n - 1, Math.floor(self.progress * n)))
          },
        })
        return () => st.kill()
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [n])

  return (
    <section id="process" ref={sectionRef} className="bg-warm-white">
      {/* Desktop pinned */}
      <div ref={pinRef} className="hidden h-[100svh] flex-col md:flex">
        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-10 pt-28">
          <div className="mb-10 flex items-end justify-between">
            <RevealLines
              className="font-display text-4xl font-extrabold uppercase leading-[0.9] tracking-tight text-charcoal lg:text-7xl"
              lines={['From Idea', 'To Reality.']}
            />
            <span className="text-xs uppercase tracking-[0.35em] text-bronze">
              Our Process
            </span>
          </div>

          <div className="grid flex-1 grid-cols-[1fr_1fr] items-center gap-16">
            {/* text */}
            <div className="relative h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <span className="font-display text-8xl font-extrabold text-charcoal/10 lg:text-9xl">
                    {process[active].index}
                  </span>
                  <h3 className="font-display -mt-6 text-4xl font-extrabold uppercase tracking-tight text-charcoal lg:text-5xl">
                    {process[active].title}
                  </h3>
                  <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
                    {process[active].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={process[active].image}
                    alt={process[active].title}
                    fill
                    sizes="45vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* progress line */}
          <div className="pb-16 pt-10">
            <div className="relative h-px w-full bg-border">
              <div
                className="absolute left-0 top-0 h-px bg-bronze"
                style={{ width: `${progress * 100}%` }}
              />
              <div className="mt-5 flex justify-between">
                {process.map((p, i) => (
                  <span
                    key={p.index}
                    className={`text-xs font-medium uppercase tracking-widest transition-colors ${
                      i <= active ? 'text-charcoal' : 'text-muted-foreground/50'
                    }`}
                  >
                    {p.index}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="px-5 py-20 md:hidden">
        <span className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
          <span className="h-px w-8 bg-bronze" /> Our Process
        </span>
        <h2 className="font-display mb-10 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-charcoal">
          From Idea to Reality.
        </h2>
        <ol className="relative border-l border-border pl-6">
          {process.map((p) => (
            <li key={p.index} className="relative mb-10 last:mb-0">
              <span className="absolute -left-[1.65rem] top-1 h-2.5 w-2.5 rounded-full bg-bronze" />
              <Reveal>
                <span className="font-mono text-xs text-bronze">{p.index}</span>
                <h3 className="font-display mt-1 text-2xl font-bold uppercase tracking-tight text-charcoal">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
