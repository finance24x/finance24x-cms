/**
 * Homepage Sections Manager
 * Fetches sections from Strapi and dynamically renders them
 */

class HomepageSectionsManager {
  constructor() {
    this.sectionsContainer = document.getElementById('homepage-sections-container');
  }

  /**
   * Initialize - fetch and render all sections
   */
  async init() {
    try {
      console.log('🔄 Loading homepage sections...');
      const sections = await this.fetchSections();
      
      if (sections && sections.length > 0) {
        await this.renderSections(sections);
        console.log(`✅ Loaded ${sections.length} sections`);
      } else {
        console.log('⚠️ No sections found');
        this.renderNoSectionsMessage();
      }
    } catch (error) {
      console.error('❌ Error loading sections:', error);
      this.renderErrorMessage();
    }
  }

  /**
   * Fetch all enabled homepage sections with their categories
   */
  async fetchSections() {
    const url = getApiUrl('/homepage-sections?populate=category&filters[enabled][$eq]=true&sort=order:asc');
    const response = await fetch(url);
    const data = await response.json();
    return data.data || [];
  }

  /**
   * Fetch articles for a specific category
   */
  async fetchArticlesByCategory(categoryDocumentId, limit = 5) {
    const url = getApiUrl(`/articles?populate[category]=true&populate[image]=true&populate[tags]=true&filters[category][documentId][$eq]=${categoryDocumentId}&pagination[limit]=${limit}&sort=publishedDate:desc`);
    const response = await fetch(url);
    const data = await response.json();
    return data.data || [];
  }

  /**
   * Render all sections
   */
  async renderSections(sections) {
    this.sectionsContainer.innerHTML = '';
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const category = section.category;
      
      if (!category) {
        console.log(`⚠️ Section "${section.title}" has no category, skipping`);
        continue;
      }

      // Fetch articles for this category
      const articles = await this.fetchArticlesByCategory(category.documentId, section.itemsToShow || 5);
      
      // Determine background class (alternate grey/white)
      const bgClass = i % 2 === 0 ? '' : 'section-alt-bg';
      
      // Render based on section type
      let sectionHtml = '';
      switch (section.sectionType) {
        case 'news':
          sectionHtml = this.renderNewsSection(section, articles, bgClass, i, category);
          break;
        case 'grid-with-date':
          sectionHtml = this.renderGridWithDateSection(section, articles, bgClass, i, category);
          break;
        case 'grid-vertical':
          sectionHtml = this.renderGridVerticalSection(section, articles, bgClass, i, category);
          break;
        case 'grid':
        default:
          sectionHtml = this.renderGridSection(section, articles, bgClass, i, category);
          break;
      }
      
      this.sectionsContainer.innerHTML += sectionHtml;
    }
  }

  /**
   * Render News Section (Large post + small posts)
   */
  renderNewsSection(section, articles, bgClass, index, category) {
    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 6);
    const categoryUrl = category?.slug ? `/${category.slug}` : '#';

    return `
      <div class="news content-section section-${index + 1} ${bgClass}">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="section_title_container d-flex flex-row align-items-center justify-content-between">
                <h2 class="section_title mb-0">${section.title}</h2>
                <div class="courses_button trans_200"><a href="${categoryUrl}">${section.buttonText || 'view all'}</a></div>
              </div>
            </div>
          </div>
          <div class="row news_row">
            <div class="col-lg-7 news_col">
              ${mainArticle ? this.renderLargeNewsPost(mainArticle) : '<div class="no-articles">No articles available</div>'}
            </div>
            <div class="col-lg-5 news_col">
              <div class="news_posts_small">
                ${sideArticles.map(article => this.renderSmallNewsPost(article)).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Grid Section (Cards layout)
   */
  renderGridSection(section, articles, bgClass, index, category) {
    const categoryUrl = category?.slug ? `/${category.slug}` : '#';
    
    return `
      <div class="courses content-section section-${index + 1} ${bgClass}">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="section_title_container d-flex flex-row align-items-center justify-content-between">
                <h2 class="section_title mb-0">${section.title}</h2>
                <div class="courses_button trans_200"><a href="${categoryUrl}">${section.buttonText || 'view all'}</a></div>
              </div>
            </div>
          </div>
          <div class="row courses_row">
            ${articles.slice(0, 6).map(article => this.renderGridCard(article)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Grid Vertical Section (Vertical cards - image on top)
   */
  renderGridVerticalSection(section, articles, bgClass, index, category) {
    const categoryUrl = category?.slug ? `/${category.slug}` : '#';
    
    return `
      <div class="courses content-section section-${index + 1} ${bgClass}">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="section_title_container d-flex flex-row align-items-center justify-content-between">
                <h2 class="section_title mb-0">${section.title}</h2>
                <div class="courses_button trans_200"><a href="${categoryUrl}">${section.buttonText || 'view all'}</a></div>
              </div>
            </div>
          </div>
          <div class="row courses_row">
            ${articles.slice(0, 4).map(article => this.renderVerticalCard(article)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Grid with Date Section (Vertical cards with date - 4 per row)
   */
  renderGridWithDateSection(section, articles, bgClass, index, category) {
    const categoryUrl = category?.slug ? `/${category.slug}` : '#';
    
    return `
      <div class="courses content-section section-${index + 1} ${bgClass}">
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="section_title_container d-flex flex-row align-items-center justify-content-between">
                <h2 class="section_title mb-0">${section.title}</h2>
                <div class="courses_button trans_200"><a href="${categoryUrl}">${section.buttonText || 'view all'}</a></div>
              </div>
            </div>
          </div>
          <div class="row courses_row">
            ${articles.slice(0, 4).map(article => this.renderVerticalCardWithDate(article)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Large News Post
   */
  renderLargeNewsPost(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="news_post_image"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '';
    
    return `
      <div class="news_post_large_container">
        <div class="news_post_large">
          ${imageHtml}
          <div class="news_post_large_title"><a href="blog_single.html?slug=${article.slug}">${article.title}</a></div>
          <div class="news_post_meta">
            <ul>
              <li><a href="#">${article.author || 'Admin'}</a></li>
              <li><a href="#">${this.formatDate(article.publishedDate)}</a></li>
            </ul>
          </div>
          <div class="news_post_text">
            <p>${article.excerpt || this.truncateText(article.content, 150)}</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Small News Post
   */
  renderSmallNewsPost(article) {
    return `
      <div class="news_post_small">
        <div class="news_post_small_title"><a href="blog_single.html?slug=${article.slug}">${article.title}</a></div>
        <div class="news_post_meta">
          <ul>
            <li><a href="#">${article.author || 'Admin'}</a></li>
            <li><a href="#">${this.formatDate(article.publishedDate)}</a></li>
          </ul>
        </div>
      </div>
    `;
  }

  /**
   * Render Grid Card (Horizontal layout - image left, content right)
   */
  renderGridCard(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="grid-card-image"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '<div class="grid-card-image grid-card-placeholder"></div>';
    
    const categoryName = article.category?.name || 'Article';
    
    return `
      <div class="col-lg-6 col-md-6 grid_card_col">
        <div class="grid-card-horizontal">
          ${imageHtml}
          <div class="grid-card-content">
            <h3 class="grid-card-title"><a href="blog_single.html?slug=${article.slug}">${article.title}</a></h3>
            <p class="grid-card-excerpt">${article.excerpt || this.truncateText(article.content, 80)}</p>
            <div class="grid-card-meta">
              <span>${article.minutesToread || 3} min read</span>
              <span class="separator">•</span>
              <span>${this.formatDate(article.publishedDate)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Vertical Card (image on top, content below) - 4 per row
   */
  renderVerticalCard(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="grid-card-image"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '<div class="grid-card-image grid-card-placeholder"></div>';
    
    const categoryName = article.category?.name || 'Article';
    
    return `
      <div class="col-lg-3 col-md-6 grid_card_col">
        <div class="grid-card-vertical">
          ${imageHtml}
          <div class="grid-card-content">
            <h3 class="grid-card-title"><a href="blog_single.html?slug=${article.slug}">${article.title}</a></h3>
            <p class="grid-card-excerpt">${article.excerpt || this.truncateText(article.content, 80)}</p>
            <div class="grid-card-meta">
              <span>${article.minutesToread || 3} min read</span>
              <span class="separator">•</span>
              <span>${this.formatDate(article.publishedDate)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render Vertical Card with Date (image on top with date badge) - 4 per row
   */
  renderVerticalCardWithDate(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="grid-card-image"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '<div class="grid-card-image grid-card-placeholder"></div>';
    
    const categoryName = article.category?.name || 'Article';
    const date = new Date(article.publishedDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en', { month: 'short' });
    
    return `
      <div class="col-lg-3 col-md-6 grid_card_col">
        <div class="grid-card-vertical grid-card-with-date">
          <div class="grid-card-image-wrapper">
            ${imageHtml}
            <div class="grid-card-date-badge">
              <span class="date-day">${day}</span>
              <span class="date-month">${month}</span>
            </div>
          </div>
          <div class="grid-card-content">
            <h3 class="grid-card-title"><a href="blog_single.html?slug=${article.slug}">${article.title}</a></h3>
            <p class="grid-card-excerpt">${article.excerpt || this.truncateText(article.content, 80)}</p>
            <div class="grid-card-meta">
              <span>${article.minutesToread || 3} min read</span>
              <span class="separator">•</span>
              <span>${this.formatDate(article.publishedDate)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Format date to readable string
   */
  formatDate(dateStr) {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  /**
   * Truncate text and strip HTML
   */
  truncateText(text, maxLength) {
    if (!text) return '';
    // Strip HTML tags
    const stripped = text.replace(/<[^>]*>/g, '');
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength) + '...';
  }

  /**
   * Render no sections message
   */
  renderNoSectionsMessage() {
    this.sectionsContainer.innerHTML = `
      <div class="container py-5">
        <div class="alert alert-info text-center">
          No sections available. Please configure homepage sections in the admin panel.
        </div>
      </div>
    `;
  }

  /**
   * Render error message
   */
  renderErrorMessage() {
    this.sectionsContainer.innerHTML = `
      <div class="container py-5">
        <div class="alert alert-danger text-center">
          Unable to load sections. Please check if the server is running.
        </div>
      </div>
    `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const manager = new HomepageSectionsManager();
  manager.init();
});

