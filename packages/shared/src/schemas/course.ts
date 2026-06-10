import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().uuid(),
  programId: z.string().uuid(),
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(20),
  description: z.string().max(1000).optional(),
  credits: z.number().int().min(1).max(10),
  maxHours: z.number().int().positive().optional(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const courseCreateSchema = courseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const courseUpdateSchema = courseSchema.pick({
  name: true,
  description: true,
  credits: true,
  maxHours: true,
  isActive: true,
}).partial();

export const courseWithProgramSchema = courseSchema.extend({
  program: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
  }).optional(),
});

export type Course = z.infer<typeof courseSchema>;
export type CourseCreate = z.infer<typeof courseCreateSchema>;
export type CourseUpdate = z.infer<typeof courseUpdateSchema>;
export type CourseWithProgram = z.infer<typeof courseWithProgramSchema>;