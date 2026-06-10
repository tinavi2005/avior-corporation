# CASOS DE PRUEBA - SHARED

## User Schema Tests

### UC-SHARED-001: Validación de email válido
- **Descripción**: studentSchema valida email formato válido
- **Input**: `{ email: 'student@test.com' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Alta

### UC-SHARED-002: Rechazo de email sin @
- **Descripción**: studentSchema rechaza email sin @
- **Input**: `{ email: 'invalid-email' }`
- **Expected**: Error de validación
- **Tipo**: Unit
- **Prioridad**: Alta

### UC-SHARED-003: Validación de UUID válido
- **Descripción**: studentSchema valida UUID válido
- **Input**: `{ id: '550e8400-e29b-41d4-a716-446655440000' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Alta

### UC-SHARED-004: Rechazo de string vacío
- **Descripción**: studentSchema rechaza string vacío
- **Input**: `{ id: '' }`
- **Expected**: Error de validación
- **Tipo**: Unit
- **Prioridad**: Alta

---

## Course Schema Tests

### UC-SHARED-005: Validación de credits 1-10
- **Descripción**: courseSchema valida credits 1-10
- **Input**: `{ credits: 4 }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Alta

### UC-SHARED-006: Rechazo de credits > 10
- **Descripción**: courseSchema rechaza credits > 10
- **Input**: `{ credits: 15 }`
- **Expected**: Error de validación
- **Tipo**: Unit
- **Prioridad**: Alta

---

## Enrollment Schema Tests

### UC-SHARED-007: Validación de EnrollmentStatus enum
- **Descripción**: enrollmentSchema valida EnrollmentStatus enum
- **Input**: `{ status: 'active' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Alta

### UC-SHARED-008: Rechazo de status inválido
- **Descripción**: enrollmentSchema rechaza status inválido
- **Input**: `{ status: 'invalid-status' }`
- **Expected**: Error de validación
- **Tipo**: Unit
- **Prioridad**: Alta

---

## Grade Schema Tests

### UC-SHARED-009: Validación de score 0-100
- **Descripción**: gradeSchema valida score 0-100
- **Input**: `{ grade: 85 }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Alta

### UC-SHARED-010: Rechazo de score > 100
- **Descripción**: gradeSchema rechaza score > 100
- **Input**: `{ grade: 150 }`
- **Expected**: Error de validación
- **Tipo**: Unit
- **Prioridad**: Alta

---

## Role Schema Tests

### UC-SHARED-011: Validación de roles permitidos
- **Descripción**: roleSchema valida roles permitidos
- **Input**: `{ role: 'student' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Media

### UC-SHARED-012: Rechazo de rol inexistente
- **Descripción**: roleSchema rechaza rol inexistente
- **Input**: `{ role: 'invalid-role' }`
- **Expected**: Error de validación
- **Tipo**: Unit
- **Prioridad**: Media

### UC-SHARED-013: Validación de roles coordinadores
- **Descripción**: roleSchema valida rol coordinator
- **Input**: `{ role: 'coordinator' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Media

### UC-SHARED-014: Validación de roles secretarios
- **Descripción**: roleSchema valida rol secretary
- **Input**: `{ role: 'secretary' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Media

### UC-SHARED-015: Validación de roles instructores
- **Descripción**: roleSchema valida rol instructor
- **Input**: `{ role: 'instructor' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Media

### UC-SHARED-016: Validación de roles admin
- **Descripción**: roleSchema valida rol admin
- **Input**: `{ role: 'admin' }`
- **Expected**: Parse exitoso
- **Tipo**: Unit
- **Prioridad**: Media