// Global test setup
import { beforeAll, afterAll } from 'vitest';

beforeAll(() => {
  // Setup test environment
  process.env.NODE_ENV = 'test';
  process.env.JWT_SECRET = 'test-secret-for-testing-only';
});

afterAll(() => {
  // Cleanup after all tests
});