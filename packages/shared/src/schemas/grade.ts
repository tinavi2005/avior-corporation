import { z } from 'zod';

export const gradeSchema = z.object({
  id: z.string().uuid(),
  studentId: z.string().uuid(),
  courseId: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  grade: z.number().min(0).max(100),
  letterGrade: z.string().max(2).optional(),
  observations: z.string().max(500).optional(),
  gradedBy: z.string().uuid(),
  gradedAt: z.coerce.date(),
});

export const gradeWithDetailsSchema = gradeSchema.extend({
  course: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
  }).optional(),
  enrollment: z.object({
    id: z.string().uuid(),
    period: z.string(),
    status: z.string(),
  }).optional(),
});

export const gradeCreateSchema = gradeSchema.omit({
  id: true,
  gradedAt: true,
  letterGrade: true,
});

export const gradeStatsSchema = z.object({
  studentId: z.string().uuid(),
  average: z.number(),
  totalCredits: z.number(),
  coursesCompleted: z.number(),
  grades: gradeSchema.array(),
});

export type Grade = z.infer<typeof gradeSchema>;
export type GradeWithDetails = z.infer<typeof gradeWithDetailsSchema>;
export type GradeCreate = z.infer<typeof gradeCreateSchema>;
export type GradeStats = z.infer<typeof gradeStatsSchema>;