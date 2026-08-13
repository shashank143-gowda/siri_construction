'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { company } from '@/lib/site-data'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18])
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.9])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const secondClip = useTransform(scrollYProgress, [0.15, 0.9], ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'])

  const s = reduce ? {} : { scale: imgScale, y: imgY }

  return (
    <section id="home" ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-charcoal">
      {/* base image */}
      <motion.div style={s} className="absolute inset-0">
        <Image
          src="/images/hero-main.png"
          alt="Modern residential villa built by Siri Construction at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* revealing second image */}
      {!reduce && (
        <motion.div style={{ clipPath: secondClip }} className="absolute inset-0">
          <Image
            src="/images/hero-secondary.png"
            alt="Modern concrete residence by Siri Construction"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      )}

      {/* darkening overlay */}
      <motion.div
        style={reduce ? { opacity: 0.6 } : { opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/40 to-charcoal"
      />

      {/* content */}
      <motion.div
        style={reduce ? {} : { y: textY, opacity: textOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-5 md:px-10"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-bronze" />
          <span className="text-xs font-medium uppercase tracking-[0.35em] text-bronze">
            {company.locationShort}
          </span>
        </div>

        <h1 className="font-display text-warm-white font-extrabold uppercase leading-[0.92] tracking-tight text-balance text-[3.2rem] sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {['Building', 'Spaces', 'That Last.'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? { opacity: 0 } : { y: '110%' }}
                animate={reduce ? { opacity: 1 } : { y: '0%' }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.12 }}
              >
                {line === 'That Last.' ? (
                  <span className="text-bronze">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-md text-pretty text-sm leading-relaxed text-warm-white/75 md:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Quality construction. Thoughtful execution. Built for generations.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
        >
          <a
            href="#quote"
            className="group inline-flex items-center justify-center gap-2 rounded-sm bg-bronze px-7 py-4 text-xs font-semibold uppercase tracking-widest text-warm-white transition-colors hover:bg-warm-white hover:text-charcoal"
          >
            Start Your Project
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-warm-white/30 px-7 py-4 text-xs font-semibold uppercase tracking-widest text-warm-white transition-colors hover:border-warm-white hover:bg-warm-white/5"
          >
            Explore Projects
          </a>
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        style={reduce ? {} : { opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[0.6rem] uppercase tracking-[0.4em] text-warm-white/60">
            Scroll to Explore
          </span>
          <motion.span
            className="h-8 w-px bg-warm-white/40"
            animate={reduce ? {} : { scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
