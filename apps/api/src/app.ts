import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import { authRoutes } from './routes/auth';
import { studentRoutes } from './routes/students';
import { courseRoutes } from './routes/courses';
import { enrollmentRoutes } from './routes/enrollments';
import { gradeRoutes } from './routes/grades';
import { healthRoutes } from './routes/health';
import { errorHandler } from './lib/error-handler';
import { jwtMiddleware } from './lib/jwt';
import type { AuthVariables } from './lib/auth';

export type App = Elysia<{ Variables: AuthVariables }>;

export function createApp() {
  return new Elysia()
    .use(cors())
    .use(swagger({
      documentation: {
        info: {
          title: 'Vale Integrador API',
          version: '1.0.0',
          description: 'CRM Académico API for Mobile App',
        },
        tags: [
          { name: 'Auth', description: 'Authentication endpoints' },
          { name: 'Students', description: 'Student management' },
          { name: 'Courses', description: 'Course management' },
          { name: 'Enrollments', description: 'Enrollment management' },
          { name: 'Grades', description: 'Grade management' },
        ],
      },
    }))
    .use(jwtMiddleware)
    .onError(errorHandler)
    .group('/api/v1', (app) => app
      .use(healthRoutes)
      .use(authRoutes)
      .use(studentRoutes)
      .use(courseRoutes)
      .use(enrollmentRoutes)
      .use(gradeRoutes)
    )
    .get('/', () => ({ 
      name: 'Vale Integrador API', 
      version: '1.0.0',
      status: 'running',
      timestamp: new Date().toISOString()
    }));
}

export const app = createApp();
export default app;