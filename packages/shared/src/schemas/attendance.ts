import { z } from 'zod';

export const attendanceStatusSchema = z.enum(['present', 'absent', 'late', 'excused']);

export const attendanceSchema = z.object({
  id: z.string().uuid(),
  enrollmentId: z.string().uuid(),
  date: z.coerce.date(),
  status: attendanceStatusSchema,
  notes: z.string().max(500).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const attendanceCreateSchema = attendanceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const attendanceUpdateSchema = attendanceSchema
  .pick({
    status: true,
    notes: true,
  })
  .partial();

export type Attendance = z.infer<typeof attendanceSchema>;
export type AttendanceStatus = z.infer<typeof attendanceStatusSchema>;
export type AttendanceCreate = z.infer<typeof attendanceCreateSchema>;
export type AttendanceUpdate = z.infer<typeof attendanceUpdateSchema>;
