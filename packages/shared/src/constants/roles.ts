// User roles enum
export const RoleType = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
  MECHANIC: 'mechanic',
  COORDINATOR: 'coordinator',
  SECRETARY: 'secretary',
} as const;

export type RoleType = (typeof RoleType)[keyof typeof RoleType];

// Enrollment status enum
export const EnrollmentStatus = {
  PENDING: 'pending',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  WITHDRAWN: 'withdrawn',
  FAILED: 'failed',
} as const;

export type EnrollmentStatus = (typeof EnrollmentStatus)[keyof typeof EnrollmentStatus];

// Aircraft status enum (kept for reference)
export const AircraftStatus = {
  AVAILABLE: 'available',
  MAINTENANCE: 'maintenance',
  GROUNDED: 'grounded',
  RETIRED: 'retired',
} as const;

export type AircraftStatus = (typeof AircraftStatus)[keyof typeof AircraftStatus];

// Maintenance status enum (kept for reference)
export const MaintenanceStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type MaintenanceStatus = (typeof MaintenanceStatus)[keyof typeof MaintenanceStatus];

// Maintenance type enum (kept for reference)
export const MaintenanceType = {
  INSPECTION: 'inspection',
  REPAIR: 'repair',
  REPLACEMENT: 'replacement',
  ANNUAL: 'annual',
  HOUR_100: 'hour_100',
} as const;

export type MaintenanceType = (typeof MaintenanceType)[keyof typeof MaintenanceType];

// Permission definitions per role
export const ROLE_PERMISSIONS: Record<RoleType, string[]> = {
  [RoleType.STUDENT]: [
    'profile:read:own',
    'enrollments:read:own',
    'grades:read:own',
    'courses:read:own',
  ],
  [RoleType.INSTRUCTOR]: [
    'profile:read:own',
    'profile:read:students',
    'courses:read:own',
    'courses:read:students',
    'flight-logs:read:own',
    'flight-logs:read:students',
    'flight-logs:write:own',
    'grades:read:own',
    'grades:write:own',
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
    'users:read:all',
    'users:write:all',
  ],
  [RoleType.MECHANIC]: [
    'profile:read:own',
    'aircraft:read:own',
    'aircraft:write:own',
    'maintenance:read:own',
    'maintenance:write:own',
  ],
  [RoleType.COORDINATOR]: [
    'profile:read:own',
    'programs:read:all',
    'programs:write:all',
    'courses:read:all',
    'courses:write:all',
  ],
  [RoleType.SECRETARY]: [
    'profile:read:own',
    'profile:read:students',
    'enrollments:read:all',
    'enrollments:write:all',
    'grades:read:all',
  ],
};

export const ALL_PERMISSIONS = Object.values(ROLE_PERMISSIONS).flat();