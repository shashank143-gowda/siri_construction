'use client'

import Image from 'next/image'
import { clients } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

export function ClientsSection() {
  return (
    <section id="clients" className="bg-warm-white py-24 text-charcoal md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
            <span className="h-px w-8 bg-bronze" /> Who We Work With
          </span>
          <RevealLines
            className="font-display text-6xl font-extrabold uppercase leading-[0.1] tracking-tight sm:text-7xl lg:text-8xl"
            lines={['Our Clients']}
          />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((client, i) => (
            <Reveal key={client.name} delay={i * 0.04}>
              <div className="group flex h-32 items-center justify-center rounded-2xl border border-charcoal/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/20 hover:shadow-lg">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={160}
                  height={64}
                  className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}