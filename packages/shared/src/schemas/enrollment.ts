import { z } from 'zod';

export const enrollmentStatusSchema = z.enum(['pending', 'active', 'completed', 'withdrawn', 'failed']);

export const enrollmentSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  courseId: z.string().uuid(),
  period: z.string().min(1).max(20),
  status: enrollmentStatusSchema,
  grade: z.number().min(0).max(100).nullable().optional(),
  observations: z.string().max(500).optional(),
  enrolledAt: z.coerce.date(),
  completedAt: z.coerce.date().nullable().optional(),
});

export const enrollmentWithDetailsSchema = enrollmentSchema.extend({
  student: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }).optional(),
  }).optional(),
  course: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    credits: z.number(),
  }).optional(),
});

export const enrollmentCreateSchema = enrollmentSchema.omit({
  id: true,
  enrolledAt: true,
  completedAt: true,
  grade: true,
});

export const enrollmentUpdateSchema = enrollmentSchema.pick({
  status: true,
  grade: true,
  observations: true,
}).partial();

export type Enrollment = z.infer<typeof enrollmentSchema>;
export type EnrollmentStatus = z.infer<typeof enrollmentStatusSchema>;
export type EnrollmentWithDetails = z.infer<typeof enrollmentWithDetailsSchema>;
export type EnrollmentCreate = z.infer<typeof enrollmentCreateSchema>;
export type EnrollmentUpdate = z.infer<typeof enrollmentUpdateSchema>;