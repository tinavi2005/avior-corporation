import { Elysia } from 'elysia';
import { eq, count } from 'drizzle-orm';
import { db } from '../db';
import * as schema from '../db/schema';
import { requirePermission } from '../lib/auth';
import { jwtMiddleware } from '../lib/jwt';
import {
  validateUuid,
  validateBody,
  validateQuery,
  paginationQuerySchema,
} from '../lib/validation';
import { lessonCreateSchema, lessonUpdateSchema } from '@vale-integrador/shared';

export const lessonRoutes = new Elysia({ prefix: '/lessons' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'courses:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const moduleId = (query?.moduleId as string | undefined)?.trim();

    const whereClause = moduleId
      ? eq(schema.lessons.moduleId, validateUuid(moduleId))
      : undefined;

    const [lessons, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.lessons)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.lessons.orderIndex),
      db
        .select({ count: count() })
        .from(schema.lessons)
        .where(whereClause),
    ]);

    return {
      data: lessons,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'courses:write:all');

    const data = validateBody(lessonCreateSchema, body);
    const [lesson] = await db.insert(schema.lessons).values(data).returning();
    return lesson;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'courses:read:all');
    const lessonId = validateUuid(id);

    const [lesson] = await db
      .select()
      .from(schema.lessons)
      .where(eq(schema.lessons.id, lessonId))
      .limit(1);

    if (!lesson) {
      throw new Error('Lesson not found');
    }

    return lesson;
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'courses:write:all');
    const lessonId = validateUuid(id);

    const data = validateBody(lessonUpdateSchema, body);
    const [updated] = await db
      .update(schema.lessons)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.lessons.id, lessonId))
      .returning();

    if (!updated) {
      throw new Error('Lesson not found');
    }

    return updated;
  });
