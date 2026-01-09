/**
 * Footer Component
 * Fetches and renders footer from Strapi
 */

// Fetch footer data from Strapi
async function fetchFooter() {
  try {
    // Use populate=* which should populate all fields including media in components
    // This is the simplest approach that should work with Strapi v5
    const response = await fetch(getApiUrl('/footer?populate=*'));
    if (!response.ok) {
      throw new Error('Failed to fetch footer');
    }
    const data = await response.json();
    console.log('Footer API Response:', data);
    console.log('Footer Data:', data.data);
    if (data.data && data.data.appDownloads) {
      console.log('App Downloads in response:', data.data.appDownloads);
      data.data.appDownloads.forEach((app, index) => {
        console.log(`App ${index}:`, app);
        console.log(`  - Platform: ${app.platform}`);
        console.log(`  - BadgeImage:`, app.badgeImage);
        // If badgeImage is not populated, the image might not be uploaded in Strapi
        if (!app.badgeImage) {
          console.log(`  - BadgeImage not found - make sure image is uploaded in Strapi for this app download`);
        }
      });
    }
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
    let url = link.url || '#';
    
    // Ensure internal links start with /
    if (url !== '#' && !url.startsWith('http') && !url.startsWith('/')) {
      url = '/' + url;
    }
    
    return `<li><a href="${url}">${link.label || ''}</a></li>`;
  }).join('');
}

// Render app download buttons
function renderAppDownloads(appDownloads) {
  console.log('renderAppDownloads called with:', appDownloads);
  
  if (!appDownloads || appDownloads.length === 0) {
    console.warn('No app downloads provided');
    return '';
  }

  const baseUrl = getApiUrl('').replace('/api', '');
  console.log('Base URL:', baseUrl);

  return appDownloads.map((app, index) => {
    console.log(`Processing app ${index}:`, app);
    
    let imageUrl = '';
    let imageAlt = app.platform || 'App Download';
    
    // Get image URL from Strapi - handle different data structures
    if (app.badgeImage) {
      console.log('Badge image found:', app.badgeImage);
      
      // Handle Strapi v5 structure - check various possible structures
      if (app.badgeImage.data) {
        // Array of images
        if (Array.isArray(app.badgeImage.data) && app.badgeImage.data.length > 0) {
          if (app.badgeImage.data[0].attributes && app.badgeImage.data[0].attributes.url) {
            imageUrl = baseUrl + app.badgeImage.data[0].attributes.url;
          } else if (app.badgeImage.data[0].url) {
            imageUrl = baseUrl + app.badgeImage.data[0].url;
          }
        } 
        // Single image object
        else if (app.badgeImage.data.attributes && app.badgeImage.data.attributes.url) {
          imageUrl = baseUrl + app.badgeImage.data.attributes.url;
        } else if (app.badgeImage.data.url) {
          imageUrl = baseUrl + app.badgeImage.data.url;
        }
      } 
      // Direct attributes structure
      else if (app.badgeImage.attributes && app.badgeImage.attributes.url) {
        imageUrl = baseUrl + app.badgeImage.attributes.url;
      } 
      // Direct URL
      else if (app.badgeImage.url) {
        imageUrl = baseUrl + app.badgeImage.url;
      } 
      // String URL
      else if (typeof app.badgeImage === 'string') {
        imageUrl = baseUrl + app.badgeImage;
      }
      
      console.log('Resolved image URL:', imageUrl);
    } else {
      console.warn('No badgeImage found for app:', app.platform);
      // If no badgeImage, we can't show an image - return empty
      // User needs to upload badgeImage in Strapi
      return '';
    }
    
    // Render image tag if URL exists
    if (imageUrl) {
      const html = `<div class="footer_image"><a href="${app.url || '#'}" target="_blank" rel="noopener noreferrer"><img src="${imageUrl}" alt="${imageAlt}" style="max-width: 150px; height: auto; display: block;"></a></div>`;
      console.log('Generated HTML:', html);
      return html;
    } else {
      console.warn('No image URL resolved for app:', app.platform);
      return '';
    }
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
    return `<a href="/"><img src="${getApiUrl('').replace('/api', '')}${logoImage.url}" alt="${logoText || 'Logo'}" style="max-height: 50px;"></a>`;
  }
  
  if (logoText) {
    const parts = logoText.split(/(\d+)/);
    if (parts.length > 1) {
      return `<a href="/"><div class="footer_logo_text">${parts[0]}<span>${parts[1]}</span></div></a>`;
    }
    return `<a href="/"><div class="footer_logo_text">${logoText}</div></a>`;
  }
  
  return '<a href="/"><div class="footer_logo_text">Fin<span>24x</span></div></a>';
}

// Render footer component
async function renderFooter() {
  const footerContainer = document.querySelector('.footer');
  if (!footerContainer) {
    console.error('Footer container not found');
    return;
  }

  // Hide footer initially to prevent "Loading..." flash
  footerContainer.style.opacity = '0';
  footerContainer.style.visibility = 'hidden';
  
  const footerData = await fetchFooter();
  
  if (!footerData) {
    console.warn('Footer data not available, using fallback');
    // Show footer even if data is not available
    footerContainer.style.opacity = '1';
    footerContainer.style.visibility = 'visible';
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
  if (footerMobile) {
    console.log('Footer Mobile section found');
    console.log('App Downloads data:', footerData.appDownloads);
    
    const mobileTitle = footerMobile.querySelector('.footer_title');
    if (mobileTitle && footerData.mobileTitle) {
      mobileTitle.textContent = footerData.mobileTitle;
    }

    const mobileContent = footerMobile.querySelector('.footer_mobile_content');
    if (mobileContent) {
      if (footerData.appDownloads && footerData.appDownloads.length > 0) {
        const renderedContent = renderAppDownloads(footerData.appDownloads);
        console.log('Rendered app downloads HTML:', renderedContent);
        mobileContent.innerHTML = renderedContent;
      } else {
        console.warn('No app downloads data found in footer');
        // Show placeholder or keep empty
        mobileContent.innerHTML = '';
      }
    } else {
      console.error('Mobile content container not found');
    }
  } else {
    console.error('Footer Mobile section not found in DOM');
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

  // Show footer after content is loaded
  footerContainer.style.opacity = '1';
  footerContainer.style.visibility = 'visible';
  footerContainer.style.transition = 'opacity 0.2s ease-in-out';
}

// Initialize footer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderFooter);
} else {
  // DOM is already ready
  renderFooter();
}

