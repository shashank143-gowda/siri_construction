'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export function Loader() {
  const [done, setDone] = useState(false)
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 400 : 1900)
    return () => clearTimeout(t)
  }, [reduce])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          aria-hidden="true"
        >
          <svg
            width="120"
            height="90"
            viewBox="0 0 120 90"
            fill="none"
            className="mb-8 text-bronze"
          >
            {/* house outline drawn progressively */}
            <motion.path
              d="M10 45 L60 10 L110 45 M22 45 L22 80 L98 80 L98 45 M50 80 L50 58 L70 58 L70 80"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduce ? 0.3 : 1.3, ease: 'easeInOut' }}
            />
          </svg>

          <div className="overflow-hidden">
            <motion.p
              className="font-display text-warm-white text-2xl md:text-3xl font-extrabold tracking-[0.35em]"
              initial={{ y: '120%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              SIRI
            </motion.p>
          </div>
          <div className="overflow-hidden mt-1">
            <motion.p
              className="font-display text-concrete text-sm md:text-base tracking-[0.5em]"
              initial={{ y: '120%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            >
              CONSTRUCTION
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
