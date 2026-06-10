import { NextResponse } from 'next/server'
import { createServerClient } from '@insforge/sdk/ssr'
import { syncUserFromAuth, getUserWithRole } from '@/lib/db/users'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const client = createServerClient()
  const body = await request.json()

  const { data, error } = await client.auth.signUp({
    email: body.email,
    password: body.password,
    name: `${body.firstName} ${body.lastName}`.trim(),
    user_metadata: {
      first_name: body.firstName,
      last_name: body.lastName,
    },
  })

  if (error) {
    return Response.json(
      {
        error: error.error ?? 'SIGNUP_FAILED',
        message: error.message ?? 'No se pudo registrar el usuario',
      },
      { status: error.statusCode ?? 400 }
    )
  }

  // When email verification is required, InsForge returns:
  // { accessToken: null, requireEmailVerification: true }
  // The user object is NOT present yet — the user is created only after verification.
  if (data?.requireEmailVerification) {
    return Response.json({
      requireEmailVerification: true,
      email: body.email,
    })
  }

  // No verification required — session is already active
  // data shape: { user, accessToken, refreshToken }
  if (data?.accessToken && data?.user) {
    await syncUserFromAuth({
      id: data.user.id,
      email: data.user.email ?? '',
      email_verified: true,
      created_at: (data.user as any).created_at,
      profile: {
        first_name: body.firstName,
        last_name: body.lastName,
      },
    })

    const publicUser = await getUserWithRole(data.user.id)
    const role = publicUser?.role ?? 'student'

    await client.auth.updateUser({ data: { role } })

    const response = NextResponse.json({
      user: data.user,
      role,
      profile: publicUser?.profile ?? null,
    })

    const { setAuthCookies } = await import('@insforge/sdk/ssr')
    setAuthCookies(response.cookies, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })

    return response
  }

  return Response.json(
    { error: 'UNKNOWN_STATE', message: 'Estado de registro desconocido' },
    { status: 500 }
  )
}
