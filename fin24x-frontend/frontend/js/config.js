// API Configuration
// Uses environment variables set by server.js via window.ENV
// Wait for window.ENV to be available (injected by server.js middleware)
(function() {
  'use strict';
  
  // Function to initialize API config
  function initApiConfig() {
    // Check if window.ENV is available
    if (typeof window.ENV === 'undefined' || !window.ENV.STRAPI_URL) {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      
      if (!isLocalhost) {
        console.error('❌ CRITICAL ERROR: window.ENV.STRAPI_URL is not set in production!');
        console.error('Current window.ENV:', window.ENV);
        console.error('This will cause API calls to fail.');
        console.error('Please check your server.js environment variable injection.');
        throw new Error('STRAPI_URL environment variable is required in production!');
      } else {
        console.warn('⚠️ Warning: window.ENV.STRAPI_URL not set, using localhost fallback');
      }
    }
    
    // Set API configuration
    window.API_CONFIG = {
      BASE_URL: window.ENV?.STRAPI_URL || 'http://localhost:1337',
      API_PATH: window.ENV?.STRAPI_API_PATH || '/api',
      SITE_URL: window.ENV?.SITE_URL || window.location.origin
    };
    
    // Log configuration
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    if (isLocalhost) {
      console.log('🔧 API Configuration:', window.API_CONFIG);
    } else {
      console.log('✅ API Configuration initialized:', {
        BASE_URL: window.API_CONFIG.BASE_URL,
        API_PATH: window.API_CONFIG.API_PATH
      });
    }
  }
  
  // Initialize immediately if ENV is already available
  if (typeof window.ENV !== 'undefined' && window.ENV.STRAPI_URL) {
    initApiConfig();
  } else {
    // Wait for window.ENV to be set (injected by server.js)
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds max wait
    
    const checkEnv = setInterval(function() {
      attempts++;
      
      if (typeof window.ENV !== 'undefined' && window.ENV.STRAPI_URL) {
        clearInterval(checkEnv);
        initApiConfig();
      } else if (attempts >= maxAttempts) {
        clearInterval(checkEnv);
        // If still not available, initialize with fallback (development only)
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        if (isLocalhost) {
          console.warn('⚠️ window.ENV not found after waiting, using fallback');
          initApiConfig();
        } else {
          console.error('❌ Failed to initialize API config - window.ENV not available');
          throw new Error('Failed to initialize API configuration');
        }
      }
    }, 100);
  }
})();

// Helper function to get full API URL
function getApiUrl(endpoint) {
  if (typeof window.API_CONFIG === 'undefined') {
    console.error('❌ API_CONFIG not initialized!');
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const fallback = window.ENV?.STRAPI_URL || 'http://localhost:1337';
    const apiPath = window.ENV?.STRAPI_API_PATH || '/api';
    
    if (!isLocalhost) {
      console.error('This is a critical error in production!');
      throw new Error('API_CONFIG not initialized - check window.ENV injection');
    }
    
    console.warn('Using fallback URL:', fallback + apiPath + endpoint);
    return `${fallback}${apiPath}${endpoint}`;
  }
  return `${window.API_CONFIG.BASE_URL}${window.API_CONFIG.API_PATH}${endpoint}`;
}

// Export for backward compatibility (use window.API_CONFIG instead)
const API_CONFIG = window.API_CONFIG || {
  BASE_URL: window.ENV?.STRAPI_URL || 'http://localhost:1337',
  API_PATH: window.ENV?.STRAPI_API_PATH || '/api'
};
