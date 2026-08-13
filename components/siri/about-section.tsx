'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { values } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="about" className="bg-warm-white py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div ref={ref} className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative order-2 h-[420px] overflow-hidden rounded-sm md:order-1 md:h-[620px]">
            <motion.div style={reduce ? {} : { y: imgY }} className="absolute inset-[-6%]">
              <Image
                src="/images/about.png"
                alt="SIRI Constructions and Developers — residential villa design"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="order-1 md:order-2">
            <Reveal>
              <span className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
                <span className="h-px w-8 bg-bronze" /> About Us
              </span>
            </Reveal>
            <RevealLines
              className="font-display text-5xl font-extrabold uppercase leading-[0.2] tracking-tight text-charcoal sm:text-6xl lg:text-7xl"
              lines={['Built on', 'Trust.']}
            />

            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-muted-foreground">
                SIRI Constructions and Developers is an architectural and
                engineering firm founded in 2015, part of the JRK Group. Over the
                years, we&apos;ve built a reputation for design excellence through
                close client collaboration and a systems-driven approach to
                engineering.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our focused team of 16+ professionals offers a fully integrated
                service &mdash; architecture, structural design, planning,
                landscape, interiors and in-house graphics &mdash; all under one
                roof, delivering projects across factories, hospitals, corporate
                and government buildings, hotels, resorts and institutional
                spaces.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Alongside our construction practice, we also operate a financial
                validation and compliance division &mdash; supporting clients
                with project audits, cost and quality validation, and regulatory
                compliance checks, giving every build the same rigor on paper as
                it has on site.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <Reveal delay={0.15}>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-charcoal">
                  Our Mission
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To deliver integrated, thoughtfully engineered design,
                  construction and financial validation that clients can rely
                  on from concept to completion.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <h3 className="font-display text-sm font-bold uppercase tracking-widest text-charcoal">
                  Our Vision
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  To be the most trusted architectural and engineering partner
                  across Hassan and the surrounding region of Karnataka.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.25}>
              <div className="mt-10">
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-bronze">
                  Our Values
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {values.map((v) => (
                    <li
                      key={v}
                      className="rounded-sm border border-border px-4 py-2 text-xs font-medium uppercase tracking-widest text-charcoal"
                    >
                      {v}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
