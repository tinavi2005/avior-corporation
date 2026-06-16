import { Elysia } from 'elysia';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import * as schema from '../db/schema';
import { getUserRole } from '../lib/auth';
import { jwtMiddleware } from '../lib/jwt';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .use(jwtMiddleware)
  .get('/me', async ({ user }) => {
    if (!user) {
      throw new Error('Unauthorized');
    }

    const [profile] = await db
      .select({
        id: schema.users.id,
        email: schema.users.email,
        emailVerified: schema.users.emailVerified,
        avatarUrl: schema.users.avatarUrl,
        firstName: schema.profiles.firstName,
        lastName: schema.profiles.lastName,
      })
      .from(schema.users)
      .leftJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
      .where(eq(schema.users.id, user.id))
      .limit(1);

    const role = await getUserRole(user.id);

    return {
      user: profile ?? { id: user.id, email: user.email },
      role,
    };
  })
  .post('/refresh', () => {
    return { message: 'Use /api/auth/refresh on the web app' };
  })
  .post('/logout', () => {
    return { message: 'Use /api/auth/signout on the web app' };
  });
