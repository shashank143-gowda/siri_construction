'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span' | 'li'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

// Line-by-line heading reveal. Pass an array of lines.
export function RevealLines({
  lines,
  className,
  lineClassName,
}: {
  lines: string[]
  className?: string
  lineClassName?: string
}) {
  const reduce = useReducedMotion()
  return (
    <div className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden" aria-hidden="true">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: '110%' }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: '0%' }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE, delay: i * 0.08 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
