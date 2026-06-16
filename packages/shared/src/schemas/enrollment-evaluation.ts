import { z } from 'zod';
import { evaluationStatusSchema } from './evaluation';

export const enrollmentEvaluationSchema = z.object({
  id: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  evaluationId: z.string().uuid(),
  score: z.number().int().min(0).max(1000).nullable().optional(),
  status: evaluationStatusSchema,
  submittedAt: z.coerce.date().nullable().optional(),
  gradedBy: z.string().uuid().optional(),
  gradedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const enrollmentEvaluationCreateSchema = enrollmentEvaluationSchema.omit({
  id: true,
  submittedAt: true,
  gradedBy: true,
  gradedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const enrollmentEvaluationUpdateSchema = enrollmentEvaluationSchema
  .pick({
    score: true,
    status: true,
    submittedAt: true,
    gradedBy: true,
    gradedAt: true,
  })
  .partial();

export type EnrollmentEvaluation = z.infer<typeof enrollmentEvaluationSchema>;
export type EnrollmentEvaluationCreate = z.infer<typeof enrollmentEvaluationCreateSchema>;
export type EnrollmentEvaluationUpdate = z.infer<typeof enrollmentEvaluationUpdateSchema>;
