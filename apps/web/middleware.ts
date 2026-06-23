import { NextResponse, type NextRequest } from 'next/server'

const PUBLIC_PATHS = [
  '/login', '/register', '/api/auth', '/api/health',
  '/', '/carreras', '/cursos', '/conocenos', '/contacto',
  '/aula-virtual', '/inscripcion', '/dashboard',
]

function parseJWTPayload(token: string): { exp?: number } | null {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
  } catch {
    return null
  }
}

function isTokenExpired(payload: { exp?: number }): boolean {
  if (!payload.exp) return false
  return Date.now() / 1000 > payload.exp
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const response = NextResponse.next({ request })

  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  const accessToken = request.cookies.get('insforge_access_token')?.value

  let isAuthenticated = false

  if (accessToken) {
    const payload = parseJWTPayload(accessToken)
    if (payload && !isTokenExpired(payload)) {
      isAuthenticated = true
    }
  }

  // If authenticated and trying to access login/register, redirect to dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated && !isPublic) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Role-specific dashboard access is handled at the page level via /api/auth/me
  // The middleware only checks authentication, not authorization

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}