/**
 * footer controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::footer.footer', ({ strapi }) => ({
  async find(ctx) {
    // Ensure media fields in components are populated
    const { query } = ctx;
    
    // Parse populate from query string if it's a string
    let populate = query.populate;
    
    // If populate is '*' or true, expand it to include nested media fields
    if (populate === '*' || populate === true || (typeof populate === 'string' && populate.includes('*'))) {
      populate = {
        appDownloads: {
          populate: {
            badgeImage: {
              populate: '*',
            },
          },
        },
        socialLinks: true,
        contactInfo: true,
        quickLinksColumn1: true,
        quickLinksColumn2: true,
        bottomLinks: true,
        logo: {
          populate: '*',
        },
      };
      query.populate = populate;
    }

    const { data, meta } = await super.find(ctx);
    
    // Log for debugging
    if (data && data.appDownloads) {
      console.log('Footer appDownloads:', JSON.stringify(data.appDownloads, null, 2));
    }
    
    return { data, meta };
  },
}));

