import { z } from 'zod';

export const courseScheduleSchema = z.object({
  id: z.string().uuid(),
  courseId: z.string().uuid(),
  periodId: z.string().uuid().optional(),
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/),
  room: z.string().max(50).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const courseScheduleCreateSchema = courseScheduleSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const courseScheduleUpdateSchema = courseScheduleSchema
  .pick({
    dayOfWeek: true,
    startTime: true,
    endTime: true,
    room: true,
    periodId: true,
  })
  .partial();

export type CourseSchedule = z.infer<typeof courseScheduleSchema>;
export type CourseScheduleCreate = z.infer<typeof courseScheduleCreateSchema>;
export type CourseScheduleUpdate = z.infer<typeof courseScheduleUpdateSchema>;
