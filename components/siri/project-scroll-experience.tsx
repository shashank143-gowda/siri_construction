'use client'

import { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { signatureProjects } from '@/lib/site-data'

export function ProjectScrollExperience() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const n = signatureProjects.length

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          isDesktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
        },
        () => {
          const layers = gsap.utils.toArray<HTMLElement>('[data-layer]')
          const images = gsap.utils.toArray<HTMLElement>('[data-layer-img]')
          const infos = gsap.utils.toArray<HTMLElement>('[data-info]')
          const numbers = gsap.utils.toArray<HTMLElement>('[data-number]')

          // initial states
          layers.forEach((l, i) => {
            gsap.set(l, { clipPath: i === 0 ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' })
          })
          infos.forEach((info, i) => {
            gsap.set(info, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 })
          })
          numbers.forEach((num, i) => {
            gsap.set(num, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 60 })
          })

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: `+=${n * 100}%`,
              scrub: 1,
              pin: stickyRef.current,
              anticipatePin: 1,
            },
          })

          for (let i = 1; i < n; i++) {
            const seg = i - 1
            // zoom the outgoing image
            tl.to(images[i - 1], { scale: 1.08, ease: 'none', duration: 1 }, seg)
            // reveal the incoming image via vertical clip-path
            tl.to(layers[i], { clipPath: 'inset(0% 0 0 0)', ease: 'power2.inOut', duration: 1 }, seg)
            // outgoing info out
            tl.to(infos[i - 1], { opacity: 0, y: -40, duration: 0.4, ease: 'power2.in' }, seg)
            tl.to(numbers[i - 1], { opacity: 0, y: -60, duration: 0.4, ease: 'power2.in' }, seg)
            // incoming info in
            tl.fromTo(
              infos[i],
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              seg + 0.5,
            )
            tl.fromTo(
              numbers[i],
              { opacity: 0, y: 60 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
              seg + 0.5,
            )
          }
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Signature projects journey"
      className="relative bg-charcoal"
    >
      {/* Desktop pinned experience */}
      <div
        ref={stickyRef}
        className="relative hidden h-[100svh] w-full overflow-hidden md:block"
      >
        {/* stacked image layers */}
        {signatureProjects.map((p, i) => (
          <div key={p.slug} data-layer className="absolute inset-0" style={{ zIndex: i }}>
            <div data-layer-img className="absolute inset-0 will-change-transform">
              <Image
                src={p.image}
                alt={`${p.title} by Siri Construction`}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/30 to-charcoal/50" />
            </div>
          </div>
        ))}

        {/* section label */}
        <div className="pointer-events-none absolute left-5 top-24 z-40 md:left-10">
          <span className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
            <span className="h-px w-8 bg-bronze" /> The Journey
          </span>
        </div>

        {/* giant numbers */}
        <div className="pointer-events-none absolute right-5 top-1/2 z-40 -translate-y-1/2 md:right-10">
          {signatureProjects.map((p) => (
            <span
              key={p.slug}
              data-number
              className="font-display absolute right-0 top-1/2 -translate-y-1/2 text-[9rem] font-extrabold leading-none text-warm-white/10 lg:text-[16rem]"
            >
              {p.index}
            </span>
          ))}
        </div>

        {/* info blocks */}
        <div className="absolute inset-x-0 bottom-0 z-40 mx-auto max-w-[1400px] px-10 pb-16">
          <div className="relative h-56">
            {signatureProjects.map((p) => (
              <div key={p.slug} data-info className="absolute bottom-0 left-0">
                <span className="text-xs uppercase tracking-[0.35em] text-bronze">
                  Project {p.index}
                </span>
                <h3 className="font-display mt-3 text-4xl font-extrabold uppercase tracking-tight text-warm-white lg:text-6xl">
                  {p.title}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-warm-white/70">
                  <span>{p.location}</span>
                  <span className="h-1 w-1 rounded-full bg-bronze" />
                  <span>{p.type}</span>
                </div>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 rounded-sm border border-warm-white/30 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-warm-white transition-colors hover:border-bronze hover:bg-bronze"
                >
                  View Project
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / reduced-motion vertical fallback */}
      <div className="md:hidden">
        {signatureProjects.map((p) => (
          <div key={p.slug} className="relative h-[80svh] w-full overflow-hidden">
            <Image
              src={p.image}
              alt={`${p.title} by Siri Construction`}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-xs uppercase tracking-[0.35em] text-bronze">
                Project {p.index}
              </span>
              <h3 className="font-display mt-2 text-3xl font-extrabold uppercase tracking-tight text-warm-white">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-warm-white/70">
                {p.location} • {p.type}
              </p>
              <Link
                href={`/projects/${p.slug}`}
                className="mt-4 inline-flex items-center gap-2 rounded-sm border border-warm-white/30 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-warm-white"
              >
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
