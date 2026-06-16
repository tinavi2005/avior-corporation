import { z } from 'zod';

export const lessonProgressSchema = z.object({
  id: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  lessonId: z.string().uuid(),
  completed: z.boolean(),
  progressPercent: z.number().int().min(0).max(100),
  completedAt: z.coerce.date().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const lessonProgressCreateSchema = lessonProgressSchema.omit({
  id: true,
  completedAt: true,
  createdAt: true,
  updatedAt: true,
});

export const lessonProgressUpdateSchema = lessonProgressSchema
  .pick({
    completed: true,
    progressPercent: true,
    completedAt: true,
  })
  .partial();

export type LessonProgress = z.infer<typeof lessonProgressSchema>;
export type LessonProgressCreate = z.infer<typeof lessonProgressCreateSchema>;
export type LessonProgressUpdate = z.infer<typeof lessonProgressUpdateSchema>;
