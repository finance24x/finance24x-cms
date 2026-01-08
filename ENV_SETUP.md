# Environment Setup Quick Start

Quick reference for setting up environment files.

## Frontend Environment Files

### Create `.env.development` in `fin24x-frontend/`
```env
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
STRAPI_URL=http://localhost:1337
STRAPI_API_PATH=/api
TRUST_PROXY=false
LOG_LEVEL=debug
```

### Create `.env.test` in `fin24x-frontend/`
```env
NODE_ENV=test
PORT=3001
SITE_URL=http://localhost:3001
STRAPI_URL=http://localhost:1338
STRAPI_API_PATH=/api
TRUST_PROXY=false
LOG_LEVEL=info
```

### Create `.env.production` in `fin24x-frontend/`
```env
NODE_ENV=production
PORT=3000
SITE_URL=https://yourdomain.com
STRAPI_URL=https://api.yourdomain.com
STRAPI_API_PATH=/api
TRUST_PROXY=true
LOG_LEVEL=warn
```

## Backend Environment Files

### Create `.env.development` in `fin24x-backend/server/`
```env
NODE_ENV=development
HOST=0.0.0.0
PORT=1337

APP_KEYS=dev-key-1,dev-key-2,dev-key-3,dev-key-4
API_TOKEN_SALT=dev-api-token-salt
ADMIN_JWT_SECRET=dev-admin-jwt-secret
JWT_SECRET=dev-jwt-secret
TRANSFER_TOKEN_SALT=dev-transfer-token-salt

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

CORS_ORIGIN=http://localhost:3000
ADMIN_URL=/admin
LOG_LEVEL=debug
```

### Create `.env.test` in `fin24x-backend/server/`
```env
NODE_ENV=test
HOST=0.0.0.0
PORT=1338

APP_KEYS=test-key-1,test-key-2,test-key-3,test-key-4
API_TOKEN_SALT=test-api-token-salt
ADMIN_JWT_SECRET=test-admin-jwt-secret
JWT_SECRET=test-jwt-secret
TRANSFER_TOKEN_SALT=test-transfer-token-salt

DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data-test.db

CORS_ORIGIN=http://localhost:3001
ADMIN_URL=/admin
LOG_LEVEL=info
```

### Create `.env.production` in `fin24x-backend/server/`
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generate secure keys: openssl rand -base64 32
APP_KEYS=<generate-4-keys>
API_TOKEN_SALT=<generate-key>
ADMIN_JWT_SECRET=<generate-key>
JWT_SECRET=<generate-key>
TRANSFER_TOKEN_SALT=<generate-key>

DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_prod
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=<secure-password>
DATABASE_SSL=true

CORS_ORIGIN=https://yourdomain.com
ADMIN_URL=/admin
LOG_LEVEL=warn

SESSION_SECURE=true
SESSION_SAME_SITE=strict
```

## Generate Production Keys

```bash
# Generate APP_KEYS (run 4 times, separate by commas)
openssl rand -base64 32

# Generate other secrets
openssl rand -base64 32  # API_TOKEN_SALT
openssl rand -base64 32  # ADMIN_JWT_SECRET
openssl rand -base64 32  # JWT_SECRET
openssl rand -base64 32  # TRANSFER_TOKEN_SALT
```

## Install dotenv (Frontend)

```bash
cd fin24x-frontend
npm install dotenv
```

## Run Commands

### Development
```bash
# Backend
cd fin24x-backend/server && npm run dev

# Frontend
cd fin24x-frontend && npm run dev
```

### Test
```bash
# Backend
cd fin24x-backend/server && npm run test

# Frontend
cd fin24x-frontend && npm run test
```

### Production
```bash
# Backend
cd fin24x-backend/server && npm run build && npm run start:prod

# Frontend
cd fin24x-frontend && npm run start:prod
```
