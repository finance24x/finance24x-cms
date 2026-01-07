/**
 * Homepage SEO - Dynamically sets OG image from header logo
 */

(async function() {
  try {
    // Fetch header data to get logo
    const response = await fetch(getApiUrl('/header?populate=logo'));
    if (!response.ok) return;
    
    const result = await response.json();
    const headerData = result.data;
    
    if (headerData?.logo?.url) {
      const logoUrl = `${API_CONFIG.BASE_URL}${headerData.logo.url}`;
      
      // Update OG image
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) ogImage.setAttribute('content', logoUrl);
      
      // Update Twitter image
      const twitterImage = document.querySelector('meta[name="twitter:image"]');
      if (twitterImage) twitterImage.setAttribute('content', logoUrl);
    }
  } catch (error) {
    console.log('Could not fetch header for SEO:', error);
  }
})();

