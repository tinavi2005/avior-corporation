import { describe, it, expect } from 'vitest';
import { createApp } from '../../src/app';

describe('Health Check', () => {
  it('GET / returns API info', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Vale Integrador API');
    expect(body.status).toBe('running');
  });

  it('GET /api/v1/health returns ok status', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/health')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.status).toBe('ok');
  });
});

describe('Student Routes', () => {
  it('GET /api/v1/students returns array', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/students')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it('GET /api/v1/students/:id returns student', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/students/00000000-0000-0000-0000-000000000001')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.id).toBe('00000000-0000-0000-0000-000000000001');
    expect(body.email).toBe('student@test.com');
  });

  it('GET /api/v1/students/:id returns 404 for non-existent', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/students/non-existent-id')
    );
    
    expect(response.status).toBe(404);
  });

  it('GET /api/v1/students/:id/enrollments returns enrollments', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/students/00000000-0000-0000-0000-000000000001/enrollments')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it('GET /api/v1/students/:id/grades returns grades', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/students/00000000-0000-0000-0000-000000000001/grades')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });
});

describe('Course Routes', () => {
  it('GET /api/v1/courses returns array', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/courses')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  it('GET /api/v1/courses/:id returns course', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/courses/00000000-0000-0000-0000-000000000020')
    );
    
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.code).toBe('FB-101');
  });

  it('GET /api/v1/courses/:id returns 404 for non-existent', async () => {
    const app = createApp();
    const response = await app.handle(
      new Request('http://localhost/api/v1/courses/non-existent-id')
    );
    
    expect(response.status).toBe(404);
  });
});