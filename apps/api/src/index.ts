import { app } from './app';

// Explicitly load the API .env file so Bun finds it regardless of cwd.
try {
  const envPath = `${import.meta.dir}/../.env`;
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

const PORT = parseInt(process.env.PORT || '5555', 10);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/swagger`);
});

// Prevent process from exiting
process.stdin.resume();

export default app;