"use client"

import { useEffect, useState } from "react"
import { company } from "@/lib/site-data"

export function MobileActionBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={company.phoneHref} className="flex flex-col items-center gap-1 border-r border-border py-3 text-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-wider">Call</span>
      </a>
      <a href={company.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 border-r border-border py-3 text-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.15c-.24.68-1.42 1.32-1.95 1.36-.5.05-.99.23-3.35-.7-2.82-1.11-4.6-3.99-4.74-4.18-.14-.19-1.13-1.5-1.13-2.86 0-1.36.71-2.03.96-2.31.24-.28.53-.35.71-.35.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.57.81 1.96.88 2.1.07.14.12.31.02.5-.09.19-.14.31-.28.47-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.22 1.37.28.14.44.12.6-.07.16-.19.69-.8.87-1.08.18-.28.36-.23.61-.14.24.09 1.55.73 1.82.86.28.14.46.21.53.32.07.11.07.65-.17 1.33z" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-wider">WhatsApp</span>
      </a>
      <a href="#quote" className="flex flex-col items-center gap-1 bg-accent py-3 text-accent-foreground">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-wider">Get Quote</span>
      </a>
    </div>
  )
}
