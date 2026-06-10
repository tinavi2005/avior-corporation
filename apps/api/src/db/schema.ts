import { pgTable, uuid, varchar, boolean, timestamp, integer, float, text, pgEnum, unique, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleTypeEnum = pgEnum('role_type', ['student', 'instructor', 'admin', 'mechanic', 'coordinator', 'secretary']);
export const enrollmentStatusEnum = pgEnum('enrollment_status', ['pending', 'active', 'completed', 'withdrawn', 'failed']);
export const aircraftStatusEnum = pgEnum('aircraft_status', ['available', 'maintenance', 'grounded', 'retired']);
export const maintenanceStatusEnum = pgEnum('maintenance_status', ['pending', 'in_progress', 'completed', 'cancelled']);
export const maintenanceTypeEnum = pgEnum('maintenance_type', ['inspection', 'repair', 'replacement', 'annual', 'hour_100']);

// Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  password: varchar('password', { length: 255 }),
  role: roleTypeEnum('role').notNull().default('student'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Profiles
export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').unique().notNull().references(() => users.id, { onDelete: 'cascade' }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  documentId: varchar('document_id', { length: 50 }).unique().notNull(),
  phone: varchar('phone', { length: 20 }),
  address: varchar('address', { length: 255 }),
  dateOfBirth: timestamp('date_of_birth'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  licenseNumber: varchar('license_number', { length: 50 }),
  licenseExpiry: timestamp('license_expiry'),
  medicalCert: varchar('medical_cert', { length: 50 }),
  medicalExpiry: timestamp('medical_expiry'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Programs
export const programs = pgTable('programs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 20 }).unique().notNull(),
  description: text('description'),
  duration: integer('duration').default(12).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Courses
export const courses = pgTable('courses', {
  id: uuid('id').defaultRandom().primaryKey(),
  programId: uuid('program_id').notNull().references(() => programs.id),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 20 }).unique().notNull(),
  description: text('description'),
  credits: integer('credits').default(4).notNull(),
  maxHours: integer('max_hours'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  programIdx: index('courses_program_idx').on(table.programId),
}));

// Enrollments
export const enrollments = pgTable('enrollments', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').notNull().references(() => users.id),
  courseId: uuid('course_id').notNull().references(() => courses.id),
  period: varchar('period', { length: 20 }).notNull(),
  status: enrollmentStatusEnum('status').default('pending').notNull(),
  grade: float('grade'),
  observations: text('observations'),
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
}, (table) => ({
  studentIdx: index('enrollments_student_idx').on(table.studentId),
  courseIdx: index('enrollments_course_idx').on(table.courseId),
  periodIdx: index('enrollments_period_idx').on(table.period),
  uniqueEnrollment: unique('unique_enrollment').on(table.studentId, table.courseId, table.period),
}));

// Grades
export const grades = pgTable('grades', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').notNull().references(() => users.id),
  courseId: uuid('course_id').notNull().references(() => courses.id),
  enrollmentId: uuid('enrollment_id').notNull().references(() => enrollments.id),
  grade: float('grade').notNull(),
  letterGrade: varchar('letter_grade', { length: 2 }),
  observations: text('observations'),
  gradedBy: uuid('graded_by').notNull().references(() => users.id),
  gradedAt: timestamp('graded_at').defaultNow().notNull(),
}, (table) => ({
  enrollmentIdx: index('grades_enrollment_idx').on(table.enrollmentId),
}));

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  enrollments: many(enrollments),
  gradesGiven: many(grades),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const programsRelations = relations(programs, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  program: one(programs, { fields: [courses.programId], references: [programs.id] }),
  enrollments: many(enrollments),
  grades: many(grades),
}));

export const enrollmentsRelations = relations(enrollments, ({ one, many }) => ({
  student: one(users, { fields: [enrollments.studentId], references: [users.id] }),
  course: one(courses, { fields: [enrollments.courseId], references: [courses.id] }),
  grades: many(grades),
}));

export const gradesRelations = relations(grades, ({ one }) => ({
  student: one(users, { fields: [grades.studentId], references: [users.id] }),
  course: one(courses, { fields: [grades.courseId], references: [courses.id] }),
  enrollment: one(enrollments, { fields: [grades.enrollmentId], references: [enrollments.id] }),
  gradedByUser: one(users, { fields: [grades.gradedBy], references: [users.id] }),
}));

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;
export type Grade = typeof grades.$inferSelect;
export type NewGrade = typeof grades.$inferInsert;