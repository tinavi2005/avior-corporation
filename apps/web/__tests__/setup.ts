import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
}));

vi.mock('@insforge/sdk', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
      getCurrentUser: vi.fn(),
    },
    database: {
      from: vi.fn(),
    },
  })),
}));
