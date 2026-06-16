import { z } from 'zod';

export const courseSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1).max(20),
  name: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
  credits: z.number().int().min(1).max(20),
  hoursPerWeek: z.number().int().min(1).max(40),
  maxStudents: z.number().int().min(1).max(500),
  teacherId: z.string().uuid(),
  programId: z.string().uuid().optional(),
  periodId: z.string().uuid().optional(),
  active: z.boolean(),
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
  hoursPerWeek: true,
  maxStudents: true,
  teacherId: true,
  programId: true,
  periodId: true,
  active: true,
}).partial();

export const courseWithDetailsSchema = courseSchema.extend({
  teacher: z.object({
    id: z.string().uuid(),
    employeeCode: z.string(),
    user: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      profile: z.object({
        firstName: z.string(),
        lastName: z.string(),
      }).optional(),
    }),
  }).optional(),
  program: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
  }).optional(),
  period: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
  }).optional(),
});

export type Course = z.infer<typeof courseSchema>;
export type CourseCreate = z.infer<typeof courseCreateSchema>;
export type CourseUpdate = z.infer<typeof courseUpdateSchema>;
export type CourseWithDetails = z.infer<typeof courseWithDetailsSchema>;
