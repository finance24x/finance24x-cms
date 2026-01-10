# 📢 Ad Setup Guide

**How to enable ads on your website after DNS mapping is complete**

---

## 🎯 Current Status

✅ **Ad placeholders are already showing** on your website:
- Calculator sidebar (2 ad spaces)
- Article pages (sidebar ads)
- Category pages (ad sidebar)

⚠️ **Currently showing placeholders** - You need to replace them with real ad codes.

---

## 🚀 Step-by-Step: Enable Real Ads

### Option 1: Google AdSense (Recommended)

#### Step 1: Apply for Google AdSense

1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click **"Get Started"**
3. Enter your website: `https://fiscalcolumn.com`
4. Fill out the application:
   - Country: Your country
   - Payment information
   - Website details
5. Submit application
6. **Wait for approval** (usually 1-7 days)

#### Step 2: Get Your AdSense Code

Once approved:
1. Log in to [AdSense Dashboard](https://www.google.com/adsense/)
2. Go to **"Ads"** → **"By ad unit"**
3. Create ad units for each size:
   - **728x90** (Leaderboard) - for between sections
   - **300x250** (Medium Rectangle) - for sidebar
4. Copy your **Publisher ID** (looks like: `ca-pub-1234567890123456`)
5. Copy **Ad Slot IDs** for each ad unit

#### Step 3: Update Your Code

Edit `/fin24x-frontend/frontend/js/ads.js`:

**Replace the placeholder code with your AdSense code:**

```javascript
// Line 50: Replace with your Publisher ID
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
// Change to:
data-ad-client="ca-pub-YOUR-PUBLISHER-ID"

// Line 101: Replace placeholder with AdSense
${adTemplates.placeholder(adSize)}
// Change to:
${adTemplates.googleAdSense('YOUR-AD-SLOT-ID', adSize)}
```

**For calculator sidebar ads** (hardcoded in `calculator-page.js`):

Edit `/fin24x-frontend/frontend/js/calculator-page.js` around lines 360-363 and 378-381:

**Replace:**
```javascript
<div class="ad-placeholder">
  <i class="fa fa-bullhorn"></i>
  <span>Ad Space</span>
</div>
```

**With:**
```javascript
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-YOUR-PUBLISHER-ID"
     data-ad-slot="YOUR-SIDEBAR-AD-SLOT-ID"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

#### Step 4: Add AdSense Script to HTML

Add this script tag to all HTML files (before closing `</head>` tag):

**In:** `index.html`, `article.html`, `category.html`, `calculator.html`, `tag.html`, `static-page.html`, `rate-page.html`

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR-PUBLISHER-ID"
     crossorigin="anonymous"></script>
```

---

### Option 2: Other Ad Networks

#### Media.net, PropellerAds, Ezoic, etc.

1. Sign up with your ad network
2. Get your ad code (usually JavaScript snippet)
3. Update `ads.js`:

**Replace placeholder with direct ad code:**

```javascript
// In ads.js, replace:
${adTemplates.placeholder(adSize)}

// With:
${adTemplates.direct(`YOUR-AD-NETWORK-CODE-HERE`)}
```

**Example for Media.net:**
```javascript
${adTemplates.direct(`
  <div id="media-net-ad">
    <script type="text/javascript">
      window._mNHandle = window._mNHandle || {};
      window._mNHandle.queue = window._mNHandle.queue || [];
      medianet_versionId = "YOUR-VERSION-ID";
      (function() {
        var s = document.createElement("script");
        s.async = true;
        s.src = "//contextual.media.net/dmedianet.js?cid=YOUR-CID";
        s.onerror = function() {
          window._mNHandle.queue.push(function() {
            window._mNHandle.AdBlockDetector && window._mNHandle.AdBlockDetector();
          });
        };
        document.getElementsByTagName("head")[0].appendChild(s);
      })();
    </script>
  </div>
`)}
```

---

## 📍 Ad Placement Locations

### Currently Active Ad Spaces:

1. **Calculator Sidebar** (2 ads)
   - Between calculator list and "All Calculators" section
   - At the bottom of sidebar
   - File: `calculator-page.js` (lines ~357-365, ~375-383)

2. **Article Sidebar**
   - File: `ads.js` → `injectSidebarAds()` function
   - Currently disabled (needs to be enabled in config)

3. **Between Content Sections**
   - File: `ads.js` → `injectBetweenSectionAds()` function
   - Shows after every 2nd section
   - Currently enabled but showing placeholders

4. **In-Content Ads** (within articles)
   - File: `ads.js` → `injectInContentAds()` function
   - Shows after first paragraph in articles
   - Currently enabled but showing placeholders

---

## ⚙️ Ad Configuration

Edit `/fin24x-frontend/frontend/js/ads.js`:

```javascript
const adConfig = {
  enabled: true,  // Set to false to disable all ads
  
  placements: {
    headerBanner: {
      enabled: false,  // Change to true to enable header ads
      size: '728x90',
    },
    betweenSections: {
      enabled: true,  // Already enabled
      size: '728x90',
      frequency: 2,  // Show ad after every 2nd section
    },
    sidebar: {
      enabled: true,  // Already enabled
      size: '300x250',
    },
    inContent: {
      enabled: true,  // Already enabled
      size: '300x250',
    },
    footer: {
      enabled: false,  // Change to true to enable footer ads
      size: '728x90',
    }
  }
};
```

---

## 🔧 Quick Setup Checklist

### For Google AdSense:

- [ ] Apply for Google AdSense account
- [ ] Get approved (wait 1-7 days)
- [ ] Get Publisher ID (`ca-pub-XXXXXXXXXX`)
- [ ] Create ad units and get Ad Slot IDs
- [ ] Add AdSense script to all HTML files (`<head>` section)
- [ ] Update `ads.js` with Publisher ID
- [ ] Replace placeholders in `ads.js` with `googleAdSense()` calls
- [ ] Replace placeholders in `calculator-page.js` with AdSense code
- [ ] Test ads on production site
- [ ] Verify ads are showing correctly

### For Other Ad Networks:

- [ ] Sign up with ad network
- [ ] Get ad code snippets
- [ ] Update `ads.js` with `direct()` template
- [ ] Replace placeholders in `calculator-page.js`
- [ ] Add ad network script to HTML files (if required)
- [ ] Test ads on production site

---

## 🧪 Testing Ads

### Before Going Live:

1. **Test locally first:**
   ```bash
   # Make sure ads work in development
   npm run dev
   ```

2. **Check ad placement:**
   - Visit calculator pages → Check sidebar ads
   - Visit article pages → Check sidebar and in-content ads
   - Visit category pages → Check between-section ads

3. **Verify ad code:**
   - Open browser DevTools (F12)
   - Check Console for ad errors
   - Check Network tab → Verify ad scripts load
   - Check Elements → Verify ad containers exist

4. **Test on production:**
   - Deploy changes to Render
   - Visit `https://fiscalcolumn.com`
   - Verify ads load correctly
   - Check mobile responsiveness

---

## 📊 Ad Performance Tracking

### Google AdSense:
- Dashboard: [adsense.google.com](https://adsense.google.com)
- View impressions, clicks, revenue
- Optimize ad placement based on performance

### Other Networks:
- Check your ad network dashboard
- Monitor CTR (Click-Through Rate)
- Adjust ad sizes/positions as needed

---

## 🚨 Common Issues

### Ads Not Showing:

1. **Check ad code is correct**
   - Verify Publisher ID
   - Verify Ad Slot IDs
   - Check for typos

2. **Check ad network approval**
   - Google AdSense: Wait for approval
   - Other networks: Check account status

3. **Check browser console**
   - Look for JavaScript errors
   - Check if ad scripts load

4. **Check ad blockers**
   - Disable ad blockers for testing
   - Some users have ad blockers (normal)

### Ads Showing Placeholders:

- You haven't replaced placeholder code yet
- Follow Step 3 above to replace with real ad code

### CORS Errors:

- Make sure domain is verified in ad network
- Add `fiscalcolumn.com` to allowed domains in ad network settings

---

## 💡 Best Practices

1. **Don't overdo it:**
   - Too many ads = bad user experience
   - Current setup is good (2-3 ads per page)

2. **Mobile-friendly:**
   - Use responsive ad units
   - Test on mobile devices

3. **Performance:**
   - Ads can slow down page load
   - Use async loading (already implemented)

4. **Compliance:**
   - Follow ad network policies
   - Disclose ads if required by law
   - Don't click your own ads!

---

## 📝 Files to Modify

1. **`/fin24x-frontend/frontend/js/ads.js`**
   - Update Publisher ID (line 50)
   - Replace placeholders with ad code (lines 101, 126, 148, 173, 195)

2. **`/fin24x-frontend/frontend/js/calculator-page.js`**
   - Replace sidebar ad placeholders (lines ~360-363, ~378-381)

3. **HTML files** (add AdSense script):
   - `index.html`
   - `article.html`
   - `category.html`
   - `calculator.html`
   - `tag.html`
   - `static-page.html`
   - `rate-page.html`

---

## 🎉 Success!

Once you've:
1. ✅ Applied and been approved by ad network
2. ✅ Added ad codes to your files
3. ✅ Deployed to production
4. ✅ Verified ads are showing

**Your website will be monetized!** 🚀

---

**Need Help?** Check your ad network's documentation or support.
