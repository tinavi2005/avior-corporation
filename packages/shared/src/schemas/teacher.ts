import { z } from 'zod';

export const teacherSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  employeeCode: z.string().min(1).max(50),
  specialty: z.string().max(100).optional(),
  qualification: z.string().max(1000).optional(),
  hireDate: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const teacherCreateSchema = teacherSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const teacherUpdateSchema = teacherSchema
  .pick({
    employeeCode: true,
    specialty: true,
    qualification: true,
    hireDate: true,
  })
  .partial();

export const teacherWithUserSchema = teacherSchema.extend({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }).optional(),
  }),
});

export type Teacher = z.infer<typeof teacherSchema>;
export type TeacherCreate = z.infer<typeof teacherCreateSchema>;
export type TeacherUpdate = z.infer<typeof teacherUpdateSchema>;
export type TeacherWithUser = z.infer<typeof teacherWithUserSchema>;
