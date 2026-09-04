import { AdminGallery } from '@/components/admin/admin-gallery'
import { getSession } from '@/lib/auth'

export const metadata = { title: 'Admin gallery' }

export default async function AdminGalleryPage() {
  const session = await getSession()
  return <AdminGallery email={session?.email ?? ''} />
}
