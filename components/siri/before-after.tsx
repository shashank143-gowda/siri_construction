'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { Reveal, RevealLines } from './reveal'

export function BeforeAfter() {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(0, Math.min(100, p)))
  }, [])

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
    setFromClientX(e.clientX)
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }
  const onPointerUp = () => {
    dragging.current = false
  }

  return (
    <section className="bg-warm-white py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
                <span className="h-px w-8 bg-bronze" /> The Transformation
              </span>
            </Reveal>
            <RevealLines
              className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
              lines={['Empty site to', 'finished home.']}
            />
          </div>
          <Reveal delay={0.1}>
            <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span>Before</span>
              <span className="h-px w-6 bg-bronze" />
              <span>Under Construction</span>
              <span className="h-px w-6 bg-bronze" />
              <span className="text-charcoal">After</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div
            ref={containerRef}
            className="relative aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-sm md:aspect-[16/9]"
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {/* after (base) */}
            <Image
              src="/images/stage-after.png"
              alt="Finished home after construction"
              fill
              sizes="90vw"
              className="object-cover"
            />
            <span className="absolute right-4 top-4 rounded-sm bg-warm-white/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-charcoal">
              After
            </span>

            {/* before (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src="/images/stage-before.png"
                alt="Empty site before construction"
                fill
                sizes="90vw"
                className="object-cover"
              />
              <span className="absolute left-4 top-4 rounded-sm bg-charcoal/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-warm-white">
                Before
              </span>
            </div>

            {/* handle */}
            <div
              className="absolute inset-y-0 z-10 w-0.5 cursor-ew-resize bg-warm-white"
              style={{ left: `${pos}%` }}
              onPointerDown={onPointerDown}
            >
              <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-warm-white text-charcoal shadow-lg">
                <span className="text-sm">↔</span>
              </div>
            </div>

            {/* accessible range */}
            <label className="sr-only" htmlFor="ba-range">
              Before and after comparison slider
            </label>
            <input
              id="ba-range"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="absolute inset-x-0 bottom-0 z-20 h-2 w-full cursor-ew-resize opacity-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
