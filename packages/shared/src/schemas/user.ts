import { z } from 'zod';

export const roleSchema = z.enum(['student', 'instructor', 'admin', 'mechanic', 'coordinator', 'secretary']);

export const profileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  documentId: z.string().min(1).max(50),
  phone: z.string().max(20).optional(),
  address: z.string().max(255).optional(),
  dateOfBirth: z.coerce.date().optional(),
  avatarUrl: z.string().url().optional(),
  licenseNumber: z.string().max(50).optional(),
  licenseExpiry: z.coerce.date().optional(),
  medicalCert: z.string().max(50).optional(),
  medicalExpiry: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: roleSchema,
  isActive: z.boolean(),
  profile: profileSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  profile: true,
});

export const userUpdateSchema = userSchema.pick({
  role: true,
  isActive: true,
}).partial();

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Role = z.infer<typeof roleSchema>;