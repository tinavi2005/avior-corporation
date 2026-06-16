import { RoleType, ROLE_PERMISSIONS, type RoleType as RoleTypeLiteral } from '@vale-integrador/shared';

export interface User {
  id: string;
  email: string;
  role: RoleTypeLiteral;
  profile?: {
    firstName: string;
    lastName: string;
    avatarUrl?: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false;

  const role = user.role as RoleTypeLiteral;
  if (!Object.values(RoleType).includes(role)) return false;

  const userPermissions = ROLE_PERMISSIONS[role] || [];
  return userPermissions.includes(permission);
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user');
  }
}
