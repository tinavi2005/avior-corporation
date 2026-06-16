import { describe, it, expect } from 'vitest'

import {
  parseJWTPayload,
  isTokenExpired,
  getUserIdFromPayload,
  getRoleFromPayload,
} from '../../src/auth'

// JWT with guaranteed base64url-specific chars (_) in the body
// The body is base64url of {"sub":"\u00FB\u00FF\u00FF","exp":9999999999}
// Its base64url is: eyJzdWIiOiLDu8O_w78iLCJleHAiOjk5OTk5OTk5OTl9
// Note the _ character which Node's atob() cannot handle
function makeBase64UrlToken(): string {
  const header = Buffer.from(JSON.stringify({ alg: 'RS256', typ: 'JWT' })).toString('base64url')
  const body = Buffer.from(JSON.stringify({ sub: '\u00FB\u00FF\u00FF', exp: 9999999999 })).toString('base64url')
  const sig = Buffer.from('sig').toString('base64url')
  return `${header}.${body}.${sig}`
}

describe('parseJWTPayload', () => {
  it('decodes a standard JWT payload (simple ASCII sub)', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256' })).toString('base64url')
    const body = Buffer.from(JSON.stringify({ sub: 'user-1', exp: 9999999999 })).toString('base64url')
    const token = `${header}.${body}.sig`
    const result = parseJWTPayload(token)
    expect(result?.sub).toBe('user-1')
    expect(result?.exp).toBe(9999999999)
  })

  it('decodes a JWT with Base64URL _ character in the body', () => {
    const token = makeBase64UrlToken()
    const body = token.split('.')[1]
    expect(body).toContain('_')

    const result = parseJWTPayload(token)
    expect(result).not.toBeNull()
    expect(result?.sub).toBe('\u00FB\u00FF\u00FF')
    expect(result?.exp).toBe(9999999999)
  })

  it('returns null for a token with only 2 segments', () => {
    expect(parseJWTPayload('header.body')).toBeNull()
  })

  it('returns null for a token with 4 segments', () => {
    expect(parseJWTPayload('a.b.c.d')).toBeNull()
  })

  it('returns null for an empty string', () => {
    expect(parseJWTPayload('')).toBeNull()
  })

  it('returns null when sub is missing', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256' })).toString('base64url')
    const body = Buffer.from(JSON.stringify({ exp: 9999999999 })).toString('base64url')
    const token = `${header}.${body}.sig`
    expect(parseJWTPayload(token)).toBeNull()
  })

  it('returns null when exp is missing', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256' })).toString('base64url')
    const body = Buffer.from(JSON.stringify({ sub: 'user-1' })).toString('base64url')
    const token = `${header}.${body}.sig`
    expect(parseJWTPayload(token)).toBeNull()
  })

  it('returns null for garbled (non-JSON) payload', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'RS256' })).toString('base64url')
    const token = `${header}.bm90LWpzb24.sig`
    expect(parseJWTPayload(token)).toBeNull()
  })
})

describe('isTokenExpired', () => {
  it('returns true when exp is in the past', () => {
    expect(isTokenExpired({ sub: 'u', exp: 1 })).toBe(true)
  })

  it('returns false when exp is in the future', () => {
    const future = Math.floor(Date.now() / 1000) + 3600
    expect(isTokenExpired({ sub: 'u', exp: future })).toBe(false)
  })
})

describe('getUserIdFromPayload', () => {
  it('returns sub as user id', () => {
    expect(getUserIdFromPayload({ sub: 'user-123', exp: 1 })).toBe('user-123')
  })
})

describe('getRoleFromPayload', () => {
  it('returns role when present', () => {
    expect(getRoleFromPayload({ sub: 'u', exp: 1, role: 'admin' })).toBe('admin')
  })

  it('returns null when role is missing', () => {
    expect(getRoleFromPayload({ sub: 'u', exp: 1 })).toBeNull()
  })
})
