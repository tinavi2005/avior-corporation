import { Elysia } from 'elysia';
import { adminClient } from '../lib/insforge';

type InsForgeGrade = {
  id: string;
  student_id: string;
  course_id: string;
  enrollment_id: string;
  grade: number;
  letter_grade: string | null;
  observations: string | null;
  graded_by: string;
  graded_at: string;
  created_at: string;
  updated_at: string;
};

function handleError(error: { message: string; code?: string } | null, entity: string) {
  console.error(`InsForge error fetching ${entity}:`, error);
  throw { status: 500, message: `Failed to fetch ${entity}`, code: 'DATABASE_ERROR' };
}

export const gradeRoutes = new Elysia({ prefix: '/grades' })
  .get('/', async () => {
    const gradesRes = await adminClient.database.from('grades').select('*');
    if (gradesRes.error) handleError(gradesRes.error, 'grades');
    const grades = (gradesRes.data ?? []) as InsForgeGrade[];

    return grades.map((g) => ({
      id: g.id,
      studentId: g.student_id,
      courseId: g.course_id,
      enrollmentId: g.enrollment_id,
      grade: Number(g.grade),
      letterGrade: g.letter_grade ?? undefined,
      observations: g.observations ?? undefined,
      gradedBy: g.graded_by,
      gradedAt: g.graded_at,
    }));
  })
  .get('/:id', async ({ params: { id } }) => {
    const gradeRes = await adminClient.database.from('grades').select('*').eq('id', id).maybeSingle();
    if (gradeRes.error) handleError(gradeRes.error, 'grade');

    const grade = gradeRes.data as InsForgeGrade | null;
    if (!grade) throw { status: 404, message: 'Grade not found', code: 'NOT_FOUND' };

    return {
      id: grade.id,
      studentId: grade.student_id,
      courseId: grade.course_id,
      enrollmentId: grade.enrollment_id,
      grade: Number(grade.grade),
      letterGrade: grade.letter_grade ?? undefined,
      observations: grade.observations ?? undefined,
      gradedBy: grade.graded_by,
      gradedAt: grade.graded_at,
    };
  });