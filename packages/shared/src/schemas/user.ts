import { z } from 'zod';
import { RoleType } from '../constants/roles';

export const roleSchema = z.enum(Object.values(RoleType) as [string, ...string[]]);

export const profileSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  phone: z.string().max(20).optional(),
  address: z.string().max(500).optional(),
  dateOfBirth: z.coerce.date().optional(),
  gender: z.string().max(20).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  emailVerified: z.boolean().optional(),
  avatarUrl: z.string().url().optional(),
  lastLoginAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  profile: profileSchema.nullable(),
});

export const userCreateSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
});

export const userUpdateSchema = userSchema
  .pick({
    email: true,
  })
  .partial();

export const userWithRoleSchema = userSchema.extend({
  role: roleSchema,
});

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserUpdate = z.infer<typeof userUpdateSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Role = z.infer<typeof roleSchema>;
export type UserWithRole = z.infer<typeof userWithRoleSchema>;
