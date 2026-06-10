import { z } from 'zod';

export const programSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(20),
  description: z.string().max(1000).optional(),
  duration: z.number().int().min(1).max(60),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const programCreateSchema = programSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const programUpdateSchema = programSchema.pick({
  name: true,
  description: true,
  duration: true,
  isActive: true,
}).partial();

export type Program = z.infer<typeof programSchema>;
export type ProgramCreate = z.infer<typeof programCreateSchema>;
export type ProgramUpdate = z.infer<typeof programUpdateSchema>;