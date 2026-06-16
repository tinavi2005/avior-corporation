import { Elysia } from 'elysia';
import { eq, ilike, or, count } from 'drizzle-orm';
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
import { programCreateSchema, programUpdateSchema } from '@vale-integrador/shared';

export const programRoutes = new Elysia({ prefix: '/programs' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'programs:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const search = (query?.search as string | undefined)?.trim();

    const whereClause = search
      ? or(
          ilike(schema.programs.name, `%${search}%`),
          ilike(schema.programs.code, `%${search}%`),
        )
      : undefined;

    const [programs, totalResult] = await Promise.all([
      db
        .select()
        .from(schema.programs)
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.programs.code),
      db
        .select({ count: count() })
        .from(schema.programs)
        .where(whereClause),
    ]);

    return {
      data: programs,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'programs:write:all');

    const data = validateBody(programCreateSchema, body);
    const [program] = await db.insert(schema.programs).values(data).returning();
    return program;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'programs:read:all');
    const programId = validateUuid(id);

    const [program] = await db
      .select()
      .from(schema.programs)
      .where(eq(schema.programs.id, programId))
      .limit(1);

    if (!program) {
      throw new Error('Program not found');
    }

    return program;
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'programs:write:all');
    const programId = validateUuid(id);

    const data = validateBody(programUpdateSchema, body);
    const [updated] = await db
      .update(schema.programs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.programs.id, programId))
      .returning();

    if (!updated) {
      throw new Error('Program not found');
    }

    return updated;
  })
  .get('/:id/courses', async ({ params: { id }, user }) => {
    await requirePermission(user, 'programs:read:all');
    const programId = validateUuid(id);

    const courses = await db
      .select({
        id: schema.courses.id,
        code: schema.courses.code,
        name: schema.courses.name,
        description: schema.courses.description,
        credits: schema.courses.credits,
        active: schema.courses.active,
      })
      .from(schema.courses)
      .where(eq(schema.courses.programId, programId))
      .orderBy(schema.courses.code);

    return { data: courses };
  })
  .delete('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'programs:write:all');
    const programId = validateUuid(id);

    const [deleted] = await db
      .delete(schema.programs)
      .where(eq(schema.programs.id, programId))
      .returning();

    if (!deleted) {
      throw new Error('Program not found');
    }

    return { message: 'Program deleted', id: deleted.id };
  });
