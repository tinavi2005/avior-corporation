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
import { gradeCreateSchema, gradeUpdateSchema } from '@vale-integrador/shared';

export const gradeRoutes = new Elysia({ prefix: '/grades' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'grades:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const enrollmentId = (query?.enrollmentId as string | undefined)?.trim();

    const whereClause = enrollmentId
      ? eq(schema.grades.enrollmentId, validateUuid(enrollmentId))
      : undefined;

    const [grades, totalResult] = await Promise.all([
      db
        .select({
          id: schema.grades.id,
          enrollmentId: schema.grades.enrollmentId,
          name: schema.grades.name,
          weight: schema.grades.weight,
          score: schema.grades.score,
          gradedAt: schema.grades.gradedAt,
          createdAt: schema.grades.createdAt,
          updatedAt: schema.grades.updatedAt,
        })
        .from(schema.grades)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.grades.createdAt),
      db
        .select({ count: count() })
        .from(schema.grades)
        .where(whereClause),
    ]);

    return {
      data: grades,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'grades:write:all');

    const data = validateBody(gradeCreateSchema, body);
    const [grade] = await db
      .insert(schema.grades)
      .values({
        ...data,
        gradedAt: data.score !== null && data.score !== undefined ? new Date() : null,
      })
      .returning();

    return grade;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'grades:read:all');
    const gradeId = validateUuid(id);

    const [grade] = await db
      .select()
      .from(schema.grades)
      .where(eq(schema.grades.id, gradeId))
      .limit(1);

    if (!grade) {
      throw new Error('Grade not found');
    }

    return grade;
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'grades:write:all');
    const gradeId = validateUuid(id);

    const data = validateBody(gradeUpdateSchema, body);
    const [updated] = await db
      .update(schema.grades)
      .set({
        ...data,
        gradedAt: data.score !== undefined ? new Date() : undefined,
        updatedAt: new Date(),
      })
      .where(eq(schema.grades.id, gradeId))
      .returning();

    if (!updated) {
      throw new Error('Grade not found');
    }

    return updated;
  });
