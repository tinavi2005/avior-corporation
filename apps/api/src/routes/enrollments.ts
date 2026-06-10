import { Elysia } from 'elysia';
import { adminClient } from '../lib/insforge';

type InsForgeEnrollment = {
  id: string;
  student_id: string;
  course_id: string;
  status: string;
  enrolled_at: string | null;
  completed_at: string | null;
  grade: number | null;
  created_at: string;
  updated_at: string;
};

function handleError(error: { message: string; code?: string } | null, entity: string) {
  console.error(`InsForge error fetching ${entity}:`, error);
  throw { status: 500, message: `Failed to fetch ${entity}`, code: 'DATABASE_ERROR' };
}

export const enrollmentRoutes = new Elysia({ prefix: '/enrollments' })
  .get('/', async () => {
    const enrollmentsRes = await adminClient.database.from('enrollments').select('*');
    if (enrollmentsRes.error) handleError(enrollmentsRes.error, 'enrollments');
    const enrollments = (enrollmentsRes.data ?? []) as InsForgeEnrollment[];

    return enrollments.map((e) => ({
      id: e.id,
      studentId: e.student_id,
      courseId: e.course_id,
      period: '',
      status: e.status,
      grade: e.grade ?? undefined,
      observations: undefined,
      enrolledAt: e.enrolled_at ?? e.created_at,
      completedAt: e.completed_at ?? undefined,
    }));
  })
  .get('/:id', async ({ params: { id } }) => {
    const enrollmentRes = await adminClient.database.from('enrollments').select('*').eq('id', id).maybeSingle();
    if (enrollmentRes.error) handleError(enrollmentRes.error, 'enrollment');

    const enrollment = enrollmentRes.data as InsForgeEnrollment | null;
    if (!enrollment) throw { status: 404, message: 'Enrollment not found', code: 'NOT_FOUND' };

    return {
      id: enrollment.id,
      studentId: enrollment.student_id,
      courseId: enrollment.course_id,
      period: '',
      status: enrollment.status,
      grade: enrollment.grade ?? undefined,
      observations: undefined,
      enrolledAt: enrollment.enrolled_at ?? enrollment.created_at,
      completedAt: enrollment.completed_at ?? undefined,
    };
  });