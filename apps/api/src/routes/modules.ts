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
import { moduleCreateSchema, moduleUpdateSchema } from '@vale-integrador/shared';

export const moduleRoutes = new Elysia({ prefix: '/modules' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'courses:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const courseId = (query?.courseId as string | undefined)?.trim();

    const whereClause = courseId
      ? eq(schema.modules.courseId, validateUuid(courseId))
      : undefined;

    const [modules, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.modules)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.modules.orderIndex),
      db
        .select({ count: count() })
        .from(schema.modules)
        .where(whereClause),
    ]);

    return {
      data: modules,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'courses:write:all');

    const data = validateBody(moduleCreateSchema, body);
    const [module] = await db.insert(schema.modules).values(data).returning();
    return module;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'courses:read:all');
    const moduleId = validateUuid(id);

    const [module] = await db
      .select()
      .from(schema.modules)
      .where(eq(schema.modules.id, moduleId))
      .limit(1);

    if (!module) {
      throw new Error('Module not found');
    }

    return module;
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'courses:write:all');
    const moduleId = validateUuid(id);

    const data = validateBody(moduleUpdateSchema, body);
    const [updated] = await db
      .update(schema.modules)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.modules.id, moduleId))
      .returning();

    if (!updated) {
      throw new Error('Module not found');
    }

    return updated;
  })
  .get('/:id/lessons', async ({ params: { id }, user }) => {
    await requirePermission(user, 'courses:read:all');
    const moduleId = validateUuid(id);

    const lessons = await db
      .select()
      .from(schema.lessons)
      .where(eq(schema.lessons.moduleId, moduleId))
      .orderBy(schema.lessons.orderIndex);

    return { data: lessons };
  })
  .get('/:id/evaluations', async ({ params: { id }, user }) => {
    await requirePermission(user, 'courses:read:all');
    const moduleId = validateUuid(id);

    const evaluations = await db
      .select()
      .from(schema.evaluations)
      .where(eq(schema.evaluations.moduleId, moduleId))
      .orderBy(schema.evaluations.createdAt);

    return { data: evaluations };
  });
