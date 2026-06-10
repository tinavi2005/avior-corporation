import { api, Student, Enrollment, Grade } from '@/lib/api/client';

export async function getStudentData(studentId: string) {
  const [student, enrollments, grades] = await Promise.all([
    api.getStudent(studentId),
    api.getStudentEnrollments(studentId),
    api.getStudentGrades(studentId),
  ]);

  return { student, enrollments, grades };
}

export async function getCourses() {
  return api.getCourses();
}

export function calculateAverage(grades: Grade[]): number {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((acc, g) => acc + g.grade, 0);
  return sum / grades.length;
}

export function getGradeColor(grade: number | null): string {
  if (grade === null) return 'text-muted-foreground';
  if (grade >= 80) return 'text-green-600';
  if (grade >= 60) return 'text-yellow-600';
  return 'text-red-600';
}

export function getStatusBadgeVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' {
  switch (status) {
    case 'active': return 'success';
    case 'completed': return 'default';
    case 'pending': return 'warning';
    case 'withdrawn': return 'destructive';
    default: return 'secondary';
  }
}

export function getRoleBadgeVariant(role: string): 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' {
  switch (role) {
    case 'admin': return 'destructive';
    case 'coordinator': return 'warning';
    case 'secretary': return 'secondary';
    case 'instructor': return 'default';
    case 'student': return 'success';
    default: return 'outline';
  }
}