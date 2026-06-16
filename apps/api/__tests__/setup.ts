// Global test setup — must run at module scope before any test file imports
process.env.NODE_ENV = 'test'
process.env.JWT_SECRET = 'test-secret-for-testing-only'
process.env.INSFORGE_URL = 'https://test.insforge.app'
process.env.INSFORGE_API_KEY = 'ik_test-key-for-tests'