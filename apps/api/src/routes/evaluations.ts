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
import { evaluationCreateSchema, evaluationUpdateSchema } from '@vale-integrador/shared';

export const evaluationRoutes = new Elysia({ prefix: '/evaluations' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'evaluations:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const courseId = (query?.courseId as string | undefined)?.trim();

    const whereClause = courseId
      ? eq(schema.evaluations.courseId, validateUuid(courseId))
      : undefined;

    const [rows, totalResult] = await Promise.all([
      db
        .select({
          id: schema.evaluations.id,
          courseId: schema.evaluations.courseId,
          moduleId: schema.evaluations.moduleId,
          name: schema.evaluations.name,
          description: schema.evaluations.description,
          type: schema.evaluations.type,
          maxScore: schema.evaluations.maxScore,
          passingScore: schema.evaluations.passingScore,
          weight: schema.evaluations.weight,
          dueDate: schema.evaluations.dueDate,
          createdAt: schema.evaluations.createdAt,
          updatedAt: schema.evaluations.updatedAt,
          moduleName: schema.modules.name,
        })
        .from(schema.evaluations)
        .leftJoin(schema.modules, eq(schema.evaluations.moduleId, schema.modules.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.evaluations.createdAt),
      db
        .select({ count: count() })
        .from(schema.evaluations)
        .where(whereClause),
    ]);

    const evaluations = rows.map((r) => ({
      id: r.id,
      courseId: r.courseId,
      moduleId: r.moduleId,
      name: r.name,
      description: r.description,
      type: r.type,
      maxScore: r.maxScore,
      passingScore: r.passingScore,
      weight: r.weight,
      dueDate: r.dueDate,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      module: r.moduleId ? { id: r.moduleId, name: r.moduleName } : null,
    }));

    return {
      data: evaluations,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'evaluations:write:all');

    const data = validateBody(evaluationCreateSchema, body);
    const [evaluation] = await db.insert(schema.evaluations).values(data).returning();
    return evaluation;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'evaluations:read:all');
    const evaluationId = validateUuid(id);

    const [evaluation] = await db
      .select()
      .from(schema.evaluations)
      .where(eq(schema.evaluations.id, evaluationId))
      .limit(1);

    if (!evaluation) {
      throw new Error('Evaluation not found');
    }

    return evaluation;
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'evaluations:write:all');
    const evaluationId = validateUuid(id);

    const data = validateBody(evaluationUpdateSchema, body);
    const [updated] = await db
      .update(schema.evaluations)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.evaluations.id, evaluationId))
      .returning();

    if (!updated) {
      throw new Error('Evaluation not found');
    }

    return updated;
  });
