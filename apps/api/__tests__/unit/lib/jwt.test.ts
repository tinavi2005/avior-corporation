import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const { mockVerifyToken } = vi.hoisted(() => ({
  mockVerifyToken: vi.fn(),
}))

vi.mock('../../../src/lib/jwt-verify', () => ({
  verifyToken: mockVerifyToken,
  clearJwksCache: vi.fn(),
}))

import { resolveUser } from '../../../src/lib/jwt'

describe('resolveUser', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockVerifyToken.mockResolvedValue(null)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns null when token verification fails', async () => {
    mockVerifyToken.mockResolvedValue(null)

    const user = await resolveUser('invalid.token.here')

    expect(user).toBeNull()
    expect(mockVerifyToken).toHaveBeenCalledWith('invalid.token.here')
  })

  it('returns user with id and email when token is valid', async () => {
    mockVerifyToken.mockResolvedValue({
      sub: 'user-1',
      email: 'user@test.com',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const user = await resolveUser('valid.token.here')

    expect(user).not.toBeNull()
    expect(user?.id).toBe('user-1')
    expect(user?.email).toBe('user@test.com')
  })

  it('defaults email to empty string when not in token payload', async () => {
    mockVerifyToken.mockResolvedValue({
      sub: 'user-3',
      exp: Math.floor(Date.now() / 1000) + 3600,
    })

    const user = await resolveUser('token')

    expect(user?.id).toBe('user-3')
    expect(user?.email).toBe('')
  })
})
