export interface JWTPayload {
  sub: string
  email?: string
  role?: string
  iat?: number
  exp: number
  [key: string]: unknown
}

export function parseJWTPayload(token: string): JWTPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf-8'))

    if (!payload.sub || !payload.exp) return null

    return payload as JWTPayload
  } catch {
    return null
  }
}

export function isTokenExpired(payload: JWTPayload): boolean {
  return payload.exp < Math.floor(Date.now() / 1000)
}

export function getUserIdFromPayload(payload: JWTPayload): string {
  return payload.sub
}

export function getRoleFromPayload(payload: JWTPayload): string | null {
  return payload.role ?? null
}