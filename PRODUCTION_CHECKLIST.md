# Production Readiness Checklist

Use this checklist before deploying to production.

## 🔐 Security

- [ ] **Environment Variables**
  - [ ] All `.env.production` files created
  - [ ] Secure keys generated (use `openssl rand -base64 32`)
  - [ ] No hardcoded secrets in code
  - [ ] `.env*` files added to `.gitignore`

- [ ] **Backend Security**
  - [ ] APP_KEYS generated (4 unique keys)
  - [ ] API_TOKEN_SALT generated
  - [ ] ADMIN_JWT_SECRET generated
  - [ ] JWT_SECRET generated
  - [ ] TRANSFER_TOKEN_SALT generated
  - [ ] Database password is strong
  - [ ] CORS_ORIGIN set to production domain only
  - [ ] SESSION_SECURE=true in production
  - [ ] SSL enabled for database connection

- [ ] **Frontend Security**
  - [ ] HTTPS enabled
  - [ ] Security headers configured
  - [ ] TRUST_PROXY=true (if behind reverse proxy)
  - [ ] No API URLs hardcoded

## 🗄️ Database

- [ ] **Production Database**
  - [ ] PostgreSQL/MySQL installed
  - [ ] Database created
  - [ ] User created with proper permissions
  - [ ] SSL connection configured
  - [ ] Backup strategy in place
  - [ ] Connection tested

## 🌐 Infrastructure

- [ ] **Server Setup**
  - [ ] Node.js >= 18.0.0 installed
  - [ ] npm >= 8.0.0 installed
  - [ ] PM2 installed (for process management)
  - [ ] Firewall configured
  - [ ] SSL certificates installed

- [ ] **Reverse Proxy**
  - [ ] Nginx/Apache configured
  - [ ] SSL configured
  - [ ] Gzip compression enabled
  - [ ] Security headers set

## 📦 Deployment

- [ ] **Backend**
  - [ ] Code built (`npm run build`)
  - [ ] Dependencies installed (`npm install --production`)
  - [ ] Environment variables set
  - [ ] Database migrations run
  - [ ] Server starts successfully
  - [ ] Health check endpoint works

- [ ] **Frontend**
  - [ ] Code deployed
  - [ ] Dependencies installed
  - [ ] Environment variables set
  - [ ] Server starts successfully
  - [ ] Static files served correctly

## ✅ Testing

- [ ] **Functionality**
  - [ ] Homepage loads
  - [ ] Articles load correctly
  - [ ] Calculators work
  - [ ] Search works
  - [ ] Navigation works
  - [ ] Forms submit correctly

- [ ] **API Integration**
  - [ ] Frontend can connect to backend
  - [ ] CORS configured correctly
  - [ ] API responses correct
  - [ ] Error handling works

- [ ] **Performance**
  - [ ] Page load times acceptable
  - [ ] Images optimized
  - [ ] Caching configured
  - [ ] Gzip compression working

## 📊 Monitoring

- [ ] **Logging**
  - [ ] Logs configured
  - [ ] Log rotation set up
  - [ ] Error tracking enabled

- [ ] **Monitoring**
  - [ ] Uptime monitoring configured
  - [ ] Performance monitoring set up
  - [ ] Alerting configured

## 🔄 Maintenance

- [ ] **Backups**
  - [ ] Database backup automated
  - [ ] Backup restoration tested
  - [ ] Backup storage secure

- [ ] **Updates**
  - [ ] Dependency update process documented
  - [ ] Security update process in place

## 📝 Documentation

- [ ] **Documentation Updated**
  - [ ] Deployment guide reviewed
  - [ ] Environment setup documented
  - [ ] Troubleshooting guide available
  - [ ] Team members have access

---

## Quick Commands

### Generate Production Keys
```bash
# Generate 4 keys for APP_KEYS
for i in {1..4}; do echo "Key $i: $(openssl rand -base64 32)"; done

# Generate other secrets
echo "API_TOKEN_SALT: $(openssl rand -base64 32)"
echo "ADMIN_JWT_SECRET: $(openssl rand -base64 32)"
echo "JWT_SECRET: $(openssl rand -base64 32)"
echo "TRANSFER_TOKEN_SALT: $(openssl rand -base64 32)"
```

### Test Environment
```bash
# Backend
cd fin24x-backend/server
NODE_ENV=production npm run build
NODE_ENV=production npm start

# Frontend
cd fin24x-frontend
NODE_ENV=production npm start
```

### PM2 Setup
```bash
# Install PM2
npm install -g pm2

# Start applications
pm2 start ecosystem.config.js

# Save configuration
pm2 save
pm2 startup
```

---

**Remember:** Never commit `.env` files to version control!
