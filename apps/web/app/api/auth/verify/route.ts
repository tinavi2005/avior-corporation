import { NextResponse } from 'next/server'
import { createServerClient, setAuthCookies } from '@insforge/sdk/ssr'
import { syncUserFromAuth, getUserWithRole } from '@/lib/db/users'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const client = createServerClient()
  const body = await request.json()

  const { data, error } = await client.auth.verifyEmail({
    email: body.email,
    otp: body.otp,
  })

  if (error || !data?.accessToken) {
    return Response.json(
      {
        error: error?.error ?? 'VERIFICATION_FAILED',
        message: error?.message ?? 'Código inválido o expirado',
      },
      { status: error?.statusCode ?? 400 }
    )
  }

  // Sync user into public tables (if not already present)
  await syncUserFromAuth({
    id: data.user.id,
    email: data.user.email ?? '',
    email_verified: true,
    created_at: (data.user as any).created_at,
    profile: (data.user as any).profile ?? null,
  })

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
