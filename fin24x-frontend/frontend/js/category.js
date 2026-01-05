/**
 * Category Page Manager
 * Fetches and renders articles for a specific category
 */

class CategoryPageManager {
  constructor() {
    this.articlesGrid = document.getElementById('articles-grid');
    this.paginationContainer = document.getElementById('pagination-container');
    this.pagination = document.getElementById('pagination');
    this.currentPage = 1;
    this.pageSize = 12;
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

    try {
      // Fetch category details
      this.category = await this.fetchCategory(slug);
      
      if (!this.category) {
        this.showError('Category not found');
        return;
      }

      // Update page with category info
      this.updateCategoryInfo();
      
      // Fetch and render articles
      await this.loadArticles();
      
    } catch (error) {
      console.error('Error loading category:', error);
      this.showError('Failed to load category');
    }
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
      `/articles?populate=category&filters[category][documentId][$eq]=${this.category.documentId}&pagination[start]=${start}&pagination[limit]=${this.pageSize}&sort=publishedDate:desc`
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
    
    // Update category header
    document.getElementById('category-title').textContent = this.category.name;
    document.getElementById('category-description').textContent = this.category.description || '';
    document.getElementById('breadcrumb-category').textContent = this.category.name;
  }

  /**
   * Load and render articles
   */
  async loadArticles() {
    // Show loading
    this.articlesGrid.innerHTML = `
      <div class="loading-container" style="grid-column: 1 / -1;">
        <div class="spinner"></div>
        <p>Loading articles...</p>
      </div>
    `;

    const articles = await this.fetchArticles(this.currentPage);
    
    if (articles.length === 0) {
      this.articlesGrid.innerHTML = `
        <div class="no-articles">
          <h3>No articles found</h3>
          <p>There are no articles in this category yet.</p>
        </div>
      `;
      this.paginationContainer.style.display = 'none';
      return;
    }

    // Render articles
    this.articlesGrid.innerHTML = articles.map(article => this.renderArticleCard(article)).join('');
    
    // Render pagination
    this.renderPagination();
  }

  /**
   * Render a single article card
   */
  renderArticleCard(article) {
    const date = article.publishedDate 
      ? new Date(article.publishedDate).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : '';

    const excerpt = article.excerpt || this.truncateText(article.content, 120);

    return `
      <div class="article-card">
        <div class="article-card-body">
          <h3 class="article-card-title">
            <a href="/blog_single.html?slug=${article.slug}">${article.title}</a>
          </h3>
          <div class="article-card-meta">
            <span>${article.author || 'Admin'}</span>
            <span class="separator">•</span>
            <span>${date}</span>
          </div>
          <p class="article-card-excerpt">${excerpt}</p>
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

