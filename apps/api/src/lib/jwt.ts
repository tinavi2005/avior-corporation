import { Elysia } from 'elysia'
import { adminClient } from './insforge'

export interface AuthUser {
  id: string
  email: string
  role: string
}

declare module 'elysia' {
  interface Variables {
    user: AuthUser | null
  }
}

function parseJWTPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = JSON.parse(atob(parts[1]))
    return payload
  } catch {
    return null
  }
}

export const jwtMiddleware = new Elysia()
  .derive(async ({ headers }): Promise<{ user: AuthUser | null }> => {
    const authHeader = headers.authorization

    if (!authHeader?.startsWith('Bearer ')) {
      return { user: null }
    }

    const token = authHeader.slice(7)
    const payload = parseJWTPayload(token)

    if (!payload?.sub || typeof payload.sub !== 'string') {
      return { user: null }
    }

    const exp = payload.exp as number | undefined
    if (exp && exp < Math.floor(Date.now() / 1000)) {
      return { user: null }
    }

    let role = 'student'
    try {
      const userRolesRes = await adminClient.database
        .from('user_roles')
        .select('role_id')
        .eq('user_id', payload.sub)

      if (!userRolesRes.error && userRolesRes.data && userRolesRes.data.length > 0) {
        const roleId = (userRolesRes.data as any[])[0].role_id
        const rolesRes = await adminClient.database
          .from('roles')
          .select('name')
          .eq('id', roleId)

        if (!rolesRes.error && rolesRes.data && rolesRes.data.length > 0) {
          role = (rolesRes.data as any[])[0].name
        }
      }
    } catch {}

    return {
      user: {
        id: payload.sub,
        email: (payload.email as string) || '',
        role,
      },
    }
  })