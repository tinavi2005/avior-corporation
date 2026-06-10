import { Elysia } from 'elysia';
import type { App } from '../app';

export const healthRoutes = new Elysia()
  .get('/health', () => ({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
  .get('/api/v1/health', () => ({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }));