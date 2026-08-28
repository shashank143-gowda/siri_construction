"use client"

import { motion } from "framer-motion"
import { Phone, MessageCircle, Mail, MapPin, ArrowRight } from "lucide-react"
import { company } from "@/lib/site-data"

const items = [
  { label: "Call us", value: company.phone, icon: Phone, href: company.phoneHref },
  { label: "WhatsApp", value: company.whatsapp, icon: MessageCircle, href: company.whatsappHref, external: true },
  { label: "Email", value: company.email, icon: Mail, href: `mailto:${company.email}` },
  { label: "Location", value: company.location, icon: MapPin, href: company.mapsHref, external: true },
]

export function ContactSection() {
  return (
    <section id="contact" className="bg-secondary/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Get In Touch
            </span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display text-balance text-4xl font-bold leading-[1.1] text-foreground md:text-5xl">
            Let&apos;s build something that lasts.
          </h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            Whether it&apos;s a new home, a commercial space or a civil project, our team is
            ready to help you bring it to life. Reach out through any channel below.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <item.icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 break-words text-base font-medium text-foreground">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#quote"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-medium text-accent-foreground shadow-md transition-all hover:bg-accent/90 hover:shadow-lg"
          >
            Request a consultation
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}