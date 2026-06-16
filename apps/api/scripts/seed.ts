import { createAdminClient } from '@insforge/sdk';
import project from '../../../.insforge/project.json';
import { execSync } from 'child_process';
import { resolve } from 'path';

const admin = createAdminClient({
  baseUrl: project.oss_host,
  apiKey: project.api_key,
});

const projectRoot = resolve(import.meta.dir, '../../../');

function dbQuery(sql: string): unknown {
  const result = execSync(
    `npx @insforge/cli db query ${JSON.stringify(sql)} --json`,
    { encoding: 'utf8', cwd: projectRoot },
  );
  return JSON.parse(result);
}

async function createUser(
  email: string,
  firstName: string,
  lastName: string,
  roleName: 'admin' | 'instructor' | 'student',
): Promise<string> {
  const { data: signupData, error: signupError } = await admin.auth.signUp({
    email,
    password: 'Demo1234!',
  });

  if (signupError) {
    throw new Error(`Failed to create user ${email}: ${signupError.message}`);
  }

  const { data: users } = await admin.database.from('users').select('id').eq('email', email);
  const userId = (users?.[0] as { id: string } | undefined)?.id;

  if (!userId) {
    throw new Error(`User ${email} not found after signup`);
  }

  await admin.database
    .from('profiles')
    .update({ first_name: firstName, last_name: lastName })
    .eq('user_id', userId);

  dbQuery(`UPDATE auth.users SET email_verified = true WHERE id = '${userId}'`);
  dbQuery(`UPDATE public.users SET email_verified = true WHERE id = '${userId}'`);

  const { data: roles } = await admin.database.from('roles').select('id').eq('name', roleName);
  const roleId = (roles?.[0] as { id: string } | undefined)?.id;

  if (roleId) {
    await admin.database.from('user_roles').delete().eq('user_id', userId);
    await admin.database.from('user_roles').insert([
      {
        user_id: userId,
        role_id: roleId,
      },
    ]);
  }

  return userId;
}

async function createAcademicPeriods() {
  const { data, error } = await admin.database.from('academic_periods').insert([
    {
      name: '2025 - Semester 1',
      code: '2025-1',
      start_date: '2025-01-15',
      end_date: '2025-06-15',
    },
    {
      name: '2025 - Semester 2',
      code: '2025-2',
      start_date: '2025-07-15',
      end_date: '2025-12-15',
    },
  ]).select();

  if (error) throw new Error(`Failed to create academic periods: ${error.message}`);
  return data as { id: string; code: string }[];
}

async function createPrograms() {
  const { data, error } = await admin.database.from('programs').insert([
    {
      name: 'CCNA - Cisco Certified Network Associate',
      code: 'CCNA',
      description: 'Networking fundamentals, IP connectivity, security fundamentals, and automation.',
      is_active: true,
    },
    {
      name: 'CyberOps Associate',
      code: 'CBROPS',
      description: 'Security operations, monitoring, analysis, and incident response.',
      is_active: true,
    },
    {
      name: 'DevNet Associate',
      code: 'DEVASC',
      description: 'Software development, APIs, automation, and infrastructure as code.',
      is_active: true,
    },
  ]).select();

  if (error) throw new Error(`Failed to create programs: ${error.message}`);
  return data as { id: string; code: string }[];
}

async function createTeacher(userId: string, employeeCode: string, specialty: string) {
  const { data, error } = await admin.database.from('teachers').insert([
    {
      user_id: userId,
      employee_code: employeeCode,
      specialty,
      qualification: 'Cisco Certified Instructor',
      hire_date: '2020-01-10',
    },
  ]).select();

  if (error) throw new Error(`Failed to create teacher: ${error.message}`);
  return (data as { id: string }[])[0].id;
}

async function createStudent(
  userId: string,
  studentCode: string,
  programId: string,
) {
  const { data, error } = await admin.database.from('students').insert([
    {
      user_id: userId,
      student_code: studentCode,
      program_id: programId,
      status: 'active',
      emergency_contact: 'Demo Emergency Contact',
      emergency_phone: '555-0100',
    },
  ]).select();

  if (error) throw new Error(`Failed to create student: ${error.message}`);
  return (data as { id: string }[])[0].id;
}

async function createCourses(
  programIds: { id: string; code: string }[],
  periodIds: { id: string; code: string }[],
  teacherIds: Record<string, string>,
) {
  const ccna = programIds.find((p) => p.code === 'CCNA')!.id;
  const cyber = programIds.find((p) => p.code === 'CBROPS')!.id;
  const devnet = programIds.find((p) => p.code === 'DEVASC')!.id;
  const period1 = periodIds.find((p) => p.code === '2025-1')!.id;

  const { data, error } = await admin.database.from('courses').insert([
    {
      code: 'CCNA-1',
      name: 'Introduction to Networks',
      description: 'Networking basics, OSI/TCP-IP models, IPv4/IPv6 addressing.',
      credits: 4,
      hours_per_week: 6,
      max_students: 30,
      teacher_id: teacherIds.instructor1,
      program_id: ccna,
      period_id: period1,
      active: true,
    },
    {
      code: 'CCNA-2',
      name: 'Switching, Routing and Wireless Essentials',
      description: 'VLANs, inter-VLAN routing, static/dynamic routing, WLANs.',
      credits: 4,
      hours_per_week: 6,
      max_students: 30,
      teacher_id: teacherIds.instructor1,
      program_id: ccna,
      period_id: period1,
      active: true,
    },
    {
      code: 'CBROPS-1',
      name: 'Security Operations Fundamentals',
      description: 'SOC operations, threat intelligence, digital forensics basics.',
      credits: 3,
      hours_per_week: 4,
      max_students: 25,
      teacher_id: teacherIds.instructor2,
      program_id: cyber,
      period_id: period1,
      active: true,
    },
    {
      code: 'DEVASC-1',
      name: 'DevNet Associate Fundamentals',
      description: 'Python, REST APIs, Git, CI/CD, network programmability.',
      credits: 3,
      hours_per_week: 4,
      max_students: 25,
      teacher_id: teacherIds.instructor2,
      program_id: devnet,
      period_id: period1,
      active: true,
    },
  ]).select();

  if (error) throw new Error(`Failed to create courses: ${error.message}`);
  return data as { id: string; code: string }[];
}

async function createModules(courses: { id: string; code: string }[]) {
  const modulesByCourse: Record<
    string,
    { name: string; description: string; order_index: number; is_active: boolean }[]
  > = {
    'CCNA-1': [
      { name: 'Network Fundamentals', description: 'OSI model, cabling, network devices.', order_index: 1, is_active: true },
      { name: 'IPv4 Addressing', description: 'Binary, subnetting, address classes.', order_index: 2, is_active: true },
      { name: 'IPv6 Addressing', description: 'IPv6 formats, addressing types.', order_index: 3, is_active: true },
      { name: 'Transport Layer', description: 'TCP/UDP, ports, sockets.', order_index: 4, is_active: true },
    ],
    'CCNA-2': [
      { name: 'VLANs and Inter-VLAN Routing', description: 'Segmentation and routing between VLANs.', order_index: 1, is_active: true },
      { name: 'STP and EtherChannel', description: 'Spanning Tree and link aggregation.', order_index: 2, is_active: true },
      { name: 'Dynamic Routing', description: 'OSPFv2 and OSPFv3.', order_index: 3, is_active: true },
    ],
    'CBROPS-1': [
      { name: 'The SOC', description: 'Security operations center roles and tools.', order_index: 1, is_active: true },
      { name: 'Threat Intelligence', description: 'IOC, IOA, threat actors.', order_index: 2, is_active: true },
    ],
    'DEVASC-1': [
      { name: 'Python Fundamentals', description: 'Variables, loops, functions, libraries.', order_index: 1, is_active: true },
      { name: 'REST APIs', description: 'HTTP methods, JSON, authentication.', order_index: 2, is_active: true },
    ],
  };

  const inserts: {
    course_id: string;
    name: string;
    description: string;
    order_index: number;
    is_active: boolean;
  }[] = [];

  for (const course of courses) {
    for (const mod of modulesByCourse[course.code] ?? []) {
      inserts.push({ course_id: course.id, ...mod });
    }
  }

  const { data, error } = await admin.database.from('modules').insert(inserts).select();
  if (error) throw new Error(`Failed to create modules: ${error.message}`);
  return data as { id: string; course_id: string; name: string }[];
}

async function createLessons(modules: { id: string; name: string }[]) {
  const contentTypes = ['video', 'reading', 'lab', 'quiz'] as const;
  const inserts: {
    module_id: string;
    name: string;
    content: string;
    content_type: string;
    duration_minutes: number;
    order_index: number;
    is_active: boolean;
  }[] = [];

  for (const mod of modules) {
    for (let i = 1; i <= 3; i++) {
      const contentType = contentTypes[(i - 1) % contentTypes.length];
      inserts.push({
        module_id: mod.id,
        name: `${mod.name} - Lesson ${i}`,
        content: `Content for ${mod.name} - Lesson ${i}.`,
        content_type: contentType,
        duration_minutes: 30 + i * 10,
        order_index: i,
        is_active: true,
      });
    }
  }

  const { data, error } = await admin.database.from('lessons').insert(inserts).select();
  if (error) throw new Error(`Failed to create lessons: ${error.message}`);
  return data as { id: string }[];
}

async function createEvaluations(
  courses: { id: string; code: string }[],
  modules: { id: string; course_id: string; name: string }[],
) {
  const inserts: {
    course_id: string;
    module_id: string | null;
    name: string;
    description: string;
    type: string;
    max_score: number;
    passing_score: number;
    weight: number;
    due_date: string;
  }[] = [];

  for (const course of courses) {
    inserts.push({
      course_id: course.id,
      module_id: null,
      name: `${course.code} Final Exam`,
      description: 'Comprehensive evaluation covering all modules.',
      type: 'exam',
      max_score: 100,
      passing_score: 70,
      weight: 40,
      due_date: '2025-06-10T23:59:00Z',
    });

    const courseModules = modules.filter((m) => m.course_id === course.id);
    for (const mod of courseModules) {
      inserts.push({
        course_id: course.id,
        module_id: mod.id,
        name: `${mod.name} Quiz`,
        description: 'Module assessment.',
        type: 'quiz',
        max_score: 20,
        passing_score: 12,
        weight: 10,
        due_date: '2025-03-15T23:59:00Z',
      });
    }
  }

  const { data, error } = await admin.database.from('evaluations').insert(inserts).select();
  if (error) throw new Error(`Failed to create evaluations: ${error.message}`);
  return data as { id: string }[];
}

async function createEnrollments(
  courseIds: string[],
  studentIds: string[],
  periodId: string,
) {
  const inserts: {
    student_id: string;
    course_id: string;
    period_id: string;
    status: string;
  }[] = [];

  for (const studentId of studentIds) {
    for (const courseId of courseIds) {
      inserts.push({
        student_id: studentId,
        course_id: courseId,
        period_id: periodId,
        status: 'active',
      });
    }
  }

  const { data, error } = await admin.database.from('enrollments').insert(inserts).select();
  if (error) throw new Error(`Failed to create enrollments: ${error.message}`);
  return data as { id: string; student_id: string; course_id: string }[];
}

async function createGrades(enrollments: { id: string }[]) {
  const inserts: {
    enrollment_id: string;
    name: string;
    weight: number;
    score: number;
  }[] = [];

  for (const enrollment of enrollments) {
    inserts.push(
      { enrollment_id: enrollment.id, name: 'Assignment 1', weight: 15, score: 18 },
      { enrollment_id: enrollment.id, name: 'Assignment 2', weight: 15, score: 16 },
      { enrollment_id: enrollment.id, name: 'Midterm', weight: 30, score: 75 },
    );
  }

  const { data, error } = await admin.database.from('grades').insert(inserts).select();
  if (error) throw new Error(`Failed to create grades: ${error.message}`);
  return data as { id: string }[];
}

async function main() {
  console.log('Creating demo users...');
  const adminId = await createUser('demo.admin@vale.edu', 'Admin', 'Demo', 'admin');
  const instructor1Id = await createUser('demo.instructor1@vale.edu', 'Carlos', 'Mendez', 'instructor');
  const instructor2Id = await createUser('demo.instructor2@vale.edu', 'Ana', 'Rodriguez', 'instructor');
  const student1Id = await createUser('demo.student1@vale.edu', 'Luis', 'Perez', 'student');
  const student2Id = await createUser('demo.student2@vale.edu', 'Maria', 'Garcia', 'student');
  const student3Id = await createUser('demo.student3@vale.edu', 'Jose', 'Lopez', 'student');

  console.log('Creating academic periods and programs...');
  const periods = await createAcademicPeriods();
  const programs = await createPrograms();

  console.log('Creating teachers and students...');
  const teacher1Id = await createTeacher(instructor1Id, 'EMP-001', 'Networking');
  const teacher2Id = await createTeacher(instructor2Id, 'EMP-002', 'Cybersecurity / DevNet');

  const ccnaProgram = programs.find((p) => p.code === 'CCNA')!.id;
  const cyberProgram = programs.find((p) => p.code === 'CBROPS')!.id;
  const devnetProgram = programs.find((p) => p.code === 'DEVASC')!.id;

  const student1DbId = await createStudent(student1Id, 'STU-001', ccnaProgram);
  const student2DbId = await createStudent(student2Id, 'STU-002', cyberProgram);
  const student3DbId = await createStudent(student3Id, 'STU-003', devnetProgram);

  console.log('Creating courses...');
  const courses = await createCourses(programs, periods, {
    instructor1: teacher1Id,
    instructor2: teacher2Id,
  });

  console.log('Creating modules, lessons, evaluations...');
  const modules = await createModules(courses);
  await createLessons(modules);
  await createEvaluations(courses, modules);

  console.log('Creating enrollments and grades...');
  const period1 = periods.find((p) => p.code === '2025-1')!.id;
  const courseIds = courses.map((c) => c.id);
  const enrollments = await createEnrollments(courseIds, [student1DbId, student2DbId, student3DbId], period1);
  await createGrades(enrollments);

  console.log('Seed complete.');
  console.log({
    adminId,
    instructor1Id,
    instructor2Id,
    students: [student1DbId, student2DbId, student3DbId],
    courses: courseIds,
    enrollments: enrollments.length,
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
