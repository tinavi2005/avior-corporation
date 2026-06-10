import { app } from './app';

const PORT = parseInt(process.env.PORT || '5555', 10);

app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/swagger`);
});

// Prevent process from exiting
process.stdin.resume();

export default app;