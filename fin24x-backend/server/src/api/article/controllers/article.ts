/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  /**
   * Increment view count for an article
   * POST /api/articles/:id/view
   */
  async incrementView(ctx) {
    const { id } = ctx.params;

    try {
      // Find the article by documentId (get published version)
      const article = await strapi.documents('api::article.article').findOne({
        documentId: id,
        fields: ['views'],
        status: 'published',
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      // Increment the view count using raw query to avoid draft/publish issues
      const currentViews = article.views || 0;
      const newViews = currentViews + 1;

      // Use entityService to update and publish in one go
      await strapi.db.query('api::article.article').updateMany({
        where: { documentId: id },
        data: { views: newViews },
      });

      return ctx.send({
        data: {
          views: newViews,
        },
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
      return ctx.badRequest('Failed to increment view count');
    }
  },
}));
