import { createAdminClient } from '@insforge/sdk'

const INSFORGE_URL = process.env.NEXT_PUBLIC_INSFORGE_URL
const INSFORGE_API_KEY = process.env.INSFORGE_API_KEY

function getAdminClient() {
  if (!INSFORGE_URL || !INSFORGE_API_KEY) {
    throw new Error('Missing InsForge admin credentials')
  }
  return createAdminClient({
    baseUrl: INSFORGE_URL,
    apiKey: INSFORGE_API_KEY,
  })
}

export interface PublicUser {
  id: string
  email: string
  role: string
  emailVerified: boolean
  profile?: {
    firstName: string
    lastName: string
    phone?: string | null
    address?: string | null
    gender?: string | null
    dateOfBirth?: string | null
  } | null
  createdAt: string
  updatedAt: string
}

/**
 * Ensures a user from auth.users exists in public.users, public.profiles,
 * and has the default 'student' role assigned.
 */
export async function syncUserFromAuth(authUser: {
  id: string
  email: string
  email_verified?: boolean
  created_at?: string
  profile?: Record<string, unknown> | null
}): Promise<PublicUser | null> {
  const admin = getAdminClient()

  // 1. Check if user already exists in public.users
  const { data: existingUsers, error: selectError } = await admin.database
    .from('users')
    .select('id')
    .eq('id', authUser.id)
    .limit(1)

  if (selectError) {
    console.error('[syncUserFromAuth] select error:', selectError)
    return null
  }

  const exists = existingUsers && existingUsers.length > 0

  if (!exists) {
    // 2. Insert into public.users
    const { error: insertUserError } = await admin.database.from('users').insert({
      id: authUser.id,
      email: authUser.email,
      email_verified: authUser.email_verified ?? false,
      created_at: authUser.created_at ?? new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (insertUserError) {
      console.error('[syncUserFromAuth] insert users error:', insertUserError)
      return null
    }

    // 3. Insert minimal profile
    const profile = authUser.profile ?? {}
    const firstName = String(profile.first_name ?? profile.given_name ?? '')
    const lastName = String(profile.last_name ?? profile.family_name ?? '')

    const { error: insertProfileError } = await admin.database.from('profiles').insert({
      user_id: authUser.id,
      first_name: firstName,
      last_name: lastName,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })

    if (insertProfileError) {
      console.error('[syncUserFromAuth] insert profiles error:', insertProfileError)
      // Continue anyway — the user row is already created
    }

    // 4. Assign default 'student' role
    const { data: roleRows, error: roleError } = await admin.database
      .from('roles')
      .select('id')
      .eq('name', 'student')
      .limit(1)

    if (roleError) {
      console.error('[syncUserFromAuth] select role error:', roleError)
    } else if (roleRows && roleRows.length > 0) {
      const roleId = (roleRows[0] as any).id
      const { error: insertRoleError } = await admin.database.from('user_roles').insert({
        user_id: authUser.id,
        role_id: roleId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

      if (insertRoleError) {
        console.error('[syncUserFromAuth] insert user_roles error:', insertRoleError)
      }
    }
  } else {
    // 5. Keep email in sync for existing users
    const { error: updateError } = await admin.database
      .from('users')
      .update({ email: authUser.email, updated_at: new Date().toISOString() })
      .eq('id', authUser.id)

    if (updateError) {
      console.error('[syncUserFromAuth] update error:', updateError)
    }
  }

  // 6. Return the fully synced user
  return getUserWithRole(authUser.id)
}

/**
 * Fetches a public user with their role by joining public.users, public.profiles,
 * public.user_roles, and public.roles.
 */
export async function getUserWithRole(userId: string): Promise<PublicUser | null> {
  const admin = getAdminClient()

  const { data, error } = await admin.database
    .from('users')
    .select(
      `
      id,
      email,
      email_verified,
      created_at,
      updated_at,
      profiles:profiles(first_name, last_name, phone, address, gender, date_of_birth),
      user_roles!inner(role_id, roles!inner(name))
    `
    )
    .eq('id', userId)
    .limit(1)

  if (error) {
    console.error('[getUserWithRole] error:', error)
    return null
  }

  if (!data || data.length === 0) {
    return null
  }

  const row = data[0] as any
  const profile = row.profiles?.[0] ?? null
  const roleName = row.user_roles?.[0]?.roles?.name ?? 'student'

  return {
    id: row.id,
    email: row.email,
    role: roleName,
    emailVerified: row.email_verified ?? false,
    profile: profile
      ? {
          firstName: profile.first_name ?? '',
          lastName: profile.last_name ?? '',
          phone: profile.phone,
          address: profile.address,
          gender: profile.gender,
          dateOfBirth: profile.date_of_birth,
        }
      : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Assigns a role to a user. Replaces any existing role assignment.
 */
export async function assignRole(userId: string, roleName: string): Promise<boolean> {
  const admin = getAdminClient()

  const { data: roleRows, error: roleError } = await admin.database
    .from('roles')
    .select('id')
    .eq('name', roleName)
    .limit(1)

  if (roleError || !roleRows || roleRows.length === 0) {
    console.error('[assignRole] role not found:', roleError)
    return false
  }

  const roleId = (roleRows[0] as any).id

  // Upsert the user_roles row
  const { error } = await admin.database.from('user_roles').upsert(
    {
      user_id: userId,
      role_id: roleId,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  )

  if (error) {
    console.error('[assignRole] upsert error:', error)
    return false
  }

  return true
}
