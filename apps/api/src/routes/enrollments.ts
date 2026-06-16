import { Elysia } from 'elysia';
import { eq, count, and } from 'drizzle-orm';
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
import { enrollmentCreateSchema, enrollmentUpdateSchema } from '@vale-integrador/shared';

export const enrollmentRoutes = new Elysia({ prefix: '/enrollments' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'enrollments:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const studentId = (query?.studentId as string | undefined)?.trim();
    const courseId = (query?.courseId as string | undefined)?.trim();

    const conditions: (ReturnType<typeof eq>)[] = [];
    if (studentId) conditions.push(eq(schema.enrollments.studentId, validateUuid(studentId)));
    if (courseId) conditions.push(eq(schema.enrollments.courseId, validateUuid(courseId)));

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, totalResult] = await Promise.all([
      db
        .select({
          id: schema.enrollments.id,
          studentId: schema.enrollments.studentId,
          courseId: schema.enrollments.courseId,
          periodId: schema.enrollments.periodId,
          status: schema.enrollments.status,
          enrolledAt: schema.enrollments.enrolledAt,
          completedAt: schema.enrollments.completedAt,
          grade: schema.enrollments.grade,
          studentCode: schema.students.studentCode,
          userEmail: schema.users.email,
          profileFirstName: schema.profiles.firstName,
          profileLastName: schema.profiles.lastName,
          courseCode: schema.courses.code,
          courseName: schema.courses.name,
          courseCredits: schema.courses.credits,
        })
        .from(schema.enrollments)
        .innerJoin(schema.students, eq(schema.enrollments.studentId, schema.students.id))
        .innerJoin(schema.users, eq(schema.students.userId, schema.users.id))
        .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
        .innerJoin(schema.courses, eq(schema.enrollments.courseId, schema.courses.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.enrollments.enrolledAt),
      db
        .select({ count: count() })
        .from(schema.enrollments)
        .where(whereClause),
    ]);

    const enrollments = rows.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      courseId: r.courseId,
      periodId: r.periodId,
      status: r.status,
      enrolledAt: r.enrolledAt,
      completedAt: r.completedAt,
      grade: r.grade,
      student: {
        studentCode: r.studentCode,
        user: {
          email: r.userEmail,
          firstName: r.profileFirstName,
          lastName: r.profileLastName,
        },
      },
      course: {
        code: r.courseCode,
        name: r.courseName,
        credits: r.courseCredits,
      },
    }));

    return {
      data: enrollments,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .post('/', async ({ body, user }) => {
    await requirePermission(user, 'enrollments:write:all');

    const data = validateBody(enrollmentCreateSchema, body);
    const [enrollment] = await db.insert(schema.enrollments).values(data).returning();
    return enrollment;
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'enrollments:read:all');
    const enrollmentId = validateUuid(id);

    const [row] = await db
      .select({
        id: schema.enrollments.id,
        studentId: schema.enrollments.studentId,
        courseId: schema.enrollments.courseId,
        periodId: schema.enrollments.periodId,
        status: schema.enrollments.status,
        enrolledAt: schema.enrollments.enrolledAt,
        completedAt: schema.enrollments.completedAt,
        grade: schema.enrollments.grade,
        studentCode: schema.students.studentCode,
        courseCode: schema.courses.code,
        courseName: schema.courses.name,
      })
      .from(schema.enrollments)
      .innerJoin(schema.students, eq(schema.enrollments.studentId, schema.students.id))
      .innerJoin(schema.courses, eq(schema.enrollments.courseId, schema.courses.id))
      .where(eq(schema.enrollments.id, enrollmentId))
      .limit(1);

    if (!row) {
      throw new Error('Enrollment not found');
    }

    return {
      id: row.id,
      studentId: row.studentId,
      courseId: row.courseId,
      periodId: row.periodId,
      status: row.status,
      enrolledAt: row.enrolledAt,
      completedAt: row.completedAt,
      grade: row.grade,
      student: {
        studentCode: row.studentCode,
      },
      course: {
        code: row.courseCode,
        name: row.courseName,
      },
    };
  })
  .patch('/:id', async ({ params: { id }, body, user }) => {
    await requirePermission(user, 'enrollments:write:all');
    const enrollmentId = validateUuid(id);

    const data = validateBody(enrollmentUpdateSchema, body);
    const [updated] = await db
      .update(schema.enrollments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.enrollments.id, enrollmentId))
      .returning();

    if (!updated) {
      throw new Error('Enrollment not found');
    }

    return updated;
  });
