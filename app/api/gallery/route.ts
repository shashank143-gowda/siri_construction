import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { serializeGalleryItem } from '@/lib/gallery'
import { ensureModelIndexes, galleryCollection } from '@/lib/models'
import { deleteGalleryImage, uploadGalleryImage } from '@/lib/storage'
import { validateGalleryFields, validateImageFile } from '@/lib/validation'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const items = await (await galleryCollection()).find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json({ items: items.map(serializeGalleryItem) })
  } catch (error) {
    console.error('Gallery read failed', error)
    return NextResponse.json({ error: 'Unable to load gallery.' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })

    const formData = await request.formData()
    const fields = validateGalleryFields({
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
    })
    if ('error' in fields) return NextResponse.json(fields, { status: 400 })

    const image = formData.get('image')
    if (!(image instanceof File)) return NextResponse.json({ error: 'Select an image to upload.' }, { status: 400 })
    const imageBuffer = await validateImageFile(image)
    if ('error' in imageBuffer) return NextResponse.json(imageBuffer, { status: 400 })

    const storedImage = await uploadGalleryImage(imageBuffer, image.name, image.type)
    const now = new Date()
    try {
      await ensureModelIndexes()
      const result = await (await galleryCollection()).insertOne({ ...fields, ...storedImage, createdAt: now, updatedAt: now })
      const item = await (await galleryCollection()).findOne({ _id: result.insertedId })
      return NextResponse.json({ item: item && serializeGalleryItem(item) }, { status: 201 })
    } catch (error) {
      await deleteGalleryImage(storedImage.fileId).catch(() => undefined)
      throw error
    }
  } catch (error) {
    console.error('Gallery create failed', error)
    return NextResponse.json({ error: 'Unable to save the image.' }, { status: 500 })
  }
}
