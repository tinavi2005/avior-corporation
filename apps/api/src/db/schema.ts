import {
  pgTable,
  uuid,
  varchar,
  boolean,
  timestamp,
  integer,
  text,
  jsonb,
  date,
  time,
  unique,
  index,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Note: we use varchar instead of pgEnum to stay compatible with the existing
// remote schema, which was created without native PostgreSQL enums.

// Users
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash'),
  emailVerified: boolean('email_verified').default(false),
  avatarUrl: text('avatar_url'),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Profiles
export const profiles = pgTable('profiles', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  address: text('address'),
  dateOfBirth: date('date_of_birth'),
  gender: varchar('gender', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Roles
export const roles = pgTable('roles', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
  description: text('description'),
  permissions: jsonb('permissions').notNull().default('[]'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// User roles
export const userRoles = pgTable(
  'user_roles',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    roleId: uuid('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueUserRole: unique('unique_user_role').on(table.userId, table.roleId),
  }),
);

// Programs (new)
export const programs = pgTable('programs', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Academic periods
export const academicPeriods = pgTable('academic_periods', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  enrollmentDeadline: date('enrollment_deadline'),
  status: varchar('status', { length: 20 }).default('upcoming').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Teachers
export const teachers = pgTable('teachers', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  employeeCode: varchar('employee_code', { length: 50 }).notNull().unique(),
  specialty: varchar('specialty', { length: 100 }),
  qualification: text('qualification'),
  hireDate: date('hire_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Students
export const students = pgTable('students', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  studentCode: varchar('student_code', { length: 50 }).notNull().unique(),
  emergencyContact: varchar('emergency_contact', { length: 100 }),
  emergencyPhone: varchar('emergency_phone', { length: 20 }),
  bloodType: varchar('blood_type', { length: 10 }),
  allergies: text('allergies'),
  notes: text('notes'),
  programId: uuid('program_id').references(() => programs.id),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Courses
export const courses = pgTable(
  'courses',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    code: varchar('code', { length: 20 }).notNull().unique(),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description'),
    credits: integer('credits').default(1).notNull(),
    hoursPerWeek: integer('hours_per_week').default(1).notNull(),
    maxStudents: integer('max_students').default(50).notNull(),
    teacherId: uuid('teacher_id')
      .notNull()
      .references(() => teachers.id),
    programId: uuid('program_id').references(() => programs.id),
    periodId: uuid('period_id').references(() => academicPeriods.id),
    active: boolean('active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    programIdx: index('idx_courses_program').on(table.programId),
    periodIdx: index('idx_courses_period').on(table.periodId),
  }),
);

// Prerequisites
export const prerequisites = pgTable(
  'prerequisites',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id),
    requiredCourseId: uuid('required_course_id')
      .notNull()
      .references(() => courses.id),
    minGrade: integer('min_grade'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => ({
    uniquePrerequisite: unique('unique_prerequisite').on(
      table.courseId,
      table.requiredCourseId,
    ),
  }),
);

// Modules (new)
export const modules = pgTable(
  'modules',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description'),
    orderIndex: integer('order_index').default(0).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    courseIdx: index('idx_modules_course').on(table.courseId),
  }),
);

// Lessons (new)
export const lessons = pgTable(
  'lessons',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    moduleId: uuid('module_id')
      .notNull()
      .references(() => modules.id),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description'),
    content: text('content'),
    contentType: varchar('content_type', { length: 20 }).default('text'),
    durationMinutes: integer('duration_minutes'),
    orderIndex: integer('order_index').default(0).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    moduleIdx: index('idx_lessons_module').on(table.moduleId),
  }),
);

// Evaluations (new)
export const evaluations = pgTable(
  'evaluations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id),
    moduleId: uuid('module_id').references(() => modules.id),
    name: varchar('name', { length: 200 }).notNull(),
    description: text('description'),
    type: varchar('type', { length: 20 }).notNull(),
    maxScore: integer('max_score').notNull(),
    passingScore: integer('passing_score'),
    weight: integer('weight').notNull().default(100),
    dueDate: timestamp('due_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    courseIdx: index('idx_evaluations_course').on(table.courseId),
    moduleIdx: index('idx_evaluations_module').on(table.moduleId),
  }),
);

// Enrollments
export const enrollments = pgTable(
  'enrollments',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    studentId: uuid('student_id')
      .notNull()
      .references(() => students.id),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id),
    periodId: uuid('period_id').references(() => academicPeriods.id),
    status: varchar('status', { length: 20 }).default('active').notNull(),
    enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
    completedAt: timestamp('completed_at'),
    grade: integer('grade'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    studentIdx: index('idx_enrollments_student').on(table.studentId),
    courseIdx: index('idx_enrollments_course').on(table.courseId),
    periodIdx: index('idx_enrollments_period').on(table.periodId),
  }),
);

// Grades (gradebook partial grades)
export const grades = pgTable(
  'grades',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    enrollmentId: uuid('enrollment_id')
      .notNull()
      .references(() => enrollments.id),
    name: varchar('name', { length: 200 }).notNull(),
    weight: integer('weight').notNull(),
    score: integer('score'),
    gradedAt: timestamp('graded_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    enrollmentIdx: index('idx_grades_enrollment').on(table.enrollmentId),
  }),
);

// Enrollment evaluations (new)
export const enrollmentEvaluations = pgTable(
  'enrollment_evaluations',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    enrollmentId: uuid('enrollment_id')
      .notNull()
      .references(() => enrollments.id),
    evaluationId: uuid('evaluation_id')
      .notNull()
      .references(() => evaluations.id),
    score: integer('score'),
    status: varchar('status', { length: 20 }).default('pending').notNull(),
    submittedAt: timestamp('submitted_at'),
    gradedBy: uuid('graded_by').references(() => users.id),
    gradedAt: timestamp('graded_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueEnrollmentEvaluation: unique('unique_enrollment_evaluation').on(
      table.enrollmentId,
      table.evaluationId,
    ),
  }),
);

// Lesson progress (new)
export const lessonProgress = pgTable(
  'lesson_progress',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    enrollmentId: uuid('enrollment_id')
      .notNull()
      .references(() => enrollments.id),
    lessonId: uuid('lesson_id')
      .notNull()
      .references(() => lessons.id),
    completed: boolean('completed').default(false).notNull(),
    progressPercent: integer('progress_percent').default(0).notNull(),
    completedAt: timestamp('completed_at'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    uniqueEnrollmentLesson: unique('unique_enrollment_lesson').on(
      table.enrollmentId,
      table.lessonId,
    ),
  }),
);

// Attendance
export const attendance = pgTable(
  'attendance',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    enrollmentId: uuid('enrollment_id')
      .notNull()
      .references(() => enrollments.id),
    date: date('date').notNull(),
    status: varchar('status', { length: 20 }).notNull(),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    enrollmentDateIdx: index('idx_attendance_enrollment_date').on(
      table.enrollmentId,
      table.date,
    ),
  }),
);

// Course schedules
export const courseSchedules = pgTable(
  'course_schedules',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    courseId: uuid('course_id')
      .notNull()
      .references(() => courses.id),
    periodId: uuid('period_id').references(() => academicPeriods.id),
    dayOfWeek: integer('day_of_week').notNull(),
    startTime: time('start_time').notNull(),
    endTime: time('end_time').notNull(),
    room: varchar('room', { length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => ({
    courseIdx: index('idx_course_schedules_course').on(table.courseId),
    periodIdx: index('idx_course_schedules_period').on(table.periodId),
  }),
);

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  student: one(students, { fields: [users.id], references: [students.userId] }),
  teacher: one(teachers, { fields: [users.id], references: [teachers.userId] }),
  userRoles: many(userRoles),
  gradedEvaluations: many(enrollmentEvaluations, {
    relationName: 'gradedBy',
  }),
}));

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, { fields: [userRoles.userId], references: [users.id] }),
  role: one(roles, { fields: [userRoles.roleId], references: [roles.id] }),
}));

export const programsRelations = relations(programs, ({ many }) => ({
  students: many(students),
  courses: many(courses),
}));

export const academicPeriodsRelations = relations(academicPeriods, ({ many }) => ({
  courses: many(courses),
  enrollments: many(enrollments),
  courseSchedules: many(courseSchedules),
}));

export const teachersRelations = relations(teachers, ({ one, many }) => ({
  user: one(users, { fields: [teachers.userId], references: [users.id] }),
  courses: many(courses),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  user: one(users, { fields: [students.userId], references: [users.id] }),
  program: one(programs, {
    fields: [students.programId],
    references: [programs.id],
  }),
  enrollments: many(enrollments),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  teacher: one(teachers, {
    fields: [courses.teacherId],
    references: [teachers.id],
  }),
  program: one(programs, {
    fields: [courses.programId],
    references: [programs.id],
  }),
  period: one(academicPeriods, {
    fields: [courses.periodId],
    references: [academicPeriods.id],
  }),
  enrollments: many(enrollments),
  modules: many(modules),
  evaluations: many(evaluations),
  prerequisites: many(prerequisites, {
    relationName: 'coursePrerequisites',
  }),
  requiredFor: many(prerequisites, {
    relationName: 'requiredCourse',
  }),
  schedules: many(courseSchedules),
}));

export const prerequisitesRelations = relations(prerequisites, ({ one }) => ({
  course: one(courses, {
    fields: [prerequisites.courseId],
    references: [courses.id],
    relationName: 'coursePrerequisites',
  }),
  requiredCourse: one(courses, {
    fields: [prerequisites.requiredCourseId],
    references: [courses.id],
    relationName: 'requiredCourse',
  }),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  lessons: many(lessons),
  evaluations: many(evaluations),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
  progress: many(lessonProgress),
}));

export const evaluationsRelations = relations(evaluations, ({ one, many }) => ({
  course: one(courses, {
    fields: [evaluations.courseId],
    references: [courses.id],
  }),
  module: one(modules, {
    fields: [evaluations.moduleId],
    references: [modules.id],
  }),
  enrollmentEvaluations: many(enrollmentEvaluations),
}));

export const enrollmentsRelations = relations(enrollments, ({ one, many }) => ({
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
  period: one(academicPeriods, {
    fields: [enrollments.periodId],
    references: [academicPeriods.id],
  }),
  grades: many(grades),
  attendance: many(attendance),
  lessonProgress: many(lessonProgress),
  enrollmentEvaluations: many(enrollmentEvaluations),
}));

export const gradesRelations = relations(grades, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [grades.enrollmentId],
    references: [enrollments.id],
  }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [attendance.enrollmentId],
    references: [enrollments.id],
  }),
}));

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  enrollment: one(enrollments, {
    fields: [lessonProgress.enrollmentId],
    references: [enrollments.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

export const enrollmentEvaluationsRelations = relations(
  enrollmentEvaluations,
  ({ one }) => ({
    enrollment: one(enrollments, {
      fields: [enrollmentEvaluations.enrollmentId],
      references: [enrollments.id],
    }),
    evaluation: one(evaluations, {
      fields: [enrollmentEvaluations.evaluationId],
      references: [evaluations.id],
    }),
    gradedByUser: one(users, {
      fields: [enrollmentEvaluations.gradedBy],
      references: [users.id],
    }),
  }),
);

export const courseSchedulesRelations = relations(courseSchedules, ({ one }) => ({
  course: one(courses, {
    fields: [courseSchedules.courseId],
    references: [courses.id],
  }),
  period: one(academicPeriods, {
    fields: [courseSchedules.periodId],
    references: [academicPeriods.id],
  }),
}));

// Inferred types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;
export type UserRole = typeof userRoles.$inferSelect;
export type NewUserRole = typeof userRoles.$inferInsert;
export type Program = typeof programs.$inferSelect;
export type NewProgram = typeof programs.$inferInsert;
export type AcademicPeriod = typeof academicPeriods.$inferSelect;
export type NewAcademicPeriod = typeof academicPeriods.$inferInsert;
export type Teacher = typeof teachers.$inferSelect;
export type NewTeacher = typeof teachers.$inferInsert;
export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type Prerequisite = typeof prerequisites.$inferSelect;
export type NewPrerequisite = typeof prerequisites.$inferInsert;
export type Module = typeof modules.$inferSelect;
export type NewModule = typeof modules.$inferInsert;
export type Lesson = typeof lessons.$inferSelect;
export type NewLesson = typeof lessons.$inferInsert;
export type Evaluation = typeof evaluations.$inferSelect;
export type NewEvaluation = typeof evaluations.$inferInsert;
export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;
export type Grade = typeof grades.$inferSelect;
export type NewGrade = typeof grades.$inferInsert;
export type EnrollmentEvaluation = typeof enrollmentEvaluations.$inferSelect;
export type NewEnrollmentEvaluation = typeof enrollmentEvaluations.$inferInsert;
export type LessonProgress = typeof lessonProgress.$inferSelect;
export type NewLessonProgress = typeof lessonProgress.$inferInsert;
export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
export type CourseSchedule = typeof courseSchedules.$inferSelect;
export type NewCourseSchedule = typeof courseSchedules.$inferInsert;
