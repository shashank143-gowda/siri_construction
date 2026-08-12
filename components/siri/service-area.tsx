"use client"

import { motion } from "framer-motion"
import { company, serviceAreas } from "@/lib/site-data"

export function ServiceArea() {
  return (
    <section className="border-y border-border bg-secondary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Where We Build
              </span>
            </div>
            <h2 className="font-display text-pretty text-3xl font-bold leading-tight text-foreground md:text-4xl">
              Serving Hassan &amp; the surrounding region
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">
              Based in {company.location}, we deliver residential, commercial and civil
              construction across the district and neighbouring towns.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {serviceAreas.map((area, i) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-4"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-sm font-medium text-foreground">{area}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
