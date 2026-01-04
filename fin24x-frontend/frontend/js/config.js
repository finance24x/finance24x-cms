// API Configuration
const API_CONFIG = {
  BASE_URL: 'http://localhost:1337',
  API_PATH: '/api'
};

// Helper function to get full API URL
function getApiUrl(endpoint) {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_PATH}${endpoint}`;
}

