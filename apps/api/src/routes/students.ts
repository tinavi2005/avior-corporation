import { Elysia } from 'elysia';
import { adminClient } from '../lib/insforge';

type InsForgeUser = {
  id: string;
  email: string;
  password_hash: string;
  email_verified: boolean;
  avatar_url: string | null;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
};

type InsForgeProfile = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  gender: string | null;
  created_at: string;
  updated_at: string;
};

type InsForgeRole = {
  id: string;
  name: string;
  description: string | null;
  permissions: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
};

type InsForgeUserRole = {
  id: string;
  user_id: string;
  role_id: string;
  created_at: string;
};

type InsForgeStudent = {
  id: string;
  user_id: string;
  student_number: string | null;
  program_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};

type InsForgeEnrollment = {
  id: string;
  student_id: string;
  course_id: string;
  status: string;
  enrolled_at: string | null;
  completed_at: string | null;
  grade: number | null;
  created_at: string;
  updated_at: string;
};

type InsForgeGrade = {
  id: string;
  student_id: string;
  course_id: string;
  enrollment_id: string;
  grade: number;
  letter_grade: string | null;
  observations: string | null;
  graded_by: string;
  graded_at: string;
  created_at: string;
  updated_at: string;
};

type InsForgeCourse = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  credits: number;
  hours_per_week: number | null;
  max_students: number | null;
  teacher_id: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
  period_id: string | null;
};

function handleError(error: { message: string; code?: string } | null, entity: string) {
  console.error(`InsForge error fetching ${entity}:`, error);
  throw { status: 500, message: `Failed to fetch ${entity}`, code: 'DATABASE_ERROR' };
}

export const studentRoutes = new Elysia({ prefix: '/students' })
  .get('/', async () => {
    const [usersRes, profilesRes, userRolesRes, rolesRes, studentsRes] = await Promise.all([
      adminClient.database.from('users').select('*'),
      adminClient.database.from('profiles').select('*'),
      adminClient.database.from('user_roles').select('*'),
      adminClient.database.from('roles').select('*'),
      adminClient.database.from('students').select('*'),
    ]);

    if (usersRes.error) handleError(usersRes.error, 'users');
    if (profilesRes.error) handleError(profilesRes.error, 'profiles');
    if (userRolesRes.error) handleError(userRolesRes.error, 'user_roles');
    if (rolesRes.error) handleError(rolesRes.error, 'roles');
    if (studentsRes.error) handleError(studentsRes.error, 'students');

    const users = (usersRes.data ?? []) as InsForgeUser[];
    const profiles = (profilesRes.data ?? []) as InsForgeProfile[];
    const userRoles = (userRolesRes.data ?? []) as InsForgeUserRole[];
    const roles = (rolesRes.data ?? []) as InsForgeRole[];
    const students = (studentsRes.data ?? []) as InsForgeStudent[];

    const profilesByUserId = new Map(profiles.map((p) => [p.user_id, p]));
    const roleMap = new Map(roles.map((r) => [r.id, r.name]));
    const studentByUserId = new Map(students.map((s) => [s.user_id, s]));

    const studentUsers = users.filter((u) => {
      const userRole = userRoles.find((ur) => ur.user_id === u.id);
      return userRole ? roleMap.get(userRole.role_id) === 'student' : false;
    });

    return studentUsers.map((u) => {
      const profile = profilesByUserId.get(u.id) ?? null;
      const student = studentByUserId.get(u.id);
      return {
        id: u.id,
        email: u.email,
        role: 'student',
        isActive: student?.status === 'active',
        profile: profile
          ? {
              id: profile.id,
              userId: u.id,
              firstName: profile.first_name,
              lastName: profile.last_name,
              phone: profile.phone ?? undefined,
              address: profile.address ?? undefined,
              dateOfBirth: profile.date_of_birth ?? undefined,
              avatarUrl: u.avatar_url ?? undefined,
              createdAt: profile.created_at,
              updatedAt: profile.updated_at,
            }
          : null,
        createdAt: u.created_at,
        updatedAt: u.updated_at,
      };
    });
  })
  .get('/:id', async ({ params: { id } }) => {
    const [userRes, profilesRes, userRolesRes, rolesRes, studentsRes] = await Promise.all([
      adminClient.database.from('users').select('*').eq('id', id).maybeSingle(),
      adminClient.database.from('profiles').select('*').eq('user_id', id).maybeSingle(),
      adminClient.database.from('user_roles').select('*').eq('user_id', id).maybeSingle(),
      adminClient.database.from('roles').select('*'),
      adminClient.database.from('students').select('*').eq('user_id', id).maybeSingle(),
    ]);

    if (userRes.error) handleError(userRes.error, 'user');
    const user = userRes.data as InsForgeUser | null;
    if (!user) throw { status: 404, message: 'Student not found', code: 'NOT_FOUND' };

    if (profilesRes.error) handleError(profilesRes.error, 'profile');
    if (studentsRes.error) handleError(studentsRes.error, 'student');

    const profile = (profilesRes.data ?? null) as InsForgeProfile | null;
    const student = (studentsRes.data ?? null) as InsForgeStudent | null;

    let roleName = 'student';
    if (!userRolesRes.error && userRolesRes.data) {
      const roles = (rolesRes.data ?? []) as InsForgeRole[];
      const roleMap = new Map(roles.map((r) => [r.id, r.name]));
      roleName = roleMap.get((userRolesRes.data as InsForgeUserRole).role_id) ?? 'student';
    }

    return {
      id: user.id,
      email: user.email,
      role: roleName,
      isActive: student?.status === 'active',
      profile: profile
        ? {
            id: profile.id,
            userId: user.id,
            firstName: profile.first_name,
            lastName: profile.last_name,
            phone: profile.phone ?? undefined,
            address: profile.address ?? undefined,
            dateOfBirth: profile.date_of_birth ?? undefined,
            avatarUrl: user.avatar_url ?? undefined,
            createdAt: profile.created_at,
            updatedAt: profile.updated_at,
          }
        : null,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  })
  .get('/:id/enrollments', async ({ params: { id } }) => {
    const studentRes = await adminClient.database.from('students').select('*').eq('user_id', id).maybeSingle();
    if (studentRes.error) handleError(studentRes.error, 'student');
    const student = studentRes.data as InsForgeStudent | null;
    if (!student) throw { status: 404, message: 'Student not found', code: 'NOT_FOUND' };

    const enrollmentsRes = await adminClient.database.from('enrollments').select('*').eq('student_id', student.id);
    if (enrollmentsRes.error) handleError(enrollmentsRes.error, 'enrollments');
    const enrollments = (enrollmentsRes.data ?? []) as InsForgeEnrollment[];

    return enrollments.map((e) => ({
      id: e.id,
      studentId: e.student_id,
      courseId: e.course_id,
      period: '',
      status: e.status,
      grade: e.grade ?? undefined,
      observations: undefined,
      enrolledAt: e.enrolled_at ?? e.created_at,
      completedAt: e.completed_at ?? undefined,
    }));
  })
  .get('/:id/grades', async ({ params: { id } }) => {
    const studentRes = await adminClient.database.from('students').select('*').eq('user_id', id).maybeSingle();
    if (studentRes.error) handleError(studentRes.error, 'student');
    const student = studentRes.data as InsForgeStudent | null;
    if (!student) throw { status: 404, message: 'Student not found', code: 'NOT_FOUND' };

    const gradesRes = await adminClient.database.from('grades').select('*').eq('student_id', student.id);
    if (gradesRes.error) handleError(gradesRes.error, 'grades');
    const grades = (gradesRes.data ?? []) as InsForgeGrade[];

    return grades.map((g) => ({
      id: g.id,
      studentId: g.student_id,
      courseId: g.course_id,
      enrollmentId: g.enrollment_id,
      grade: Number(g.grade),
      letterGrade: g.letter_grade ?? undefined,
      observations: g.observations ?? undefined,
      gradedBy: g.graded_by,
      gradedAt: g.graded_at,
    }));
  });