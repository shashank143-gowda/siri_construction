'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { RevealLines, Reveal } from './reveal'

export function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section
      ref={ref}
      className="relative bg-warm-white py-24 md:py-36"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-10">
        <div>
          <Reveal>
            <span className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
              <span className="h-px w-8 bg-bronze" /> Who We Are
            </span>
          </Reveal>
          <RevealLines
            className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
            lines={['We Build', 'More Than', 'Structures.']}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-pretty leading-relaxed text-muted-foreground">
              SIRI Constructions and Developers delivers thoughtfully planned
              architecture, engineering and construction &mdash; backed by an
              in-house financial validation and compliance division that keeps
              every project accountable, on paper and on site.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href="#about"
              className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-charcoal"
            >
              About SIRI Constructions and Developers
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </Reveal>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-sm md:h-[560px]">
          <motion.div style={reduce ? {} : { y: imgY }} className="absolute inset-[-8%]">
            <Image
              src="/images/intro-structure.png"
              alt="Residential building under construction with exposed structure"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
