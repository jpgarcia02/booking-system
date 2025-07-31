# Sistema de Reservas - Microservicios

Este proyecto implementa un sistema de reservas usando una arquitectura de microservicios con NestJS y PostgreSQL.

## Estructura del Proyecto

- **api-gateway**: Punto de entrada principal
- **user-service**: Microservicio para gestión de usuarios
- **reservation-service**: Microservicio para gestión de reservas

## Configuración de Base de Datos

### Opción 1: Usando Docker (Recomendado)

1. **Iniciar las bases de datos:**
```bash
docker-compose up -d
```

2. **Crear archivos .env:**

Para user-service:
```bash
cp user-service/env.example user-service/.env
```

Para reservation-service:
```bash
cp reservation-service/env.example reservation-service/.env
```

### Opción 2: PostgreSQL Local

1. **Instalar PostgreSQL**
2. **Crear las bases de datos:**
```sql
CREATE DATABASE booking_system_users;
CREATE DATABASE booking_system_reservations;
```

## Instalación y Ejecución

### 1. Instalar dependencias
```bash
# User Service
cd user-service
npm install

# Reservation Service
cd ../reservation-service
npm install

# API Gateway
cd ../api-gateway
npm install
```

### 2. Ejecutar los servicios

**Terminal 1 - User Service:**
```bash
cd user-service
npm run start:dev
```

**Terminal 2 - Reservation Service:**
```bash
cd reservation-service
npm run start:dev
```

**Terminal 3 - API Gateway:**
```bash
cd api-gateway
npm run start:dev
```

## Puertos

- **User Service**: http://localhost:3001
- **Reservation Service**: http://localhost:3002
- **API Gateway**: http://localhost:3000
- **PostgreSQL Users**: localhost:5433
- **PostgreSQL Reservations**: localhost:5434

## Entidades

### User
- id, firstName, lastName, email, password, phone, isActive, createdAt, updatedAt

### Reservation
- id, userId, startDate, endDate, status, notes, createdAt, updatedAt

## Variables de Entorno

### User Service (.env)
```
DB_HOST=localhost
DB_PORT=5433
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=booking_system_users
PORT=3001
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
```

### Reservation Service (.env)
```
DB_HOST=localhost
DB_PORT=5434
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=booking_system_reservations
PORT=3002
NODE_ENV=development
``` 