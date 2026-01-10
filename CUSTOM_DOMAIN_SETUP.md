# 🌐 Custom Domain Setup Guide

**Domain:** `fiscalcolumn.com`  
**Current Render URL:** `https://finance24x-cms-frontend.onrender.com`  
**Target:** Use `fiscalcolumn.com` instead

---

## 📋 Prerequisites

1. ✅ Domain purchased from GoDaddy: `fiscalcolumn.com`
2. ✅ Frontend deployed on Render
3. ✅ Backend deployed on Render
4. ✅ Access to GoDaddy DNS settings

---

## 🚀 Step-by-Step Instructions

### 1️⃣ Add Custom Domain in Render (Frontend)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click on your **Frontend service** (`finance24x-cms-frontend` or similar)
3. Go to **"Settings"** tab
4. Scroll down to **"Custom Domains"** section
5. Click **"Add Custom Domain"**
6. Enter: `fiscalcolumn.com`
7. Click **"Add"**
8. Render will show you **DNS records** to add (save these!)

**You'll see something like:**
```
Type: CNAME
Name: @
Value: finance24x-cms-frontend.onrender.com
```

**OR**

```
Type: A
Name: @
Value: 216.24.57.1 (example IP)
```
216.24.57.1
---

### 2️⃣ Add Custom Domain in Render (Backend - Optional)

If you want `api.fiscalcolumn.com` for your backend:

1. Go to your **Backend service** (`finance24x-cms` or similar)
2. Go to **"Settings"** → **"Custom Domains"**
3. Click **"Add Custom Domain"**
4. Enter: `api.fiscalcolumn.com`
5. Click **"Add"**
6. Save the DNS records shown

---

### 3️⃣ Configure DNS at GoDaddy

1. Log in to [GoDaddy](https://www.godaddy.com)
2. Go to **"My Products"** → **"Domains"**
3. Click on `fiscalcolumn.com`
4. Click **"DNS"** or **"Manage DNS"**

#### For Root Domain (`fiscalcolumn.com`):

**Option A: CNAME Record (Recommended)**
- **Type:** `CNAME`
- **Name:** `@` (or leave blank, or `fiscalcolumn.com`)
- **Value:** `finance24x-cms-frontend.onrender.com` (from Render)
- **TTL:** `600` (or default)

**Option B: A Record (If Render provides IP)**
- **Type:** `A`
- **Name:** `@` (or leave blank)
- **Value:** `216.24.57.1` (IP from Render - use the one Render shows)
- **TTL:** `600`

#### For WWW Subdomain (`www.fiscalcolumn.com`):

**Option A: CNAME Record**
- **Type:** `CNAME`
- **Name:** `www`
- **Value:** `finance24x-cms-frontend.onrender.com`
- **TTL:** `600`

**Option B: Redirect (Alternative)**
- Some prefer to redirect `www` → `fiscalcolumn.com`
- GoDaddy has a "Forwarding" option for this

#### For API Subdomain (`api.fiscalcolumn.com` - if using):

- **Type:** `CNAME`
- **Name:** `api`
- **Value:** `finance24x-cms.onrender.com` (your backend URL)
- **TTL:** `600`

---

### 4️⃣ Update Environment Variables

#### Frontend Service (Render):

Go to **Settings** → **Environment Variables** and update:

```
SITE_URL = https://fiscalcolumn.com
```

**Also verify:**
```
STRAPI_URL = https://finance24x-cms.onrender.com
```

#### Backend Service (Render):

Update CORS to allow your new domain:

```
CORS_ORIGIN = https://fiscalcolumn.com,https://www.fiscalcolumn.com
```

**Or if you want to allow all (less secure):**
```
CORS_ORIGIN = *
```

---

### 5️⃣ SSL Certificate (Automatic)

✅ **Good News:** Render automatically provisions SSL certificates via Let's Encrypt!

- After DNS propagates (5-60 minutes), Render will automatically:
  1. Detect your DNS records
  2. Provision SSL certificate
  3. Enable HTTPS

**You'll see:** "SSL Certificate Provisioned" in Render dashboard

---

### 6️⃣ Wait for DNS Propagation

⏰ **Timeline:**
- **Minimum:** 5-15 minutes
- **Average:** 30-60 minutes
- **Maximum:** 24-48 hours (rare)

**Check DNS propagation:**
- Visit: https://www.whatsmydns.net/#CNAME/fiscalcolumn.com
- Or: https://dnschecker.org/#CNAME/fiscalcolumn.com

**Test locally:**
```bash
# Check DNS resolution
nslookup fiscalcolumn.com
# or
dig fiscalcolumn.com
```

---

### 7️⃣ Verify Everything Works

1. **Visit:** `https://fiscalcolumn.com`
2. **Check:** Site loads correctly
3. **Check:** HTTPS works (green padlock)
4. **Check:** API calls work (open DevTools → Network tab)
5. **Check:** No CORS errors in console

---

## 🔧 Troubleshooting

### ❌ "DNS Not Found" or "Domain Not Resolving"

**Solutions:**
1. Wait longer (DNS can take up to 48 hours)
2. Check DNS records are correct in GoDaddy
3. Verify CNAME/A record values match Render exactly
4. Clear DNS cache:
   ```bash
   # Mac/Linux
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```

### ❌ "SSL Certificate Pending"

**Solutions:**
1. Wait 10-15 minutes after DNS propagates
2. Check DNS records are correct
3. Ensure domain is pointing to Render
4. Contact Render support if still pending after 1 hour

### ❌ "CORS Error" After Domain Change

**Solutions:**
1. Update `CORS_ORIGIN` in backend environment variables:
   ```
   CORS_ORIGIN = https://fiscalcolumn.com,https://www.fiscalcolumn.com
   ```
2. Redeploy backend service
3. Clear browser cache

### ❌ "Site Still Shows Render URL"

**Solutions:**
1. Check `SITE_URL` environment variable in Render
2. Clear browser cache
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. Check if any hardcoded URLs in code (shouldn't be any)

---

## 📝 Quick Checklist

- [ ] Added `fiscalcolumn.com` in Render frontend service
- [ ] Added DNS records in GoDaddy (`@` CNAME or A record)
- [ ] Added `www` CNAME record (optional)
- [ ] Updated `SITE_URL` environment variable in Render
- [ ] Updated `CORS_ORIGIN` in backend environment variables
- [ ] Waited for DNS propagation (30-60 minutes)
- [ ] Verified SSL certificate is provisioned
- [ ] Tested `https://fiscalcolumn.com` works
- [ ] Tested API calls work (no CORS errors)
- [ ] Tested `www.fiscalcolumn.com` (if configured)

---

## 🎉 Success!

Once everything is working:
- ✅ Your site will be accessible at `https://fiscalcolumn.com`
- ✅ SSL certificate will be active (HTTPS)
- ✅ All API calls will work correctly
- ✅ SEO-friendly custom domain

---

## 📚 Additional Resources

- [Render Custom Domains Docs](https://render.com/docs/custom-domains)
- [GoDaddy DNS Help](https://www.godaddy.com/help/manage-dns-records-680)
- [DNS Propagation Checker](https://www.whatsmydns.net/)

---

**Need Help?** Check Render logs or contact Render support if issues persist.
