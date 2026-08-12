'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/lib/site-data'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
          <Image
            src={project.image}
            alt={`${project.title} — ${project.type} in ${project.location}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

          <span
            className={`absolute left-4 top-4 rounded-sm px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest ${
              project.status === 'Completed'
                ? 'bg-warm-white/90 text-charcoal'
                : 'bg-bronze text-warm-white'
            }`}
          >
            {project.status}
          </span>

          <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full border border-warm-white/40 text-warm-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            →
          </span>
        </div>

        <div className="mt-4 overflow-hidden">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-bronze">
            <span>{project.categoryLabel}</span>
          </div>
          <h3 className="font-display mt-2 text-xl font-bold uppercase tracking-tight text-charcoal transition-transform duration-500 group-hover:-translate-y-0.5">
            {project.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.location}</p>
        </div>
      </Link>
    </motion.div>
  )
}
