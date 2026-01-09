# 🚀 Deployment Guide

**Time:** 30-45 minutes  
**Cost:** $0 (Free tier)  
**Difficulty:** Beginner-friendly

---

## 🎯 What You'll Deploy

1. **PostgreSQL Database** (free, 1GB)
2. **Backend (Strapi)** - `api.fiscalcolumn.com`
3. **Frontend** - `fiscalcolumn.com`

---

## 📋 Before You Start

1. ✅ Code pushed to GitHub
2. ✅ Domain: fiscalcolumn.com
3. ✅ 30 minutes of time

---

## 🚀 Deployment Steps

### 1️⃣ Sign Up for Render (2 minutes)

1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with **GitHub** (easiest)
4. Authorize Render

### 2️⃣ Create Database (5 minutes)

1. Click "New +" → **"PostgreSQL"**
2. Fill in:
   - Name: `fin24x-db`
   - Database: `fin24x_prod`
   - Plan: **Free**
3. Click "Create Database"
4. **Wait 2-3 minutes**
5. Copy **"Internal Database URL"** (looks like: `postgresql://user:pass@host/dbname`)
   - Click on database → "Connections" tab → Copy "Internal Database URL"

### 3️⃣ Generate Keys (5 minutes)

Open terminal and run:

```bash
# Generate 4 keys for APP_KEYS (run 4 times, copy each)
openssl rand -base64 32
openssl rand -base64 32
openssl rand -base64 32
openssl rand -base64 32

# Generate other secrets (run each, copy result)
openssl rand -base64 32  # For API_TOKEN_SALT
openssl rand -base64 32  # For ADMIN_JWT_SECRET
openssl rand -base64 32  # For JWT_SECRET
openssl rand -base64 32  # For TRANSFER_TOKEN_SALT
```

**Save all keys** - you'll paste them into Render!

### 4️⃣ Deploy Backend (10 minutes)

**⚠️ CRITICAL:** 
- Make sure `pg` package is in `package.json` dependencies (✅ already added)
- **ALL environment variables below are REQUIRED** - missing any will cause "Exited with status 1" error

1. Click "New +" → **"Web Service"**
2. Connect GitHub → Select `fin24x` repository
3. Fill in:
   - **Name:** `fin24x-backend`
   - **Root Directory:** `fin24x-backend/server`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Click "Advanced" → Add Environment Variables:

   **⚠️ REQUIRED - Copy ALL of these:**

   ```
   NODE_ENV = production
   HOST = 0.0.0.0
   PORT = 1337
   APP_KEYS = <paste-4-keys-separated-by-commas>
   API_TOKEN_SALT = <paste-key>
   ADMIN_JWT_SECRET = <paste-key>
   JWT_SECRET = <paste-key>
   TRANSFER_TOKEN_SALT = <paste-key>
   DATABASE_CLIENT = postgres
   DATABASE_URL = <paste-internal-database-url-from-step-2>
   CORS_ORIGIN = https://fiscalcolumn.com
   ADMIN_URL = /admin
   LOG_LEVEL = warn
   ```

   **📝 Format for APP_KEYS:** `key1,key2,key3,key4` (no spaces between commas)

5. Click "Create Web Service"
6. **Wait 5-10 minutes** (watch logs)
7. Copy URL: `https://fin24x-backend.onrender.com`

### 5️⃣ Deploy Frontend (10 minutes)

1. Click "New +" → **"Web Service"**
2. Connect GitHub → Select `fin24x` repository (same repo)
3. Fill in:
   - **Name:** `fin24x-frontend`
   - **Root Directory:** `fin24x-frontend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
4. Add Environment Variables:

   ```
   NODE_ENV = production
   PORT = 3000
   SITE_URL = https://fiscalcolumn.com
   STRAPI_URL = https://fin24x-backend.onrender.com
   STRAPI_API_PATH = /api
   TRUST_PROXY = true
   LOG_LEVEL = warn
   ```

5. Click "Create Web Service"
6. **Wait 3-5 minutes**
7. Copy URL: `https://fin24x-frontend.onrender.com`
8. **Test:** Visit the URL - should see your site!

### 6️⃣ Connect Domain (10 minutes)

#### A. Add DNS Records

Go to your domain provider (where you bought fiscalcolumn.com):

1. Find "DNS Management" or "DNS Settings"
2. Add CNAME record:
   - **Name:** `@` (or blank)
   - **Value:** `fin24x-frontend.onrender.com`
3. Add CNAME record:
   - **Name:** `api`
   - **Value:** `fin24x-backend.onrender.com`
4. Save

#### B. Add Custom Domain in Render

**Frontend:**
1. Go to `fin24x-frontend` → "Settings"
2. Scroll to "Custom Domains"
3. Add: `fiscalcolumn.com`
4. Add: `www.fiscalcolumn.com`
5. Wait 5-10 minutes for SSL

**Backend:**
1. Go to `fin24x-backend` → "Settings"
2. Scroll to "Custom Domains"
3. Add: `api.fiscalcolumn.com`
4. Wait for SSL

#### C. Update Environment Variables

**Frontend:**
- Update `STRAPI_URL` to: `https://api.fiscalcolumn.com`
- Save (auto-redeploys)

**Backend:**
- Verify `CORS_ORIGIN` is: `https://fiscalcolumn.com`

### 7️⃣ Setup Strapi Admin (5 minutes)

1. Visit: `https://api.fiscalcolumn.com/admin`
2. Create admin account
3. Go to Settings → Roles → Public
4. Enable permissions for all content types you need
5. Save

---

## ✅ Done!

Visit `https://fiscalcolumn.com` - your site should be live! 🎉

---

## 🔄 Making Updates

1. Make changes to code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update"
   git push
   ```
3. Render auto-deploys (watch logs)

---

## 🆘 Troubleshooting

### Backend won't start? ("Exited with status 1")

**Most common causes:**

1. **Missing Environment Variables**
   - Check all required variables are set (see Step 4)
   - Most common: Missing `APP_KEYS`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, or `API_TOKEN_SALT`
   - Verify `DATABASE_URL` is correct (use Internal Database URL)

2. **SSL Certificate Error**
   - ✅ **FIXED!** Database config now allows self-signed certificates automatically
   - If still seeing error, verify `DATABASE_URL` is correct

3. **Missing `pg` Package**
   - ✅ **FIXED!** Package is already in `package.json`
   - If error persists, verify `package.json` has `"pg": "^8.11.3"`

**Solution:**
- Check logs in Render dashboard for specific error
- Verify all environment variables are set (see Step 4)
- Ensure `DATABASE_URL` uses Internal Database URL from Render

### Frontend shows errors?

- Check browser console (F12)
- Verify `STRAPI_URL` environment variable is correct
- Check backend is running (visit backend URL/admin)
- Verify `window.ENV` is set in browser console

### Domain not working?

- Check DNS: [whatsmydns.net](https://www.whatsmydns.net)
- Wait up to 48 hours for DNS propagation
- Verify CNAME records are correct

### Environment Variables Not Working?

- Verify `STRAPI_URL` is set in Render
- Check browser console for `window.ENV` object
- Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
- Check server logs for injection errors

---

## 📚 Related Documentation

- **Environment Setup:** See `ENV_SETUP.md`
- **Sitemap & SEO:** See `SITEMAP_SEO_GUIDE.md`
- **Render Docs:** [render.com/docs](https://render.com/docs)

---

**Questions?** Check Render logs - they're very helpful!
