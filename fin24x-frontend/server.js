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

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend'), {
  maxAge: NODE_ENV === 'production' ? '1y' : '0', // Cache static assets in production
  etag: true,
  lastModified: true
}));

// Middleware to inject environment variables into HTML
app.use((req, res, next) => {
  if (req.path.endsWith('.html') || !req.path.includes('.')) {
    const originalSend = res.send;
    res.send = function(data) {
      if (typeof data === 'string' && data.includes('</head>')) {
        // Inject environment variables before </head>
        const envScript = `
<script>
  window.ENV = {
    NODE_ENV: '${NODE_ENV}',
    STRAPI_URL: '${STRAPI_URL}',
    STRAPI_API_PATH: '${STRAPI_API_PATH}',
    SITE_URL: '${SITE_URL}'
  };
</script>`;
        data = data.replace('</head>', envScript + '</head>');
      }
      return originalSend.call(this, data);
    };
  }
  next();
});

// Robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`);
});

// Sitemap.xml - Dynamically generated from Strapi
app.get('/sitemap.xml', async (req, res) => {
  try {
    // Fetch all categories
    const categoriesRes = await fetch(`${STRAPI_URL}/api/categories?pagination[limit]=100`);
    const categoriesData = await categoriesRes.json();
    const categories = categoriesData.data || [];

    // Fetch all articles
    const articlesRes = await fetch(`${STRAPI_URL}/api/articles?populate[category]=true&pagination[limit]=1000&sort=publishedDate:desc`);
    const articlesData = await articlesRes.json();
    const articles = articlesData.data || [];

    // Fetch all static pages
    const staticPagesRes = await fetch(`${STRAPI_URL}/api/static-pages?pagination[limit]=100`);
    const staticPagesData = await staticPagesRes.json();
    const staticPages = staticPagesData.data || [];

    // Fetch all calculators
    const calculatorsRes = await fetch(`${STRAPI_URL}/api/calculators?pagination[limit]=100`);
    const calculatorsData = await calculatorsRes.json();
    const calculators = calculatorsData.data || [];

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
      xml += `  <url>
    <loc>${SITE_URL}/${cat.slug}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;
    }

    // Add articles
    for (const article of articles) {
      const categorySlug = article.category?.slug || 'article';
      const lastmod = article.updatedAt ? article.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url>
    <loc>${SITE_URL}/${categorySlug}/${article.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    // Add static pages
    for (const page of staticPages) {
      const lastmod = page.updatedAt ? page.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url>
    <loc>${SITE_URL}/${page.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;
    }

    // Add calculators
    for (const calc of calculators) {
      const lastmod = calc.updatedAt ? calc.updatedAt.split('T')[0] : new Date().toISOString().split('T')[0];
      xml += `  <url>
    <loc>${SITE_URL}/calculators/${calc.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    res.type('application/xml');
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
