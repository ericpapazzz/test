# SWE TEST LKMX 

### Stack Tecnológico

**Frontend:**
- **Next.js 14** - Framework de React para el frontend
- **React 18** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario

**Backend:**
- **Express.js** - Framework web para Node.js
- **TypeScript** - Tipado estático
- **Sequelize** - ORM para PostgreSQL
- **PostgreSQL** - Base de datos relacional

**Testing:**
- **Jest** - Framework de testing
- **Supertest** - Testing de APIs HTTP

**DevOps:**
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

### Estructura del Proyecto

```
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── data/
│   │   ├── controllers/        # Controladores de la API
│   │   ├── models/            # Modelos de Sequelize
│   │   ├── repositories/      # Capa de acceso a datos
│   │   └── routes/            # Rutas de Express
│   ├── server/
│   │   └── config/            # Configuración de base de datos
│   ├── __tests__/             # Tests unitarios e integración
│   └── index.ts               # Punto de entrada del servidor
├── docker-compose.yml         # Configuración de Docker
├── Dockerfile                 # Imagen de Docker
├── jest.config.js            # Configuración de Jest
└── package.json              # Dependencias y scripts
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **PostgreSQL** (si ejecutas localmente sin Docker)
- **Docker** y **Docker Compose** (Para desarrollo con contenedores)

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd SoftwareEngineerTestLKMX
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# PostgreSQL Configuration
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=swetest
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_password_aqui

# API Configuration
API_PORT=8000

# Next.js Configuration
NEXTJS_PORT=3000
```

### 4. Configurar Base de Datos

#### Opción A: Con Docker

```bash
# Iniciar servicios con Docker Compose
docker-compose up -d

# Verificar que los contenedores estén corriendo
docker-compose ps
```

#### Opción B: PostgreSQL Local

1. Instala PostgreSQL en tu sistema
2. Crea una base de datos llamada `swetest`
3. Asegúrate de que las credenciales en `.env` coincidan con tu configuración local

## 🏃‍♂️ Ejecutar el Proyecto

### Desarrollo Local

#### Ejecutar Frontend y Backend Simultáneamente

```bash
npm run dev
```

Esto iniciará:
- **Frontend (Next.js)**: http://localhost:3000
- **Backend (Express)**: http://localhost:8000

#### Ejecutar Solo el Backend

```bash
npm run api:dev
```

#### Ejecutar Solo el Frontend

```bash
npm run next:dev
```

### Producción

#### Construir la Aplicación

```bash
npm run build
```

#### Ejecutar en Producción

```bash
npm start
```

### Con Docker

```bash
# Construir e iniciar todos los servicios
docker-compose up --build

# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con cobertura
npm run test:coverage
```

### Estructura de Tests

Los tests están organizados en:
- **Tests Unitarios**: Para funciones y métodos individuales
- **Tests de Integración**: Para endpoints de la API
- **Tests de Base de Datos**: Para operaciones de datos

### Ejemplo de Test

```typescript
// src/__tests__/userGetEndpoint.test.ts
describe('GET /api/users Endpoint', () => {
  it('should return all users successfully', async () => {
    const response = await request(app)
      .get('/api/users')
      .expect(200);
    
    expect(response.body.status).toBe('OK');
  });
});
```

## 📡 API Endpoints

### Health Check
- `GET /api/health` - Verificar conexion con la api

### Usuarios
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/userById/:id` - Obtener usuario por ID
- `POST /api/createUser` - Crear nuevo usuario
- `PUT /api/updateUser/:id` - Actualizar usuario
- `DELETE /api/deleteUser/:id` - Eliminar usuario

### Analytics
- `GET /api/analytics` - Obtener datos analíticos de usuarios

## 🏗️ Patrones de Arquitectura

### Capa de Datos
- **Repository Pattern**: Abstracción del acceso a datos
- **Sequelize ORM**: Mapeo objeto-relacional
- **Migrations**: Control de versiones de base de datos

### Capa de Negocio
- **Controller Pattern**: Manejo de requests HTTP
- **Service Layer**: Lógica de negocio (futuro)
- **DTOs**: Transferencia de datos tipada

### Capa de Presentación
- **RESTful API**: Endpoints REST estándar
- **CORS**: Configurado para desarrollo local
- **Error Handling**: Manejo centralizado de errores

## 🔧 Configuración de Desarrollo

### Scripts Disponibles

```json
{
  "dev": "Ejecutar frontend y backend en desarrollo",
  "api:dev": "Ejecutar solo el backend en desarrollo",
  "next:dev": "Ejecutar solo el frontend en desarrollo",
  "test": "Ejecutar tests",
  "test:watch": "Ejecutar tests en modo watch",
  "test:coverage": "Ejecutar tests con reporte de cobertura",
  "build": "Construir aplicación para producción",
  "start": "Ejecutar aplicación en producción"
}
```

### Configuración de TypeScript

- **tsconfig.json**: Configuración de TypeScript
- **ESM Modules**: Soporte para módulos ES6
- **Path Mapping**: Alias para imports (`@/`)

### Configuración de Jest

- **ts-jest**: Soporte para TypeScript en tests
- **Coverage**: Reportes de cobertura de código
- **Mocking**: Soporte para mocks y stubs

## 🐳 Docker

### Servicios Docker

1. **app**: Aplicación Next.js + Express
2. **postgres**: Base de datos PostgreSQL

### Variables de Entorno en Docker

Las variables de entorno se cargan desde el archivo `.env` y se pasan a los contenedores.

### Comandos Docker Útiles

```bash
# Reconstruir imagen
docker-compose build --no-cache

# Ver logs de un servicio específico
docker-compose logs app

# Ejecutar comandos dentro del contenedor
docker-compose exec app npm test

# Limpiar volúmenes y contenedores
docker-compose down -v
```

## 📊 Monitoreo y Logs

### Logs de Desarrollo

- **Frontend**: Logs en consola del navegador
- **Backend**: Logs en terminal donde ejecutas `npm run api:dev`
- **Docker**: `docker-compose logs -f`

### CORS

Configurado para permitir:
- `http://localhost:3000`
- `http://127.0.0.1:3000`