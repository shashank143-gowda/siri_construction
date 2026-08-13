'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { serviceDivisions } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

const services = serviceDivisions.construction

export function ServicesSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section id="services" className="relative overflow-hidden bg-charcoal py-24 text-warm-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 max-w-2xl">
          <Reveal>
            <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
              <span className="h-px w-8 bg-bronze" /> What We Do
            </span>
          </Reveal>
          <RevealLines
            className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
            lines={['Services built', 'around the way', 'you build.']}
          />
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          {/* list */}
          <ul className="border-t border-white/10">
            {services.map((s, i) => (
              <li key={s.index} className="border-b border-white/10">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(active === i ? null : i)}
                  className="group flex w-full items-center gap-6 py-6 text-left transition-colors"
                >
                  <span
                    className={`font-mono text-sm transition-colors ${
                      active === i ? 'text-bronze' : 'text-concrete'
                    }`}
                  >
                    {s.index}
                  </span>
                  <span
                    className={`font-display flex-1 text-2xl font-bold uppercase tracking-tight transition-all duration-300 md:text-3xl ${
                      active === i ? 'translate-x-2 text-warm-white' : 'text-warm-white/60'
                    }`}
                  >
                    {s.title}
                  </span>
                  <span
                    className={`hidden text-bronze transition-opacity md:block ${
                      active === i ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    →
                  </span>
                </button>

                {/* mobile description (tap) */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden lg:hidden"
                    >
                      <p className="pb-6 text-sm leading-relaxed text-warm-white/70">
                        {s.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* preview panel (desktop) */}
          <div className="relative hidden overflow-hidden rounded-sm lg:block">
            <AnimatePresence mode="wait">
              {active !== null && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={services[active].image}
                    alt={services[active].title}
                    fill
                    sizes="45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="max-w-sm text-sm leading-relaxed text-warm-white/85">
                      {services[active].description}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
