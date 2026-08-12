'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { projects } from '@/lib/site-data'
import { ProjectCard } from './project-card'
import { Reveal, RevealLines } from './reveal'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'civil', label: 'Civil' },
] as const

export function ProjectsSection() {
  const [active, setActive] = useState<(typeof filters)[number]['key']>('all')
  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="bg-warm-white py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bronze">
                <span className="h-px w-8 bg-bronze" /> Our Work
              </span>
            </Reveal>
            <RevealLines
              className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-charcoal sm:text-5xl lg:text-6xl"
              lines={['Built with precision.', 'Designed to last.']}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={`rounded-sm border px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-colors ${
                  active === f.key
                    ? 'border-charcoal bg-charcoal text-warm-white'
                    : 'border-border text-muted-foreground hover:border-charcoal hover:text-charcoal'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
