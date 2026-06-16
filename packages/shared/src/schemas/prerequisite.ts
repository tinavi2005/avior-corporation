import { z } from 'zod';

export const prerequisiteSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  requiredCourseId: z.string().uuid(),
  minGrade: z.number().int().min(0).max(100).optional(),
  createdAt: z.coerce.date(),
});

export const prerequisiteCreateSchema = prerequisiteSchema.omit({
  id: true,
  createdAt: true,
});

export type Prerequisite = z.infer<typeof prerequisiteSchema>;
export type PrerequisiteCreate = z.infer<typeof prerequisiteCreateSchema>;
