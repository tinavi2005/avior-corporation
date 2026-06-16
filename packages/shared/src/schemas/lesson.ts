import { z } from 'zod';

export const lessonContentTypeSchema = z.enum(['video', 'text', 'document', 'interactive', 'reading', 'lab', 'quiz', 'exam']);

export const lessonSchema = z.object({
  id: z.string().uuid(),
  moduleId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  content: z.string().max(50000).optional(),
  contentType: lessonContentTypeSchema,
  durationMinutes: z.number().int().min(1).optional(),
  orderIndex: z.number().int().min(0),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const lessonCreateSchema = lessonSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const lessonUpdateSchema = lessonSchema
  .pick({
    name: true,
    description: true,
    content: true,
    contentType: true,
    durationMinutes: true,
    orderIndex: true,
    isActive: true,
  })
  .partial();

export type Lesson = z.infer<typeof lessonSchema>;
export type LessonCreate = z.infer<typeof lessonCreateSchema>;
export type LessonUpdate = z.infer<typeof lessonUpdateSchema>;
