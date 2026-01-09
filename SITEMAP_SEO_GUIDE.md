# 🗺️ Sitemap & SEO Guide

## Overview

Your sitemap is **automatically generated** and **updates dynamically** whenever you add new content in Strapi. No manual updates needed! 🎉

## How It Works

### Dynamic Sitemap Generation

The sitemap (`/sitemap.xml`) is generated on-demand from your Strapi content:

1. **Fetches all content** from Strapi API:
   - Articles (with pagination support)
   - Categories
   - Calculators
   - Static Pages
   - Tags
   - Rate Pages (Gold, Silver, Commodities)
   - City-specific rate pages

2. **Cached for 1 hour** to improve performance
3. **Automatically updates** when new content is published

### What's Included

✅ **Homepage** - Priority 1.0, Daily updates  
✅ **Categories** - Priority 0.8, Daily updates  
✅ **Articles** - Priority 0.6, Weekly updates (includes lastmod date)  
✅ **Calculators** - Priority 0.7, Monthly updates  
✅ **Static Pages** - Priority 0.5, Monthly updates  
✅ **Tags** - Priority 0.5, Weekly updates  
✅ **Rate Pages** - Priority 0.9, Daily updates
  - Gold rates (national + city-specific)
  - Silver rates (national + city-specific)

### URL Structure

- Homepage: `https://fiscalcolumn.com/`
- Categories: `https://fiscalcolumn.com/{category-slug}`
- Articles: `https://fiscalcolumn.com/{category-slug}/{article-slug}`
- Calculators: `https://fiscalcolumn.com/calculators/{calculator-slug}`
- Tags: `https://fiscalcolumn.com/tag/{tag-slug}`
- Rate Pages: `https://fiscalcolumn.com/gold-rates/gold-rate-today-in-{city}`

---

## 📍 Submitting to Google Search Console

### Step 1: Verify Your Domain

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Enter your domain: `fiscalcolumn.com`
4. Choose verification method:
   - **HTML file upload** (easiest)
   - **HTML tag** (add to homepage)
   - **DNS record** (if you have access)
5. Complete verification

### Step 2: Submit Sitemap

1. In Google Search Console, go to **"Sitemaps"** (left sidebar)
2. Enter sitemap URL: `https://fiscalcolumn.com/sitemap.xml`
3. Click **"Submit"**
4. Wait for Google to process (usually 1-24 hours)

### Step 3: Monitor Status

- **Success**: Green checkmark ✅
- **Errors**: Click to see details
- **Warnings**: Usually safe to ignore

---

## 🔄 Automatic Updates

### How It Works

1. **You publish new content** in Strapi Admin
2. **Sitemap automatically includes it** (within 1 hour due to cache)
3. **Google crawls** your sitemap regularly (daily/weekly)
4. **New pages get indexed** automatically

### Cache Refresh

The sitemap is cached for **1 hour** to improve performance. To force immediate update:

1. Wait 1 hour (automatic)
2. Or restart your frontend server (clears cache)

---

## 🛠️ Manual Sitemap Refresh (If Needed)

If you need to force a sitemap refresh immediately:

### Option 1: Restart Server
```bash
# On Render: Go to your service → Manual Deploy → Clear build cache & deploy
```

### Option 2: Clear Cache Programmatically
Add this endpoint to `server.js` (development only):
```javascript
// Clear sitemap cache (development only)
if (NODE_ENV === 'development') {
  app.get('/admin/clear-sitemap-cache', (req, res) => {
    sitemapCache.xml = null;
    sitemapCache.timestamp = null;
    res.send('Sitemap cache cleared');
  });
}
```

---

## 📊 Sitemap Best Practices

### ✅ Do's

- ✅ **Let it auto-update** - No manual intervention needed
- ✅ **Submit once** - Google will check regularly
- ✅ **Monitor in Search Console** - Check for errors monthly
- ✅ **Keep content fresh** - Google prefers regularly updated content

### ❌ Don'ts

- ❌ **Don't manually edit** - It's auto-generated
- ❌ **Don't submit multiple times** - Once is enough
- ❌ **Don't worry about cache** - 1 hour cache is fine
- ❌ **Don't include draft content** - Only published content is included

---

## 🔍 Testing Your Sitemap

### 1. View Sitemap
Visit: `https://fiscalcolumn.com/sitemap.xml`

You should see XML with all your URLs.

### 2. Validate Format
Use Google's [Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### 3. Check Coverage
In Google Search Console → **Coverage** → See which pages are indexed

### 4. Test Individual URLs
Use [Google's Rich Results Test](https://search.google.com/test/rich-results)

---

## 📈 SEO Tips

### 1. Content Freshness
- **Articles**: Update regularly (weekly/monthly)
- **Rate Pages**: Update daily (automatic)
- **Calculators**: Update when formulas change

### 2. URL Structure
- Keep URLs **short and descriptive**
- Use **hyphens** not underscores
- Include **keywords** in slugs

### 3. Meta Tags
Each page should have:
- ✅ Title tag (unique, descriptive)
- ✅ Meta description (150-160 characters)
- ✅ Canonical URL
- ✅ Open Graph tags
- ✅ JSON-LD schema

### 4. Internal Linking
- Link related articles
- Link calculators from articles
- Use descriptive anchor text

---

## 🐛 Troubleshooting

### Sitemap Not Updating

**Problem**: New content not appearing in sitemap

**Solutions**:
1. Check if content is **published** (not draft)
2. Wait 1 hour for cache to expire
3. Check Strapi API is accessible
4. Check server logs for errors

### Google Not Indexing Pages

**Problem**: Pages submitted but not indexed

**Solutions**:
1. Check **robots.txt** - Make sure pages aren't blocked
2. Check **page quality** - Content should be unique and valuable
3. Check **mobile-friendliness** - Use Google's Mobile-Friendly Test
4. **Be patient** - Can take days/weeks for new pages

### Sitemap Errors in Search Console

**Common Errors**:

1. **"Couldn't fetch"**
   - Check sitemap URL is accessible
   - Check server is running
   - Check CORS settings

2. **"Invalid format"**
   - Check XML is well-formed
   - Check encoding is UTF-8
   - Validate with XML validator

3. **"Too many URLs"**
   - If >50,000 URLs, use sitemap index
   - Split into multiple sitemaps
   - Contact support if needed

---

## 📚 Additional Resources

- **Google Search Console**: [search.google.com/search-console](https://search.google.com/search-console)
- **Sitemap Protocol**: [sitemaps.org](https://www.sitemaps.org/protocol.html)
- **Google SEO Guide**: [developers.google.com/search/docs/beginner/seo-starter-guide](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- **Strapi SEO Plugin**: Consider installing Strapi SEO plugin for better meta tag management

---

## ✅ Checklist

- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt includes sitemap reference
- [ ] Domain verified in Google Search Console
- [ ] Sitemap submitted to Google Search Console
- [ ] Monitoring sitemap status monthly
- [ ] All published content appears in sitemap
- [ ] No sitemap errors in Search Console

---

**Remember**: Your sitemap updates automatically! Just focus on creating great content. 🚀
