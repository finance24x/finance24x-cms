/**
 * populate controller
 * Provides endpoints to manually populate initial data
 */

import type { Core } from '@strapi/strapi';
import { seedCategories } from '../../../seed/category/code';
import { seedHomepageSections } from '../../../seed/homepage-section/code';
import { seedArticles } from '../../../seed/articles/code';
import { seedTagGroups } from '../../../seed/tag-group/code';
import { seedTags } from '../../../seed/tag/code';
import { seedStaticPages } from '../../../seed/static-page/code';
import { seedCalculators } from '../../../seed/calculator/code';
import { seedRateData } from '../../../seed/rate-data/code';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  async populateCategories(ctx) {
    try {
      // Accept JSON array from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = Array.isArray(requestData.categories) ? requestData.categories : undefined;
      
      const result = await seedCategories(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Categories seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
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
      // Accept JSON config from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = (requestData.sectionTypes || requestData.categoryTypeOverrides || requestData.sectionDefaults)
        ? {
            sectionTypes: requestData.sectionTypes,
            categoryTypeOverrides: requestData.categoryTypeOverrides,
            sectionDefaults: requestData.sectionDefaults,
          }
        : undefined;
      
      const result = await seedHomepageSections(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Homepage sections seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
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
      const requestData = ctx.request.body;
      
      // Extract data for each seed function
      const categoriesData = Array.isArray(requestData.categories) ? requestData.categories : undefined;
      const sectionsConfig = (requestData.sectionTypes || requestData.categoryTypeOverrides || requestData.sectionDefaults)
        ? {
            sectionTypes: requestData.sectionTypes,
            categoryTypeOverrides: requestData.categoryTypeOverrides,
            sectionDefaults: requestData.sectionDefaults,
          }
        : undefined;
      
      const categoriesResult = await seedCategories(strapi, categoriesData);
      const sectionsResult = await seedHomepageSections(strapi, sectionsConfig);
      
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
      // Accept JSON from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = requestData.articles ? { articles: requestData.articles } : undefined;
      
      const result = await seedArticles(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Articles seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
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
      // Accept JSON array from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = Array.isArray(requestData.tags) ? requestData.tags : undefined;
      
      const result = await seedTags(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Tags seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
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

  async populateTagGroups(ctx) {
    try {
      // Accept JSON array from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = Array.isArray(requestData.tagGroups) ? requestData.tagGroups : undefined;
      
      const result = await seedTagGroups(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Tag groups seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding tag groups',
        error: error?.message || error,
      };
    }
  },

  async populateTagsWithGroups(ctx) {
    try {
      const requestData = ctx.request.body;
      
      // Extract data for each seed function
      const tagGroupsData = Array.isArray(requestData.tagGroups) ? requestData.tagGroups : undefined;
      const tagsData = Array.isArray(requestData.tags) ? requestData.tags : undefined;
      
      // First seed tag groups, then tags
      const tagGroupsResult = await seedTagGroups(strapi, tagGroupsData);
      const tagsResult = await seedTags(strapi, tagsData);
      
      ctx.body = {
        success: true,
        message: 'Tag groups and tags seeded successfully',
        data: {
          tagGroups: tagGroupsResult,
          tags: tagsResult,
        },
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding tag groups and tags',
        error: error?.message || error,
      };
    }
  },

  async populateStaticPages(ctx) {
    try {
      // Accept JSON array from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = Array.isArray(requestData.staticPages) ? requestData.staticPages : undefined;
      
      const result = await seedStaticPages(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Static pages seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding static pages',
        error: error?.message || error,
      };
    }
  },

  async populateCalculators(ctx) {
    try {
      // Accept JSON array from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = Array.isArray(requestData.calculators) ? requestData.calculators : undefined;
      
      const result = await seedCalculators(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Calculators seeded successfully',
        data: result,
        dataSource: inputData ? 'request body' : 'file',
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding calculators',
        error: error?.message || error,
      };
    }
  },

  async populateRateData(ctx) {
    try {
      // Accept JSON data from request body, or use file data if not provided
      const requestData = ctx.request.body;
      const inputData = (requestData.metals || requestData.countries || requestData.states || requestData.cities) 
        ? {
            metals: requestData.metals,
            countries: requestData.countries,
            states: requestData.states,
            cities: requestData.cities,
          }
        : undefined;

      await seedRateData(strapi, inputData);
      ctx.body = {
        success: true,
        message: 'Rate data (Metals, Countries, States, Cities) seeded successfully',
        dataSource: inputData ? 'request body' : 'file',
      };
    } catch (error: any) {
      ctx.status = 500;
      ctx.body = {
        success: false,
        message: 'Error seeding rate data',
        error: error?.message || error,
      };
    }
  },
});
