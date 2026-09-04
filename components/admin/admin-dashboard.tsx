'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function AdminDashboard({ email }: { email: string }) {
  const router = useRouter()
  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-sand px-5 py-8 text-charcoal md:px-10 md:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-col justify-between gap-5 border-b border-charcoal/15 pb-6 sm:flex-row sm:items-end">
          <div><p className="text-xs uppercase tracking-[0.3em] text-bronze">SIRI Constructions</p><h1 className="mt-2 font-display text-4xl font-extrabold uppercase">Admin dashboard</h1><p className="mt-2 text-sm text-charcoal/65">Signed in as {email}</p></div>
          <button onClick={logout} className="border border-charcoal/30 px-4 py-2 text-xs font-bold uppercase tracking-widest">Log out</button>
        </header>
        <section className="mt-10 max-w-xl border border-charcoal/15 bg-warm-white p-7">
          <p className="text-xs uppercase tracking-[0.25em] text-bronze">Content management</p>
          <h2 className="mt-3 font-display text-2xl font-bold uppercase">Gallery</h2>
          <p className="mt-3 text-sm leading-6 text-charcoal/65">Upload new project images and manage the gallery shown on the public website.</p>
          <Link href="/admin/gallery" className="mt-6 inline-block bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-warm-white transition hover:bg-bronze">Manage gallery</Link>
        </section>
      </div>
    </main>
  )
}
