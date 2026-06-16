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
import { teacherCreateSchema, teacherUpdateSchema } from '@vale-integrador/shared';

export const teacherRoutes = new Elysia({ prefix: '/teachers' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'teachers:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const search = (query?.search as string | undefined)?.trim();

    const whereClause = search
      ? or(
          ilike(schema.profiles.firstName, `%${search}%`),
          ilike(schema.profiles.lastName, `%${search}%`),
          ilike(schema.users.email, `%${search}%`),
          ilike(schema.teachers.employeeCode, `%${search}%`),
        )
      : undefined;

    const [rows, totalResult] = await Promise.all([
      db
        .select({
          id: schema.teachers.id,
          userId: schema.teachers.userId,
          employeeCode: schema.teachers.employeeCode,
          specialty: schema.teachers.specialty,
          qualification: schema.teachers.qualification,
          hireDate: schema.teachers.hireDate,
          createdAt: schema.teachers.createdAt,
          updatedAt: schema.teachers.updatedAt,
          userEmail: schema.users.email,
          profileFirstName: schema.profiles.firstName,
          profileLastName: schema.profiles.lastName,
        })
        .from(schema.teachers)
        .innerJoin(schema.users, eq(schema.teachers.userId, schema.users.id))
        .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.teachers.employeeCode),
      db
        .select({ count: count() })
        .from(schema.teachers)
        .innerJoin(schema.users, eq(schema.teachers.userId, schema.users.id))
        .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
        .where(whereClause),
    ]);

    const teachers = rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      employeeCode: r.employeeCode,
      specialty: r.specialty,
      qualification: r.qualification,
      hireDate: r.hireDate,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      user: {
        email: r.userEmail,
        firstName: r.profileFirstName,
        lastName: r.profileLastName,
      },
    }));

    return {
      data: teachers,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'teachers:write:all');

    const data = validateBody(teacherCreateSchema, body);
    const [teacher] = await db
      .insert(schema.teachers)
      .values({
        ...data,
        hireDate: new Date(data.hireDate).toISOString().split('T')[0],
      })
      .returning();
    return teacher;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'teachers:read:all');
    const teacherId = validateUuid(id);

    const [row] = await db
      .select({
        id: schema.teachers.id,
        userId: schema.teachers.userId,
        employeeCode: schema.teachers.employeeCode,
        specialty: schema.teachers.specialty,
        qualification: schema.teachers.qualification,
        hireDate: schema.teachers.hireDate,
        createdAt: schema.teachers.createdAt,
        updatedAt: schema.teachers.updatedAt,
        userEmail: schema.users.email,
        profileFirstName: schema.profiles.firstName,
        profileLastName: schema.profiles.lastName,
      })
      .from(schema.teachers)
      .innerJoin(schema.users, eq(schema.teachers.userId, schema.users.id))
      .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
      .where(eq(schema.teachers.id, teacherId))
      .limit(1);

    if (!row) {
      throw new Error('Teacher not found');
    }

    return {
      id: row.id,
      userId: row.userId,
      employeeCode: row.employeeCode,
      specialty: row.specialty,
      qualification: row.qualification,
      hireDate: row.hireDate,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      user: {
        email: row.userEmail,
        firstName: row.profileFirstName,
        lastName: row.profileLastName,
      },
    };
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'teachers:write:all');
    const teacherId = validateUuid(id);

    const data = validateBody(teacherUpdateSchema, body);
    const [updated] = await db
      .update(schema.teachers)
      .set({
        ...data,
        hireDate: data.hireDate
          ? new Date(data.hireDate).toISOString().split('T')[0]
          : undefined,
        updatedAt: new Date(),
      })
      .where(eq(schema.teachers.id, teacherId))
      .returning();

    if (!updated) {
      throw new Error('Teacher not found');
    }

    return updated;
  });
