/**
 * Article Page - Dynamic content loader
 * Fetches article content from Strapi based on URL: /{category}/{article-slug}
 */

class ArticlePageManager {
  constructor() {
    this.articleContainer = document.getElementById('article-content');
    this.sidebarContainer = document.getElementById('article-sidebar');
    this.relatedSection = document.getElementById('related-articles-section');
    this.relatedGrid = document.getElementById('related-articles-grid');
    this.article = null;
  }

  async init() {
    const { categorySlug, articleSlug } = this.getSlugsFromUrl();

    if (!articleSlug) {
      this.showError('Article not found');
      return;
    }

    try {
      this.article = await this.fetchArticle(articleSlug);

      if (!this.article) {
        this.showError('Article not found');
        return;
      }

      // Update page
      this.updatePageMeta();
      this.renderArticle();
      this.renderSidebar();
      await this.loadRelatedArticles();

    } catch (error) {
      console.error('Error loading article:', error);
      this.showError('Failed to load article');
    }
  }

  /**
   * Extract category and article slugs from URL
   */
  getSlugsFromUrl() {
    const path = window.location.pathname;
    const parts = path.split('/').filter(p => p);
    
    return {
      categorySlug: parts[0] || null,
      articleSlug: parts[1] || null
    };
  }

  /**
   * Fetch article by slug
   */
  async fetchArticle(slug) {
    const url = getApiUrl(
      `/articles?filters[slug][$eq]=${slug}&populate[category]=true&populate[image]=true&populate[tags]=true`
    );
    const response = await fetch(url);
    const data = await response.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  }

  /**
   * Update page title and meta
   */
  updatePageMeta() {
    document.title = `${this.article.title} - Finance24x`;
    
    // Update meta description
    const metaDesc = document.getElementById('meta-description');
    if (metaDesc) {
      metaDesc.setAttribute('content', this.article.excerpt || this.truncateText(this.article.content, 160));
    }

    // Update breadcrumb
    const categoryLink = document.getElementById('breadcrumb-category-link');
    const articleBreadcrumb = document.getElementById('breadcrumb-article');
    
    if (this.article.category) {
      categoryLink.textContent = this.article.category.name;
      categoryLink.href = `/${this.article.category.slug}`;
    }
    
    articleBreadcrumb.textContent = this.truncateText(this.article.title, 50);
  }

  /**
   * Render article content
   */
  renderArticle() {
    const hasImage = this.article.image?.url;
    const imageUrl = hasImage ? `${API_CONFIG.BASE_URL}${this.article.image.url}` : '';
    const categoryName = this.article.category?.name || 'Article';
    const categorySlug = this.article.category?.slug || 'article';
    const readTime = this.article.minutesToread || 3;
    const publishDate = this.formatDate(this.article.publishedDate);
    const author = this.article.author || 'Admin';

    // Render tags
    const tagsHtml = this.article.tags && this.article.tags.length > 0
      ? `<div class="article-tags">
          ${this.article.tags.map(tag => 
            `<a href="/tag/${tag.slug}" class="article-tag">${tag.name}</a>`
          ).join('')}
        </div>`
      : '';

    this.articleContainer.innerHTML = `
      <header class="article-header">
        <a href="/${categorySlug}" class="article-category">${categoryName}</a>
        <h1 class="article-title">${this.article.title}</h1>
        <div class="article-meta">
          <span class="meta-author">
            <i class="fa fa-user"></i> ${author}
          </span>
          <span class="meta-separator">•</span>
          <span class="meta-date">
            <i class="fa fa-calendar"></i> ${publishDate}
          </span>
          <span class="meta-separator">•</span>
          <span class="meta-read-time">
            <i class="fa fa-clock-o"></i> ${readTime} min read
          </span>
        </div>
      </header>

      ${hasImage ? `
      <div class="article-featured-image">
        <img src="${imageUrl}" alt="${this.article.title}">
      </div>
      ` : ''}

      <div class="article-body">
        ${this.article.content || '<p>No content available.</p>'}
      </div>

      ${tagsHtml}

      <div class="article-share">
        <span class="share-label">Share:</span>
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.article.title)}" target="_blank" class="share-btn twitter">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn facebook">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(this.article.title)}" target="_blank" class="share-btn linkedin">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="mailto:?subject=${encodeURIComponent(this.article.title)}&body=${encodeURIComponent(window.location.href)}" class="share-btn email">
            <i class="fa fa-envelope"></i>
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Render sidebar
   */
  renderSidebar() {
    const categoryName = this.article.category?.name || 'Articles';
    const categorySlug = this.article.category?.slug || '';

    this.sidebarContainer.innerHTML = `
      <div class="sidebar-widget sidebar-about">
        <h4 class="widget-title">About This Article</h4>
        <div class="about-stats">
          <div class="stat-item">
            <i class="fa fa-clock-o"></i>
            <span>${this.article.minutesToread || 3} min read</span>
          </div>
          <div class="stat-item">
            <i class="fa fa-calendar"></i>
            <span>${this.formatDate(this.article.publishedDate)}</span>
          </div>
          <div class="stat-item">
            <i class="fa fa-folder-o"></i>
            <a href="/${categorySlug}">${categoryName}</a>
          </div>
        </div>
      </div>

      ${this.article.tags && this.article.tags.length > 0 ? `
      <div class="sidebar-widget sidebar-tags">
        <h4 class="widget-title">Tags</h4>
        <div class="tags-list">
          ${this.article.tags.map(tag => 
            `<a href="/tag/${tag.slug}" class="sidebar-tag">${tag.name}</a>`
          ).join('')}
        </div>
      </div>
      ` : ''}

      <div class="sidebar-widget sidebar-category">
        <h4 class="widget-title">More from ${categoryName}</h4>
        <a href="/${categorySlug}" class="category-link">
          View all articles <i class="fa fa-arrow-right"></i>
        </a>
      </div>
    `;
  }

  /**
   * Load related articles
   */
  async loadRelatedArticles() {
    if (!this.article.category) return;

    try {
      const url = getApiUrl(
        `/articles?filters[category][documentId][$eq]=${this.article.category.documentId}&filters[slug][$ne]=${this.article.slug}&populate[image]=true&populate[category]=true&pagination[limit]=4&sort=publishedDate:desc`
      );
      const response = await fetch(url);
      const data = await response.json();
      const articles = data.data || [];

      if (articles.length > 0) {
        this.relatedSection.style.display = 'block';
        this.relatedGrid.innerHTML = articles.map(article => this.renderRelatedCard(article)).join('');
      }
    } catch (error) {
      console.error('Error loading related articles:', error);
    }
  }

  /**
   * Render related article card
   */
  renderRelatedCard(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage
      ? `<img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}">`
      : '<div class="related-card-placeholder"></div>';
    
    const categorySlug = article.category?.slug || 'article';
    const readTime = article.minutesToread || 3;

    return `
      <div class="related-card">
        <div class="related-card-image">
          <a href="/${categorySlug}/${article.slug}">${imageHtml}</a>
        </div>
        <div class="related-card-content">
          <h4 class="related-card-title">
            <a href="/${categorySlug}/${article.slug}">${article.title}</a>
          </h4>
          <div class="related-card-meta">
            <span>${readTime} min read</span>
            <span class="separator">•</span>
            <span>${this.formatDate(article.publishedDate)}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Show error message
   */
  showError(message) {
    document.title = 'Article Not Found - Finance24x';
    this.articleContainer.innerHTML = `
      <div class="article-error">
        <i class="fa fa-exclamation-circle"></i>
        <h2>Article Not Found</h2>
        <p>${message}</p>
        <div class="error-actions">
          <a href="/" class="error-btn primary">Go to Homepage</a>
          <a href="javascript:history.back()" class="error-btn secondary">Go Back</a>
        </div>
      </div>
    `;
    this.sidebarContainer.style.display = 'none';
  }

  /**
   * Format date
   */
  formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  /**
   * Truncate text
   */
  truncateText(text, maxLength) {
    if (!text) return '';
    const stripped = text.replace(/<[^>]*>/g, '');
    if (stripped.length <= maxLength) return stripped;
    return stripped.substr(0, maxLength).trim() + '...';
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const manager = new ArticlePageManager();
  manager.init();
});

