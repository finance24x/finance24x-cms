/**
 * header service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::header.header', ({ strapi }) => ({
  async update(params, data) {
    // Ensure navigationLinks component data is properly structured
    if (data.navigationLinks && Array.isArray(data.navigationLinks)) {
      // Filter out any null or undefined entries
      data.navigationLinks = data.navigationLinks.filter(
        (link: any) => link !== null && link !== undefined
      );
    }
    
    return await super.update(params, data);
  },
}));

