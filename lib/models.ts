import type { Collection, ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export type GalleryDocument = {
  title: string
  description: string
  category: string
  filename: string
  contentType: string
  createdAt: Date
  updatedAt: Date
  // Legacy: images stored in GridFS (bucket "galleryFiles"). Still readable
  // via /api/gallery/image/[id] — untouched, not migrated automatically.
  fileId?: ObjectId
  // New: images stored in Cloudflare R2. When present, these take priority
  // over fileId for display.
  objectKey?: string
  imageUrl?: string
}

export type AdminDocument = {
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

export async function galleryCollection(): Promise<Collection<GalleryDocument>> {
  return (await getDb()).collection<GalleryDocument>('gallery')
}

export async function adminsCollection(): Promise<Collection<AdminDocument>> {
  return (await getDb()).collection<AdminDocument>('admins')
}

let indexesPromise: Promise<void> | undefined

export function ensureModelIndexes() {
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      galleryCollection().then((collection) => collection.createIndex({ createdAt: -1 })),
      adminsCollection().then((collection) => collection.createIndex({ email: 1 }, { unique: true })),
    ]).then(() => undefined)
  }

  return indexesPromise
}
