'use client'

import { Award, MessageSquare, ShieldCheck, Hammer, HeartHandshake } from 'lucide-react'
import { whyReasons } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

const icons = [Award, MessageSquare, ShieldCheck, Hammer, HeartHandshake]

export function WhySiri() {
  return (
    <section className="bg-charcoal py-24 text-warm-white md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealLines
            className="font-display text-5xl font-extrabold uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl"
            lines={['Why', 'Siri?']}
          />
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-warm-white/60">
              Every project is delivered with the same principles — the reasons
              families and businesses in Hassan choose to build with us.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10 sm:grid-cols-2">
          {whyReasons.map((reason, i) => {
            const Icon = icons[i]
            const isLast = i === whyReasons.length - 1
            return (
              <Reveal
                key={reason.title}
                delay={i * 0.06}
                className={`group relative bg-charcoal p-8 transition-colors duration-500 hover:bg-white/[0.03] md:p-10 ${
                  isLast ? 'sm:col-span-2 sm:flex sm:items-center sm:gap-8' : ''
                }`}
              >
                <Icon
                  className={`mb-8 h-8 w-8 shrink-0 text-bronze transition-transform duration-500 group-hover:-translate-y-1 ${
                    isLast ? 'sm:mb-0' : ''
                  }`}
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight">
                    {reason.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-warm-white/60">
                    {reason.text}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}