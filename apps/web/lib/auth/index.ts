export type RoleType = 'admin' | 'instructor' | 'student' | 'coordinator' | 'secretary' | 'mechanic'

export const ROLE_PERMISSIONS: Record<RoleType, string[]> = {
  admin: ['*'],
  coordinator: ['manage_courses', 'manage_schedules', 'view_reports'],
  instructor: ['manage_attendance', 'manage_grades', 'create_tasks', 'create_exams'],
  secretary: ['manage_enrollments', 'view_students'],
  student: ['view_grades', 'view_schedule', 'submit_tasks'],
  mechanic: ['view_schedule'],
}

export interface User {
  id: string
  email: string
  role: RoleType
  profile?: {
    firstName: string
    lastName: string
    avatarUrl?: string
  }
}

export interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false
  const userPermissions = ROLE_PERMISSIONS[user.role] || []
  return userPermissions.includes('*') || userPermissions.includes(permission)
}

export function signOut(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user')
  }
}
