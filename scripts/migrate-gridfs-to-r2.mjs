// Migrates existing gallery images from MongoDB GridFS (bucket "galleryFiles",
// i.e. collections galleryFiles.files / galleryFiles.chunks) to Cloudflare R2.
//
// - Reads each gallery document that has a legacy `fileId` and no `objectKey` yet.
// - Downloads the image bytes from GridFS.
// - Uploads them to R2 under a fresh object key.
// - Sets `objectKey` + `imageUrl` on the gallery document.
//
// It NEVER deletes anything from GridFS or drops galleryFiles.files /
// galleryFiles.chunks. Existing GridFS data is left exactly as-is so this is
// safe to re-run and safe to roll back from.
//
// Usage:
//   node scripts/migrate-gridfs-to-r2.mjs            # migrate everything pending
//   node scripts/migrate-gridfs-to-r2.mjs --dry-run   # preview only, no writes
//   node scripts/migrate-gridfs-to-r2.mjs --limit 5   # migrate at most 5 images

import 'dotenv/config'
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')
const limitArg = args.indexOf('--limit')
const limit = limitArg !== -1 ? Number(args[limitArg + 1]) : Infinity

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name} environment variable.`)
  return value
}

function sanitizeFilename(filename) {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100)
}

async function streamToBuffer(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  return Buffer.concat(chunks)
}

async function main() {
  const mongoUri = requiredEnv('MONGODB_URI')
  const client = new MongoClient(mongoUri)
  await client.connect()
  const db = client.db()
  const gallery = db.collection('gallery')
  const bucket = new GridFSBucket(db, { bucketName: 'galleryFiles' })

  const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${requiredEnv('R2_ACCOUNT_ID')}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
    },
  })
  const bucketName = requiredEnv('R2_BUCKET_NAME')
  const publicBase = requiredEnv('R2_PUBLIC_URL').replace(/\/$/, '')

  const pending = await gallery
    .find({ fileId: { $exists: true }, objectKey: { $exists: false } })
    .limit(Number.isFinite(limit) ? limit : 0)
    .toArray()

  console.log(`Found ${pending.length} image(s) pending migration.${dryRun ? ' (dry run — no changes will be made)' : ''}`)

  let migrated = 0
  let failed = 0

  for (const doc of pending) {
    const label = `${doc._id} (${doc.title ?? 'untitled'})`
    try {
      const fileId = doc.fileId instanceof ObjectId ? doc.fileId : new ObjectId(doc.fileId)
      const file = await bucket.find({ _id: fileId }).next()
      if (!file) {
        console.warn(`  skip  ${label}: GridFS file ${fileId} not found`)
        failed += 1
        continue
      }

      const buffer = await streamToBuffer(bucket.openDownloadStream(fileId))
      const filename = doc.filename ?? file.filename ?? 'image'
      const contentType = doc.contentType ?? file.metadata?.contentType ?? 'application/octet-stream'
      const objectKey = `gallery/${randomUUID()}-${sanitizeFilename(filename)}`
      const imageUrl = `${publicBase}/${objectKey}`

      if (!dryRun) {
        await s3.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            Body: buffer,
            ContentType: contentType,
            CacheControl: 'public, max-age=31536000, immutable',
          })
        )
        await gallery.updateOne({ _id: doc._id }, { $set: { objectKey, imageUrl, updatedAt: new Date() } })
      }

      console.log(`  ok    ${label} -> ${objectKey}`)
      migrated += 1
    } catch (error) {
      console.error(`  fail  ${label}:`, error instanceof Error ? error.message : error)
      failed += 1
    }
  }

  console.log(`\nDone. Migrated: ${migrated}. Failed: ${failed}. GridFS data was not modified or deleted.`)
  await client.close()
}

main().catch((error) => {
  console.error('Migration script crashed:', error)
  process.exit(1)
})
