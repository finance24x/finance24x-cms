/**
 * article controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::article.article', ({ strapi }) => ({
  async find(ctx) {
    // Ensure deep population for category and image
    const { query } = ctx;
    
    let populate: any = query.populate;
    
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        category: '*',
        image: '*',
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      query.populate = {
        ...populate,
        category: (populate as any).category || '*',
        image: (populate as any).image || '*',
      };
    }

    // Default sorting by publishedDate (latest first) if not specified
    if (!query.sort) {
      query.sort = { publishedDate: 'desc' };
    }

    return await super.find(ctx);
  },
  async findOne(ctx) {
    // Ensure deep population for category and image
    const { query } = ctx;
    
    let populate: any = query.populate;
    
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        category: '*',
        image: '*',
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      query.populate = {
        ...populate,
        category: (populate as any).category || '*',
        image: (populate as any).image || '*',
      };
    }

    return await super.findOne(ctx);
  },
}));

