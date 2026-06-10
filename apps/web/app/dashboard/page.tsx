import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth/server'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  const role = user.role || 'student'
  redirect(`/dashboard/${role}`)
}
