import { z } from 'zod';

export const enrollmentStatusSchema = z.enum(['pending', 'active', 'completed', 'withdrawn', 'failed']);

export const enrollmentSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  courseId: z.string().uuid(),
  periodId: z.string().uuid().optional(),
  status: enrollmentStatusSchema,
  enrolledAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable().optional(),
  grade: z.number().int().min(0).max(100).nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const enrollmentWithDetailsSchema = enrollmentSchema.extend({
  student: z.object({
    id: z.string().uuid(),
    studentCode: z.string(),
    user: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      profile: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }).optional(),
    }),
  }).optional(),
  course: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    credits: z.number(),
  }).optional(),
  period: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
  }).optional(),
});

export const enrollmentCreateSchema = enrollmentSchema.omit({
  id: true,
  enrolledAt: true,
  completedAt: true,
  grade: true,
  createdAt: true,
  updatedAt: true,
});

export const enrollmentUpdateSchema = enrollmentSchema
  .pick({
    status: true,
    completedAt: true,
    grade: true,
  })
  .partial();

export type Enrollment = z.infer<typeof enrollmentSchema>;
export type EnrollmentStatus = z.infer<typeof enrollmentStatusSchema>;
export type EnrollmentWithDetails = z.infer<typeof enrollmentWithDetailsSchema>;
export type EnrollmentCreate = z.infer<typeof enrollmentCreateSchema>;
export type EnrollmentUpdate = z.infer<typeof enrollmentUpdateSchema>;
