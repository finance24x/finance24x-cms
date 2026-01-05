/**
 * homepage-section controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage-section.homepage-section', ({ strapi }) => ({
  async find(ctx) {
    // Ensure deep population for category
    const { query } = ctx;
    
    let populate: any = query.populate;
    
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        category: '*',
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      query.populate = {
        ...populate,
        category: (populate as any).category || '*',
      };
    }

    return await super.find(ctx);
  },
  async findOne(ctx) {
    // Ensure deep population for category
    const { query } = ctx;
    
    let populate: any = query.populate;
    
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        category: '*',
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      query.populate = {
        ...populate,
        category: (populate as any).category || '*',
      };
    }

    return await super.findOne(ctx);
  },
}));
