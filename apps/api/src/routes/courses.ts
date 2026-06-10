import { Elysia } from 'elysia';
import { adminClient } from '../lib/insforge';

type InsForgeCourse = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  credits: number;
  hours_per_week: number | null;
  max_students: number | null;
  teacher_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  period_id: string | null;
};

function handleError(error: { message: string; code?: string } | null, entity: string) {
  console.error(`InsForge error fetching ${entity}:`, error);
  throw { status: 500, message: `Failed to fetch ${entity}`, code: 'DATABASE_ERROR' };
}

export const courseRoutes = new Elysia({ prefix: '/courses' })
  .get('/', async () => {
    const coursesRes = await adminClient.database.from('courses').select('*');
    if (coursesRes.error) handleError(coursesRes.error, 'courses');
    const courses = (coursesRes.data ?? []) as InsForgeCourse[];

    return courses
      .filter((c) => c.active)
      .map((c) => ({
        id: c.id,
        programId: c.period_id ?? '',
        name: c.name,
        code: c.code,
        description: c.description ?? undefined,
        credits: c.credits,
        maxHours: c.hours_per_week ?? undefined,
        isActive: c.active,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
      }));
  })
  .get('/:id', async ({ params: { id } }) => {
    const courseRes = await adminClient.database.from('courses').select('*').eq('id', id).maybeSingle();
    if (courseRes.error) handleError(courseRes.error, 'course');

    const course = courseRes.data as InsForgeCourse | null;
    if (!course) throw { status: 404, message: 'Course not found', code: 'NOT_FOUND' };

    return {
      id: course.id,
      programId: course.period_id ?? '',
      name: course.name,
      code: course.code,
      description: course.description ?? undefined,
      credits: course.credits,
      maxHours: course.hours_per_week ?? undefined,
      isActive: course.active,
      createdAt: course.created_at,
      updatedAt: course.updated_at,
    };
  });