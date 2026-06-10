import { createAdminClient } from '@insforge/sdk'

export const adminClient = createAdminClient({
  baseUrl: process.env.INSFORGE_URL || 'https://z334twfi.us-east.insforge.app',
  apiKey: process.env.INSFORGE_API_KEY || 'ik_74b66a3531d3ed52b3f3f9cc7457ffb1',
})