import { z } from 'zod';

export function validateUuid(value: string): string {
  const result = z.string().uuid().safeParse(value);
  if (!result.success) {
    throw new Error('Invalid UUID format');
  }
  return result.data;
}

export function validateBody<T>(schema: z.ZodSchema<T>, body: unknown): T {
  const result = schema.safeParse(body);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new Error(`Validation error: ${issues}`);
  }
  return result.data;
}

export function validateQuery<T extends z.ZodRawShape>(schema: z.ZodObject<T>, query: Record<string, unknown>): z.infer<z.ZodObject<T>> {
  const result = schema.safeParse(query);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join(', ');
    throw new Error(`Validation error: ${issues}`);
  }
  return result.data;
}

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;
