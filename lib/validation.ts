import { galleryCategories } from '@/lib/gallery'

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const imageTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])

export function validateGalleryFields(value: unknown): { title: string; description: string; category: string } | { error: string } {
  if (!value || typeof value !== 'object') return { error: 'Invalid request body.' }
  const { title, description = '', category } = value as Record<string, unknown>
  if (typeof title !== 'string' || title.trim().length < 2 || title.trim().length > 120) return { error: 'Title must be between 2 and 120 characters.' }
  if (typeof description !== 'string' || description.trim().length > 500) return { error: 'Description must be 500 characters or fewer.' }
  if (typeof category !== 'string' || !galleryCategories.includes(category as (typeof galleryCategories)[number])) return { error: 'Select a valid gallery category.' }
  return { title: title.trim(), description: description.trim(), category }
}

export async function validateImageFile(file: File): Promise<Buffer | { error: string }> {
  if (!imageTypes.has(file.type)) return { error: 'Only JPEG, PNG, and WebP images are allowed.' }
  if (file.size === 0 || file.size > MAX_IMAGE_BYTES) return { error: 'Image must be no larger than 5 MB.' }
  const buffer = Buffer.from(await file.arrayBuffer())
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  const isPng = buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  const isWebp = buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP'
  if (!isJpeg && !isPng && !isWebp) return { error: 'The image contents do not match a supported image type.' }
  return buffer
}
