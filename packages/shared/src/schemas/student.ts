import { z } from 'zod';

export const studentStatusSchema = z.enum(['active', 'inactive', 'pending', 'graduated']);

export const studentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  studentCode: z.string().min(1).max(50),
  emergencyContact: z.string().max(100).optional(),
  emergencyPhone: z.string().max(20).optional(),
  bloodType: z.string().max(10).optional(),
  allergies: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
  programId: z.string().uuid().optional(),
  status: studentStatusSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const studentCreateSchema = studentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const studentUpdateSchema = studentSchema
  .pick({
    emergencyContact: true,
    emergencyPhone: true,
    bloodType: true,
    allergies: true,
    notes: true,
    programId: true,
    status: true,
  })
  .partial();

export const studentWithUserSchema = studentSchema.extend({
  user: z.object({
    id: z.string().uuid(),
    email: z.string().email(),
    profile: z.object({
      firstName: z.string(),
      lastName: z.string(),
    }).optional(),
  }),
  program: z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
  }).optional(),
});

export type Student = z.infer<typeof studentSchema>;
export type StudentCreate = z.infer<typeof studentCreateSchema>;
export type StudentUpdate = z.infer<typeof studentUpdateSchema>;
export type StudentWithUser = z.infer<typeof studentWithUserSchema>;
export type StudentStatus = z.infer<typeof studentStatusSchema>;
