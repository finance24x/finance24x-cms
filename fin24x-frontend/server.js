const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Frontend server running at:`);
  console.log(`   http://localhost:${PORT}\n`);
  console.log(`📁 Serving files from: ${path.join(__dirname, 'frontend')}\n`);
});

