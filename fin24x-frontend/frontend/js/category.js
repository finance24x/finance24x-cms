/**
 * Category Page Manager
 * Fetches and renders articles for a specific category
 */

class CategoryPageManager {
  constructor() {
    this.articlesContainer = document.getElementById('articles-container');
    this.paginationContainer = document.getElementById('pagination-container');
    this.pagination = document.getElementById('pagination');
    this.currentPage = 1;
    this.pageSize = 20;
    this.cardsLimit = 6; // Articles 2-7 shown as cards (after featured)
    this.category = null;
    this.totalArticles = 0;
  }

  /**
   * Initialize the category page
   */
  async init() {
    // Get category slug from URL
    const slug = this.getCategorySlug();
    
    if (!slug) {
      this.showError('Category not found');
      return;
    }

    // Immediately set a formatted slug as title (before API loads)
    const formattedSlug = this.formatSlugAsTitle(slug);
    document.title = `${formattedSlug} - Finance24x`;
    document.getElementById('breadcrumb-category').textContent = formattedSlug;

    try {
      // Fetch category details
      this.category = await this.fetchCategory(slug);
      
      if (!this.category) {
        this.showError('Category not found');
        return;
      }

      // Update page with actual category info
      this.updateCategoryInfo();
      
      // Fetch and render articles
      await this.loadArticles();
      
    } catch (error) {
      console.error('Error loading category:', error);
      this.showError('Failed to load category');
    }
  }

  /**
   * Format slug as readable title (e.g., "latest-news" → "Latest News")
   */
  formatSlugAsTitle(slug) {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Get category slug from URL path
   */
  getCategorySlug() {
    const path = window.location.pathname;
    // Remove leading slash and get the slug
    const slug = path.replace(/^\//, '').replace(/\/$/, '');
    return slug || null;
  }

  /**
   * Fetch category details by slug
   */
  async fetchCategory(slug) {
    const url = getApiUrl(`/categories?filters[slug][$eq]=${slug}`);
    const response = await fetch(url);
    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  }

  /**
   * Fetch articles for the category
   */
  async fetchArticles(page = 1) {
    const start = (page - 1) * this.pageSize;
    const url = getApiUrl(
      `/articles?populate[category]=true&populate[image]=true&filters[category][documentId][$eq]=${this.category.documentId}&pagination[start]=${start}&pagination[limit]=${this.pageSize}&sort=publishedDate:desc`
    );
    const response = await fetch(url);
    const data = await response.json();
    
    this.totalArticles = data.meta?.pagination?.total || 0;
    return data.data || [];
  }

  /**
   * Update page with category information
   */
  updateCategoryInfo() {
    // Update page title
    document.title = `${this.category.name} - Finance24x`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-category').textContent = this.category.name;
  }

  /**
   * Load and render articles
   */
  async loadArticles() {
    // Show loading
    this.articlesContainer.innerHTML = `
      <div class="loading-container">
        <div class="spinner"></div>
        <p>Loading articles...</p>
      </div>
    `;

    const articles = await this.fetchArticles(this.currentPage);
    
    if (articles.length === 0) {
      this.articlesContainer.innerHTML = `
        <div class="no-articles">
          <h3>No articles found</h3>
          <p>There are no articles in this category yet.</p>
        </div>
      `;
      this.paginationContainer.style.display = 'none';
      return;
    }

    // Split articles: featured (1), cards (2-7), split section (8-15), extra (16+)
    const featuredArticle = articles[0];
    const cardArticles = articles.slice(1, 1 + this.cardsLimit);
    const remainingArticles = articles.slice(1 + this.cardsLimit);
    
    // For split section: 5 for list (left), 3 for mini cards (right)
    const listArticles = remainingArticles.slice(0, 5);
    const miniCardArticles = remainingArticles.slice(5, 8);
    const extraArticles = remainingArticles.slice(8);

    let html = '';
    
    // Render featured article
    html += this.renderFeaturedArticle(featuredArticle);
    
    // Render card articles in 2-column grid
    if (cardArticles.length > 0) {
      html += `<div class="articles-cards-section">
        <div class="articles-cards-grid">
          ${cardArticles.map(article => this.renderArticleCard(article)).join('')}
        </div>
      </div>`;
    }
    
    // Render split section: 5 list items (left) + 3 mini cards (right)
    if (listArticles.length > 0 || miniCardArticles.length > 0) {
      html += `<div class="articles-split-section">
        <div class="split-list-column">
          ${listArticles.map(article => this.renderArticleListItem(article)).join('')}
        </div>
        <div class="split-grid-column">
          ${miniCardArticles.map(article => this.renderMiniCard(article)).join('')}
        </div>
      </div>`;
    }
    
    // Render extra articles as cards
    if (extraArticles.length > 0) {
      html += `<div class="articles-extra-section">
        ${extraArticles.map(article => this.renderArticleCard(article)).join('')}
      </div>`;
    }

    this.articlesContainer.innerHTML = html;
    
    // Render pagination
    this.renderPagination();
  }

  /**
   * Render featured article (first article - large layout)
   */
  renderFeaturedArticle(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="featured-image"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '';
    
    const excerpt = article.excerpt || this.truncateText(article.content, 250);
    const readTime = this.getReadTime(article);

    return `
      <div class="featured-article">
        <div class="featured-content">
          <div class="featured-category">${this.category?.name || 'Article'}</div>
          <h1 class="featured-title">
            <a href="/blog_single.html?slug=${article.slug}">${article.title}</a>
          </h1>
          <p class="featured-excerpt">${excerpt}</p>
          <div class="featured-meta">
            <span class="read-time">${readTime} min read</span>
            <span class="separator">•</span>
            <span class="author">By ${article.author || 'Admin'}</span>
          </div>
        </div>
        ${imageHtml}
      </div>
    `;
  }

  /**
   * Render a single article card (horizontal with thumbnail)
   */
  renderArticleCard(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="card-thumb"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '<div class="card-thumb card-thumb-placeholder"></div>';
    
    const readTime = this.getReadTime(article);
    const excerpt = article.excerpt || this.truncateText(article.content, 80);

    return `
      <div class="article-card-horizontal">
        ${imageHtml}
        <div class="card-content">
          <div class="card-category">${this.category?.name || 'Article'}</div>
          <h3 class="card-title">
            <a href="/blog_single.html?slug=${article.slug}">${article.title}</a>
          </h3>
          <p class="card-excerpt">${excerpt}</p>
          <div class="card-meta">
            <span>${readTime} min read</span>
            <span class="separator">•</span>
            <span>By ${article.author || 'Admin'}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Get read time from article or estimate based on content
   */
  getReadTime(article) {
    // Use minutesToread from Strapi if available
    if (article.minutesToread) {
      return article.minutesToread;
    }
    // Fallback: estimate based on content
    if (!article.content) return 2;
    const text = article.content.replace(/<[^>]*>/g, '');
    const words = text.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  }

  /**
   * Render article list item (no image, for split section left)
   */
  renderArticleListItem(article) {
    const date = article.publishedDate 
      ? new Date(article.publishedDate).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          year: 'numeric'
        })
      : '';

    return `
      <div class="article-list-item">
        <h4 class="article-list-title">
          <a href="/blog_single.html?slug=${article.slug}">${article.title}</a>
        </h4>
        <div class="article-list-meta">
          <span>${article.author || 'Admin'}</span>
          <span class="separator">|</span>
          <span>${date}</span>
        </div>
      </div>
    `;
  }

  /**
   * Render mini card (horizontal with image, for split section right)
   */
  renderMiniCard(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage 
      ? `<div class="mini-card-image"><img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}"></div>`
      : '<div class="mini-card-image mini-card-placeholder"></div>';
    
    const excerpt = article.excerpt || this.truncateText(article.content, 60);
    const readTime = this.getReadTime(article);

    return `
      <div class="mini-card">
        ${imageHtml}
        <div class="mini-card-content">
          <div class="mini-card-category">${this.category?.name || 'Article'}</div>
          <h4 class="mini-card-title">
            <a href="/blog_single.html?slug=${article.slug}">${article.title}</a>
          </h4>
          <p class="mini-card-excerpt">${excerpt}</p>
          <div class="mini-card-meta">
            <span>${readTime} min read</span>
            <span class="separator">•</span>
            <span>By ${article.author || 'Admin'}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render pagination
   */
  renderPagination() {
    const totalPages = Math.ceil(this.totalArticles / this.pageSize);
    
    if (totalPages <= 1) {
      this.paginationContainer.style.display = 'none';
      return;
    }

    this.paginationContainer.style.display = 'flex';
    
    let html = '';
    
    // Previous button
    html += `
      <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${this.currentPage - 1}">
          <i class="fa fa-chevron-left"></i>
        </a>
      </li>
    `;
    
    // Page numbers
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(totalPages, this.currentPage + 2);
    
    if (startPage > 1) {
      html += `<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>`;
      if (startPage > 2) {
        html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      html += `
        <li class="page-item ${i === this.currentPage ? 'active' : ''}">
          <a class="page-link" href="#" data-page="${i}">${i}</a>
        </li>
      `;
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        html += `<li class="page-item disabled"><span class="page-link">...</span></li>`;
      }
      html += `<li class="page-item"><a class="page-link" href="#" data-page="${totalPages}">${totalPages}</a></li>`;
    }
    
    // Next button
    html += `
      <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
        <a class="page-link" href="#" data-page="${this.currentPage + 1}">
          <i class="fa fa-chevron-right"></i>
        </a>
      </li>
    `;
    
    this.pagination.innerHTML = html;
    
    // Add click handlers
    this.pagination.querySelectorAll('.page-link[data-page]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = parseInt(link.dataset.page);
        if (page >= 1 && page <= totalPages && page !== this.currentPage) {
          this.currentPage = page;
          this.loadArticles();
          // Scroll to top of articles
          window.scrollTo({ top: 300, behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Truncate text and strip HTML
   */
  truncateText(text, maxLength) {
    if (!text) return '';
    const stripped = text.replace(/<[^>]*>/g, '');
    if (stripped.length <= maxLength) return stripped;
    return stripped.substring(0, maxLength) + '...';
  }

  /**
   * Show error message
   */
  showError(message) {
    document.getElementById('category-title').textContent = 'Error';
    document.getElementById('category-description').textContent = message;
    this.articlesGrid.innerHTML = `
      <div class="no-articles">
        <h3>${message}</h3>
        <p><a href="/">Return to homepage</a></p>
      </div>
    `;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const manager = new CategoryPageManager();
  manager.init();
});

