import { Elysia } from 'elysia'

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post('/refresh', () => {
    return { message: 'Use /api/auth/refresh on the web app' }
  })
  .post('/logout', () => {
    return { message: 'Use /api/auth/signout on the web app' }
  })