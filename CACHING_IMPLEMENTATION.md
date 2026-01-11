# Header/Footer Caching Implementation

## Overview
Implemented hybrid caching (localStorage + in-memory) to reduce API calls for header and footer data, which are mostly static and change infrequently (once per day at most).

## Implementation Details

### Client-Side Caching (localStorage)
- **Location**: `frontend/js/header.js` and `frontend/js/footer.js`
- **Cache Duration**: 1 hour (3,600,000 milliseconds)
- **Cache Keys**:
  - `fc_header_data` - Header data
  - `fc_footer_data` - Footer data
  - `fc_categories_data` - Categories data

### How It Works

1. **Cache Check Order**:
   - First: Check in-memory cache (for current page session)
   - Second: Check localStorage cache (for cross-page persistence)
   - Third: Fetch from API if cache expired/missing

2. **Cache Storage Format**:
   ```javascript
   {
     data: { /* actual data */ },
     timestamp: 1234567890123 // Unix timestamp in milliseconds
   }
   ```

3. **Cache Expiration**:
   - Cache expires after 1 hour
   - Expired cache is automatically removed
   - New data fetched from API when cache expires

### Benefits

1. **Reduced API Calls**:
   - Header/footer data fetched only once per hour per user
   - Subsequent page loads use cached data (instant load)

2. **Better Performance**:
   - Instant data availability from cache
   - No network delay for header/footer rendering

3. **Offline Support**:
   - Cached data available even if API is temporarily unavailable
   - Graceful degradation if cache exists but API fails

4. **Storage Management**:
   - Automatic cleanup of expired cache
   - Handles localStorage quota exceeded errors gracefully

## Cache Invalidation

### Automatic
- Cache expires after 1 hour
- Expired cache is removed on next access

### Manual
Users can clear cache by:
1. Opening browser console
2. Running: `localStorage.clear()` or
3. Running: `localStorage.removeItem('fc_header_data')` (for specific cache)

### Admin/Developer
To force cache refresh:
1. Update header/footer in Strapi admin
2. Wait up to 1 hour for automatic refresh, OR
3. Clear browser localStorage manually

## Future Enhancements

### Option 1: Server-Side Cache
Add in-memory cache on Node.js server to reduce Strapi database queries:
- Cache header/footer responses for 1 hour
- Reduces load on Strapi backend
- Less critical since client-side cache already reduces API calls significantly

### Option 2: Cache Versioning
Add version/ETag system:
- Include version number in cache key
- Force cache invalidation when content changes
- Requires backend support for version tracking

### Option 3: Service Worker
Implement Service Worker for more advanced caching:
- Offline support
- Background sync
- More control over cache strategies

## Testing

### Verify Cache is Working
1. Open browser DevTools → Application → Local Storage
2. Navigate to your site
3. Check for keys: `fc_header_data`, `fc_footer_data`, `fc_categories_data`
4. Refresh page - should see no API calls in Network tab
5. Wait 1 hour or clear cache - should see API calls again

### Verify Cache Expiration
1. Open browser console
2. Check cache timestamp: `JSON.parse(localStorage.getItem('fc_header_data')).timestamp`
3. Calculate: `Date.now() - timestamp` should be < 3600000 (1 hour)
4. After 1 hour, cache should be invalidated automatically

## Code Changes Summary

### Modified Files
1. `frontend/js/header.js`
   - Added `getCachedData()` and `setCachedData()` utility functions
   - Updated `fetchHeader()` to check localStorage first
   - Updated `fetchCategories()` to check localStorage first

2. `frontend/js/footer.js`
   - Added `getCachedData()` and `setCachedData()` utility functions
   - Updated `fetchFooter()` to check localStorage first

### Key Functions Added
- `getCachedData(key)` - Retrieves cached data with TTL check
- `setCachedData(key, data)` - Stores data with timestamp

## Performance Impact

### Before
- Every page load: 2-3 API calls (header, footer, categories)
- Network latency: ~100-500ms per call
- Total: ~300-1500ms for header/footer data

### After
- First page load: 2-3 API calls (cache miss)
- Subsequent loads: 0 API calls (cache hit)
- Cache read: <1ms (instant)
- **Result: ~99% reduction in API calls for returning users**

## Notes

- Cache is per-browser (localStorage is browser-specific)
- Cache persists across browser sessions
- Cache is cleared when user clears browser data
- Works on all modern browsers (localStorage support)
- Gracefully handles localStorage quota exceeded errors
