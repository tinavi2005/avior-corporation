import { z } from 'zod';

export const evaluationTypeSchema = z.enum(['quiz', 'exam', 'assignment', 'practical']);
export const evaluationStatusSchema = z.enum(['pending', 'submitted', 'graded']);

export const evaluationSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  moduleId: z.string().uuid().optional(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  type: evaluationTypeSchema,
  maxScore: z.number().int().min(1).max(1000),
  passingScore: z.number().int().min(0).max(1000).optional(),
  weight: z.number().int().min(0).max(100),
  dueDate: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const evaluationCreateSchema = evaluationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const evaluationUpdateSchema = evaluationSchema
  .pick({
    name: true,
    description: true,
    type: true,
    maxScore: true,
    passingScore: true,
    weight: true,
    dueDate: true,
  })
  .partial();

export type Evaluation = z.infer<typeof evaluationSchema>;
export type EvaluationType = z.infer<typeof evaluationTypeSchema>;
export type EvaluationStatus = z.infer<typeof evaluationStatusSchema>;
export type EvaluationCreate = z.infer<typeof evaluationCreateSchema>;
export type EvaluationUpdate = z.infer<typeof evaluationUpdateSchema>;
