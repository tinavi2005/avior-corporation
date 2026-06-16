import { parseJWTPayload, isTokenExpired } from '@vale-integrador/shared'
import type { JWTPayload } from '@vale-integrador/shared'

interface JwkKey {
  kid?: string
  alg?: string
  kty?: string
  use?: string
  n?: string
  e?: string
  [key: string]: unknown
}

const INSFORGE_URL = process.env.INSFORGE_URL
const JWKS_URL = INSFORGE_URL ? `${INSFORGE_URL}/.well-known/jwks.json` : ''

let cachedJwks: JwkKey[] | null = null
let jwksLastFetched = 0
const JWKS_CACHE_TTL = 3600_000

export function clearJwksCache(): void {
  cachedJwks = null
  jwksLastFetched = 0
}

async function getJwks(): Promise<JwkKey[]> {
  if (cachedJwks && Date.now() - jwksLastFetched < JWKS_CACHE_TTL) {
    return cachedJwks
  }

  if (!JWKS_URL) {
    throw new Error('INSFORGE_URL is not configured')
  }

  const res = await fetch(JWKS_URL)
  if (!res.ok) {
    throw new Error(`Failed to fetch JWKS: HTTP ${res.status}`)
  }

  const { keys } = (await res.json()) as { keys: JwkKey[] }
  cachedJwks = keys
  jwksLastFetched = Date.now()
  return keys
}

const ALG_MAP: Record<string, { name: string; hash?: string }> = {
  RS256: { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
  RS384: { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-384' },
  RS512: { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-512' },
  HS256: { name: 'HMAC', hash: 'SHA-256' },
  HS384: { name: 'HMAC', hash: 'SHA-384' },
  HS512: { name: 'HMAC', hash: 'SHA-512' },
}

async function importVerifyKey(alg: string, kid?: string) {
  const algConfig = ALG_MAP[alg]
  if (!algConfig) return null

  if (alg.startsWith('RS')) {
    if (!kid) return null
    const keys = await getJwks()
    const jwk = keys.find((k) => k.kid === kid)
    if (!jwk) return null

    return crypto.subtle.importKey(
      'jwk',
      jwk as unknown as JsonWebKey,
      { name: algConfig.name, hash: algConfig.hash },
      false,
      ['verify'],
    )
  }

  if (alg.startsWith('HS')) {
    const secret = process.env.JWT_SECRET
    if (!secret) return null
    const encoder = new TextEncoder()
    return crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: algConfig.name, hash: algConfig.hash },
      false,
      ['verify'],
    )
  }

  return null
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null

  try {
    const header = JSON.parse(
      Buffer.from(parts[0], 'base64url').toString('utf-8'),
    ) as { alg?: string; kid?: string }

    const key = await importVerifyKey(header.alg ?? 'RS256', header.kid)
    if (!key) return null

    const algConfig = ALG_MAP[header.alg ?? 'RS256']
    if (!algConfig) return null

    const signature = Buffer.from(parts[2], 'base64url')
    const signingInput = `${parts[0]}.${parts[1]}`
    const valid = await crypto.subtle.verify(
      algConfig.name,
      key,
      signature,
      new TextEncoder().encode(signingInput),
    )

    if (!valid) return null

    const payload = parseJWTPayload(token)
    if (!payload) return null
    if (isTokenExpired(payload)) return null

    return payload
  } catch {
    return null
  }
}
