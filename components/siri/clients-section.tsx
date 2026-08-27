'use client'

import { clients } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

export function ClientsSection() {
  return (
    <section id="clients" className="bg-white py-24 text-charcoal md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <RevealLines
          className="mb-14 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
          lines={['Our Clients']}
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, i) => (
            <Reveal key={client} delay={i * 0.04}>
              <p className="border-b border-charcoal/10 pb-4 text-base font-medium leading-snug text-charcoal/80">
                {client}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}