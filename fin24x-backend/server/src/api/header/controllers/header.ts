/**
 * header controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::header.header', ({ strapi }) => ({
  async find(ctx) {
    // Ensure deep population for navigationCategories and header_article
    const { query } = ctx;
    
    let populate: any = query.populate;
    
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        logo: {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
        navigationCategories: {
          sort: ['order:asc'], // Sort categories by order
        },
        header_article: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            category: {
              fields: ['name', 'slug'],
            },
          },
        },
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      query.populate = {
        ...populate,
        logo: (populate as any).logo || {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
        navigationCategories: {
          sort: ['order:asc'],
          ...((populate as any).navigationCategories || {}),
        },
        header_article: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            category: {
              fields: ['name', 'slug'],
            },
            ...((populate as any).header_article?.populate || {}),
          },
          ...((populate as any).header_article || {}),
        },
      };
    } else {
      // Even if populate is not specified, ensure header_article is populated
      const existingPopulate = typeof query.populate === 'object' && query.populate !== null ? query.populate : {};
      query.populate = {
        ...existingPopulate,
        header_article: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            category: {
              fields: ['name', 'slug'],
            },
          },
        },
      };
    }

    return await super.find(ctx);
  },
  async findOne(ctx) {
    // Ensure deep population for navigationCategories and header_article
    const { query } = ctx;
    
    let populate: any = query.populate;
    
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        logo: {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
        navigationCategories: {
          sort: ['order:asc'], // Sort categories by order
        },
        header_article: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            category: {
              fields: ['name', 'slug'],
            },
          },
        },
      };
      query.populate = populate;
    } else if (typeof populate === 'object' && populate !== null) {
      query.populate = {
        ...populate,
        logo: (populate as any).logo || {
          fields: ['url', 'alternativeText', 'width', 'height'],
        },
        navigationCategories: {
          sort: ['order:asc'],
          ...((populate as any).navigationCategories || {}),
        },
        header_article: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            category: {
              fields: ['name', 'slug'],
            },
            ...((populate as any).header_article?.populate || {}),
          },
          ...((populate as any).header_article || {}),
        },
      };
    } else {
      // Even if populate is not specified, ensure header_article is populated
      const existingPopulate = typeof query.populate === 'object' && query.populate !== null ? query.populate : {};
      query.populate = {
        ...existingPopulate,
        header_article: {
          populate: {
            image: {
              fields: ['url', 'alternativeText', 'width', 'height'],
            },
            category: {
              fields: ['name', 'slug'],
            },
          },
        },
      };
    }

    return await super.findOne(ctx);
  },
}));

