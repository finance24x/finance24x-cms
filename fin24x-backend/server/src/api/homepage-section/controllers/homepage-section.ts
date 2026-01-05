/**
 * homepage-section controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage-section.homepage-section', ({ strapi }) => ({
  async find(ctx) {
    // Ensure deep population for all component fields and their media
    const { query } = ctx;
    
    // Parse populate from query string if it's a string
    let populate = query.populate;
    
    // If populate is '*' or true, expand it to include nested media fields
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        gridItems: {
          populate: {
            image: '*',
          },
        },
        gridItemsWithDate: {
          populate: {
            image: '*',
          },
        },
        newsItems: {
          populate: {
            image: '*',
          },
        },
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      // Merge with existing populate
      query.populate = {
        ...populate,
        gridItems: {
          populate: {
            image: '*',
          },
        },
        gridItemsWithDate: {
          populate: {
            image: '*',
          },
        },
        newsItems: {
          populate: {
            image: '*',
          },
        },
      };
    }

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  async findOne(ctx) {
    // Ensure deep population for all component fields and their media
    const { query } = ctx;
    
    // Parse populate from query string if it's a string
    let populate = query.populate;
    
    // If populate is '*' or true, expand it to include nested media fields
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        gridItems: {
          populate: {
            image: '*',
          },
        },
        gridItemsWithDate: {
          populate: {
            image: '*',
          },
        },
        newsItems: {
          populate: {
            image: '*',
          },
        },
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      // Merge with existing populate
      query.populate = {
        ...populate,
        gridItems: {
          populate: {
            image: '*',
          },
        },
        gridItemsWithDate: {
          populate: {
            image: '*',
          },
        },
        newsItems: {
          populate: {
            image: '*',
          },
        },
      };
    }

    const { data, meta } = await super.findOne(ctx);
    return { data, meta };
  },
}));

