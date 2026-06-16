import { createAdminClient } from '@insforge/sdk'

export function createInsForgeAdminClient(options?: {
  baseUrl?: string
  apiKey?: string
}) {
  const baseUrl = options?.baseUrl ?? process.env.INSFORGE_URL
  const apiKey = options?.apiKey ?? process.env.INSFORGE_API_KEY

  if (!baseUrl) throw new Error('INSFORGE_URL environment variable is required')
  if (!apiKey) throw new Error('INSFORGE_API_KEY environment variable is required')

  return createAdminClient({ baseUrl, apiKey })
}

export const adminClient = createInsForgeAdminClient()