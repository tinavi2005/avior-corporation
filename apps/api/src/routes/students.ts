import { Elysia } from 'elysia';
import { eq, ilike, or, count } from 'drizzle-orm';
import { db } from '../db';
import * as schema from '../db/schema';
import { requirePermission } from '../lib/auth';
import { jwtMiddleware } from '../lib/jwt';
import { validateUuid, validateQuery, paginationQuerySchema } from '../lib/validation';

export const studentRoutes = new Elysia({ prefix: '/students' })
  .use(jwtMiddleware)
  .get('/', async ({ query, user }) => {
    await requirePermission(user, 'students:read:all');

    const { limit, offset } = validateQuery(paginationQuerySchema, query ?? {});
    const search = (query?.search as string | undefined)?.trim();

    const whereClause = search
      ? or(
          ilike(schema.profiles.firstName, `%${search}%`),
          ilike(schema.profiles.lastName, `%${search}%`),
          ilike(schema.users.email, `%${search}%`),
          ilike(schema.students.studentCode, `%${search}%`),
        )
      : undefined;

    const [rows, totalResult] = await Promise.all([
      db
        .select({
          id: schema.students.id,
          userId: schema.students.userId,
          studentCode: schema.students.studentCode,
          emergencyContact: schema.students.emergencyContact,
          emergencyPhone: schema.students.emergencyPhone,
          bloodType: schema.students.bloodType,
          allergies: schema.students.allergies,
          notes: schema.students.notes,
          programId: schema.students.programId,
          status: schema.students.status,
          createdAt: schema.students.createdAt,
          updatedAt: schema.students.updatedAt,
          userEmail: schema.users.email,
          profileFirstName: schema.profiles.firstName,
          profileLastName: schema.profiles.lastName,
          programName: schema.programs.name,
          programCode: schema.programs.code,
        })
        .from(schema.students)
        .innerJoin(schema.users, eq(schema.students.userId, schema.users.id))
        .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
        .leftJoin(schema.programs, eq(schema.students.programId, schema.programs.id))
        .where(whereClause)
        .limit(limit)
        .offset(offset)
        .orderBy(schema.students.studentCode),
      db
        .select({ count: count() })
        .from(schema.students)
        .innerJoin(schema.users, eq(schema.students.userId, schema.users.id))
        .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
        .where(whereClause),
    ]);

    const students = rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      studentCode: r.studentCode,
      emergencyContact: r.emergencyContact,
      emergencyPhone: r.emergencyPhone,
      bloodType: r.bloodType,
      allergies: r.allergies,
      notes: r.notes,
      programId: r.programId,
      status: r.status,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      user: {
        email: r.userEmail,
        firstName: r.profileFirstName,
        lastName: r.profileLastName,
      },
      program: r.programId
        ? { id: r.programId, name: r.programName, code: r.programCode }
        : null,
    }));

    return {
      data: students,
      pagination: {
        limit,
        offset,
        total: Number(totalResult[0]?.count ?? 0),
      },
    };
  })
  .get('/:id', async ({ params: { id }, user }) => {
    await requirePermission(user, 'students:read:all');
    const studentId = validateUuid(id);

    const [row] = await db
      .select({
        id: schema.students.id,
        userId: schema.students.userId,
        studentCode: schema.students.studentCode,
        emergencyContact: schema.students.emergencyContact,
        emergencyPhone: schema.students.emergencyPhone,
        bloodType: schema.students.bloodType,
        allergies: schema.students.allergies,
        notes: schema.students.notes,
        programId: schema.students.programId,
        status: schema.students.status,
        createdAt: schema.students.createdAt,
        updatedAt: schema.students.updatedAt,
        userEmail: schema.users.email,
        profileFirstName: schema.profiles.firstName,
        profileLastName: schema.profiles.lastName,
        programName: schema.programs.name,
        programCode: schema.programs.code,
      })
      .from(schema.students)
      .innerJoin(schema.users, eq(schema.students.userId, schema.users.id))
      .innerJoin(schema.profiles, eq(schema.profiles.userId, schema.users.id))
      .leftJoin(schema.programs, eq(schema.students.programId, schema.programs.id))
      .where(eq(schema.students.id, studentId))
      .limit(1);

    if (!row) {
      throw new Error('Student not found');
    }

    return {
      id: row.id,
      userId: row.userId,
      studentCode: row.studentCode,
      emergencyContact: row.emergencyContact,
      emergencyPhone: row.emergencyPhone,
      bloodType: row.bloodType,
      allergies: row.allergies,
      notes: row.notes,
      programId: row.programId,
      status: row.status,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      user: {
        email: row.userEmail,
        firstName: row.profileFirstName,
        lastName: row.profileLastName,
      },
      program: row.programId
        ? { id: row.programId, name: row.programName, code: row.programCode }
        : null,
    };
  })
  .get('/:id/enrollments', async ({ params: { id }, user }) => {
    await requirePermission(user, 'enrollments:read:all');
    const studentId = validateUuid(id);

    const rows = await db
      .select({
        id: schema.enrollments.id,
        studentId: schema.enrollments.studentId,
        courseId: schema.enrollments.courseId,
        periodId: schema.enrollments.periodId,
        status: schema.enrollments.status,
        enrolledAt: schema.enrollments.enrolledAt,
        completedAt: schema.enrollments.completedAt,
        grade: schema.enrollments.grade,
        courseCode: schema.courses.code,
        courseName: schema.courses.name,
        courseCredits: schema.courses.credits,
      })
      .from(schema.enrollments)
      .innerJoin(schema.courses, eq(schema.enrollments.courseId, schema.courses.id))
      .where(eq(schema.enrollments.studentId, studentId))
      .orderBy(schema.enrollments.enrolledAt);

    const enrollments = rows.map((r) => ({
      id: r.id,
      studentId: r.studentId,
      courseId: r.courseId,
      periodId: r.periodId,
      status: r.status,
      enrolledAt: r.enrolledAt,
      completedAt: r.completedAt,
      grade: r.grade,
      course: {
        code: r.courseCode,
        name: r.courseName,
        credits: r.courseCredits,
      },
    }));

    return { data: enrollments };
  })
  .get('/:id/grades', async ({ params: { id }, user }) => {
    await requirePermission(user, 'grades:read:all');
    const studentId = validateUuid(id);

    const rows = await db
      .select({
        id: schema.grades.id,
        enrollmentId: schema.grades.enrollmentId,
        name: schema.grades.name,
        weight: schema.grades.weight,
        score: schema.grades.score,
        gradedAt: schema.grades.gradedAt,
        courseCode: schema.courses.code,
        courseName: schema.courses.name,
      })
      .from(schema.grades)
      .innerJoin(schema.enrollments, eq(schema.grades.enrollmentId, schema.enrollments.id))
      .innerJoin(schema.courses, eq(schema.enrollments.courseId, schema.courses.id))
      .where(eq(schema.enrollments.studentId, studentId))
      .orderBy(schema.grades.createdAt);

    const grades = rows.map((r) => ({
      id: r.id,
      enrollmentId: r.enrollmentId,
      name: r.name,
      weight: r.weight,
      score: r.score,
      gradedAt: r.gradedAt,
      course: {
        code: r.courseCode,
        name: r.courseName,
      },
    }));

    return { data: grades };
  });
