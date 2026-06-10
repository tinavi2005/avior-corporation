import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 100 },   // Normal load
    { duration: '1m', target: 500 },    // Spike to 500
    { duration: '30s', target: 1000 }, // Stress to 1000
    { duration: '1m', target: 1000 },   // Stay at 1000
    { duration: '30s', target: 0 },     // Recovery
  ],
  thresholds: {
    http_req_duration: ['p(99)<1000'],  // 99% under 1s during stress
    errors: ['rate<0.05'],              // Less than 5% error during stress
  },
};

const BASE_URL = __ENV.TARGET_URL || 'http://localhost:5555';

export default function () {
  const endpoints = [
    '/health',
    '/api/v1/students',
    '/api/v1/courses',
    '/api/v1/students/00000000-0000-0000-0000-000000000001',
    '/api/v1/students/00000000-0000-0000-0000-000000000001/enrollments',
    '/api/v1/students/00000000-0000-0000-0000-000000000001/grades',
  ];

  const res = http.get(`${BASE_URL}${endpoints[Math.floor(Math.random() * endpoints.length)]}`);
  
  check(res, {
    'status is 200 or 404': (r) => r.status === 200 || r.status === 404,
  });
  
  errorRate.add(res.status >= 500);
  
  sleep(0.5);
}