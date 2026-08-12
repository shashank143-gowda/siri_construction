'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.registerPlugin(ScrollTrigger)

    if (prefersReduced) {
      ScrollTrigger.refresh()
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Support in-page anchor links with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute('href')
      if (!id || id === '#') return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: 0 })
      }
    }
    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
