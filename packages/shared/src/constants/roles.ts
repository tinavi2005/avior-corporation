// User roles enum
export const RoleType = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  COORDINATOR: 'coordinator',
  SECRETARY: 'secretary',
  ADMIN: 'admin',
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

// Permission definitions per role
export const ROLE_PERMISSIONS: Record<RoleType, string[]> = {
  [RoleType.STUDENT]: [
    'profile:read:own',
    'courses:read:own',
    'enrollments:read:own',
    'grades:read:own',
    'progress:read:own',
    'attendance:read:own',
  ],
  [RoleType.INSTRUCTOR]: [
    'profile:read:own',
    'courses:read:own',
    'courses:read:students',
    'grades:write:own',
    'grades:read:own',
    'evaluations:write:own',
    'progress:read:students',
    'attendance:write:own',
    'attendance:read:students',
  ],
  [RoleType.COORDINATOR]: [
    'profile:read:own',
    'programs:read:all',
    'programs:write:all',
    'courses:read:all',
    'courses:write:all',
    'academic-periods:read:all',
    'academic-periods:write:all',
    'evaluations:read:all',
    'teachers:read:all',
  ],
  [RoleType.SECRETARY]: [
    'profile:read:own',
    'profile:read:students',
    'enrollments:read:all',
    'enrollments:write:all',
    'grades:read:all',
    'attendance:read:all',
    'students:read:all',
  ],
  [RoleType.ADMIN]: [
    'profile:read:own',
    'profile:read:all',
    'profile:write:all',
    'enrollments:read:all',
    'enrollments:write:all',
    'grades:read:all',
    'grades:write:all',
    'courses:read:all',
    'courses:write:all',
    'programs:read:all',
    'programs:write:all',
    'users:read:all',
    'users:write:all',
    'teachers:read:all',
    'teachers:write:all',
    'students:read:all',
    'students:write:all',
    'academic-periods:read:all',
    'academic-periods:write:all',
    'evaluations:read:all',
    'evaluations:write:all',
  ],
};

export const ALL_PERMISSIONS = Object.values(ROLE_PERMISSIONS).flat();

export function hasPermission(role: RoleType, permission: string): boolean {
  if (role === RoleType.ADMIN && permission !== 'impossible:permission') {
    // Admin already has explicit permissions, but keep this as a safety net
  }
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
