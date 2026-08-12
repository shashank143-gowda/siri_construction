'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { stats } from '@/lib/site-data'

function StatValue({ value, suffix }: { value: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState<string>(value)
  const numeric = /^\d+$/.test(value)

  useEffect(() => {
    if (!inView || !numeric || reduce) return
    const target = parseInt(value, 10)
    let raf = 0
    const start = performance.now()
    const duration = 1400
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(String(Math.round(eased * target)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, numeric, reduce, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 px-5 md:grid-cols-4 md:px-10">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p className="font-display text-6xl font-extrabold leading-none tracking-tight text-charcoal md:text-7xl lg:text-8xl">
              <StatValue value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.25em] text-charcoal/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
