'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/provider'
import { api, type Enrollment, type Grade } from '@/lib/api/client'
import { DashboardHeader } from '../_components/dashboard-header'

export default function StudentDashboardPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [grades, setGrades] = useState<Grade[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, user, router])

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  async function fetchDashboardData() {
    try {
      const studentId = user!.id
      const [enrollmentsData, gradesData, coursesData] = await Promise.all([
        api.getStudentEnrollments(studentId).catch((): Enrollment[] => []),
        api.getStudentGrades(studentId).catch((): Grade[] => []),
        api.getCourses().catch((): any[] => []),
      ])
      setEnrollments(enrollmentsData)
      setGrades(gradesData)
      setCourses(coursesData)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setDataLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
        }}
      >
        <p>Cargando sesión...</p>
      </div>
    )
  }

  if (!user) return null

  const average =
    grades.length > 0
      ? grades.reduce((sum, g) => sum + g.grade, 0) / grades.length
      : 0
  const activeEnrollments = enrollments.filter((e) => e.status === 'active').length

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <DashboardHeader title="Vale Integrador - Estudiante" />

      <main style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            Bienvenido, {user.profile?.firstName || user.email}
          </h2>
          <p style={{ fontSize: '16px', color: '#666' }}>Resumen de tu actividad académica</p>
        </div>

        {dataLoading ? (
          <p>Cargando datos...</p>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px',
                marginBottom: '32px',
              }}
            >
              <div
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: 'white',
                }}
              >
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Cursos Inscritos</p>
                <p style={{ fontSize: '48px', fontWeight: 'bold' }}>{enrollments.length}</p>
                <p style={{ fontSize: '14px', color: '#666' }}>{activeEnrollments} activos</p>
              </div>
              <div
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: 'white',
                }}
              >
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Promedio General</p>
                <p
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: average >= 80 ? '#22c55e' : average >= 60 ? '#eab308' : '#ef4444',
                  }}
                >
                  {average > 0 ? average.toFixed(1) : '--'}
                </p>
                <p style={{ fontSize: '14px', color: '#666' }}>{grades.length} calificaciones</p>
              </div>
              <div
                style={{
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid #e5e5e5',
                  backgroundColor: 'white',
                }}
              >
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>Cursos Disponibles</p>
                <p style={{ fontSize: '48px', fontWeight: 'bold' }}>{courses.length}</p>
              </div>
            </div>

            {enrollments.length > 0 && (
              <div>
                <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Mis Cursos</h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '16px',
                  }}
                >
                  {enrollments.map((enrollment) => {
                    const course = courses.find((c) => c.id === enrollment.courseId)
                    return (
                      <div
                        key={enrollment.id}
                        style={{
                          padding: '20px',
                          borderRadius: '8px',
                          border: '1px solid #e5e5e5',
                          backgroundColor: 'white',
                        }}
                      >
                        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                          {course?.name || 'Curso'}
                        </h4>
                        <p style={{ fontSize: '14px', color: '#666' }}>{course?.code || '--'}</p>
                        <span
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: enrollment.status === 'active' ? '#dcfce7' : '#e0e7ff',
                            color: enrollment.status === 'active' ? '#166534' : '#3730a3',
                          }}
                        >
                          {enrollment.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
