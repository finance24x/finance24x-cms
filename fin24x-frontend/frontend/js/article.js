/**
 * Article Page - Dynamic content loader
 * Fetches article content from Strapi based on URL: /{category}/{article-slug}
 */

class ArticlePageManager {
  constructor() {
    this.articleContainer = document.getElementById('article-content');
    this.sidebarContainer = document.getElementById('article-sidebar');
    this.article = null;
    this.categories = [];
  }

  async init() {
    const { categorySlug, articleSlug } = this.getSlugsFromUrl();

    if (!articleSlug) {
      this.showError('Article not found');
      return;
    }

    try {
      // Fetch article and sidebar data in parallel
      const [article, latestArticles, tags] = await Promise.all([
        this.fetchArticle(articleSlug),
        this.fetchLatestArticles(),
        this.fetchPopularTags()
      ]);

      this.article = article;

      if (!this.article) {
        this.showError('Article not found');
        return;
      }

      // Increment view count and update the article's view count
      const updatedViews = await this.incrementViewCount();
      if (updatedViews !== null) {
        this.article.views = updatedViews;
      } else {
        // If increment failed, at least show current views + 1
        this.article.views = (this.article.views || 0) + 1;
      }

      // Fetch related articles from the same category (after we know the category)
      const relatedArticles = await this.fetchRelatedArticles();

      // Update page
      this.updatePageMeta();
      this.renderArticle();
      this.renderSidebar(latestArticles, relatedArticles, tags);

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
   * Fetch latest articles for sidebar (10 articles, show 5 with scroll)
   */
  async fetchLatestArticles() {
    const url = getApiUrl('/articles?populate[image]=true&populate[category]=true&pagination[limit]=10&sort=publishedDate:desc');
    const response = await fetch(url);
    const data = await response.json();
    return data.data || [];
  }

  /**
   * Fetch related articles from the same category (5 articles, excluding current)
   */
  async fetchRelatedArticles() {
    if (!this.article?.category?.documentId) return [];
    
    try {
      const categoryDocId = this.article.category.documentId;
      const currentArticleId = this.article.documentId;
      
      const url = getApiUrl(
        `/articles?populate[image]=true&populate[category]=true&filters[category][documentId][$eq]=${categoryDocId}&filters[documentId][$ne]=${currentArticleId}&pagination[limit]=5&sort=publishedDate:desc`
      );
      const response = await fetch(url);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch related articles:', error);
      return [];
    }
  }

  /**
   * Increment view count for the current article
   * @returns {Promise<number|null>} The new view count, or null if failed
   */
  async incrementViewCount() {
    if (!this.article?.documentId) return null;
    
    try {
      const url = getApiUrl(`/articles/${this.article.documentId}/view`);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const result = await response.json();
        return result.data?.views || null;
      }
      return null;
    } catch (error) {
      console.error('Failed to increment view count:', error);
      return null;
    }
  }

  /**
   * Fetch popular tags
   */
  async fetchPopularTags() {
    try {
      const url = getApiUrl('/popular-tag?populate[tags]=true');
      const response = await fetch(url);
      const data = await response.json();
      return data.data?.tags || [];
    } catch (e) {
      return [];
    }
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
    
    articleBreadcrumb.textContent = this.truncateText(this.article.title, 40);
  }

  /**
   * Render article content
   */
  renderArticle() {
    const hasImage = this.article.image?.url;
    const imageUrl = hasImage ? `${API_CONFIG.BASE_URL}${this.article.image.url}` : '';
    const publishDate = this.formatDateLong(this.article.publishedDate);
    const author = this.article.author || 'admin';
    const views = this.article.views || 0;
    const readTime = this.article.minutesToread || 3;

    // Build tags for footer
    const tagsHtml = this.article.tags && this.article.tags.length > 0
      ? this.article.tags.map(tag => 
          `<a href="/tag/${tag.slug}">${tag.name}</a>`
        ).join(', ')
      : '';

    this.articleContainer.innerHTML = `
      <h1 class="article-title">${this.article.title}</h1>
      
      <div class="article-meta">
        <span>Post on <a href="#">${publishDate}</a></span>
        <span class="meta-separator">|</span>
        <span>By <a href="#">${author}</a></span>
        <span class="meta-separator">|</span>
        <span><i class="fa fa-eye"></i> ${this.formatViews(views)} views</span>
        <span class="meta-separator">|</span>
        <span><i class="fa fa-clock-o"></i> ${readTime} min read</span>
      </div>

      ${hasImage ? `
      <div class="article-featured-image">
        <img src="${imageUrl}" alt="${this.article.title}">
      </div>
      ` : ''}

      ${this.article.excerpt ? `
      <div class="article-excerpt-quote">
        <span class="excerpt-bar"></span>
        <p class="excerpt-text">${this.article.excerpt}</p>
      </div>
      ` : ''}

      <!-- First Ad: Below Excerpt -->
      <div class="article-inline-ad">
        <div class="inline-ad-box">
          <span>Advertisement</span>
        </div>
      </div>

      <div class="article-body">
        ${this.formatContent(this.article.content)}
      </div>

      <div class="article-footer">
        ${tagsHtml ? `
        <div class="article-tags-footer">
          <span class="tags-label">Tags:</span>
          ${tagsHtml}
        </div>
        ` : ''}
        
        <div class="article-share">
          <span class="share-label">Share:</span>
          <div class="share-buttons">
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn">
              <i class="fa fa-facebook"></i>
            </a>
            <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(this.article.title)}" target="_blank" class="share-btn">
              <i class="fa fa-twitter"></i>
            </a>
            <a href="https://plus.google.com/share?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn">
              <i class="fa fa-google-plus"></i>
            </a>
            <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(this.article.title)}" target="_blank" class="share-btn">
              <i class="fa fa-linkedin"></i>
            </a>
            <a href="mailto:?subject=${encodeURIComponent(this.article.title)}&body=${encodeURIComponent(window.location.href)}" class="share-btn">
              <i class="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Article Ad Space (Below Share) -->
      <div class="article-ad-placeholder">
        <div class="article-ad-box">
          <span>Advertisement</span>
        </div>
      </div>
    `;
  }

  /**
   * Format content - handle HTML or plain text
   */
  formatContent(content) {
    if (!content) return '<p>No content available.</p>';
    
    let html = '';
    
    // Check if marked library is available
    if (typeof marked !== 'undefined') {
      // Configure marked options
      marked.setOptions({
        breaks: true,        // Convert \n to <br>
        gfm: true,           // GitHub Flavored Markdown
        headerIds: true,     // Add IDs to headers
        mangle: false,       // Don't mangle email addresses
      });
      
      // Parse Markdown to HTML
      html = marked.parse(content);
    } else if (content.includes('<p>') || content.includes('<div>')) {
      // Fallback: If content is already HTML, use as is
      html = content;
    } else {
      // Fallback: wrap in paragraphs
      html = content.split('\n\n').map(p => `<p>${p}</p>`).join('');
    }
    
    return html;
  }

  /**
   * Render sidebar with latest articles and tags (no categories)
   */
  renderSidebar(latestArticles, relatedArticles, tags) {
    // Get current article's category for "View All" link
    const category = this.article?.category;
    const viewAllHtml = category 
      ? `<a href="/${category.slug}" class="view-all-link">View All →</a>`
      : '';

    // Latest Articles HTML
    const latestHtml = latestArticles.length > 0
      ? latestArticles.map(article => this.renderSidebarArticle(article)).join('')
      : '<p>No articles</p>';

    // Related Articles HTML (same category)
    const relatedHtml = relatedArticles.length > 0
      ? relatedArticles.map(article => this.renderSidebarArticle(article)).join('')
      : '';

    // Tags HTML
    const tagsHtml = tags.length > 0
      ? tags.map(tag => 
          `<a href="/tag/${tag.slug}" class="sidebar-tag">${tag.name}</a>`
        ).join('')
      : '';

    this.sidebarContainer.innerHTML = `
      <!-- Ad Placeholder 1 (Top) -->
      <div class="sidebar-section sidebar-ad-placeholder">
        <div class="ad-placeholder-box">
          <span>Ad Space</span>
        </div>
      </div>

      <!-- Latest Articles -->
      <div class="sidebar-section">
        <h3 class="sidebar-section-title">Latest Articles</h3>
        <div class="latest-articles latest-articles-scrollable">
          ${latestHtml}
        </div>
      </div>

      <!-- Ad Placeholder 2 -->
      <div class="sidebar-section sidebar-ad-placeholder">
        <div class="ad-placeholder-box ad-placeholder-small">
          <span>Ad Space</span>
        </div>
      </div>

      ${relatedHtml ? `
      <!-- Related Articles (Same Category) -->
      <div class="sidebar-section">
        <div class="sidebar-section-header">
          <h3 class="sidebar-section-title">Related Articles</h3>
          ${viewAllHtml}
        </div>
        <div class="latest-articles">
          ${relatedHtml}
        </div>
      </div>
      ` : ''}

      ${tagsHtml ? `
      <!-- Tags -->
      <div class="sidebar-section">
        <h3 class="sidebar-section-title">Tags</h3>
        <div class="sidebar-tags-list">
          ${tagsHtml}
        </div>
      </div>

      <!-- Ad Placeholder 3 (Below Tags) -->
      <div class="sidebar-section sidebar-ad-placeholder">
        <div class="ad-placeholder-box">
          <span>Ad Space</span>
        </div>
      </div>
      ` : ''}
    `;
  }

  /**
   * Render a single sidebar article item (used for Latest & Related)
   */
  renderSidebarArticle(article) {
    const hasImage = article.image?.url;
    const imageHtml = hasImage
      ? `<img src="${API_CONFIG.BASE_URL}${article.image.url}" alt="${article.title}">`
      : '<div class="latest-article-image-placeholder"></div>';
    const categorySlug = article.category?.slug || 'article';
    const date = this.formatDateLong(article.publishedDate);
    const views = article.views || 0;
    
    return `
      <div class="latest-article">
        <div class="latest-article-image">
          <a href="/${categorySlug}/${article.slug}">${imageHtml}</a>
        </div>
        <div class="latest-article-content">
          <h4 class="latest-article-title">
            <a href="/${categorySlug}/${article.slug}">${article.title}</a>
          </h4>
          <div class="latest-article-meta">
            <span class="latest-article-date">${date}</span>
            <span class="latest-article-views"><i class="fa fa-eye"></i> ${this.formatViews(views)}</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Format views count (e.g., 1500 -> 1.5K)
   */
  formatViews(views) {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(1) + 'K';
    }
    return views.toString();
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
   * Format date - long format (May 5, 2018)
   */
  formatDateLong(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'long',
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
