import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@insforge/sdk/ssr'
import { getUserWithRole } from '@/lib/db/users'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const client = createServerClient({ cookies: cookieStore })
    const { data, error } = await client.auth.getCurrentUser()

    if (error || !data?.user) {
      return NextResponse.json({ user: null }, { status: 401 })
    }

    const authUser = data.user
    const publicUser = await getUserWithRole(authUser.id)

    return NextResponse.json({
      user: {
        id: authUser.id,
        email: authUser.email ?? '',
        role: publicUser?.role ?? 'student',
        profile: publicUser?.profile ?? null,
      },
    })
  } catch (err) {
    console.error('[me] Error:', err)
    return NextResponse.json({ user: null }, { status: 401 })
  }
}