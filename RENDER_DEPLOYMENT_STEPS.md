# Render Deployment - Step-by-Step Checklist

Follow these steps in order. Check off each item as you complete it.

## 📝 Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub repository is accessible
- [ ] Domain DNS access (where you bought finance24x.com)

---

## Step 1: Create Render Account

- [ ] Go to [render.com](https://render.com)
- [ ] Click "Get Started for Free"
- [ ] Sign up with GitHub (easiest option)
- [ ] Authorize Render to access GitHub

---

## Step 2: Create PostgreSQL Database

- [ ] In Render dashboard, click "New +" → "PostgreSQL"
- [ ] Name: `fin24x-db`
- [ ] Database: `fin24x_prod`
- [ ] Region: Choose closest to you
- [ ] Plan: **Free**
- [ ] Click "Create Database"
- [ ] **WAIT** for database to be created (2-3 minutes)
- [ ] Copy **Internal Database URL** (looks like: `postgresql://user:pass@host:5432/dbname`)
- [ ] Save this URL - you'll need it!

---

## Step 3: Generate Secure Keys

Open terminal and run these commands:

- [ ] Generate APP_KEYS (run 4 times):
  ```bash
  openssl rand -base64 32
  ```
  Copy each result. You'll have 4 keys separated by commas.

- [ ] Generate API_TOKEN_SALT:
  ```bash
  openssl rand -base64 32
  ```

- [ ] Generate ADMIN_JWT_SECRET:
  ```bash
  openssl rand -base64 32
  ```

- [ ] Generate JWT_SECRET:
  ```bash
  openssl rand -base64 32
  ```

- [ ] Generate TRANSFER_TOKEN_SALT:
  ```bash
  openssl rand -base64 32
  ```

**Save all these keys** - you'll paste them into Render!

---

## Step 4: Deploy Backend

- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository: `fin24x`
- [ ] Configure:
  - Name: `fin24x-backend`
  - Region: Same as database
  - Branch: `main`
  - Root Directory: `fin24x-backend/server`
  - Runtime: Node
  - Build Command: `npm install && npm run build`
  - Start Command: `npm start`
  - Plan: **Free**

- [ ] Add Environment Variables (click "Advanced"):
  ```
  NODE_ENV = production
  HOST = 0.0.0.0
  PORT = 1337
  APP_KEYS = <paste-4-keys-separated-by-commas>
  API_TOKEN_SALT = <paste-generated-key>
  ADMIN_JWT_SECRET = <paste-generated-key>
  JWT_SECRET = <paste-generated-key>
  TRANSFER_TOKEN_SALT = <paste-generated-key>
  DATABASE_CLIENT = postgres
  DATABASE_URL = <paste-internal-database-url-from-step-2>
  CORS_ORIGIN = https://finance24x.com
  ADMIN_URL = /admin
  LOG_LEVEL = warn
  ```

- [ ] Click "Create Web Service"
- [ ] **WAIT** for deployment (5-10 minutes)
- [ ] Check logs - should see "Server started"
- [ ] Copy backend URL: `https://fin24x-backend.onrender.com`
- [ ] Test: Visit `https://fin24x-backend.onrender.com/api/header`

---

## Step 5: Deploy Frontend

- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository: `fin24x` (same repo)
- [ ] Configure:
  - Name: `fin24x-frontend`
  - Region: Same as backend
  - Branch: `main`
  - Root Directory: `fin24x-frontend`
  - Runtime: Node
  - Build Command: `npm install`
  - Start Command: `npm start`
  - Plan: **Free**

- [ ] Add Environment Variables:
  ```
  NODE_ENV = production
  PORT = 3000
  SITE_URL = https://finance24x.com
  STRAPI_URL = https://fin24x-backend.onrender.com
  STRAPI_API_PATH = /api
  TRUST_PROXY = true
  LOG_LEVEL = warn
  ```

- [ ] Click "Create Web Service"
- [ ] **WAIT** for deployment (3-5 minutes)
- [ ] Copy frontend URL: `https://fin24x-frontend.onrender.com`
- [ ] Test: Visit the URL - should see your homepage!

---

## Step 6: Connect Domain (finance24x.com)

### 6.1: Configure DNS at Domain Provider

- [ ] Log into your domain registrar (where you bought finance24x.com)
- [ ] Find "DNS Management" or "DNS Settings"
- [ ] Add CNAME record:
  - Type: CNAME
  - Name: `@` (or leave blank)
  - Value: `fin24x-frontend.onrender.com`
  - TTL: 3600

- [ ] Add CNAME record for API:
  - Type: CNAME
  - Name: `api`
  - Value: `fin24x-backend.onrender.com`
  - TTL: 3600

- [ ] Save changes
- [ ] Wait 5-60 minutes for DNS to propagate

### 6.2: Add Custom Domain in Render

**Frontend:**
- [ ] Go to `fin24x-frontend` service
- [ ] Click "Settings" tab
- [ ] Scroll to "Custom Domains"
- [ ] Click "Add Custom Domain"
- [ ] Enter: `finance24x.com`
- [ ] Click "Add"
- [ ] Add: `www.finance24x.com`
- [ ] Render will automatically get SSL certificate (wait 5-10 minutes)

**Backend:**
- [ ] Go to `fin24x-backend` service
- [ ] Click "Settings" tab
- [ ] Scroll to "Custom Domains"
- [ ] Click "Add Custom Domain"
- [ ] Enter: `api.finance24x.com`
- [ ] Click "Add"
- [ ] Wait for SSL certificate

### 6.3: Update Environment Variables

**Frontend:**
- [ ] Go to `fin24x-frontend` → "Environment" tab
- [ ] Update: `STRAPI_URL = https://api.finance24x.com`
- [ ] Click "Save Changes"
- [ ] Service will redeploy automatically

**Backend:**
- [ ] Go to `fin24x-backend` → "Environment" tab
- [ ] Verify: `CORS_ORIGIN = https://finance24x.com`
- [ ] Click "Save Changes"

---

## Step 7: Initial Setup in Strapi Admin

- [ ] Visit: `https://api.finance24x.com/admin` (or `https://fin24x-backend.onrender.com/admin`)
- [ ] Create admin account:
  - First Name: Your name
  - Last Name: Your last name
  - Email: your-email@example.com
  - Password: Strong password
- [ ] Log in to Strapi admin
- [ ] Go to Settings → Roles → Public
- [ ] Enable permissions for:
  - Article: find, findOne
  - Category: find, findOne
  - Calculator: find, findOne
  - Header: find, findOne
  - Footer: find, findOne
  - Tag: find, findOne
  - (Enable all content types you need)
- [ ] Save permissions

---

## Step 8: Test Everything

- [ ] Visit `https://finance24x.com` - homepage loads?
- [ ] Check browser console - any errors?
- [ ] Test article page - loads correctly?
- [ ] Test calculator - works?
- [ ] Test navigation - all links work?
- [ ] Test API: `https://api.finance24x.com/api/header` - returns data?

---

## ✅ Success!

If everything works, congratulations! Your site is live!

---

## 🔄 Making Updates

When you make code changes:

1. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```

2. **Render will automatically redeploy** (watch the logs)

3. **Wait 3-5 minutes** for deployment to complete

---

## 🆘 Common Issues

**Backend won't start:**
- Check logs in Render
- Verify all environment variables are set
- Check DATABASE_URL is correct

**Frontend shows errors:**
- Check browser console
- Verify STRAPI_URL is correct
- Check backend is running

**Domain not working:**
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)
- Verify CNAME records
- Wait up to 48 hours for DNS

---

**Need help? Check the logs in Render dashboard!**
