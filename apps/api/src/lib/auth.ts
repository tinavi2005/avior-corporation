import { eq } from 'drizzle-orm';
import { db } from '../db';
import * as schema from '../db/schema';
import { RoleType, hasPermission as sharedHasPermission } from '@vale-integrador/shared';
import type { AuthUser } from './jwt';

export async function getUserRole(userId: string): Promise<RoleType | null> {
  const result = await db
    .select({ roleName: schema.roles.name })
    .from(schema.userRoles)
    .innerJoin(schema.roles, eq(schema.userRoles.roleId, schema.roles.id))
    .where(eq(schema.userRoles.userId, userId))
    .limit(1);

  const roleName = result[0]?.roleName;
  if (!roleName || !Object.values(RoleType).includes(roleName as RoleType)) {
    return null;
  }

  return roleName as RoleType;
}

export async function requirePermission(user: AuthUser | null, permission: string): Promise<RoleType> {
  if (!user) {
    throw new Error('Unauthorized');
  }
  const role = await getUserRole(user.id);
  if (!role) {
    throw new Error('User role not found');
  }

  if (!sharedHasPermission(role, permission)) {
    throw new Error(`Forbidden: missing permission ${permission}`);
  }

  return role;
}

export async function requireAnyRole(user: AuthUser | null, ...allowedRoles: RoleType[]): Promise<RoleType> {
  if (!user) {
    throw new Error('Unauthorized');
  }
  const role = await getUserRole(user.id);
  if (!role) {
    throw new Error('User role not found');
  }

  if (!allowedRoles.includes(role)) {
    throw new Error('Forbidden: insufficient role');
  }

  return role;
}
