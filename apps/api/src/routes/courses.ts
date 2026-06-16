import { Elysia } from 'elysia';
import { eq, ilike, or, count, and } from 'drizzle-orm';
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
import { courseCreateSchema, courseUpdateSchema } from '@vale-integrador/shared';

export const courseRoutes = new Elysia({ prefix: '/courses' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'courses:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const search = (query?.search as string | undefined)?.trim();
    const programId = (query?.programId as string | undefined)?.trim();
    const activeOnly = (query?.activeOnly as string | undefined) === 'true';

    const conditions: (ReturnType<typeof eq> | ReturnType<typeof ilike> | ReturnType<typeof and>)[] = [];

    if (search) {
      conditions.push(
        or(
          ilike(schema.courses.name, `%${search}%`),
          ilike(schema.courses.code, `%${search}%`),
        ),
      );
    }

    if (programId) {
      conditions.push(eq(schema.courses.programId, validateUuid(programId)));
    }

    if (activeOnly) {
      conditions.push(eq(schema.courses.active, true));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, totalResult] = await Promise.all([
      db
        .select({
          id: schema.courses.id,
          code: schema.courses.code,
          name: schema.courses.name,
          description: schema.courses.description,
          credits: schema.courses.credits,
          hoursPerWeek: schema.courses.hoursPerWeek,
          maxStudents: schema.courses.maxStudents,
          teacherId: schema.courses.teacherId,
          programId: schema.courses.programId,
          periodId: schema.courses.periodId,
          active: schema.courses.active,
          createdAt: schema.courses.createdAt,
          updatedAt: schema.courses.updatedAt,
          teacherUserId: schema.teachers.userId,
          teacherEmployeeCode: schema.teachers.employeeCode,
          userEmail: schema.users.email,
          profileFirstName: schema.profiles.firstName,
          profileLastName: schema.profiles.lastName,
          programName: schema.programs.name,
          programCode: schema.programs.code,
          periodName: schema.academicPeriods.name,
          periodCode: schema.academicPeriods.code,
        })
        .from(schema.courses)
        .innerJoin(schema.teachers, eq(schema.courses.teacherId, schema.teachers.id))
        .innerJoin(schema.users, eq(schema.teachers.userId, schema.users.id))
        .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
        .leftJoin(schema.programs, eq(schema.courses.programId, schema.programs.id))
        .leftJoin(schema.academicPeriods, eq(schema.courses.periodId, schema.academicPeriods.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.courses.code),
      db
        .select({ count: count() })
        .from(schema.courses)
        .where(whereClause),
    ]);

    const courses = rows.map((r) => ({
      id: r.id,
      code: r.code,
      name: r.name,
      description: r.description,
      credits: r.credits,
      hoursPerWeek: r.hoursPerWeek,
      maxStudents: r.maxStudents,
      teacherId: r.teacherId,
      programId: r.programId,
      periodId: r.periodId,
      active: r.active,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      teacher: {
        id: r.teacherId,
        userId: r.teacherUserId,
        employeeCode: r.teacherEmployeeCode,
        user: {
          email: r.userEmail,
          firstName: r.profileFirstName,
          lastName: r.profileLastName,
        },
      },
      program: r.programId
        ? { id: r.programId, name: r.programName, code: r.programCode }
        : null,
      period: r.periodId
        ? { id: r.periodId, name: r.periodName, code: r.periodCode }
        : null,
    }));

    return {
      data: courses,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'courses:write:all');

    const data = validateBody(courseCreateSchema, body);
    const [course] = await db.insert(schema.courses).values(data).returning();
    return course;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'courses:read:all');
    const courseId = validateUuid(id);

    const [row] = await db
      .select({
        id: schema.courses.id,
        code: schema.courses.code,
        name: schema.courses.name,
        description: schema.courses.description,
        credits: schema.courses.credits,
        hoursPerWeek: schema.courses.hoursPerWeek,
        maxStudents: schema.courses.maxStudents,
        teacherId: schema.courses.teacherId,
        programId: schema.courses.programId,
        periodId: schema.courses.periodId,
        active: schema.courses.active,
        createdAt: schema.courses.createdAt,
        updatedAt: schema.courses.updatedAt,
        teacherUserId: schema.teachers.userId,
        teacherEmployeeCode: schema.teachers.employeeCode,
        userEmail: schema.users.email,
        profileFirstName: schema.profiles.firstName,
        profileLastName: schema.profiles.lastName,
        programName: schema.programs.name,
        programCode: schema.programs.code,
        periodName: schema.academicPeriods.name,
        periodCode: schema.academicPeriods.code,
      })
      .from(schema.courses)
      .innerJoin(schema.teachers, eq(schema.courses.teacherId, schema.teachers.id))
      .innerJoin(schema.users, eq(schema.teachers.userId, schema.users.id))
      .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
      .leftJoin(schema.programs, eq(schema.courses.programId, schema.programs.id))
      .leftJoin(schema.academicPeriods, eq(schema.courses.periodId, schema.academicPeriods.id))
      .where(eq(schema.courses.id, courseId))
      .limit(1);

    if (!row) {
      throw new Error('Course not found');
    }

    return {
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      credits: row.credits,
      hoursPerWeek: row.hoursPerWeek,
      maxStudents: row.maxStudents,
      teacherId: row.teacherId,
      programId: row.programId,
      periodId: row.periodId,
      active: row.active,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      teacher: {
        id: row.teacherId,
        userId: row.teacherUserId,
        employeeCode: row.teacherEmployeeCode,
        user: {
          email: row.userEmail,
          firstName: row.profileFirstName,
          lastName: row.profileLastName,
        },
      },
      program: row.programId
        ? { id: row.programId, name: row.programName, code: row.programCode }
        : null,
      period: row.periodId
        ? { id: row.periodId, name: row.periodName, code: row.periodCode }
        : null,
    };
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'courses:write:all');
    const courseId = validateUuid(id);

    const data = validateBody(courseUpdateSchema, body);
    const [updated] = await db
      .update(schema.courses)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.courses.id, courseId))
      .returning();

    if (!updated) {
      throw new Error('Course not found');
    }

    return updated;
  })
  .get('/:id/modules', async ({ params: { id }, user }) => {
    await requirePermission(user, 'courses:read:all');
    const courseId = validateUuid(id);

    const modules = await db
      .select()
      .from(schema.modules)
      .where(eq(schema.modules.courseId, courseId))
      .orderBy(schema.modules.orderIndex);

    return { data: modules };
  });
