# Avior SRL — Guía de Despliegue

## Opciones de despliegue

| Opción | Web | API | Base de datos | Ideal para |
|--------|-----|-----|---------------|------------|
| **Docker Compose** | ✅ | ✅ | ✅ | VPS / servidor propio |
| **Vercel + Railway** | ✅ | ✅ | ✅ | Nube gestionada (recomendado) |
| **Solo dev local** | ✅ | ✅ | local | Desarrollo |

---

## Opción A — Docker Compose (VPS / servidor propio)

### Requisitos
- Docker ≥ 24
- Docker Compose ≥ 2.20
- 1 GB RAM mínimo

### Pasos

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd integrador-vale

# 2. Copiar y configurar variables
cp .env.example .env
# Edita .env con tus claves reales

# 3. Construir y levantar todo
docker compose up --build -d

# 4. Ver logs
docker compose logs -f

# 5. Verificar que todo corre
docker compose ps
```

**URLs disponibles:**
- Web: http://localhost:3000
- API: http://localhost:5555
- API health: http://localhost:5555/health

### Comandos útiles

```bash
# Parar todo
docker compose down

# Parar y borrar volúmenes (⚠️ borra la BD)
docker compose down -v

# Reconstruir solo el web
docker compose up --build web -d

# Ver logs de un servicio
docker compose logs web -f
docker compose logs api -f
```

---

## Opción B — Vercel (web) + Railway (API + BD) — Recomendado

### 1. Base de datos en Railway

1. Ir a [railway.app](https://railway.app) → New Project → PostgreSQL
2. Copiar la `DATABASE_URL` del panel

### 2. API en Railway

1. New Service → GitHub Repo → seleccionar `apps/api`
2. Railway detecta el `Dockerfile` automáticamente
3. Agregar variables de entorno:
   ```
   DATABASE_URL=<la que copiaste>
   INSFORGE_URL=https://z334twfi.us-east.insforge.app
   INSFORGE_API_KEY=<tu clave>
   JWT_SECRET=<cadena aleatoria larga>
   PORT=5555
   ```
4. Copiar la URL pública del API (ej: `https://avior-api.railway.app`)

### 3. Web en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desde la raíz del proyecto
cd apps/web
vercel

# Agregar variables de entorno en el dashboard de Vercel:
```

Variables requeridas en Vercel:
| Variable | Valor |
|----------|-------|
| `NEXT_PUBLIC_INSFORGE_URL` | `https://z334twfi.us-east.insforge.app` |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | tu clave anon de Insforge |
| `NEXT_PUBLIC_API_URL` | URL de tu API en Railway |
| `NEXT_PUBLIC_APP_URL` | URL de tu app en Vercel |
| `INSFORGE_API_KEY` | tu clave de servicio Insforge |

---

## Opción C — Solo el frontend (demostración rápida)

Si solo quieres correr el frontend sin backend:

```bash
cd apps/web
cp .env.example .env.local
# Editar .env.local con tus claves de Insforge

npm install  # o pnpm install
npm run dev  # o pnpm dev
```

Abre http://localhost:3000

Los botones de **demo** (Admin, Instructor, Estudiante) funcionan sin backend
usando `sessionStorage` para simular la sesión.

---

## Variables de entorno explicadas

| Variable | Dónde | Descripción |
|----------|-------|-------------|
| `NEXT_PUBLIC_INSFORGE_URL` | web | URL del servidor Insforge (auth) |
| `NEXT_PUBLIC_INSFORGE_ANON_KEY` | web | Clave pública anónima de Insforge |
| `NEXT_PUBLIC_API_URL` | web | URL del backend API |
| `NEXT_PUBLIC_APP_URL` | web | URL pública del frontend |
| `INSFORGE_API_KEY` | web + api | Clave de servicio Insforge (privada) |
| `DATABASE_URL` | api | Cadena de conexión PostgreSQL |
| `JWT_SECRET` | api | Secreto para firmar JWT |
| `PORT` | api | Puerto del servidor API (default: 5555) |

---

## Obtener claves de Insforge

Insforge es el servicio de autenticación que usa este proyecto.

1. Ir a [insforge.app](https://insforge.app) y crear una cuenta
2. Crear un nuevo proyecto
3. En **Settings → API Keys**:
   - Copiar la `anon key` → `NEXT_PUBLIC_INSFORGE_ANON_KEY`
   - Copiar la `service key` → `INSFORGE_API_KEY`
4. La `INSFORGE_URL` ya está configurada en `.env.example`
