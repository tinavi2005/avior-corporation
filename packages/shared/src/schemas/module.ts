import { z } from 'zod';

export const moduleSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  orderIndex: z.number().int().min(0),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const moduleCreateSchema = moduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const moduleUpdateSchema = moduleSchema
  .pick({
    name: true,
    description: true,
    orderIndex: true,
    isActive: true,
  })
  .partial();

export const moduleWithLessonsSchema = moduleSchema.extend({
  lessons: z.array(z.object({
    id: z.string().uuid(),
    name: z.string(),
    orderIndex: z.number(),
    durationMinutes: z.number().optional(),
  })).optional(),
});

export type Module = z.infer<typeof moduleSchema>;
export type ModuleCreate = z.infer<typeof moduleCreateSchema>;
export type ModuleUpdate = z.infer<typeof moduleUpdateSchema>;
export type ModuleWithLessons = z.infer<typeof moduleWithLessonsSchema>;
