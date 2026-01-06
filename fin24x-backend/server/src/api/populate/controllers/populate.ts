/**
 * populate controller
 * Provides endpoints to manually populate initial data
 */

import type { Core } from '@strapi/strapi';
import { seedCategories } from '../../../seed/category/code';
import { seedHomepageSections } from '../../../seed/homepage-section/code';
import { seedArticles } from '../../../seed/articles/code';
import { seedTags } from '../../../seed/tag/code';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async populateCategories(ctx) {
    try {
      const result = await seedCategories(strapi);
      ctx.body = {
        success: true,
        message: 'Categories seeded successfully',
        data: result,
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding categories',
        error: error?.message || error,
      };
    }
  },

  async populateHomepageSections(ctx) {
    try {
      const result = await seedHomepageSections(strapi);
      ctx.body = {
        success: true,
        message: 'Homepage sections seeded successfully',
        data: result,
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding homepage sections',
        error: error?.message || error,
      };
    }
  },

  async populateAll(ctx) {
    try {
      const categoriesResult = await seedCategories(strapi);
      const sectionsResult = await seedHomepageSections(strapi);
      
      ctx.body = {
        success: true,
        message: 'All data seeded successfully',
        data: {
          categories: categoriesResult,
          homepageSections: sectionsResult,
        },
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding data',
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

  async populateTags(ctx) {
    try {
      const result = await seedTags(strapi);
      ctx.body = {
        success: true,
        message: 'Tags seeded successfully',
        data: result,
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding tags',
        error: error?.message || error,
      };
    }
  },
});
