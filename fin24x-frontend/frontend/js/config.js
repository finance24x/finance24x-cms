// API Configuration
// Uses environment variables set by server.js via window.ENV
const API_CONFIG = {
  BASE_URL: window.ENV?.STRAPI_URL || 'http://localhost:1337',
  API_PATH: window.ENV?.STRAPI_API_PATH || '/api'
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PATH}${endpoint}`;
}

