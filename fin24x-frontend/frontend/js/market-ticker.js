/**
 * Market Ticker Component
 * Fetches and renders live market data in a marquee
 */

// Fetch market ticker data from Strapi
async function fetchMarketTicker() {
  try {
    const response = await fetch(getApiUrl('/market-ticker?populate=*'));
    if (!response.ok) {
      throw new Error('Failed to fetch market ticker');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching market ticker:', error);
    return null;
  }
}

// Format price with commas
function formatPrice(price) {
  if (price === null || price === undefined) return '0.00';
  return parseFloat(price).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Format change value with sign
function formatChange(changeValue, changePercent, isPositive) {
  if (!changeValue && !changePercent) {
    return '';
  }
  
  const sign = isPositive ? '+' : '';
  const changeValueStr = changeValue !== null && changeValue !== undefined ? `${sign}${formatPrice(Math.abs(changeValue))}` : '';
  const changePercentStr = changePercent !== null && changePercent !== undefined ? `${sign}${Math.abs(changePercent).toFixed(2)}%` : '';
  
  if (changeValueStr && changePercentStr) {
    return `${changeValueStr} (${changePercentStr})`;
  } else if (changeValueStr) {
    return changeValueStr;
  } else if (changePercentStr) {
    return changePercentStr;
  }
  return '';
}

// Render market ticker item
function renderMarketItem(item) {
  const price = formatPrice(item.currentPrice);
  
  // Calculate if change is positive based on changeValue or changePercent
  const isPositive = (item.changeValue !== null && item.changeValue !== undefined && item.changeValue >= 0) ||
                     (item.changePercent !== null && item.changePercent !== undefined && item.changePercent >= 0);
  
  const change = formatChange(item.changeValue, item.changePercent, isPositive);
  const changeClass = isPositive ? 'positive' : 'negative';
  const changeIcon = isPositive ? 'fa-caret-up' : 'fa-caret-down';
  
  return `
    <div class="market-ticker-item">
      <span class="market-name">${item.name}</span>
      <span class="market-price">${price}</span>
      <span class="market-change ${changeClass}">
        <i class="fa ${changeIcon}" aria-hidden="true"></i>
        ${change}
      </span>
    </div>
  `;
}

// Render market ticker marquee
async function renderMarketTicker() {
  const tickerContainer = document.querySelector('.market-ticker-container');
  if (!tickerContainer) {
    console.error('Market ticker container not found');
    return;
  }

  const marqueeContent = tickerContainer.querySelector('.market-ticker-marquee');
  if (!marqueeContent) {
    console.error('Market ticker marquee not found');
    return;
  }

  // Show loading state
  marqueeContent.innerHTML = '<div class="market-ticker-item">Loading market data...</div>';

  const tickerData = await fetchMarketTicker();
  
  if (!tickerData || !tickerData.marketItems || tickerData.marketItems.length === 0) {
    console.warn('Market ticker data not available');
    marqueeContent.innerHTML = '<div class="market-ticker-item">Market data unavailable</div>';
    return;
  }

  // Render all items (duplicate for seamless loop)
  const items = tickerData.marketItems;
  const itemsHTML = items.map(item => renderMarketItem(item)).join('');
  
  // If only one item, duplicate it more times for better scrolling effect
  if (items.length === 1) {
    marqueeContent.innerHTML = itemsHTML + itemsHTML + itemsHTML + itemsHTML;
  } else {
    // Duplicate items for seamless marquee loop
    marqueeContent.innerHTML = itemsHTML + itemsHTML;
  }
}

// Initialize market ticker when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMarketTicker);
} else {
  renderMarketTicker();
}

