import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { serializeGalleryItem } from '@/lib/gallery'
import { galleryCollection } from '@/lib/models'
import { deleteGalleryImage } from '@/lib/storage'
import { validateGalleryFields } from '@/lib/validation'

export const runtime = 'nodejs'

function idFrom(params: { id: string }) {
  return ObjectId.isValid(params.id) ? new ObjectId(params.id) : null
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    const id = idFrom(await context.params)
    if (!id) return NextResponse.json({ error: 'Invalid image id.' }, { status: 400 })
    const fields = validateGalleryFields(await request.json())
    if ('error' in fields) return NextResponse.json(fields, { status: 400 })

    const collection = await galleryCollection()
    const result = await collection.findOneAndUpdate({ _id: id }, { $set: { ...fields, updatedAt: new Date() } }, { returnDocument: 'after' })
    if (!result) return NextResponse.json({ error: 'Gallery image not found.' }, { status: 404 })
    return NextResponse.json({ item: serializeGalleryItem(result) })
  } catch (error) {
    console.error('Gallery update failed', error)
    return NextResponse.json({ error: 'Unable to update the image.' }, { status: 500 })
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
    const id = idFrom(await context.params)
    if (!id) return NextResponse.json({ error: 'Invalid image id.' }, { status: 400 })

    const collection = await galleryCollection()
    const item = await collection.findOneAndDelete({ _id: id })
    if (!item) return NextResponse.json({ error: 'Gallery image not found.' }, { status: 404 })
    await deleteGalleryImage(item.fileId).catch((error) => console.error('GridFS deletion failed', error))
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Gallery deletion failed', error)
    return NextResponse.json({ error: 'Unable to delete the image.' }, { status: 500 })
  }
}
