# Free Deployment Guide for Beginners

This guide will help you deploy your application to **free hosting** using **Render** (recommended) or **Railway**.

## 🎯 Recommended: Render (Easiest for Beginners)

**Why Render?**
- ✅ Free PostgreSQL database
- ✅ Free Node.js hosting
- ✅ Easy setup (no command line needed)
- ✅ Automatic SSL certificates
- ✅ Connects to your domain easily
- ✅ Good documentation

**Free Tier Limits:**
- 750 hours/month (enough for testing)
- PostgreSQL: 1GB storage, 90 days retention
- Apps sleep after 15 minutes of inactivity (wake up on request)

---

## 📋 Prerequisites

1. **GitHub Account** (free) - [github.com](https://github.com)
2. **Render Account** (free) - [render.com](https://render.com)
3. **Domain Name** - finance24x.com (you already have this)

---

## 🚀 Step-by-Step Deployment

### Part 1: Prepare Your Code

#### Step 1.1: Push Code to GitHub

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name: `fin24x`
   - Make it **Private** (recommended)
   - Click "Create repository"

2. **Push your code:**
   ```bash
   cd /Users/ramesh.gupta/Documents/Personal/fin24x
   
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit"
   
   # Add your GitHub repository
   git remote add origin https://github.com/YOUR_USERNAME/fin24x.git
   git branch -M main
   git push -u origin main
   ```

#### Step 1.2: Create Environment Files Template

Create `.env.example` files (these will be committed to GitHub):

**Frontend** (`fin24x-frontend/.env.example`):
```env
NODE_ENV=production
PORT=3000
SITE_URL=https://finance24x.com
STRAPI_URL=https://fin24x-backend.onrender.com
STRAPI_API_PATH=/api
TRUST_PROXY=true
LOG_LEVEL=warn
```

**Backend** (`fin24x-backend/server/.env.example`):
```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

APP_KEYS=CHANGE_ME_KEY_1,CHANGE_ME_KEY_2,CHANGE_ME_KEY_3,CHANGE_ME_KEY_4
API_TOKEN_SALT=CHANGE_ME_API_TOKEN_SALT
ADMIN_JWT_SECRET=CHANGE_ME_ADMIN_JWT_SECRET
JWT_SECRET=CHANGE_ME_JWT_SECRET
TRANSFER_TOKEN_SALT=CHANGE_ME_TRANSFER_TOKEN_SALT

DATABASE_CLIENT=postgres
DATABASE_HOST=CHANGE_ME
DATABASE_PORT=5432
DATABASE_NAME=CHANGE_ME
DATABASE_USERNAME=CHANGE_ME
DATABASE_PASSWORD=CHANGE_ME
DATABASE_SSL=true

CORS_ORIGIN=https://finance24x.com
ADMIN_URL=/admin
LOG_LEVEL=warn
```

---

### Part 2: Deploy PostgreSQL Database

#### Step 2.1: Create PostgreSQL Database on Render

1. **Go to Render Dashboard:**
   - Visit [render.com](https://render.com)
   - Sign up (use GitHub account - easiest)
   - Click "New +" → "PostgreSQL"

2. **Configure Database:**
   - **Name:** `fin24x-db`
   - **Database:** `fin24x_prod`
   - **User:** `fin24x_user` (auto-generated)
   - **Region:** Choose closest to you
   - **PostgreSQL Version:** 15 (latest)
   - **Plan:** Free
   - Click "Create Database"

3. **Save Connection Details:**
   - Wait for database to be created (2-3 minutes)
   - Copy these details (you'll need them):
     - **Internal Database URL** (for backend)
     - **External Database URL** (for local testing)
     - **Host, Port, Database, Username, Password**

---

### Part 3: Deploy Backend (Strapi)

#### Step 3.1: Create Backend Service on Render

1. **Create New Web Service:**
   - In Render dashboard, click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `fin24x` repository

2. **Configure Backend:**
   - **Name:** `fin24x-backend`
   - **Region:** Same as database
   - **Branch:** `main`
   - **Root Directory:** `fin24x-backend/server`
   - **Runtime:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

3. **Environment Variables:**
   Click "Advanced" → "Add Environment Variable" and add:

   ```
   NODE_ENV = production
   HOST = 0.0.0.0
   PORT = 1337
   ```

   **Generate secure keys** (run these commands locally):
   ```bash
   # Generate APP_KEYS (run 4 times, separate by commas)
   openssl rand -base64 32
   openssl rand -base64 32
   openssl rand -base64 32
   openssl rand -base64 32
   
   # Generate other secrets
   openssl rand -base64 32  # API_TOKEN_SALT
   openssl rand -base64 32  # ADMIN_JWT_SECRET
   openssl rand -base64 32  # JWT_SECRET
   openssl rand -base64 32  # TRANSFER_TOKEN_SALT
   ```

   Add these environment variables:
   ```
   APP_KEYS = <paste-4-keys-separated-by-commas>
   API_TOKEN_SALT = <paste-generated-key>
   ADMIN_JWT_SECRET = <paste-generated-key>
   JWT_SECRET = <paste-generated-key>
   TRANSFER_TOKEN_SALT = <paste-generated-key>
   ```

   **Database Variables** (from PostgreSQL you created):
   ```
   DATABASE_CLIENT = postgres
   DATABASE_URL = <paste-internal-database-url-from-render>
   CORS_ORIGIN = https://finance24x.com
   ADMIN_URL = /admin
   LOG_LEVEL = warn
   ```

4. **Click "Create Web Service"**
   - Render will start building and deploying
   - This takes 5-10 minutes
   - Watch the logs for progress

5. **Get Backend URL:**
   - Once deployed, you'll see: `https://fin24x-backend.onrender.com`
   - Copy this URL (you'll need it for frontend)

---

### Part 4: Deploy Frontend

#### Step 4.1: Create Frontend Service on Render

1. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Select same GitHub repository (`fin24x`)

2. **Configure Frontend:**
   - **Name:** `fin24x-frontend`
   - **Region:** Same as backend
   - **Branch:** `main`
   - **Root Directory:** `fin24x-frontend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

3. **Environment Variables:**
   ```
   NODE_ENV = production
   PORT = 3000
   SITE_URL = https://finance24x.com
   STRAPI_URL = https://fin24x-backend.onrender.com
   STRAPI_API_PATH = /api
   TRUST_PROXY = true
   LOG_LEVEL = warn
   ```

4. **Click "Create Web Service"**
   - Wait for deployment (3-5 minutes)

5. **Get Frontend URL:**
   - You'll get: `https://fin24x-frontend.onrender.com`

---

### Part 5: Connect Your Domain

#### Step 5.1: Configure DNS

1. **Get Render URLs:**
   - Frontend: `https://fin24x-frontend.onrender.com`
   - Backend: `https://fin24x-backend.onrender.com`

2. **Go to Your Domain Provider** (where you bought finance24x.com):
   - Log into your domain registrar
   - Find DNS settings / DNS management

3. **Add CNAME Records:**
   - **Type:** CNAME
   - **Name:** `@` (or leave blank for root domain)
   - **Value:** `fin24x-frontend.onrender.com`
   - **TTL:** 3600

   - **Type:** CNAME
   - **Name:** `api` (for api.finance24x.com)
   - **Value:** `fin24x-backend.onrender.com`
   - **TTL:** 3600

4. **Wait for DNS Propagation:**
   - Takes 5 minutes to 48 hours
   - Check: [whatsmydns.net](https://www.whatsmydns.net)

#### Step 5.2: Add Custom Domain in Render

**Frontend:**
1. Go to `fin24x-frontend` service
2. Click "Settings" → "Custom Domains"
3. Add: `finance24x.com` and `www.finance24x.com`
4. Render will provide SSL certificate automatically

**Backend:**
1. Go to `fin24x-backend` service
2. Click "Settings" → "Custom Domains"
3. Add: `api.finance24x.com`
4. Update CORS_ORIGIN to: `https://finance24x.com`

**Update Environment Variables:**
- Frontend: `SITE_URL = https://finance24x.com`
- Frontend: `STRAPI_URL = https://api.finance24x.com`
- Backend: `CORS_ORIGIN = https://finance24x.com`

---

## 🔄 Alternative: Railway (Similar Process)

If Render doesn't work for you, try **Railway**:

1. **Sign up:** [railway.app](https://railway.app)
2. **Create Project:** "New Project"
3. **Add PostgreSQL:** Click "+" → "Database" → "PostgreSQL"
4. **Deploy Backend:** Click "+" → "GitHub Repo" → Select repo → Set root: `fin24x-backend/server`
5. **Deploy Frontend:** Click "+" → "GitHub Repo" → Select repo → Set root: `fin24x-frontend`
6. **Add Environment Variables:** Same as Render
7. **Custom Domain:** Settings → "Generate Domain" or add custom domain

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected
- [ ] Domain connected
- [ ] SSL certificates active (automatic on Render)
- [ ] Test homepage loads
- [ ] Test API connection
- [ ] Test calculators
- [ ] Test article pages

---

## 🐛 Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify all environment variables are set
- Check database connection string

### Frontend can't connect to backend
- Verify `STRAPI_URL` in frontend environment variables
- Check CORS_ORIGIN in backend matches frontend URL
- Check backend is running

### Database connection errors
- Verify `DATABASE_URL` is correct
- Check database is running (Render dashboard)
- Ensure SSL is enabled (`DATABASE_SSL=true`)

### Domain not working
- Wait for DNS propagation (can take up to 48 hours)
- Verify CNAME records are correct
- Check Render custom domain settings

---

## 📊 Monitoring

**Render Dashboard:**
- View logs: Click on service → "Logs" tab
- View metrics: "Metrics" tab
- Restart service: "Manual Deploy" → "Clear build cache & deploy"

---

## 💰 Cost

**Free Tier (Render):**
- ✅ 750 hours/month (enough for testing)
- ✅ 1GB PostgreSQL storage
- ✅ Free SSL certificates
- ⚠️ Apps sleep after 15 min inactivity (wake on request)

**When to Upgrade:**
- More than 750 hours/month
- Need always-on (no sleep)
- More database storage
- Better performance

---

## 🎓 Learning Resources

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [PostgreSQL Basics](https://www.postgresql.org/docs/)

---

## 🆘 Need Help?

1. Check Render logs for errors
2. Verify all environment variables
3. Test locally first
4. Check DNS propagation status
5. Review this guide step-by-step

---

**Good luck with your deployment! 🚀**
