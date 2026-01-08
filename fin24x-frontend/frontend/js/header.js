/**
 * Header Component
 * Fetches and renders header from Strapi
 */

// Shared header data cache
let headerDataCache = null;
let headerDataPromise = null;

// Fetch header data from Strapi (with full populate for sharing)
async function fetchHeader() {
  // If already fetching, return the same promise
  if (headerDataPromise) {
    return headerDataPromise;
  }
  
  // If cached, return cached data
  if (headerDataCache) {
    return headerDataCache;
  }
  
  // Fetch with populate=* to get all data (logo, header_article, etc.)
  headerDataPromise = (async () => {
    try {
      const response = await fetch(getApiUrl('/header?populate=*'));
      if (!response.ok) {
        throw new Error('Failed to fetch header');
      }
      const data = await response.json();
      headerDataCache = data.data;
      headerDataPromise = null; // Clear promise after completion
      return headerDataCache;
    } catch (error) {
      console.error('Error fetching header:', error);
      headerDataPromise = null; // Clear promise on error
      return null;
    }
  })();
  
  return headerDataPromise;
}

// Export function to get header data (for other scripts)
window.getHeaderData = async function() {
  return await fetchHeader();
};

// Fetch categories from Strapi
async function fetchCategories() {
  try {
    const response = await fetch(getApiUrl('/categories?sort=order:asc&filters[enabled][$eq]=true'));
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Render header navigation links with dropdown (using categories)
function renderNavigationLinks(categories, currentPage = '') {
  if (!categories || categories.length === 0) {
    return '<li><a href="/">Home</a></li>';
  }

  console.log('Total navigation categories:', categories.length);
  console.log('All categories:', categories.map(c => c.name));

  // Categories are already filtered and sorted by the API query
  // Show first 5 categories in main nav
  const mainCategories = categories.slice(0, 5);
  // Rest go in dropdown
  const dropdownCategories = categories.slice(5);
  
  console.log('Main nav will show:', mainCategories.length, 'categories');
  console.log('Dropdown will show:', dropdownCategories.length, 'categories');

  let html = '';
  
  // Render main navigation links (using category name as label and slug as URL)
  mainCategories.forEach(category => {
    const url = `/${category.slug}`;
    const isActive = currentPage === url ? 'class="active"' : '';
    html += `<li ${isActive}><a href="${url}">${category.name || ''}</a></li>`;
  });

  // Render dropdown if there are remaining categories
  if (dropdownCategories.length > 0) {
    html += `<li class="dropdown">
      <a href="#" class="dropdown-toggle">
        More <i class="fa fa-chevron-down" aria-hidden="true"></i>
      </a>
      <ul class="dropdown-menu">
        ${dropdownCategories.map(category => {
          const url = `/${category.slug}`;
          const isActive = currentPage === url ? 'class="active"' : '';
          return `<li ${isActive}><a href="${url}">${category.name || ''}</a></li>`;
        }).join('')}
      </ul>
    </li>`;
  }

  return html;
}

// Render mobile menu navigation links (using categories)
function renderMobileMenuLinks(categories) {
  let html = '<li class="menu_mm"><a href="/">Home</a></li>';
  
  if (categories && categories.length > 0) {
    // Categories are already filtered and sorted by the API query
    // Show all categories in mobile menu
    html += categories.map(category => {
      const url = `/${category.slug}`;
      return `<li class="menu_mm"><a href="${url}">${category.name || ''}</a></li>`;
    }).join('');
  }
  
  return html;
}

// Render logo - shows both image and text side by side
function renderLogo(logoText, logoImage) {
  let logoHTML = '<a href="/" class="d-flex flex-row align-items-center">';
  
  // Add logo image if available
  if (logoImage && logoImage.url) {
    const imageUrl = `${getApiUrl('').replace('/api', '')}${logoImage.url}`;
    logoHTML += `<img src="${imageUrl}" alt="${logoText || 'Logo'}" class="logo_image" style="max-height: 50px; margin-right: 10px;">`;
  }
  
  // Add logo text if available
  if (logoText) {
    // Split logo text if it contains numbers (e.g., "Finance24x" -> "Finance<span>24x</span>")
    const parts = logoText.split(/(\d+)/);
    if (parts.length > 1) {
      // Combine all parts after the first (number + any text after number)
      const numberAndAfter = parts.slice(1).join('');
      logoHTML += `<div class="logo_text">${parts[0]}<span>${numberAndAfter}</span></div>`;
    } else {
      logoHTML += `<div class="logo_text">${logoText}</div>`;
    }
  } else if (!logoImage || !logoImage.url) {
    // Fallback if neither image nor text is available
    logoHTML += '<div class="logo_text">Fin<span>24x</span></div>';
  }
  
  logoHTML += '</a>';
  return logoHTML;
}

// Render header component
async function renderHeader(currentPage = '') {
  // Fetch header data (logo only)
  const headerData = await fetchHeader();
  
  // Fetch categories separately
  const categories = await fetchCategories();
  
  if (!headerData) {
    console.warn('Header data not available, using fallback');
  }

  const headerContainer = document.querySelector('.header');
  if (!headerContainer) {
    console.error('Header container not found');
    return;
  }

  // Render logo
  const logoContainer = headerContainer.querySelector('.logo_container');
  if (logoContainer && headerData) {
    logoContainer.innerHTML = renderLogo(headerData.logoText, headerData.logo);
  }

  // Render main navigation (using categories fetched directly)
  const mainNav = headerContainer.querySelector('.main_nav');
  if (mainNav) {
    mainNav.innerHTML = renderNavigationLinks(categories, currentPage);
  }

  // Render mobile menu navigation (using categories fetched directly)
  const mobileMenuNav = document.querySelector('.menu_nav ul.menu_mm');
  if (mobileMenuNav) {
    mobileMenuNav.innerHTML = renderMobileMenuLinks(categories);
  }

  // Handle dropdown toggle (click and hover) - use setTimeout to ensure DOM is ready
  setTimeout(function() {
    const dropdownToggle = headerContainer.querySelector('.dropdown-toggle');
    const dropdown = headerContainer.querySelector('.dropdown');
    const dropdownMenu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
    
    if (dropdownToggle && dropdownMenu) {
      // Prevent navigation on click
      dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle dropdown on click
        const isOpen = dropdown.classList.contains('active') || dropdownMenu.classList.contains('active');
        if (isOpen) {
          dropdown.classList.remove('active');
          dropdownMenu.style.display = 'none';
          dropdownMenu.classList.remove('active');
          dropdownToggle.classList.remove('active');
        } else {
          dropdown.classList.add('active');
          dropdownMenu.style.display = 'block';
          dropdownMenu.classList.add('active');
          dropdownToggle.classList.add('active');
        }
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (dropdown && !dropdown.contains(e.target)) {
          dropdown.classList.remove('active');
          dropdownMenu.style.display = 'none';
          dropdownMenu.classList.remove('active');
          dropdownToggle.classList.remove('active');
        }
      });
    }
  }, 100);
}

// Initialize header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    // Get current page from URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    renderHeader(currentPage);
  });
} else {
  // DOM is already ready
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  renderHeader(currentPage);
}

