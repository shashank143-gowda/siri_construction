import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export default async function ProtectedAdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!(await getSession())) redirect('/admin/login')
  return children
}
