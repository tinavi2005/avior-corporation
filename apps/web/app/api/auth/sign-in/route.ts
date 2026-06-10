import { NextResponse } from 'next/server'
import { createServerClient, setAuthCookies } from '@insforge/sdk/ssr'
import { syncUserFromAuth, getUserWithRole } from '@/lib/db/users'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const client = createServerClient()
  const body = await request.json()

  const { data, error } = await client.auth.signInWithPassword({
    email: body.email,
    password: body.password,
  })

  if (error || !data?.accessToken) {
    const status = error?.statusCode ?? 401
    const isUnverified = status === 403 || error?.message?.toLowerCase().includes('verify')

    return Response.json(
      {
        error: error?.error ?? 'AUTH_UNAUTHORIZED',
        message: error?.message ?? 'Credenciales inválidas',
        requireEmailVerification: isUnverified,
      },
      { status }
    )
  }

  // Sync user into public.users / public.profiles / public.user_roles
  const syncedUser = await syncUserFromAuth({
    id: data.user.id,
    email: data.user.email ?? '',
    email_verified: (data.user as any).email_verified ?? true,
    created_at: (data.user as any).created_at,
    profile: (data.user as any).profile ?? null,
  })

  // Fetch the real role from the relational DB
  const publicUser = await getUserWithRole(data.user.id)
  const role = publicUser?.role ?? 'student'

  const response = NextResponse.json({
    user: data.user,
    role,
    profile: publicUser?.profile ?? null,
  })

  setAuthCookies(response.cookies, {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  })

  return response
}
