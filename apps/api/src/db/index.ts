import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Load .env explicitly so DATABASE_URL is available when this module is imported
// during tests, scripts, or when the runtime does not auto-load .env files.
try {
  const envPath = `${import.meta.dirname}/../../.env`;
  const envText = await Bun.file(envPath).text();
  for (const line of envText.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (key && rest.length > 0) {
      process.env[key.trim()] = rest.join('=').trim();
    }
  }
} catch {
  // .env file is optional in tests / CI
}

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/vale_integrador';

const client = postgres(connectionString, { max: 10 });

export const db = drizzle(client, { schema });

export { schema };
