# Production Deployment Guide

This guide covers setting up separate **Development**, **Test**, and **Production** environments for the Fin24x application.

## 📋 Table of Contents

1. [Environment Setup](#environment-setup)
2. [Backend Configuration](#backend-configuration)
3. [Frontend Configuration](#frontend-configuration)
4. [Database Setup](#database-setup)
5. [Security Checklist](#security-checklist)
6. [Deployment Steps](#deployment-steps)
7. [Environment Variables Reference](#environment-variables-reference)

---

## 🚀 Environment Setup

### Prerequisites

- Node.js >= 18.0.0 (Backend requires >= 20.0.0)
- npm >= 8.0.0
- PostgreSQL or MySQL (for production)
- SSL Certificate (for production HTTPS)

### Project Structure

```
fin24x/
├── fin24x-backend/
│   └── server/
│       ├── .env.development
│       ├── .env.test
│       ├── .env.production
│       └── config/
└── fin24x-frontend/
    ├── .env.development
    ├── .env.test
    ├── .env.production
    └── server.js
```

---

## 🔧 Backend Configuration

### 1. Install Dependencies

```bash
cd fin24x-backend/server
npm install
```

### 2. Create Environment Files

Create three environment files in `fin24x-backend/server/`:

#### `.env.development`
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

#### `.env.test`
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

#### `.env.production`
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Generate secure keys using: openssl rand -base64 32
APP_KEYS=<generate-4-keys-separated-by-commas>
API_TOKEN_SALT=<generate-secure-random-string>
ADMIN_JWT_SECRET=<generate-secure-random-string>
JWT_SECRET=<generate-secure-random-string>
TRANSFER_TOKEN_SALT=<generate-secure-random-string>

# PostgreSQL Configuration
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=strapi_prod
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=<secure-password>
DATABASE_SSL=true
DATABASE_SSL_REJECT_UNAUTHORIZED=true

CORS_ORIGIN=https://yourdomain.com
ADMIN_URL=/admin
LOG_LEVEL=warn

SESSION_SECURE=true
SESSION_SAME_SITE=strict
```

### 3. Generate Secure Keys for Production

```bash
# Generate APP_KEYS (run 4 times)
openssl rand -base64 32

# Generate other secrets
openssl rand -base64 32  # For API_TOKEN_SALT
openssl rand -base64 32  # For ADMIN_JWT_SECRET
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For TRANSFER_TOKEN_SALT
```

### 4. Run Backend

```bash
# Development
npm run dev

# Test
npm run test

# Production
npm run build
npm run start:prod
```

---

## 🎨 Frontend Configuration

### 1. Install Dependencies

```bash
cd fin24x-frontend
npm install
```

### 2. Create Environment Files

Create three environment files in `fin24x-frontend/`:

#### `.env.development`
```env
NODE_ENV=development
PORT=3000
SITE_URL=http://localhost:3000
STRAPI_URL=http://localhost:1337
STRAPI_API_PATH=/api
TRUST_PROXY=false
LOG_LEVEL=debug
```

#### `.env.test`
```env
NODE_ENV=test
PORT=3001
SITE_URL=http://localhost:3001
STRAPI_URL=http://localhost:1338
STRAPI_API_PATH=/api
TRUST_PROXY=false
LOG_LEVEL=info
```

#### `.env.production`
```env
NODE_ENV=production
PORT=3000
SITE_URL=https://yourdomain.com
STRAPI_URL=https://api.yourdomain.com
STRAPI_API_PATH=/api
TRUST_PROXY=true
LOG_LEVEL=warn
```

### 3. Run Frontend

```bash
# Development
npm run dev

# Test
npm run test

# Production
npm run start:prod
```

---

## 🗄️ Database Setup

### Development & Test
- Uses SQLite (no setup required)
- Database files: `.tmp/data.db` (dev) and `.tmp/data-test.db` (test)

### Production

#### PostgreSQL Setup

1. **Install PostgreSQL**
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql
```

2. **Create Database**
```sql
CREATE DATABASE strapi_prod;
CREATE USER strapi_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE strapi_prod TO strapi_user;
```

3. **Update `.env.production`**
```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=strapi_prod
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your_secure_password
DATABASE_SSL=true
```

---

## 🔒 Security Checklist

### Backend Security

- [ ] Generate unique, secure keys for production
- [ ] Use PostgreSQL/MySQL instead of SQLite
- [ ] Enable SSL for database connections
- [ ] Set `SESSION_SECURE=true` in production
- [ ] Configure CORS to only allow your domain
- [ ] Set `LOG_LEVEL=warn` in production
- [ ] Disable admin panel public access (use IP whitelist)
- [ ] Regularly update dependencies
- [ ] Use environment variables, never commit secrets

### Frontend Security

- [ ] Enable HTTPS in production
- [ ] Set security headers (already configured)
- [ ] Use `TRUST_PROXY=true` behind reverse proxy
- [ ] Set `LOG_LEVEL=warn` in production
- [ ] Enable gzip compression (via nginx/apache)
- [ ] Set up CDN for static assets

### General Security

- [ ] Use strong passwords for database
- [ ] Enable firewall rules
- [ ] Set up SSL certificates (Let's Encrypt)
- [ ] Configure backup strategy
- [ ] Set up monitoring and logging
- [ ] Regular security audits

---

## 📦 Deployment Steps

### Option 1: Manual Deployment

#### Backend Deployment

1. **Build Backend**
```bash
cd fin24x-backend/server
npm run build
```

2. **Copy Files to Server**
```bash
scp -r dist/ user@server:/path/to/app/
scp package.json user@server:/path/to/app/
scp .env.production user@server:/path/to/app/.env
```

3. **Install Dependencies on Server**
```bash
ssh user@server
cd /path/to/app
npm install --production
```

4. **Start Backend**
```bash
NODE_ENV=production npm start
```

#### Frontend Deployment

1. **Copy Files to Server**
```bash
scp -r frontend/ user@server:/path/to/frontend/
scp server.js user@server:/path/to/frontend/
scp package.json user@server:/path/to/frontend/
scp .env.production user@server:/path/to/frontend/.env
```

2. **Install Dependencies**
```bash
ssh user@server
cd /path/to/frontend
npm install --production
```

3. **Start Frontend**
```bash
NODE_ENV=production npm start
```

### Option 2: Using PM2 (Recommended)

#### Install PM2
```bash
npm install -g pm2
```

#### Backend PM2 Configuration

Create `fin24x-backend/server/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'fin24x-backend',
    script: 'dist/index.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

#### Frontend PM2 Configuration

Create `fin24x-frontend/ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'fin24x-frontend',
    script: 'server.js',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
```

#### Start with PM2
```bash
# Backend
cd fin24x-backend/server
pm2 start ecosystem.config.js

# Frontend
cd fin24x-frontend
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### Option 3: Docker Deployment

Create `docker-compose.yml` in project root:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: strapi_prod
      POSTGRES_USER: strapi_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./fin24x-backend/server
    ports:
      - "1337:1337"
    environment:
      NODE_ENV: production
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_NAME: strapi_prod
      DATABASE_USERNAME: strapi_user
      DATABASE_PASSWORD: ${DB_PASSWORD}
    depends_on:
      - postgres

  frontend:
    build: ./fin24x-frontend
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      STRAPI_URL: http://backend:1337
    depends_on:
      - backend

volumes:
  postgres_data:
```

---

## 🌐 Reverse Proxy Setup (Nginx)

### Nginx Configuration

Create `/etc/nginx/sites-available/fin24x`:

```nginx
# Frontend
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /path/to/ssl/cert.pem;
    ssl_certificate_key /path/to/ssl/key.pem;

    location / {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/fin24x /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 📝 Environment Variables Reference

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production`, `development`, `test` |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `1337` |
| `APP_KEYS` | Application keys (comma-separated) | `key1,key2,key3,key4` |
| `API_TOKEN_SALT` | API token salt | Random string |
| `ADMIN_JWT_SECRET` | Admin JWT secret | Random string |
| `JWT_SECRET` | JWT secret | Random string |
| `DATABASE_CLIENT` | Database type | `postgres`, `mysql`, `sqlite` |
| `DATABASE_HOST` | Database host | `localhost` |
| `DATABASE_PORT` | Database port | `5432` |
| `DATABASE_NAME` | Database name | `strapi_prod` |
| `DATABASE_USERNAME` | Database user | `strapi_user` |
| `DATABASE_PASSWORD` | Database password | Secure password |
| `DATABASE_SSL` | Enable SSL | `true`, `false` |
| `CORS_ORIGIN` | Allowed origins (comma-separated) | `https://yourdomain.com` |

### Frontend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production`, `development`, `test` |
| `PORT` | Server port | `3000` |
| `SITE_URL` | Frontend URL | `https://yourdomain.com` |
| `STRAPI_URL` | Backend API URL | `https://api.yourdomain.com` |
| `STRAPI_API_PATH` | API path | `/api` |
| `TRUST_PROXY` | Trust proxy headers | `true`, `false` |
| `LOG_LEVEL` | Logging level | `debug`, `info`, `warn`, `error` |

---

## 🔄 Testing Different Environments

### Development
```bash
# Backend
cd fin24x-backend/server
npm run dev

# Frontend (new terminal)
cd fin24x-frontend
npm run dev
```

### Test
```bash
# Backend
cd fin24x-backend/server
npm run test

# Frontend (new terminal)
cd fin24x-frontend
npm run test
```

### Production
```bash
# Backend
cd fin24x-backend/server
npm run build
npm run start:prod

# Frontend (new terminal)
cd fin24x-frontend
npm run start:prod
```

---

## 📊 Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
pm2 status
```

### Health Checks

Backend health endpoint: `http://localhost:1337/api/health`

---

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check `CORS_ORIGIN` in backend `.env`
   - Ensure frontend URL is included

2. **Database Connection Errors**
   - Verify database credentials
   - Check database is running
   - Verify SSL settings

3. **Environment Variables Not Loading**
   - Ensure `.env` file exists
   - Check file naming (`.env.development`, `.env.production`)
   - Verify `NODE_ENV` is set correctly

4. **Port Already in Use**
   - Change `PORT` in `.env` file
   - Kill process: `lsof -ti:PORT | xargs kill`

---

## 📚 Additional Resources

- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

---

## ✅ Pre-Deployment Checklist

- [ ] All environment files created
- [ ] Secure keys generated for production
- [ ] Database configured and tested
- [ ] CORS configured correctly
- [ ] SSL certificates installed
- [ ] Security headers enabled
- [ ] Logging configured
- [ ] Backup strategy in place
- [ ] Monitoring set up
- [ ] Documentation updated

---

**Last Updated:** 2024
