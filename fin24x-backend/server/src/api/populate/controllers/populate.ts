/**
 * populate controller
 * Provides endpoints to manually populate initial data
 */

import type { Core } from '@strapi/strapi';
import { createDefaultCategories, createHomepageSections } from '../../../utils/populate-data';
import { seedArticles } from '../../../utils/seed-articles';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async populateCategories(ctx) {
    try {
      const result = await createDefaultCategories(strapi);
      ctx.body = {
        success: true,
        message: 'Categories populated successfully',
        data: result,
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error populating categories',
        error: error?.message || error,
      };
    }
  },

  async populateHomepageSections(ctx) {
    try {
      const result = await createHomepageSections(strapi);
      ctx.body = {
        success: true,
        message: 'Homepage sections populated successfully',
        data: result,
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error populating homepage sections',
        error: error?.message || error,
      };
    }
  },

  async populateAll(ctx) {
    try {
      const categoriesResult = await createDefaultCategories(strapi);
      const sectionsResult = await createHomepageSections(strapi);
      
      ctx.body = {
        success: true,
        message: 'All data populated successfully',
        data: {
          categories: categoriesResult,
          homepageSections: sectionsResult,
        },
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error populating data',
        error: error?.message || error,
      };
    }
  },

  async populateArticles(ctx) {
    try {
      const result = await seedArticles(strapi);
      ctx.body = {
        success: true,
        message: 'Articles seeded successfully',
        data: result,
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding articles',
        error: error?.message || error,
      };
    }
  },
});
