'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { galleryCategories, type GalleryItem } from '@/lib/gallery'

type Editor = Pick<GalleryItem, '_id' | 'title' | 'description' | 'category'>

const inputClass = 'mt-2 w-full border border-charcoal/20 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-bronze'

export function AdminGallery({ email }: { email: string }) {
  const router = useRouter()
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState<Editor | null>(null)

  async function loadGallery() {
    setLoading(true)
    try {
      const response = await fetch('/api/gallery', { cache: 'no-store' })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      setItems(data.items)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to load gallery.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void loadGallery() }, [])
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null
    if (preview) URL.revokeObjectURL(preview)
    setFile(selected)
    setPreview(selected ? URL.createObjectURL(selected) : '')
  }

  async function upload(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!file) return setMessage('Select an image before saving.')
    setUploading(true)
    setMessage('')
    const data = new FormData(event.currentTarget)
    data.set('image', file)
    const response = await fetch('/api/gallery', { method: 'POST', body: data })
    const result = await response.json()
    setUploading(false)
    if (!response.ok) return setMessage(result.error ?? 'Unable to save image.')
    event.currentTarget.reset()
    if (preview) URL.revokeObjectURL(preview)
    setPreview('')
    setFile(null)
    setItems((current) => [result.item, ...current])
    setMessage('Image saved.')
  }

  async function saveEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!editing) return
    const response = await fetch(`/api/gallery/${editing._id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editing) })
    const result = await response.json()
    if (!response.ok) return setMessage(result.error ?? 'Unable to update image.')
    setItems((current) => current.map((item) => item._id === result.item._id ? result.item : item))
    setEditing(null)
    setMessage('Image details updated.')
  }

  async function remove(item: GalleryItem) {
    if (!window.confirm(`Delete “${item.title}”? This cannot be undone.`)) return
    const response = await fetch(`/api/gallery/${item._id}`, { method: 'DELETE' })
    const result = await response.json()
    if (!response.ok) return setMessage(result.error ?? 'Unable to delete image.')
    setItems((current) => current.filter((entry) => entry._id !== item._id))
    setMessage('Image deleted.')
  }

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-sand px-5 py-8 text-charcoal md:px-10 md:py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-5 border-b border-charcoal/15 pb-6 sm:flex-row sm:items-end">
          <div><p className="text-xs uppercase tracking-[0.3em] text-bronze">SIRI Constructions</p><h1 className="mt-2 font-display text-4xl font-extrabold uppercase">Gallery admin</h1><p className="mt-2 text-sm text-charcoal/65">Signed in as {email}</p></div>
          <div className="flex flex-wrap gap-3"><Link href="/admin/dashboard" className="border border-charcoal/30 px-4 py-2 text-xs font-bold uppercase tracking-widest transition hover:border-charcoal">Dashboard</Link><button onClick={logout} className="border border-charcoal/30 px-4 py-2 text-xs font-bold uppercase tracking-widest transition hover:border-charcoal">Log out</button></div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <form onSubmit={upload} className="h-fit border border-charcoal/15 bg-warm-white p-5 md:p-7">
            <h2 className="font-display text-2xl font-bold uppercase">Add image</h2>
            <label className="mt-6 block text-xs font-bold uppercase tracking-widest">Image <input required accept="image/jpeg,image/png,image/webp" onChange={selectFile} type="file" name="image" className="mt-2 block w-full text-sm" /></label>
            {preview && <div className="relative mt-4 aspect-[4/3] overflow-hidden bg-sand"><Image src={preview} alt="Selected image preview" fill unoptimized className="object-contain" /></div>}
            <label className="mt-5 block text-xs font-bold uppercase tracking-widest">Title <input required name="title" minLength={2} maxLength={120} className={inputClass} /></label>
            <label className="mt-5 block text-xs font-bold uppercase tracking-widest">Description <textarea name="description" maxLength={500} rows={3} className={inputClass} /></label>
            <label className="mt-5 block text-xs font-bold uppercase tracking-widest">Category <select required name="category" defaultValue="" className={inputClass}><option value="" disabled>Select a category</option>{galleryCategories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <button disabled={uploading} className="mt-6 bg-charcoal px-5 py-3 text-xs font-bold uppercase tracking-widest text-warm-white transition hover:bg-bronze disabled:opacity-60">{uploading ? 'Saving…' : 'Save image'}</button>
            {message && <p role="status" className="mt-4 text-sm text-charcoal/75">{message}</p>}
          </form>

          <section><div className="mb-5 flex items-baseline justify-between"><h2 className="font-display text-2xl font-bold uppercase">Uploaded images</h2><span className="text-sm text-charcoal/60">{items.length} total</span></div>
            {loading ? <p className="py-8 text-charcoal/65">Loading gallery…</p> : items.length === 0 ? <p className="border border-dashed border-charcoal/25 p-8 text-charcoal/65">No images uploaded yet.</p> : <div className="grid gap-4 sm:grid-cols-2">{items.map((item) => <article key={item._id} className="overflow-hidden border border-charcoal/15 bg-warm-white"><div className="relative aspect-[4/3] bg-sand"><Image src={item.imageUrl} alt={item.title} fill unoptimized className="object-cover" /></div><div className="p-4"><p className="text-xs uppercase tracking-widest text-bronze">{item.category}</p><h3 className="mt-1 font-display text-lg font-bold uppercase">{item.title}</h3>{item.description && <p className="mt-2 line-clamp-2 text-sm text-charcoal/65">{item.description}</p>}<div className="mt-4 flex gap-3"><button onClick={() => setEditing(item)} className="text-xs font-bold uppercase tracking-widest underline underline-offset-4">Edit</button><button onClick={() => void remove(item)} className="text-xs font-bold uppercase tracking-widest text-red-700 underline underline-offset-4">Delete</button></div></div></article>)}</div>}
          </section>
        </section>
      </div>
      {editing && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/70 p-5"><form onSubmit={saveEdit} className="w-full max-w-lg bg-warm-white p-6 shadow-2xl"><h2 className="font-display text-2xl font-bold uppercase">Edit image</h2><label className="mt-5 block text-xs font-bold uppercase tracking-widest">Title <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required minLength={2} maxLength={120} className={inputClass} /></label><label className="mt-5 block text-xs font-bold uppercase tracking-widest">Description <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} maxLength={500} rows={3} className={inputClass} /></label><label className="mt-5 block text-xs font-bold uppercase tracking-widest">Category <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass}>{galleryCategories.map((category) => <option key={category}>{category}</option>)}</select></label><div className="mt-6 flex gap-3"><button className="bg-charcoal px-4 py-3 text-xs font-bold uppercase tracking-widest text-warm-white">Save changes</button><button type="button" onClick={() => setEditing(null)} className="border border-charcoal/25 px-4 py-3 text-xs font-bold uppercase tracking-widest">Cancel</button></div></form></div>}
    </main>
  )
}
