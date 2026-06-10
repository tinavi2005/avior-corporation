import { describe, it, expect } from 'vitest';
import { userSchema, courseSchema, enrollmentSchema, gradeSchema } from '../../../packages/shared/src/schemas';

describe('User Schema', () => {
  it('UC-SHARED-001: studentSchema valida email formato válido', () => {
    const validUser = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'student@test.com',
      role: 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: null,
    };
    
    expect(() => userSchema.parse(validUser)).not.toThrow();
  });

  it('UC-SHARED-002: studentSchema rechaza email sin @', () => {
    const invalidUser = {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'invalid-email',
      role: 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    expect(() => userSchema.parse(invalidUser)).toThrow();
  });

  it('UC-SHARED-003: studentSchema valida UUID válido', () => {
    const validUser = {
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'student@test.com',
      role: 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      profile: null,
    };
    
    expect(() => userSchema.parse(validUser)).not.toThrow();
  });

  it('UC-SHARED-004: studentSchema rechaza string vacío', () => {
    const invalidUser = {
      id: '',
      email: 'student@test.com',
      role: 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    expect(() => userSchema.parse(invalidUser)).toThrow();
  });
});

describe('Course Schema', () => {
  it('UC-SHARED-005: courseSchema valida credits 1-10', () => {
    const validCourse = {
      id: '00000000-0000-0000-0000-000000000001',
      programId: '00000000-0000-0000-0000-000000000002',
      name: 'Vuelo Básico',
      code: 'FB-101',
      credits: 4,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    expect(() => courseSchema.parse(validCourse)).not.toThrow();
  });

  it('UC-SHARED-006: courseSchema rechaza credits > 10', () => {
    const invalidCourse = {
      id: '00000000-0000-0000-0000-000000000001',
      programId: '00000000-0000-0000-0000-000000000002',
      name: 'Vuelo Básico',
      code: 'FB-101',
      credits: 15,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    expect(() => courseSchema.parse(invalidCourse)).toThrow();
  });
});

describe('Enrollment Schema', () => {
  it('UC-SHARED-007: enrollmentSchema valida EnrollmentStatus enum', () => {
    const validEnrollment = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      period: '2024-1',
      status: 'active',
      enrolledAt: new Date().toISOString(),
    };
    
    expect(() => enrollmentSchema.parse(validEnrollment)).not.toThrow();
  });

  it('UC-SHARED-008: enrollmentSchema rechaza status inválido', () => {
    const invalidEnrollment = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      period: '2024-1',
      status: 'invalid-status',
      enrolledAt: new Date().toISOString(),
    };
    
    expect(() => enrollmentSchema.parse(invalidEnrollment)).toThrow();
  });
});

describe('Grade Schema', () => {
  it('UC-SHARED-009: gradeSchema valida score 0-100', () => {
    const validGrade = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      enrollmentId: '00000000-0000-0000-0000-000000000004',
      grade: 85,
      gradedBy: '00000000-0000-0000-0000-000000000005',
      gradedAt: new Date().toISOString(),
    };
    
    expect(() => gradeSchema.parse(validGrade)).not.toThrow();
  });

  it('UC-SHARED-010: gradeSchema rechaza score > 100', () => {
    const invalidGrade = {
      id: '00000000-0000-0000-0000-000000000001',
      studentId: '00000000-0000-0000-0000-000000000002',
      courseId: '00000000-0000-0000-0000-000000000003',
      enrollmentId: '00000000-0000-0000-0000-000000000004',
      grade: 150,
      gradedBy: '00000000-0000-0000-0000-000000000005',
      gradedAt: new Date().toISOString(),
    };
    
    expect(() => gradeSchema.parse(invalidGrade)).toThrow();
  });
});