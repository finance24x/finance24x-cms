const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

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
