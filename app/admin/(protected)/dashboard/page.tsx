import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { getSession } from '@/lib/auth'

export const metadata = { title: 'Admin dashboard' }

export default async function DashboardPage() {
  const session = await getSession()
  return <AdminDashboard email={session?.email ?? ''} />
}
