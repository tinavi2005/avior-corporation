const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5555';

export interface Student {
  id: string;
  email: string;
  role: string;
  isActive: boolean;
  profile: {
    id: string;
    userId: string;
    firstName: string;
    lastName: string;
    documentId: string;
    phone?: string;
    address?: string;
    dateOfBirth?: string;
    avatarUrl?: string;
    licenseNumber?: string;
    licenseExpiry?: string;
    medicalCert?: string;
    medicalExpiry?: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  programId: string;
  name: string;
  code: string;
  description?: string;
  credits: number;
  maxHours?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  period: string;
  status: 'pending' | 'active' | 'completed' | 'withdrawn' | 'failed';
  grade?: number;
  observations?: string;
  enrolledAt: string;
  completedAt?: string;
}

export interface Grade {
  id: string;
  studentId: string;
  courseId: string;
  enrollmentId: string;
  grade: number;
  letterGrade?: string;
  observations?: string;
  gradedBy: string;
  gradedAt: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getAuthHeaders(): Record<string, string> {
    if (typeof document === 'undefined') return {};
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('insforge_access_token='))
      ?.split('=')[1];
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getHealth() {
    return this.fetch<{ status: string; timestamp: string; uptime: number }>('/api/v1/health');
  }

  async getStudents() {
    return this.fetch<Student[]>('/api/v1/students');
  }

  async getStudent(id: string) {
    return this.fetch<Student>(`/api/v1/students/${id}`);
  }

  async getStudentEnrollments(studentId: string) {
    return this.fetch<Enrollment[]>(`/api/v1/students/${studentId}/enrollments`);
  }

  async getStudentGrades(studentId: string) {
    return this.fetch<Grade[]>(`/api/v1/students/${studentId}/grades`);
  }

  async getCourses() {
    return this.fetch<Course[]>('/api/v1/courses');
  }

  async getCourse(id: string) {
    return this.fetch<Course>(`/api/v1/courses/${id}`);
  }
}

export const api = new ApiClient();

export default api;