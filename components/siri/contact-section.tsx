"use client"

import { motion } from "framer-motion"
import { company } from "@/lib/site-data"

const items = [
  { label: "Call us", value: company.phone, href: company.phoneHref },
  { label: "WhatsApp", value: company.whatsapp, href: company.whatsappHref },
  { label: "Email", value: company.email, href: `mailto:${company.email}` },
  { label: "Location", value: company.location, href: company.mapsHref },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-foreground py-24 text-background md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-background/60">
                Get In Touch
              </span>
            </div>
            <h2 className="font-display text-balance text-4xl font-bold leading-[1.05] md:text-6xl">
              Let&apos;s build something that lasts.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-background/70">
              Whether it&apos;s a new home, a commercial space or a civil project, our team is
              ready to help you bring it to life. Reach out through any channel below.
            </p>

            <a
              href="#quote"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-medium text-accent-foreground transition-all hover:bg-accent/90"
            >
              Request a consultation
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-background/15 bg-background/15 sm:grid-cols-2">
            {items.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.label === "Location" || item.label === "WhatsApp" ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col justify-between gap-8 bg-foreground p-6 transition-colors hover:bg-background/5"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-background/50">
                  {item.label}
                </span>
                <span className="text-lg font-medium text-background transition-colors group-hover:text-accent">
                  {item.value}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
