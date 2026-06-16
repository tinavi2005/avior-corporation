import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest'

import { verifyToken, clearJwksCache } from '../../../src/lib/jwt-verify'

let privateKey: CryptoKey
let publicKeyJwk: JsonWebKey

async function makeJWT(payload: Record<string, unknown>): Promise<string> {
  const header = { alg: 'RS256', typ: 'JWT', kid: 'test-key-1' }
  const headerB64 = Buffer.from(JSON.stringify(header)).toString('base64url')
  const bodyB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')
  const signingInput = `${headerB64}.${bodyB64}`

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signingInput),
  )

  const sigB64 = Buffer.from(signature).toString('base64url')
  return `${signingInput}.${sigB64}`
}

beforeAll(async () => {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true,
    ['sign', 'verify'],
  )
  privateKey = keyPair.privateKey

  const jwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey)
  ;(jwk as Record<string, unknown>).kid = 'test-key-1'
  ;(jwk as Record<string, unknown>).alg = 'RS256'
  publicKeyJwk = jwk
})

beforeEach(() => {
  clearJwksCache()
  ;(globalThis as Record<string, unknown>).fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ keys: [publicKeyJwk] }),
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('verifyToken', () => {
  it('accepts a validly signed JWT', async () => {
    const token = await makeJWT({
      sub: 'user-1',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const payload = await verifyToken(token)

    expect(payload).not.toBeNull()
    expect(payload?.sub).toBe('user-1')
  })

  it('rejects a token with tampered payload', async () => {
    const validToken = await makeJWT({
      sub: 'user-1',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const [headerB64, , sig] = validToken.split('.')
    const tamperedBody = Buffer.from(
      JSON.stringify({ sub: 'hacker', exp: 9999999999 }),
    ).toString('base64url')
    const tamperedToken = `${headerB64}.${tamperedBody}.${sig}`

    const payload = await verifyToken(tamperedToken)

    expect(payload).toBeNull()
  })

  it('rejects a token with tampered header (wrong alg)', async () => {
    const payload = { sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }
    const tamperedHeader = Buffer.from(
      JSON.stringify({ alg: 'none', typ: 'JWT', kid: 'test-key-1' }),
    ).toString('base64url')
    const bodyB64 = Buffer.from(JSON.stringify(payload)).toString('base64url')

    const result = await verifyToken(`${tamperedHeader}.${bodyB64}.invalid`)

    expect(result).toBeNull()
  })

  it('rejects an expired token', async () => {
    const token = await makeJWT({
      sub: 'user-1',
      exp: Math.floor(Date.now() / 1000) - 60, // expired 1 min ago
    })

    const payload = await verifyToken(token)

    expect(payload).toBeNull()
  })

  it('rejects a token with missing sub', async () => {
    const token = await makeJWT({
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const payload = await verifyToken(token)

    expect(payload).toBeNull()
  })

  it('rejects a token with missing exp', async () => {
    const token = await makeJWT({
      sub: 'user-1',
    })

    const payload = await verifyToken(token)

    expect(payload).toBeNull()
  })

  it('rejects a malformed token (2 segments)', async () => {
    const payload = await verifyToken('header.body')

    expect(payload).toBeNull()
  })

  it('rejects a token with missing kid in header', async () => {
    const payload = { sub: 'user-1', exp: Math.floor(Date.now() / 1000) + 3600 }
    const header = Buffer.from(
      JSON.stringify({ alg: 'RS256', typ: 'JWT' }),
    ).toString('base64url')
    const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
    const token = `${header}.${body}.invalidsig`

    const result = await verifyToken(token)

    expect(result).toBeNull()
  })

  it('rejects a token when JWKS fetch fails', async () => {
    ;(globalThis as Record<string, unknown>).fetch = vi.fn().mockResolvedValue({ ok: false, status: 500 })

    const token = await makeJWT({
      sub: 'user-1',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const payload = await verifyToken(token)

    expect(payload).toBeNull()
  })
})
