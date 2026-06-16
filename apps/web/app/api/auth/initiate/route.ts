import { cookies } from 'next/headers'
import { createServerClient } from '@insforge/sdk/ssr'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const client = createServerClient()
  const body = await request.json()
  const provider = body.provider ?? 'google'
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  try {
    const { data, error } = await client.auth.signInWithOAuth({
      provider,
      redirectTo: `${appUrl}/api/auth/callback`,
      skipBrowserRedirect: true,
    })

    if (error || !data?.url || !data?.codeVerifier) {
      console.error('OAuth init failed:', error)
      return Response.json(
        { error: 'oauth_init_failed', message: error?.message ?? 'OAuth init failed' },
        { status: 500 }
      )
    }

    const cookieStore = await cookies()
    cookieStore.set('insforge_code_verifier', data.codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 600,
    })

    return Response.json({ url: data.url })
  } catch (err) {
    console.error('OAuth initiation error:', err)
    return Response.json(
      { error: 'server_error', message: 'Failed to initiate OAuth' },
      { status: 500 }
    )
  }
}
