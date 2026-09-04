import { GridFSBucket, ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

export type StoredImage = { fileId: ObjectId; filename: string; contentType: string }

async function galleryBucket() {
  return new GridFSBucket(await getDb(), { bucketName: 'galleryFiles' })
}

// Keeping file operations in one module makes GridFS replaceable without changing gallery routes.
export async function uploadGalleryImage(file: Buffer, filename: string, contentType: string): Promise<StoredImage> {
  const uploadStream = (await galleryBucket()).openUploadStream(filename, { metadata: { contentType } })
  return new Promise((resolve, reject) => {
    uploadStream.once('error', reject)
    uploadStream.once('finish', () => resolve({ fileId: uploadStream.id, filename, contentType }))
    uploadStream.end(file)
  })
}

export async function deleteGalleryImage(fileId: ObjectId) {
  await (await galleryBucket()).delete(fileId)
}

export async function openGalleryImage(fileId: ObjectId) {
  const bucket = await galleryBucket()
  const file = await bucket.find({ _id: fileId }).next()
  if (!file) return null
  return { file, stream: bucket.openDownloadStream(fileId) }
}
