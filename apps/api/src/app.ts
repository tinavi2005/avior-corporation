import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { authRoutes } from './routes/auth';
import { studentRoutes } from './routes/students';
import { teacherRoutes } from './routes/teachers';
import { programRoutes } from './routes/programs';
import { courseRoutes } from './routes/courses';
import { moduleRoutes } from './routes/modules';
import { lessonRoutes } from './routes/lessons';
import { evaluationRoutes } from './routes/evaluations';
import { enrollmentRoutes } from './routes/enrollments';
import { gradeRoutes } from './routes/grades';
import { healthRoutes } from './routes/health';
import { errorHandler } from './lib/error-handler';

export function createApp() {
  return new Elysia()
    .use(cors())
    .use(swagger({
      documentation: {
        info: {
          title: 'Vale Integrador API',
          version: '1.0.0',
          description: 'NetAcad-style LMS API',
        },
        tags: [
          { name: 'Auth', description: 'Authentication endpoints' },
          { name: 'Programs', description: 'Academic programs' },
          { name: 'Students', description: 'Student management' },
          { name: 'Teachers', description: 'Teacher management' },
          { name: 'Courses', description: 'Course management' },
          { name: 'Modules', description: 'Course modules' },
          { name: 'Lessons', description: 'Module lessons' },
          { name: 'Evaluations', description: 'Course/module evaluations' },
          { name: 'Enrollments', description: 'Enrollment management' },
          { name: 'Grades', description: 'Grade management' },
        ],
      },
    }))
    .onError(errorHandler)
    .group('/api/v1', (app) =>
      app
        .use(healthRoutes)
        .use(authRoutes)
        .use(programRoutes)
        .use(studentRoutes)
        .use(teacherRoutes)
        .use(courseRoutes)
        .use(moduleRoutes)
        .use(lessonRoutes)
        .use(evaluationRoutes)
        .use(enrollmentRoutes)
        .use(gradeRoutes),
    )
    .get('/', () => ({
      name: 'Vale Integrador API',
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
    }));
}

export const app = createApp();
export default app;
