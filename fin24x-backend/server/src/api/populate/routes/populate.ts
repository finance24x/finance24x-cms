/**
 * populate router
 * Custom routes for data population utilities
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/populate/categories',
      handler: 'populate.populateCategories',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/homepage-sections',
      handler: 'populate.populateHomepageSections',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/all',
      handler: 'populate.populateAll',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/articles',
      handler: 'populate.populateArticles',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/tags',
      handler: 'populate.populateTags',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/tag-groups',
      handler: 'populate.populateTagGroups',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/tags-with-groups',
      handler: 'populate.populateTagsWithGroups',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/static-pages',
      handler: 'populate.populateStaticPages',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/calculators',
      handler: 'populate.populateCalculators',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
    {
      method: 'POST',
      path: '/populate/rate-data',
      handler: 'populate.populateRateData',
      config: {
        policies: [],
        middlewares: [],
        auth: false, // Allow public access for manual population
      },
    },
  ],
};

