import { ObjectId } from 'mongodb'
import { Readable } from 'node:stream'
import { openGalleryImage } from '@/lib/storage'

export const runtime = 'nodejs'

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params
  if (!ObjectId.isValid(id)) return new Response('Not found.', { status: 404 })

  try {
    const image = await openGalleryImage(new ObjectId(id))
    if (!image) return new Response('Not found.', { status: 404 })

    const metadata = image.file.metadata as { contentType?: unknown } | undefined
    const contentType = typeof metadata?.contentType === 'string' ? metadata.contentType : 'application/octet-stream'
    return new Response(Readable.toWeb(image.stream) as ReadableStream, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': image.file.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'X-Content-Type-Options': 'nosniff',
      },
    })
  } catch (error) {
    console.error('Gallery image retrieval failed', error)
    return new Response('Unable to retrieve image.', { status: 500 })
  }
}
