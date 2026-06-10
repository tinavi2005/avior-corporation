import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient, clearAuthCookies } from '@insforge/sdk/ssr'

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const client = createServerClient({ cookies: cookieStore })
    const { error } = await client.auth.signOut()

    if (error) {
      console.error('[signout] Error:', error)
    }
  } catch (err) {
    console.error('[signout] Fatal:', err)
  }

  const response = NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
  )
  clearAuthCookies(response.cookies)
  return response
}