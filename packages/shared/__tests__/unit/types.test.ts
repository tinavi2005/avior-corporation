import { describe, it, expect } from 'vitest'

import {
  User,
  UserCreate,
  UserUpdate,
  Profile,
  Role,
  Program,
  ProgramCreate,
  ProgramUpdate,
  Course,
  CourseCreate,
  CourseUpdate,
  CourseWithDetails,
  Enrollment,
  EnrollmentStatus,
  EnrollmentWithDetails,
  EnrollmentCreate,
  EnrollmentUpdate,
  Grade,
  GradeCreate,
  GradeStats,
  AuthTokenResponse,
  RefreshTokenRequest,
  RoleType,
  JWTPayload,
} from '@vale-integrador/shared/types'

describe('types subpath export (@vale-integrador/shared/types)', () => {
  it('exports User type', () => {
    const u: User = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'a@b.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      profile: null,
    }
    expect(u.id).toBeDefined()
  })

  it('exports Course type', () => {
    const c: Course = {
      id: '00000000-0000-0000-0000-000000000001',
      code: 'ABC',
      name: 'Test',
      credits: 4,
      hoursPerWeek: 5,
      maxStudents: 30,
      teacherId: '00000000-0000-0000-0000-000000000002',
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    expect(c.active).toBe(true)
  })

  it('exports Enrollment type', () => {
    const e: Enrollment = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      status: 'active',
      enrolledAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    expect(e.status).toBe('active')
  })

  it('exports Grade type', () => {
    const g: Grade = {
      id: '00000000-0000-0000-0000-000000000001',
      enrollmentId: '00000000-0000-0000-0000-000000000004',
      name: 'Parcial 1',
      weight: 30,
      score: 85,
      gradedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    expect(g.score).toBe(85)
  })

  it('exports Role as string literal union type', () => {
    const r: Role = 'student'
    expect(r).toBe('student')
  })

  it('exports Profile type', () => {
    const p: Profile = {
      id: '00000000-0000-0000-0000-000000000001',
      userId: '00000000-0000-0000-0000-000000000001',
      firstName: 'A',
      lastName: 'B',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    expect(p.firstName).toBe('A')
  })

  it('exports JWTPayload type', () => {
    const j: JWTPayload = {
      sub: 'user-1',
      exp: 9999999999,
    }
    expect(j.sub).toBe('user-1')
  })
})
