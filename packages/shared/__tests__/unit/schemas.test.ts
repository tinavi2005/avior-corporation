import { describe, it, expect } from 'vitest'
import {
  userSchema,
  courseSchema,
  enrollmentSchema,
  gradeSchema,
  roleSchema,
  jwtPayloadSchema,
} from '../../src/schemas'
import { RoleType } from '../../src/constants'

describe('User Schema', () => {
  it('valida objeto mínimo válido', () => {
    const validUser = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'student@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: null,
    }

    expect(() => userSchema.parse(validUser)).not.toThrow()
  })

  it('rechaza email sin @', () => {
    const invalidUser = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'invalid-email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => userSchema.parse(invalidUser)).toThrow()
  })

  it('valida UUID válido', () => {
    const validUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'student@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: null,
    }

    expect(() => userSchema.parse(validUser)).not.toThrow()
  })

  it('rechaza string vacío como id', () => {
    const invalidUser = {
      id: '',
      email: 'student@test.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => userSchema.parse(invalidUser)).toThrow()
  })
})

describe('Role Schema', () => {
  it('acepta todos los roles definidos en RoleType', () => {
    const roles = Object.values(RoleType)
    for (const role of roles) {
      expect(() => roleSchema.parse(role)).not.toThrow()
    }
  })

  it('rechaza un rol que no existe en RoleType', () => {
    expect(() => roleSchema.parse('superadmin')).toThrow()
    expect(() => roleSchema.parse('mechanic')).toThrow()
    expect(() => roleSchema.parse('hacker')).toThrow()
  })
})

describe('Course Schema', () => {
  it('valida campo active', () => {
    const validCourse = {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Introducción a la Programación',
      code: 'CS-101',
      credits: 4,
      hoursPerWeek: 6,
      maxStudents: 40,
      teacherId: '00000000-0000-0000-0000-000000000002',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => courseSchema.parse(validCourse)).not.toThrow()
    const parsed = courseSchema.parse(validCourse)
    expect(parsed.active).toBe(true)
  })

  it('rechaza credits > 20', () => {
    const invalidCourse = {
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Introducción a la Programación',
      code: 'CS-101',
      credits: 25,
      hoursPerWeek: 6,
      maxStudents: 40,
      teacherId: '00000000-0000-0000-0000-000000000002',
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => courseSchema.parse(invalidCourse)).toThrow()
  })
})

describe('Enrollment Schema', () => {
  it('valida EnrollmentStatus enum', () => {
    const validEnrollment = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      status: 'active',
      enrolledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => enrollmentSchema.parse(validEnrollment)).not.toThrow()
  })

  it('rechaza status inválido', () => {
    const invalidEnrollment = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      status: 'invalid-status',
      enrolledAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => enrollmentSchema.parse(invalidEnrollment)).toThrow()
  })
})

describe('Grade Schema', () => {
  it('valida score 0-100', () => {
    const validGrade = {
      id: '00000000-0000-0000-0000-000000000001',
      enrollmentId: '00000000-0000-0000-0000-000000000004',
      name: 'Parcial 1',
      weight: 30,
      score: 85,
      gradedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => gradeSchema.parse(validGrade)).not.toThrow()
  })

  it('rechaza score > 100', () => {
    const invalidGrade = {
      id: '00000000-0000-0000-0000-000000000001',
      enrollmentId: '00000000-0000-0000-0000-000000000004',
      name: 'Parcial 1',
      weight: 30,
      score: 150,
      gradedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    expect(() => gradeSchema.parse(invalidGrade)).toThrow()
  })
})

describe('JWT Payload Schema', () => {
  it('acepta role válido (definido en roleSchema)', () => {
    const valid = { sub: 'user-1', exp: 9999999999, role: 'admin' }
    expect(() => jwtPayloadSchema.parse(valid)).not.toThrow()
  })

  it('rechaza role inválido', () => {
    const invalid = { sub: 'user-1', exp: 9999999999, role: 'superadmin' }
    expect(() => jwtPayloadSchema.parse(invalid)).toThrow()
  })
})
