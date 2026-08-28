"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projectTypeOptions, validationFeatures, company } from "@/lib/site-data"

type Mode = "construction" | "valuation"

const budgetOptions = ["Not sure yet", "Under ₹25 L", "₹25 L – ₹50 L", "₹50 L – ₹1 Cr", "Above ₹1 Cr"]
const timelineOptions = ["As soon as possible", "1–3 months", "3–6 months", "6+ months", "Just exploring"]
const constructionTypes = projectTypeOptions.filter((o) => !o.startsWith("Property Valuation"))
const valuationPurposes = Object.keys(validationFeatures)

export function QuoteForm() {
  const [mode, setMode] = useState<Mode>("construction")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const get = (key: string) => (form.get(key) as string)?.trim() || "—"

    let message = ""
    if (mode === "construction") {
      message = [
        "*New Construction Enquiry*",
        "",
        `*Name:* ${get("name")}`,
        `*Phone:* ${get("phone")}`,
        `*Email:* ${get("email")}`,
        `*Project Type:* ${get("projectType")}`,
        `*Location:* ${get("location")}`,
        `*Budget:* ${get("budget")}`,
        `*Timeline:* ${get("timeline")}`,
        `*Details:* ${get("message")}`,
      ].join("\n")
    } else {
      message = [
        "*New Property Valuation Enquiry*",
        "",
        `*Name:* ${get("name")}`,
        `*Phone:* ${get("phone")}`,
        `*Email:* ${get("email")}`,
        `*Purpose:* ${get("purpose")}`,
        `*Property Address:* ${get("propertyAddress")}`,
        `*Details:* ${get("message")}`,
      ].join("\n")
    }

    const phoneDigits = company.whatsapp.replace(/[^\d]/g, "")
    const url = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
  const labelClass = "mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground"

  return (
    <section id="quote" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-2xl px-6 md:px-10">
        <div className="mb-10 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Get Started
            </span>
            <span className="h-px w-10 bg-accent" />
          </div>
          <h2 className="font-display text-balance text-3xl font-bold leading-tight text-foreground md:text-5xl">
            Request a free consultation
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted-foreground">
            Tell us what you need — you&apos;ll be redirected to WhatsApp to send it to our team.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border p-1">
            {(
              [
                { key: "construction", label: "Construction Enquiry" },
                { key: "valuation", label: "Property Valuation" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setMode(opt.key)}
                className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                  mode === opt.key ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {mode === opt.key && (
                  <motion.span
                    layoutId="quote-mode-pill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
                <span className="relative">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
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

              {mode === "construction" ? (
                <>
                  <div>
                    <label htmlFor="projectType" className={labelClass}>Project type</label>
                    <select id="projectType" name="projectType" required defaultValue="" className={inputClass}>
                      <option value="" disabled>Select a service</option>
                      {constructionTypes.map((o) => (
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
                </>
              ) : (
                <>
                  <div className="sm:col-span-2">
                    <label htmlFor="purpose" className={labelClass}>Valuation purpose</label>
                    <select id="purpose" name="purpose" required defaultValue="" className={inputClass}>
                      <option value="" disabled>Select purpose</option>
                      {valuationPurposes.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="propertyAddress" className={labelClass}>Property address</label>
                    <input id="propertyAddress" name="propertyAddress" placeholder="Property location" className={inputClass} />
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>
                  {mode === "construction" ? "Project details" : "Additional details"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder={mode === "construction" ? "Tell us about your project…" : "Anything else we should know…"}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="group mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-4 font-medium text-accent-foreground transition-all hover:bg-accent/90"
            >
              Send enquiry via WhatsApp
              <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </motion.form>
        </AnimatePresence>
      </div>
    </section>
  )
}