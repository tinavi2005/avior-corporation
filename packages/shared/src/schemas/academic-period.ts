import { z } from 'zod';

export const academicPeriodStatusSchema = z.enum(['upcoming', 'active', 'completed']);

export const academicPeriodSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(20),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  enrollmentDeadline: z.coerce.date().optional(),
  status: academicPeriodStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const academicPeriodCreateSchema = academicPeriodSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const academicPeriodUpdateSchema = academicPeriodSchema
  .pick({
    name: true,
    code: true,
    startDate: true,
    endDate: true,
    enrollmentDeadline: true,
    status: true,
  })
  .partial();

export type AcademicPeriod = z.infer<typeof academicPeriodSchema>;
export type AcademicPeriodStatus = z.infer<typeof academicPeriodStatusSchema>;
export type AcademicPeriodCreate = z.infer<typeof academicPeriodCreateSchema>;
export type AcademicPeriodUpdate = z.infer<typeof academicPeriodUpdateSchema>;
