import { z } from 'zod'

export const jwtPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().optional(),
  role: z.string().optional(),
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