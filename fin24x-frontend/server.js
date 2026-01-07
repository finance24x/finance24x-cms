const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

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

// Article pages - /:category/:article-slug
app.get('/:category/:article', (req, res, next) => {
  const { category, article } = req.params;
  
  // Skip if it looks like a file request (has extension)
  if (category.includes('.') || article.includes('.')) {
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

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Frontend server running at:`);
  console.log(`   http://localhost:${PORT}\n`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'frontend')}\n`);
});
