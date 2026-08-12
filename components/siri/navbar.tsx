'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { company, navLinks } from '@/lib/site-data'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-charcoal/80 backdrop-blur-md border-b border-white/10 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a
            href="#home"
            className="font-display font-extrabold leading-none tracking-tight text-warm-white"
          >
            <span className="block text-base md:text-lg">SIRI</span>
            <span className="block text-[0.6rem] md:text-xs tracking-[0.35em] text-bronze">
              CONSTRUCTION
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-xs font-medium uppercase tracking-widest text-warm-white/80 transition-colors hover:text-warm-white"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-bronze transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="#quote"
              className="hidden rounded-sm bg-bronze px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-warm-white transition-colors hover:bg-warm-white hover:text-charcoal sm:inline-block"
            >
              Get a Quote
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex flex-col items-end gap-1.5 lg:hidden"
              aria-label="Open menu"
            >
              <span className="block h-px w-7 bg-warm-white" />
              <span className="block h-px w-5 bg-warm-white" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-charcoal lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-center justify-between px-5 py-5">
              <span className="font-display font-extrabold text-warm-white">
                SIRI <span className="text-bronze">CONSTRUCTION</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-warm-white text-sm uppercase tracking-widest"
                aria-label="Close menu"
              >
                Close
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col justify-center gap-2 px-6"
              aria-label="Mobile"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl font-bold uppercase tracking-tight text-warm-white/90 transition-colors hover:text-bronze"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <div className="px-6 pb-10">
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="block rounded-sm bg-bronze px-5 py-4 text-center text-sm font-semibold uppercase tracking-widest text-warm-white"
              >
                Get a Quote
              </a>
              <p className="mt-6 text-xs uppercase tracking-widest text-concrete">
                {company.locationShort}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
