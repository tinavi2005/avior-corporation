# Environment Variables

This project uses InsForge as the backend. Credentials are read from `.env.local` (web) and `.env` (API). **Never commit these files.**

## Web (`apps/web/.env.local`)

| Variable | Source | Purpose |
|---|---|---|
| `NEXT_PUBLIC_INSFORGE_URL` | InsForge dashboard | Public base URL of the InsForge project |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | InsForge dashboard | Public anon key for browser SDK |
| `NEXT_PUBLIC_API_URL` | Local/dev | URL of the local API (`http://localhost:5555`) |
| `NEXT_PUBLIC_APP_URL` | Local/dev | URL of the web app (`http://localhost:3000`) |
| `INSFORGE_API_KEY` | InsForge dashboard | Server-only service API key |

## API (`apps/api/.env`)

| Variable | Source | Purpose |
|---|---|---|
| `INSFORGE_URL` | InsForge dashboard | Base URL of the InsForge project |
| `INSFORGE_API_KEY` | InsForge dashboard | Server-only service API key |
| `DATABASE_URL` | InsForge dashboard | PostgreSQL connection string |
| `JWT_SECRET` | InsForge dashboard (`secrets get JWT_SECRET`) | Used by the API to verify InsForge access tokens |
| `PORT` | Local/dev | Port the API listens on (`5555`) |

## Rotating keys

If a key is ever exposed in the working tree or committed by mistake:

1. Rotate the key in the InsForge dashboard.
2. Re-run `npx @insforge/cli link --project-id <project-id>` to refresh `.insforge/project.json`.
3. Update all local `.env` / `.env.local` files with the new key.
4. Update deployment environment variables (CI, Vercel, etc.).

## InsForge CLI link

```bash
npx @insforge/cli link --project-id bc30291f-05e9-4172-b3ec-d797ee6695b8
```

## Demo seeders

The API includes a demo seeder that creates sample programs, courses, modules, lessons, evaluations, teachers, students, enrollments and grades in the remote InsForge database.

```bash
pnpm --filter api db:seed
```

Demo accounts created by the seeder:

| Email | Role | Password |
|---|---|---|
| `demo.admin@vale.edu` | admin | `Demo1234!` |
| `demo.instructor1@vale.edu` | instructor | `Demo1234!` |
| `demo.instructor2@vale.edu` | instructor | `Demo1234!` |
| `demo.student1@vale.edu` | student | `Demo1234!` |
| `demo.student2@vale.edu` | student | `Demo1234!` |
| `demo.student3@vale.edu` | student | `Demo1234!` |

The seeder reads the project URL and API key from `.insforge/project.json`.
