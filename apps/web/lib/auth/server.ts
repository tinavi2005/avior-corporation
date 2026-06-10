import { cookies } from 'next/headers'
import { createServerClient } from '@insforge/sdk/ssr'
import { getUserWithRole } from '@/lib/db/users'

export interface User {
  id: string
  email: string
  role: string
  profile?: {
    firstName: string
    lastName: string
    avatarUrl?: string
  } | null
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const client = createServerClient({ cookies: cookieStore })
  const { data, error } = await client.auth.getCurrentUser()

  if (error || !data?.user) {
    return null
  }

  const authUser = data.user
  const publicUser = await getUserWithRole(authUser.id)

  return {
    id: authUser.id,
    email: authUser.email ?? '',
    role: publicUser?.role ?? 'student',
    profile: publicUser?.profile ?? null,
  }
}
