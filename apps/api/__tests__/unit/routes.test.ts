import { describe, it, expect } from 'vitest'
import { createApp } from '../../src/app'

describe('Health Check', () => {
  it('GET / returns API info', async () => {
    const app = createApp()
    const response = await app.handle(
      new Request('http://localhost/'),
    )

    expect(response.status).toBe(200)
    const body = await response.json() as Record<string, unknown>
    expect(body.name).toBe('Vale Integrador API')
    expect(body.status).toBe('running')
  })

  it('GET /api/v1/health returns ok status', async () => {
    const app = createApp()
    const response = await app.handle(
      new Request('http://localhost/api/v1/health'),
    )

    expect(response.status).toBe(200)
    const body = await response.json() as Record<string, unknown>
    expect(body.status).toBe('ok')
  })
})

describe('Auth Routes', () => {
  it('POST /api/v1/auth/refresh returns message', async () => {
    const app = createApp()
    const response = await app.handle(
      new Request('http://localhost/api/v1/auth/refresh', { method: 'POST' }),
    )

    expect(response.status).toBe(200)
    const body = await response.json() as Record<string, unknown>
    expect(body.message).toContain('web app')
  })

  it('POST /api/v1/auth/logout returns message', async () => {
    const app = createApp()
    const response = await app.handle(
      new Request('http://localhost/api/v1/auth/logout', { method: 'POST' }),
    )

    expect(response.status).toBe(200)
    const body = await response.json() as Record<string, unknown>
    expect(body.message).toContain('web app')
  })
})

// Data-dependent routes (students, courses, enrollments, grades) are
// tested in __tests__/integration when a live InsForge backend is available.
