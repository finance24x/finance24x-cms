/**
 * calculator controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::calculator.calculator', ({ strapi }) => ({
  /**
   * Increment view count for a calculator
   * POST /api/calculators/:id/view
   */
  async incrementView(ctx) {
    const { id } = ctx.params;

    try {
      // Find the calculator by documentId (get published version)
      const calculator = await strapi.documents('api::calculator.calculator').findOne({
        documentId: id,
        fields: ['views'],
        status: 'published',
      });

      if (!calculator) {
        return ctx.notFound('Calculator not found');
      }

      // Increment the view count using raw query to avoid draft/publish issues
      const currentViews = Number(calculator.views) || 0;
      const newViews = currentViews + 1;

      // Use entityService to update and publish in one go
      await strapi.db.query('api::calculator.calculator').updateMany({
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

