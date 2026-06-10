import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, setAuthCookies } from '@insforge/sdk/ssr'
import { syncUserFromAuth, getUserWithRole } from '@/lib/db/users'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('insforge_code')
    const oauthError = request.nextUrl.searchParams.get('error')
    const errorDescription = request.nextUrl.searchParams.get('error_description')

    console.log('[callback] Received callback:', {
      code: code ? `${code.substring(0, 20)}...` : null,
      oauthError,
      errorDescription,
      url: request.url,
    })

    if (oauthError || !code) {
      console.error('[callback] Missing code or OAuth error:', { oauthError, errorDescription })
      return NextResponse.redirect(
        new URL(`/login?error=oauth_failed&details=${encodeURIComponent(errorDescription || oauthError || '')}`, request.url)
      )
    }

    const cookieStore = await cookies()
    const codeVerifier = cookieStore.get('insforge_code_verifier')?.value
    if (!codeVerifier) {
      console.error('[callback] Missing code_verifier cookie')
      return NextResponse.redirect(new URL('/login?error=missing_verifier', request.url))
    }

    console.log('[callback] Exchanging code with verifier...')
    const client = createServerClient()
    const { data, error } = await client.auth.exchangeOAuthCode(code, codeVerifier)

    if (error || !data?.accessToken) {
      console.error('[callback] Exchange failed:', { error, hasAccessToken: !!data?.accessToken })
      return NextResponse.redirect(
        new URL(`/login?error=exchange_failed&details=${encodeURIComponent(error?.message || '')}`, request.url)
      )
    }

    console.log('[callback] Exchange successful. User:', data.user?.id, 'Email:', data.user?.email)

    // Sync the OAuth user into public tables (auto-register as student if new)
    await syncUserFromAuth({
      id: data.user.id,
      email: data.user.email ?? '',
      email_verified: true,
      created_at: (data.user as any).created_at,
      profile: (data.user as any).profile ?? null,
    })

    const publicUser = await getUserWithRole(data.user.id)
    const role = publicUser?.role ?? 'student'
    console.log('[callback] User role:', role)

    const response = NextResponse.redirect(new URL('/dashboard', request.url))

    try {
      setAuthCookies(response.cookies, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
      console.log('[callback] Auth cookies set successfully')
    } catch (cookieErr) {
      console.error('[callback] setAuthCookies failed:', cookieErr)
      response.cookies.set('insforge_access_token', data.accessToken, {
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60,
      })
      if (data.refreshToken) {
        response.cookies.set('insforge_refresh_token', data.refreshToken, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7,
        })
      }
    }

    response.cookies.delete('insforge_code_verifier')
    return response
  } catch (err) {
    console.error('[callback] Fatal error:', err)
    return NextResponse.redirect(
      new URL(`/login?error=callback_error&details=${encodeURIComponent((err as Error).message || '')}`, request.url)
    )
  }
}
