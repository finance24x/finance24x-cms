/**
 * Custom calculator routes
 */

export default {
  routes: [
    {
      method: 'POST',
      path: '/calculators/:id/view',
      handler: 'calculator.incrementView',
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};

