/**
 * Header Component
 * Fetches and renders header from Strapi
 */

// Fetch header data from Strapi
async function fetchHeader() {
  try {
    const response = await fetch(getApiUrl('/header?populate=*'));
    if (!response.ok) {
      throw new Error('Failed to fetch header');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching header:', error);
    return null;
  }
}

// Render header navigation links with dropdown
function renderNavigationLinks(navigationLinks, currentPage = '') {
  if (!navigationLinks || navigationLinks.length === 0) {
    return '<li><a href="index.html">Home</a></li>';
  }

  console.log('Total navigation links:', navigationLinks.length);
  console.log('All links:', navigationLinks.map(l => l.label));

  // Remove last 2 links (Bank Deposits and Government Schemes) as requested
  const filteredLinks = navigationLinks.slice(0, -2);
  console.log('After removing last 2:', filteredLinks.length, 'links');
  console.log('Filtered links:', filteredLinks.map(l => l.label));
  
  // Show first 5 links in main nav
  const mainLinks = filteredLinks.slice(0, 5);
  // Rest go in dropdown (should be 5 links: IPOs, Stocks & Indices, Cryptocurrency, Mutual Funds, Calculators)
  const dropdownLinks = filteredLinks.slice(5);
  
  console.log('Main nav will show:', mainLinks.length, 'links');
  console.log('Dropdown will show:', dropdownLinks.length, 'links');

  console.log('Main nav links (5):', mainLinks.map(l => l.label));
  console.log('Dropdown links:', dropdownLinks.map(l => l.label));

  let html = '';
  
  // Render main navigation links
  mainLinks.forEach(link => {
    const isActive = currentPage === link.url ? 'class="active"' : '';
    html += `<li ${isActive}><a href="${link.url || '#'}">${link.label || ''}</a></li>`;
  });

  // Render dropdown if there are remaining links
  if (dropdownLinks.length > 0) {
    html += `<li class="dropdown">
      <a href="#" class="dropdown-toggle">
        More <i class="fa fa-chevron-down" aria-hidden="true"></i>
      </a>
      <ul class="dropdown-menu">
        ${dropdownLinks.map(link => {
          const isActive = currentPage === link.url ? 'class="active"' : '';
          return `<li ${isActive}><a href="${link.url || '#'}">${link.label || ''}</a></li>`;
        }).join('')}
      </ul>
    </li>`;
  }

  return html;
}

// Render mobile menu navigation links
function renderMobileMenuLinks(navigationLinks) {
  if (!navigationLinks || navigationLinks.length === 0) {
    return '<li class="menu_mm"><a href="index.html">Home</a></li>';
  }

  // Remove last 2 links for mobile menu too
  const filteredLinks = navigationLinks.slice(0, -2);

  return filteredLinks.map(link => {
    return `<li class="menu_mm"><a href="${link.url || '#'}">${link.label || ''}</a></li>`;
  }).join('');
}

// Render logo
function renderLogo(logoText, logoImage) {
  if (logoImage && logoImage.url) {
    return `<a href="index.html"><img src="${getApiUrl('').replace('/api', '')}${logoImage.url}" alt="${logoText || 'Logo'}" style="max-height: 50px;"></a>`;
  }
  
  if (logoText) {
    // Split logo text if it contains a span indicator (e.g., "Fin24x" -> "Fin<span>24x</span>")
    const parts = logoText.split(/(\d+)/);
    if (parts.length > 1) {
      return `<a href="index.html"><div class="logo_text">${parts[0]}<span>${parts[1]}</span></div></a>`;
    }
    return `<a href="index.html"><div class="logo_text">${logoText}</div></a>`;
  }
  
  return '<a href="index.html"><div class="logo_text">Fin<span>24x</span></div></a>';
}

// Render header component
async function renderHeader(currentPage = '') {
  const headerData = await fetchHeader();
  
  if (!headerData) {
    console.warn('Header data not available, using fallback');
    return;
  }

  const headerContainer = document.querySelector('.header');
  if (!headerContainer) {
    console.error('Header container not found');
    return;
  }

  // Render logo
  const logoContainer = headerContainer.querySelector('.logo_container');
  if (logoContainer) {
    logoContainer.innerHTML = renderLogo(headerData.logoText, headerData.logo);
  }

  // Render main navigation
  const mainNav = headerContainer.querySelector('.main_nav');
  if (mainNav && headerData.navigationLinks) {
    mainNav.innerHTML = renderNavigationLinks(headerData.navigationLinks, currentPage);
  }

  // Render mobile menu navigation
  const mobileMenuNav = document.querySelector('.menu_nav ul.menu_mm');
  if (mobileMenuNav && headerData.navigationLinks) {
    mobileMenuNav.innerHTML = renderMobileMenuLinks(headerData.navigationLinks);
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

