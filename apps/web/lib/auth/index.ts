export interface User {
  id: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'mechanic' | 'coordinator' | 'secretary';
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

  const permissions: Record<string, string[]> = {
    student: ['profile:read:own', 'enrollments:read:own', 'grades:read:own', 'courses:read:own'],
    instructor: ['profile:read:own', 'courses:read:own', 'grades:read:own', 'grades:write:own'],
    admin: ['*'],
    mechanic: ['profile:read:own', 'aircraft:read:own'],
    coordinator: ['profile:read:own', 'courses:read:all'],
    secretary: ['profile:read:own', 'enrollments:read:all', 'grades:read:all'],
  };

  const userPermissions = permissions[user.role] || [];
  return userPermissions.includes('*') || userPermissions.includes(permission);
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user');
  }
}
