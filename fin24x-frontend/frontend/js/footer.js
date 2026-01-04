/**
 * Footer Component
 * Fetches and renders footer from Strapi
 */

// Fetch footer data from Strapi
async function fetchFooter() {
  try {
    const response = await fetch(getApiUrl('/footer?populate=*'));
    if (!response.ok) {
      throw new Error('Failed to fetch footer');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching footer:', error);
    return null;
  }
}

// Render social links
function renderSocialLinks(socialLinks) {
  if (!socialLinks || socialLinks.length === 0) {
    return '';
  }

  const iconMap = {
    'facebook': 'fa-facebook',
    'twitter': 'fa-twitter',
    'instagram': 'fa-instagram',
    'linkedin': 'fa-linkedin',
    'youtube': 'fa-youtube',
    'tiktok': 'fa-tiktok',
    'google': 'fa-google-plus'
  };

  return socialLinks.map(link => {
    const iconClass = iconMap[link.platform] || 'fa-link';
    return `<li><a href="${link.url || '#'}" target="_blank" rel="noopener noreferrer"><i class="fa ${iconClass}" aria-hidden="true"></i></a></li>`;
  }).join('');
}

// Render footer links
function renderFooterLinks(links) {
  if (!links || links.length === 0) {
    return '';
  }

  return links.map(link => {
    return `<li><a href="${link.url || '#'}">${link.label || ''}</a></li>`;
  }).join('');
}

// Render app download buttons
function renderAppDownloads(appDownloads) {
  if (!appDownloads || appDownloads.length === 0) {
    return '';
  }

  return appDownloads.map(app => {
    if (app.badgeImage && app.badgeImage.url) {
      return `<div class="footer_image"><a href="${app.url || '#'}" target="_blank" rel="noopener noreferrer"><img src="${getApiUrl('').replace('/api', '')}${app.badgeImage.url}" alt="${app.platform}"></a></div>`;
    }
    return `<div class="footer_image"><a href="${app.url || '#'}" target="_blank" rel="noopener noreferrer">${app.platform}</a></div>`;
  }).join('');
}

// Render contact info
function renderContactInfo(contactInfo) {
  if (!contactInfo) {
    return '';
  }

  let html = '<ul>';
  if (contactInfo.email) {
    html += `<li>Email: ${contactInfo.email}</li>`;
  }
  if (contactInfo.phone) {
    html += `<li>Phone: ${contactInfo.phone}</li>`;
  }
  if (contactInfo.address) {
    html += `<li>${contactInfo.address}</li>`;
  }
  html += '</ul>';
  return html;
}

// Render footer logo
function renderFooterLogo(logoText, logoImage) {
  if (logoImage && logoImage.url) {
    return `<a href="index.html"><img src="${getApiUrl('').replace('/api', '')}${logoImage.url}" alt="${logoText || 'Logo'}" style="max-height: 50px;"></a>`;
  }
  
  if (logoText) {
    const parts = logoText.split(/(\d+)/);
    if (parts.length > 1) {
      return `<a href="index.html"><div class="footer_logo_text">${parts[0]}<span>${parts[1]}</span></div></a>`;
    }
    return `<a href="index.html"><div class="footer_logo_text">${logoText}</div></a>`;
  }
  
  return '<a href="index.html"><div class="footer_logo_text">Fin<span>24x</span></div></a>';
}

// Render footer component
async function renderFooter() {
  const footerData = await fetchFooter();
  
  if (!footerData) {
    console.warn('Footer data not available, using fallback');
    return;
  }

  const footerContainer = document.querySelector('.footer');
  if (!footerContainer) {
    console.error('Footer container not found');
    return;
  }

  // Render logo and description
  const footerAbout = footerContainer.querySelector('.footer_about');
  if (footerAbout) {
    const logoContainer = footerAbout.querySelector('.footer_logo_container');
    if (logoContainer) {
      logoContainer.innerHTML = renderFooterLogo(footerData.logoText, footerData.logo);
    }

    const aboutText = footerAbout.querySelector('.footer_about_text');
    if (aboutText && footerData.description) {
      aboutText.innerHTML = `<p>${footerData.description}</p>`;
    }

    const socialContainer = footerAbout.querySelector('.footer_social ul');
    if (socialContainer && footerData.socialLinks) {
      socialContainer.innerHTML = renderSocialLinks(footerData.socialLinks);
    }
  }

  // Render contact info
  const footerContact = footerContainer.querySelector('.footer_contact');
  if (footerContact && footerData.contactInfo) {
    const contactInfoContainer = footerContact.querySelector('.footer_contact_info');
    if (contactInfoContainer) {
      contactInfoContainer.innerHTML = renderContactInfo(footerData.contactInfo);
    }
  }

  // Render quick links column 1
  const footerLinks = footerContainer.querySelector('.footer_links');
  if (footerLinks) {
    const linksTitle = footerLinks.querySelector('.footer_title');
    if (linksTitle && footerData.quickLinksTitle) {
      linksTitle.textContent = footerData.quickLinksTitle;
    }

    const linksContainer = footerLinks.querySelector('.footer_links_container ul');
    if (linksContainer) {
      // Combine both columns if they exist
      const allLinks = [
        ...(footerData.quickLinksColumn1 || []),
        ...(footerData.quickLinksColumn2 || [])
      ];
      linksContainer.innerHTML = renderFooterLinks(allLinks);
    }
  }

  // Render app downloads
  const footerMobile = footerContainer.querySelector('.footer_mobile');
  if (footerMobile && footerData.appDownloads) {
    const mobileTitle = footerMobile.querySelector('.footer_title');
    if (mobileTitle && footerData.mobileTitle) {
      mobileTitle.textContent = footerData.mobileTitle;
    }

    const mobileContent = footerMobile.querySelector('.footer_mobile_content');
    if (mobileContent) {
      mobileContent.innerHTML = renderAppDownloads(footerData.appDownloads);
    }
  }

  // Render bottom links
  const copyrightRow = footerContainer.querySelector('.copyright_row');
  if (copyrightRow && footerData.bottomLinks) {
    const crLinks = copyrightRow.querySelector('.cr_list');
    if (crLinks) {
      crLinks.innerHTML = renderFooterLinks(footerData.bottomLinks);
    }
  }

  // Render copyright text
  if (footerData.copyrightText) {
    const crText = footerContainer.querySelector('.cr_text');
    if (crText) {
      crText.innerHTML = footerData.copyrightText;
    }
  }
}

// Initialize footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderFooter);
} else {
  // DOM is already ready
  renderFooter();
}

