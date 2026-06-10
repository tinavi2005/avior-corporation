# PLAN DE PRUEBAS - CRM ACADÉMICO

## 1. INTRODUCCIÓN

### 1.1 Propósito
Este documento define la estrategia de pruebas para el proyecto **vale-integrador**, un monorepo que incluye:
- **API** (Bun + Elysia + Drizzle) - Backend para mobile
- **Web** (Next.js 15 + @insforge/sdk) - Dashboard multi-rol
- **Mobile** (Expo) - App para estudiantes
- **Shared** (Zod schemas) - Contratos y tipos compartidos

### 1.2 Alcance
Pruebas unitarias, de integración, E2E y no funcionales para todas las aplicaciones del monorepo.

### 1.3 Herramientas
| Tipo | Herramienta |
|------|-------------|
| Unit Tests | Vitest |
| Component Tests | React Testing Library / Expo Testing Library |
| E2E Web | Playwright |
| E2E Mobile | Playwright (Mobile) |
| Load Testing | k6 |
| Coverage | V8 / Istanbul |

---

## 2. TAXONOMÍA DE PRUEBAS

### 2.1 Pruebas Funcionales

| Categoría | Aplicación | Descripción |
|-----------|------------|-------------|
| Unitarias | shared, api, web, mobile | Tests de funciones/componentes individuales |
| Integración | api, web | Tests de interacción entre módulos |
| E2E | web, mobile | Flujos completos de usuario |

### 2.2 Pruebas No Funcionales

| Categoría | Descripción | Métrica |
|-----------|-------------|---------|
| Carga | 100-1000 usuarios concurrentes | API response < 500ms |
| Volumen | Payload hasta 10MB | Sin errores |
| Estrés | 2-10x carga normal | Graceful degradation |
| Recuperación | Failover y restart | < 30s |
| Rendimiento | Latencia p50/p95/p99 | p95 < 200ms |

### 2.3 Tipos de Integración

| Tipo | Descripción |
|------|-------------|
| Ascendente | Bottom-up: shared → api → web/mobile |
| Ad-hoc | Pruebas específicas de feature |
| Esqueleto | Ver que el sistema levanta |
| Salud | Smoke tests de endpoints |
| Humo | Tests críticos básicos |
| Regresión | Suite completa pre-release |

---

## 3. CASOS DE PRUEBA

### 3.1 Unit Tests - shared (16 tests)
- UC-SHARED-001 al 016: Validación de schemas Zod

### 3.2 Unit Tests - api (31 tests)
- UC-API-UNIT-001 al 015: Endpoints y servicios

### 3.3 Unit Tests - web (23 tests)
- UC-WEB-UNIT-001 al 015: Componentes React

### 3.4 Unit Tests - mobile (15 tests)
- UC-MOB-UNIT-001 al 015: Componentes React Native

### 3.5 Integration Tests (60 tests)
- INT-ASC-001 al 015: Integración ascendente
- INT-ADH-001 al 005: Integración ad-hoc
- INT-SKE-001 al 005: Integración de esqueleto
- SAN-001 al 005: Pruebas de sanidad
- SMK-001 al 005: Pruebas de humo
- REG-001 al 015: Pruebas de regresión

### 3.6 E2E Tests (30 tests)
- E2E-WEB-001 al 015: Flujos web con Playwright
- E2E-MOB-001 al 015: Flujos mobile con Playwright

### 3.7 No Funcionales (75 tests)
- LOAD-001 al 015: Pruebas de carga
- VOL-001 al 015: Pruebas de volumen
- STR-001 al 015: Pruebas de estrés
- REC-001 al 015: Pruebas de recuperación
- PERF-001 al 015: Pruebas de rendimiento

---

## 4. CRITERIOS DE ACEPTACIÓN

### Épica 1: Autenticación
- [ ] Login con Google OAuth funcional
- [ ] Control de acceso por roles
- [ ] JWT genera correctamente
- [ ] Logout invalida sesión

### Épica 2: Gestión de Estudiantes
- [ ] Ver perfil completo
- [ ] Ver cursos inscritos
- [ ] Ver calificaciones con promedio

### Épica 3: Gestión de Cursos
- [ ] CRUD de programas
- [ ] CRUD de cursos
- [ ] Soft delete funcional

### Épica 4: Inscripciones
- [ ] Crear inscripción
- [ ] Actualizar estado
- [ ] Sin duplicados

### Épica 5: Flight Logs
- [ ] Ver estudiantes asignados
- [ ] Aprobar/rechazar logs

### Épica 6: Admin
- [ ] Gestión de usuarios
- [ ] Asignación de roles

### Épica 7: API Mobile
- [ ] GET /students/:id
- [ ] GET /students/:id/enrollments
- [ ] GET /students/:id/grades
- [ ] GET /courses

### Épica 8: Sync
- [ ] Cron jobs cada 5 minutos
- [ ] Sin duplicados en sync

### Épica 9: Performance
- [ ] p95 < 200ms
- [ ] 1000 usuarios concurrentes sin 5xx

---

## 5. MATRIZ DE COBERTURA

| App | Paquete | Cobertura Mínima |
|-----|---------|------------------|
| shared | Zod schemas | 90% |
| api | Routes | 80% |
| api | Services | 85% |
| api | Lib | 90% |
| web | Components | 70% |
| web | Hooks/Lib | 80% |
| mobile | Hooks | 75% |
| mobile | Utils | 85% |

---

## 6. ENTORNOS

| Entorno | Uso | Deploy |
|---------|-----|--------|
| dev | Desarrollo local | Manual |
| staging | QA / Pruebas | Auto on PR |
| prod | Producción | Auto on main |

---

## 7. CRONOGRAMA

| Sprint | Semanas | Fases |
|--------|---------|-------|
| 1 | 1-2 | Monorepo + Shared + API Base |
| 2 | 3-4 | API Completa + Cron |
| 3 | 5-6 | Web Multi-rol |
| 4 | 7-8 | Mobile Expo |
| 5 | 9-10 | No Funcionales + Docs |

---

## 8. REPORTES

Los reportes de pruebas se generan en:
- `/packages/shared/coverage/`
- `/apps/api/coverage/`
- `/apps/web/coverage/`
- `/apps/mobile/coverage/`
- `/apps/*/playwright-report/`
- `/docs/testing/REPORTS/`