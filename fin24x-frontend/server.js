require('dotenv').config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

const express = require('express');
const path = require('path');

const app = express();

// Environment Configuration
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_PATH = process.env.STRAPI_API_PATH || '/api';
const TRUST_PROXY = process.env.TRUST_PROXY === 'true';

// Trust proxy for production (behind reverse proxy)
if (TRUST_PROXY) {
  app.set('trust proxy', 1);
}

// Security Headers (Production)
if (NODE_ENV === 'production') {
  app.use((req, res, next) => {
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    
    // HTTPS enforcement in production
    if (req.header('x-forwarded-proto') !== 'https' && SITE_URL.startsWith('https')) {
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    
    next();
  });
}

// Middleware to inject environment variables into HTML
// This MUST run BEFORE express.static to catch all HTML responses
app.use((req, res, next) => {
  // Only process HTML files and routes without extensions
  if (req.path.endsWith('.html') || (!req.path.includes('.') && req.accepts('html'))) {
    const originalSend = res.send;
    const originalSendFile = res.sendFile;
    
    // Override res.send for HTML content
    res.send = function(data) {
      if (typeof data === 'string' && (data.includes('</head>') || data.includes('<!DOCTYPE html'))) {
        // Ensure STRAPI_URL is set, throw error if missing in production
        if (!STRAPI_URL && NODE_ENV === 'production') {
          console.error('❌ ERROR: STRAPI_URL environment variable is not set!');
          console.error('Please set STRAPI_URL in your Render environment variables.');
          return originalSend.call(this, '<html><body><h1>Configuration Error</h1><p>STRAPI_URL environment variable is missing. Please check your server configuration.</p></body></html>');
        }
        
        // Inject environment variables before </head> or at the start of <head>
        const envScript = `
<script>
  window.ENV = {
    NODE_ENV: '${NODE_ENV}',
    STRAPI_URL: '${STRAPI_URL || 'http://localhost:1337'}',
    STRAPI_API_PATH: '${STRAPI_API_PATH || '/api'}',
    SITE_URL: '${SITE_URL || 'http://localhost:3000'}'
  };
</script>`;
        
        // Try to inject before </head> first
        if (data.includes('</head>')) {
          data = data.replace('</head>', envScript + '</head>');
        } 
        // Otherwise inject at the start of <head>
        else if (data.includes('<head>')) {
          data = data.replace('<head>', '<head>' + envScript);
        }
        // Last resort: inject after <!DOCTYPE html>
        else if (data.includes('<!DOCTYPE html')) {
          data = data.replace('<!DOCTYPE html', envScript + '<!DOCTYPE html');
        }
      }
      return originalSend.call(this, data);
    };
    
    // Override res.sendFile to inject env vars
    res.sendFile = function(filePath, options, callback) {
      const originalCallback = callback;
      const modifiedCallback = function(err) {
        if (err && originalCallback) {
          return originalCallback(err);
        }
      };
      
      // Read file, inject, then send
      if (filePath.endsWith('.html')) {
        const fs = require('fs');
        try {
          let html = fs.readFileSync(filePath, 'utf8');
          if (html.includes('</head>') || html.includes('<!DOCTYPE html')) {
            const envScript = `
<script>
  window.ENV = {
    NODE_ENV: '${NODE_ENV}',
    STRAPI_URL: '${STRAPI_URL || 'http://localhost:1337'}',
    STRAPI_API_PATH: '${STRAPI_API_PATH || '/api'}',
    SITE_URL: '${SITE_URL || 'http://localhost:3000'}'
  };
</script>`;
            
            if (html.includes('</head>')) {
              html = html.replace('</head>', envScript + '</head>');
            } else if (html.includes('<head>')) {
              html = html.replace('<head>', '<head>' + envScript);
            }
            
            return res.send(html);
          }
        } catch (err) {
          console.error('Error reading HTML file:', err);
        }
      }
      
      return originalSendFile.call(this, filePath, options, modifiedCallback);
    };
  }
  next();
});

// Serve static files from the frontend directory
// This MUST come AFTER the env injection middleware
app.use(express.static(path.join(__dirname, 'frontend'), {
  maxAge: NODE_ENV === 'production' ? '1y' : '0', // Cache static assets in production
  etag: true,
  lastModified: true
}));

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
});

// Sitemap cache (in-memory cache with TTL)
let sitemapCache = {
  xml: null,
  timestamp: null,
  ttl: 60 * 60 * 1000 // 1 hour cache
};

/**
 * Fetch all items with pagination support
 */
async function fetchAllItems(endpoint, limit = 100) {
  let allItems = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      // Handle query string properly
      const separator = endpoint.includes('?') ? '&' : '?';
      const url = `${STRAPI_URL}${STRAPI_API_PATH}${endpoint}${separator}pagination[page]=${page}&pagination[pageSize]=${limit}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`HTTP error fetching ${endpoint}: ${response.status}`);
        hasMore = false;
        break;
      }
      
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        allItems = allItems.concat(data.data);
        
        // Check if there are more pages
        const pagination = data.meta?.pagination;
        if (pagination && pagination.page < pagination.pageCount) {
          page++;
        } else {
          hasMore = false;
        }
      } else {
        hasMore = false;
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      hasMore = false;
    }
  }

  return allItems;
}

/**
 * Generate sitemap XML dynamically from Strapi
 */
async function generateSitemap() {
  try {
    // Fetch all content types in parallel
    const [categories, articles, staticPages, calculators, tags, metals, cities] = await Promise.all([
      fetchAllItems('/categories', 100),
      fetchAllItems('/articles?populate[category]=true&sort=publishedDate:desc', 100),
      fetchAllItems('/static-pages', 100),
      fetchAllItems('/calculators?filters[EnableCalculator][$ne]=false', 100),
      fetchAllItems('/tags', 100),
      fetchAllItems('/metals', 50),
      fetchAllItems('/cities', 500)
    ]);

    // Build sitemap XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

    // Add categories
    for (const cat of categories) {
      if (cat.slug) {
        xml += `  <url>
    <loc>${SITE_URL}/${encodeURIComponent(cat.slug)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }
    }

    // Add articles
    for (const article of articles) {
      if (article.slug && article.publishedAt) {
        const categorySlug = article.category?.slug || 'article';
        const lastmod = article.updatedAt ? article.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
        xml += `  <url>
    <loc>${SITE_URL}/${encodeURIComponent(categorySlug)}/${encodeURIComponent(article.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
      }
    }

    // Add static pages
    for (const page of staticPages) {
      if (page.slug) {
        const lastmod = page.updatedAt ? page.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
        xml += `  <url>
    <loc>${SITE_URL}/${encodeURIComponent(page.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;
      }
    }

    // Add calculators
    for (const calc of calculators) {
      if (calc.slug) {
        const lastmod = calc.updatedAt ? calc.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
        xml += `  <url>
    <loc>${SITE_URL}/calculators/${encodeURIComponent(calc.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
      }
    }

    // Add tag pages
    for (const tag of tags) {
      if (tag.slug) {
        xml += `  <url>
    <loc>${SITE_URL}/tag/${encodeURIComponent(tag.slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>
`;
      }
    }

    // Add rate pages
    // Gold rates
    xml += `  <url>
    <loc>${SITE_URL}/gold-rates/gold-rate-today</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // Silver rates
    xml += `  <url>
    <loc>${SITE_URL}/silver-rates/silver-rate-today</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

    // City-specific rate pages for gold
    for (const city of cities) {
      if (city.slug && city.state) {
        const citySlug = city.slug.toLowerCase().replace(/\s+/g, '-');
        xml += `  <url>
    <loc>${SITE_URL}/gold-rates/gold-rate-today-in-${encodeURIComponent(citySlug)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
        xml += `  <url>
    <loc>${SITE_URL}/silver-rates/silver-rate-today-in-${encodeURIComponent(citySlug)}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
      }
    }

    xml += `</urlset>`;

    return xml;
  } catch (error) {
    console.error('Sitemap generation error:', error);
    throw error;
  }
}

// Sitemap.xml endpoint with caching
app.get('/sitemap.xml', async (req, res) => {
  try {
    // Check cache
    const now = Date.now();
    if (sitemapCache.xml && sitemapCache.timestamp && (now - sitemapCache.timestamp) < sitemapCache.ttl) {
      res.type('application/xml');
      res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
      return res.send(sitemapCache.xml);
    }

    // Generate new sitemap
    const xml = await generateSitemap();
    
    // Update cache
    sitemapCache.xml = xml;
    sitemapCache.timestamp = now;

    res.type('application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).send('Error generating sitemap');
  }
});

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Blog single page
app.get('/blog_single.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'blog_single.html'));
});

// Tag pages - /tag/:slug
app.get('/tag/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'tag.html'));
});

// Static Pages - explicit routes for legal/info pages
const STATIC_PAGE_SLUGS = [
  'copyright-notification',
  'terms-of-use',
  'privacy-policy',
  'contact-us',
  'about-us',
  'disclaimer'
];

STATIC_PAGE_SLUGS.forEach(slug => {
  app.get(`/${slug}`, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'static-page.html'));
  });
});

// Calculator pages - /calculators/:slug
app.get('/calculators/:slug', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'calculator.html'));
});

// Rate pages - /gold-rates/gold-rate-today, /gold-rates/gold-rate-today-in-mumbai, etc.
app.get('/gold-rates/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'rate-page.html'));
});

app.get('/silver-rates/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'rate-page.html'));
});

app.get('/commodities/:page', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'rate-page.html'));
});

// Article pages - /:category/:article-slug
app.get('/:category/:article', (req, res, next) => {
  const { category, article } = req.params;
  
  // Skip if it looks like a file request (has extension)
  if (category.includes('.') || article.includes('.')) {
    return next();
  }
  
  // Skip rate page categories (handled by rate page routes above)
  if (category === 'gold-rates' || category === 'silver-rates' || category === 'commodities') {
    return next();
  }
  
  // Serve article page
  res.sendFile(path.join(__dirname, 'frontend', 'article.html'));
});

// Category pages - serve category.html for any slug that looks like a category
// This should be last to avoid catching other routes
app.get('/:slug', (req, res, next) => {
  const slug = req.params.slug;
  
  // Skip if it looks like a file request (has extension)
  if (slug.includes('.')) {
    return next();
  }
  
  // Serve category page for category slugs
  res.sendFile(path.join(__dirname, 'frontend', 'category.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Frontend server running:`);
  console.log(`   Environment: ${NODE_ENV}`);
  console.log(`   URL: ${SITE_URL}`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Strapi API: ${STRAPI_URL}${STRAPI_API_PATH}`);
  console.log(`   Files: ${path.join(__dirname, 'frontend')}\n`);
});
