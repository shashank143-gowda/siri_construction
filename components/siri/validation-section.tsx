'use client'

import { Calculator, ShieldCheck, Check } from 'lucide-react'
import { serviceDivisions, validationFeatures } from '@/lib/site-data'
import { Reveal, RevealLines } from './reveal'

const icons = [Calculator, ShieldCheck]

export function ValidationSection() {
  const items = serviceDivisions.validation

  return (
    <section id="validation" className="bg-sand py-24 text-charcoal md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
                <span className="h-px w-8 bg-bronze" /> A Second Division
              </span>
            </Reveal>
            <RevealLines
              className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
              lines={['Validation &', 'compliance.']}
            />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-charcoal/60">
              Independent financial and regulatory validation for factories,
              institutions and corporate projects — alongside our
              construction work.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-sm border border-charcoal/10 bg-charcoal/10 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = icons[i]
            const features = validationFeatures[item.title] ?? []
            return (
              <Reveal
                key={item.index}
                delay={i * 0.08}
                className="bg-sand p-8 md:p-10"
              >
                <Icon
                  className="mb-8 h-8 w-8 text-bronze"
                  strokeWidth={1.25}
                  aria-hidden="true"
                />
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                  {item.description}
                </p>

                <ul className="mt-8 space-y-3 border-t border-charcoal/10 pt-6">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-charcoal/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-bronze" strokeWidth={2} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
