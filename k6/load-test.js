/*
cargar de usuarios virtuales
Test de carga
*/ 

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 100 },   // Ramp up to 100 users
    { duration: '1m', target: 100 },    // Stay at 100 users
    { duration: '30s', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% of requests under 500ms
    errors: ['rate<0.01'],             // Less than 1% error rate
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:5555';

export default function () {
  // Health check
  const healthRes = http.get(`${BASE_URL}/api/v1/health`);
  check(healthRes, {
    'health check status 200': (r) => r.status === 200,
  });
  errorRate.add(healthRes.status !== 200);

  // Get students
  const studentsRes = http.get(`${BASE_URL}/api/v1/students`);
  check(studentsRes, {
    'students list status 200': (r) => r.status === 200,
    'students list is array': (r) => Array.isArray(JSON.parse(r.body)),
  });
  errorRate.add(studentsRes.status !== 200);

  // Get courses
  const coursesRes = http.get(`${BASE_URL}/api/v1/courses`);
  check(coursesRes, {
    'courses list status 200': (r) => r.status === 200,
    'courses list is array': (r) => Array.isArray(JSON.parse(r.body)),
  });
  errorRate.add(coursesRes.status !== 200);

  sleep(1);
}