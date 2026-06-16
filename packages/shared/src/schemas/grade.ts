import { z } from 'zod';

export const gradeSchema = z.object({
  id: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  name: z.string().min(1).max(200),
  weight: z.number().int().min(0).max(100),
  score: z.number().int().min(0).max(100).nullable().optional(),
  gradedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const gradeCreateSchema = gradeSchema.omit({
  id: true,
  gradedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const gradeUpdateSchema = gradeSchema
  .pick({
    name: true,
    weight: true,
    score: true,
    gradedAt: true,
  })
  .partial();

export const gradeStatsSchema = z.object({
  enrollmentId: z.string().uuid(),
  average: z.number(),
  weightedScore: z.number(),
  totalWeight: z.number(),
  grades: gradeSchema.array(),
});

export type Grade = z.infer<typeof gradeSchema>;
export type GradeCreate = z.infer<typeof gradeCreateSchema>;
export type GradeUpdate = z.infer<typeof gradeUpdateSchema>;
export type GradeStats = z.infer<typeof gradeStatsSchema>;
