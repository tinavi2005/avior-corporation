import '@testing-library/jest-dom';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/',
}));

// Mock @insforge/sdk
jest.mock('@insforge/sdk', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
      getCurrentUser: jest.fn(),
    },
    database: {
      from: jest.fn(),
    },
  })),
}));