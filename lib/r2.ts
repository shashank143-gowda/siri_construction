import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { randomUUID } from 'node:crypto'

// Cloudflare R2 is S3-compatible, so the AWS SDK v3 S3 client works against it
// directly — just point endpoint at the account-scoped R2 URL and use 'auto'
// as the region. Credentials are read from server-only env vars and this
// module is never imported by client components, so they never reach the browser.
function requiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing ${name} environment variable.`)
  return value
}

let client: S3Client | undefined

function r2Client(): S3Client {
  if (client) return client
  const accountId = requiredEnv('R2_ACCOUNT_ID')
  client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: requiredEnv('R2_ACCESS_KEY_ID'),
      secretAccessKey: requiredEnv('R2_SECRET_ACCESS_KEY'),
    },
  })
  return client
}

function publicUrlFor(objectKey: string): string {
  const base = requiredEnv('R2_PUBLIC_URL').replace(/\/$/, '')
  return `${base}/${objectKey}`
}

function sanitizeFilename(filename: string): string {
  return filename.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-100)
}

export type StoredR2Image = { objectKey: string; imageUrl: string; filename: string; contentType: string }

export async function uploadGalleryImageToR2(file: Buffer, filename: string, contentType: string): Promise<StoredR2Image> {
  const objectKey = `gallery/${randomUUID()}-${sanitizeFilename(filename)}`
  await r2Client().send(
    new PutObjectCommand({
      Bucket: requiredEnv('R2_BUCKET_NAME'),
      Key: objectKey,
      Body: file,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  )
  return { objectKey, imageUrl: publicUrlFor(objectKey), filename, contentType }
}

export async function deleteGalleryImageFromR2(objectKey: string) {
  await r2Client().send(
    new DeleteObjectCommand({
      Bucket: requiredEnv('R2_BUCKET_NAME'),
      Key: objectKey,
    })
  )
}
