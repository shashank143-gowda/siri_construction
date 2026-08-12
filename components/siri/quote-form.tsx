"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projectTypeOptions } from "@/lib/site-data"

type Status = "idle" | "submitting" | "success"

const budgetOptions = ["Not sure yet", "Under ₹25 L", "₹25 L – ₹50 L", "₹50 L – ₹1 Cr", "Above ₹1 Cr"]
const timelineOptions = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just exploring"]

export function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("submitting")
    // Placeholder — will be wired to a Supabase-backed server action.
    await new Promise((r) => setTimeout(r, 1100))
    setStatus("success")
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/70 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
  const labelClass = "mb-2 block font-mono text-xs uppercase tracking-wider text-muted-foreground"

  return (
    <section id="quote" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Start Your Project
            </span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Request a free consultation
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
            Tell us about your project and we&apos;ll get back to you with the next steps.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-border bg-card p-10 text-center"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15 text-accent">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Enquiry received</h3>
              <p className="mx-auto mt-3 max-w-sm leading-relaxed text-muted-foreground">
                Thank you. Our team will review your request and reach out shortly. This form will
                connect to our system once the backend is set up.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>Full name</label>
                  <input id="name" name="name" required placeholder="Your name" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>Phone</label>
                  <input id="phone" name="phone" type="tel" required placeholder="+91 XXXXX XXXXX" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className={labelClass}>Email</label>
                  <input id="email" name="email" type="email" placeholder="you@example.com" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="projectType" className={labelClass}>Project type</label>
                  <select id="projectType" name="projectType" required defaultValue="" className={inputClass}>
                    <option value="" disabled>Select a service</option>
                    {projectTypeOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="location" className={labelClass}>Location</label>
                  <input id="location" name="location" placeholder="e.g. Hassan" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="budget" className={labelClass}>Budget</label>
                  <select id="budget" name="budget" defaultValue="" className={inputClass}>
                    <option value="" disabled>Select range</option>
                    {budgetOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeline" className={labelClass}>Timeline</label>
                  <select id="timeline" name="timeline" defaultValue="" className={inputClass}>
                    <option value="" disabled>Select timeline</option>
                    {timelineOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={labelClass}>Project details</label>
                  <textarea id="message" name="message" rows={4} placeholder="Tell us about your project…" className={`${inputClass} resize-none`} />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 font-medium text-accent-foreground transition-all hover:bg-accent/90 disabled:opacity-70"
              >
                {status === "submitting" ? "Sending…" : "Send enquiry"}
                {status !== "submitting" && (
                  <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
