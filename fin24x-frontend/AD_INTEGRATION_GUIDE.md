# Ad Integration Guide

This guide explains how to integrate ads into your Finance24x website.

## Overview

The ad system is managed through `js/ads.js` and styled with `styles/ads.css`. The system supports multiple ad placements and can work with various ad networks.

## Ad Placement Options

1. **Header Banner** - Top of page (728x90 Leaderboard)
2. **Between Sections** - Ads inserted between content sections
3. **Sidebar** - For blog/article pages (300x250 Medium Rectangle)
4. **In-Content** - Within article content (300x250)
5. **Footer** - Above footer (728x90 Leaderboard)

## Quick Start

### 1. Google AdSense Integration

1. Sign up for Google AdSense at https://www.google.com/adsense
2. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
3. Create ad units in AdSense dashboard
4. Update `js/ads.js`:

```javascript
// Replace in adTemplates.googleAdSense function
data-ad-client="ca-pub-YOUR-PUBLISHER-ID"
data-ad-slot="YOUR-AD-SLOT-ID"
```

### 2. Direct Ad Code Integration

For any ad network, use the `direct` template:

```javascript
// In js/ads.js, replace placeholder with:
adTemplates.direct(`
  <!-- Your ad network code here -->
  <script>
    // Ad code from your network
  </script>
`)
```

### 3. Enable/Disable Ads

In `js/ads.js`, modify the `adConfig` object:

```javascript
const adConfig = {
  enabled: true, // Set to false to disable all ads
  placements: {
    betweenSections: {
      enabled: true, // Enable/disable specific placement
      frequency: 2,  // Show ad after every 2 sections
    },
    // ... other placements
  }
};
```

## Common Ad Networks

### Google AdSense
- Most popular, easy to integrate
- Use `adTemplates.googleAdSense(slotId, size)`

### Media.net
- Direct code integration
- Use `adTemplates.direct(adCode)`

### PropellerAds
- Direct code integration
- Use `adTemplates.direct(adCode)`

### Ezoic
- Requires header/footer code injection
- Add their script in `<head>` section

## Ad Sizes

Common ad sizes:
- **728x90** - Leaderboard (header/footer/between sections)
- **300x250** - Medium Rectangle (sidebar/in-content)
- **320x50** - Mobile Banner
- **336x280** - Large Rectangle
- **970x250** - Billboard

## Manual Ad Placement

You can also manually place ads in HTML:

```html
<!-- Between sections -->
<div class="ad-between-sections-wrapper">
  <div class="container">
    <div class="ad-between-sections">
      <!-- Your ad code here -->
    </div>
  </div>
</div>

<!-- Sidebar -->
<div class="ad-sidebar">
  <!-- Your ad code here -->
</div>
```

## Testing

1. Use placeholder ads during development (already configured)
2. Replace placeholders with actual ad codes
3. Test on different screen sizes
4. Verify ads don't break layout

## Best Practices

1. **Don't overload** - Too many ads hurt user experience
2. **Responsive** - Ensure ads work on mobile
3. **Performance** - Lazy load ads if possible
4. **Compliance** - Follow ad network policies
5. **Testing** - Test thoroughly before going live

## Troubleshooting

- **Ads not showing**: Check browser console for errors
- **Layout breaking**: Verify ad container CSS
- **AdSense not loading**: Check Publisher ID and Ad Slot ID
- **Mobile issues**: Test responsive ad sizes

## Support

For ad network specific issues, refer to:
- Google AdSense: https://support.google.com/adsense
- Your ad network's documentation

