import { Elysia } from 'elysia';
import { verifyToken } from './jwt-verify';

export interface AuthUser {
  id: string;
  email: string;
}

export async function resolveUser(token: string): Promise<AuthUser | null> {
  const payload = await verifyToken(token);
  if (!payload) return null;

  return {
    id: payload.sub,
    email: (payload.email as string) || '',
  };
}

export const jwtMiddleware = new Elysia().derive(
  { as: 'global' },
  async ({ headers }): Promise<{ user: AuthUser | null }> => {
    const authHeader = headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      return { user: null };
    }

    const token = authHeader.slice(7);
    const user = await resolveUser(token);

    return { user };
  },
);
