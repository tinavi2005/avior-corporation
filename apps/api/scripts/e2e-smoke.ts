/*
prueba la integridad del  proyecto antes de llegar a produccion hablando de los modulos principales
*/ 


import { createClient } from '@insforge/sdk';
import project from '../../../.insforge/project.json';

const client = createClient({
  baseUrl: project.oss_host,
  anonKey: project.api_key,
  isServerMode: true,
});

async function smoke(email: string, expectedRole: string) {
  const apiUrl = 'http://localhost:5555';

  const health = await fetch(`${apiUrl}/api/v1/health`);
  console.log(`[${email}] health status:`, health.status);

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password: 'Demo1234!',
  });

  if (error || !data?.accessToken) {
    console.error(`[${email}] login failed:`, error);
    return;
  }

  console.log(`[${email}] login ok`);

  const me = await fetch(`${apiUrl}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${data.accessToken}` },
  });
  const meBody = await me.json();
  console.log(`[${email}] me status:`, me.status, 'role:', meBody?.role);

  const courses = await fetch(`${apiUrl}/api/v1/courses?limit=5`, {
    headers: { Authorization: `Bearer ${data.accessToken}` },
  });
  console.log(`[${email}] courses status:`, courses.status);
}

async function main() {
  await smoke('demo.student1@vale.edu', 'student');
  await smoke('demo.instructor1@vale.edu', 'instructor');
  await smoke('demo.admin@vale.edu', 'admin');
}

main().catch(console.error);
