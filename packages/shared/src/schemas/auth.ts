import { z } from 'zod'
import { roleSchema } from './user'

export const jwtPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().optional(),
  role: roleSchema.optional(),
  iat: z.number().optional(),
  exp: z.number(),
})

export const authTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().optional(),
  tokenType: z.string().optional(),
})

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
})

export type AuthTokenResponse = z.infer<typeof authTokenResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
