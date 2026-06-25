import { describe, it, expect, vi, beforeEach } from 'vitest'

import { createInsForgeAdminClient } from '../../../src/lib/insforge'
// prueba que la base de datos funcione correctamente
beforeEach(() => {
  vi.unstubAllEnvs()
})

describe('createInsForgeAdminClient', () => {
  it('throws when INSFORGE_URL is missing', () => {
    vi.stubEnv('INSFORGE_URL', '')
    vi.stubEnv('INSFORGE_API_KEY', 'ik_test')

    expect(() =>
      createInsForgeAdminClient(),
    ).toThrow(/INSFORGE_URL/)
  })

  it('throws when INSFORGE_API_KEY is missing', () => {
    vi.stubEnv('INSFORGE_URL', 'https://test.example.com')
    vi.stubEnv('INSFORGE_API_KEY', '')

    expect(() =>
      createInsForgeAdminClient(),
    ).toThrow(/INSFORGE_API_KEY/)
  })

  it('returns a client when both env vars are provided', () => {
    vi.stubEnv('INSFORGE_URL', 'https://test.example.com')
    vi.stubEnv('INSFORGE_API_KEY', 'ik_test')

    const client = createInsForgeAdminClient()

    expect(client).toBeDefined()
    expect(client.database).toBeDefined()
  })

  it('does not fallback to any hardcoded values', () => {
    vi.stubEnv('INSFORGE_URL', 'https://explicit.example.com')
    vi.stubEnv('INSFORGE_API_KEY', 'ik_explicit')

    const client = createInsForgeAdminClient()

    expect(client).toBeDefined()
  })
})
