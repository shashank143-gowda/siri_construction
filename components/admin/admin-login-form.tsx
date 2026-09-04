'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export function AdminLoginForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: form.get('email'), password: form.get('password') }) })
    setIsSubmitting(false)
    if (!response.ok) return setError((await response.json()).error ?? 'Unable to sign in.')
    router.replace('/admin')
    router.refresh()
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-charcoal px-5 py-12 text-warm-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md border border-white/15 bg-white/[0.03] p-7 shadow-2xl sm:p-10">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-bronze">SIRI Constructions</p>
        <h1 className="font-display text-3xl font-extrabold uppercase">Admin sign in</h1>
        <p className="mt-3 text-sm text-warm-white/60">Use your administrator credentials to manage the gallery.</p>
        <label className="mt-8 block text-xs font-medium uppercase tracking-widest text-warm-white/75">Email
          <input required type="email" name="email" autoComplete="email" className="mt-2 w-full border border-white/20 bg-transparent px-3 py-3 text-base outline-none transition focus:border-bronze" />
        </label>
        <label className="mt-5 block text-xs font-medium uppercase tracking-widest text-warm-white/75">Password
          <input required type="password" name="password" autoComplete="current-password" className="mt-2 w-full border border-white/20 bg-transparent px-3 py-3 text-base outline-none transition focus:border-bronze" />
        </label>
        {error && <p role="alert" className="mt-5 text-sm text-red-300">{error}</p>}
        <button disabled={isSubmitting} className="mt-7 w-full bg-bronze px-4 py-3 text-xs font-bold uppercase tracking-widest transition hover:bg-warm-white hover:text-charcoal disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </main>
  )
}
