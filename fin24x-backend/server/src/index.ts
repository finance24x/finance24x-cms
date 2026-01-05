import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *  
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set public permissions for header and footer
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        // Get all permissions for public role
        const permissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: {
              role: publicRole.id,
              action: { $in: ['api::header.header.find', 'api::header.header.findOne', 'api::footer.footer.find', 'api::footer.footer.findOne', 'api::market-ticker.market-ticker.find', 'api::market-ticker.market-ticker.findOne', 'api::homepage-section.homepage-section.find', 'api::homepage-section.homepage-section.findOne', 'api::article.article.find', 'api::article.article.findOne', 'api::category.category.find', 'api::category.category.findOne'] },
            },
          });

        // Enable permissions for header
        const headerFind = permissions.find(p => p.action === 'api::header.header.find');
        const headerFindOne = permissions.find(p => p.action === 'api::header.header.findOne');

        if (headerFind && !headerFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: headerFind.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for header.find');
        }

        if (headerFindOne && !headerFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: headerFindOne.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for header.findOne');
        }

        // Enable permissions for footer
        const footerFind = permissions.find(p => p.action === 'api::footer.footer.find');
        const footerFindOne = permissions.find(p => p.action === 'api::footer.footer.findOne');

        if (footerFind && !footerFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: footerFind.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for footer.find');
        }

        if (footerFindOne && !footerFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: footerFindOne.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for footer.findOne');
        }

        // Create permissions if they don't exist
        const allPermissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({
            where: { role: publicRole.id },
          });

        const permissionActions = allPermissions.map(p => p.action);

        if (!permissionActions.includes('api::header.header.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::header.header.find',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for header.find');
        }

        if (!permissionActions.includes('api::header.header.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::header.header.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for header.findOne');
        }

        if (!permissionActions.includes('api::footer.footer.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::footer.footer.find',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for footer.find');
        }

        if (!permissionActions.includes('api::footer.footer.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::footer.footer.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for footer.findOne');
        }

        // Enable permissions for market-ticker
        const marketTickerFind = permissions.find(p => p.action === 'api::market-ticker.market-ticker.find');
        const marketTickerFindOne = permissions.find(p => p.action === 'api::market-ticker.market-ticker.findOne');

        if (marketTickerFind && !marketTickerFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: marketTickerFind.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for market-ticker.find');
        }

        if (marketTickerFindOne && !marketTickerFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: marketTickerFindOne.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for market-ticker.findOne');
        }

        // Create permissions if they don't exist
        if (!permissionActions.includes('api::market-ticker.market-ticker.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::market-ticker.market-ticker.find',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for market-ticker.find');
        }

        if (!permissionActions.includes('api::market-ticker.market-ticker.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::market-ticker.market-ticker.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for market-ticker.findOne');
        }

        // Enable permissions for homepage-section
        const homepageSectionFind = permissions.find(p => p.action === 'api::homepage-section.homepage-section.find');
        const homepageSectionFindOne = permissions.find(p => p.action === 'api::homepage-section.homepage-section.findOne');

        if (homepageSectionFind && !homepageSectionFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: homepageSectionFind.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for homepage-section.find');
        }

        if (homepageSectionFindOne && !homepageSectionFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: homepageSectionFindOne.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for homepage-section.findOne');
        }

        // Create permissions if they don't exist
        if (!permissionActions.includes('api::homepage-section.homepage-section.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::homepage-section.homepage-section.find',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for homepage-section.find');
        }

        if (!permissionActions.includes('api::homepage-section.homepage-section.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::homepage-section.homepage-section.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for homepage-section.findOne');
        }

        // Enable permissions for article
        const articleFind = permissions.find(p => p.action === 'api::article.article.find');
        const articleFindOne = permissions.find(p => p.action === 'api::article.article.findOne');

        if (articleFind && !articleFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: articleFind.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for article.find');
        }

        if (articleFindOne && !articleFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: articleFindOne.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for article.findOne');
        }

        if (!permissionActions.includes('api::article.article.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::article.article.find',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for article.find');
        }

        if (!permissionActions.includes('api::article.article.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::article.article.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for article.findOne');
        }

        // Enable permissions for category
        const categoryFind = permissions.find(p => p.action === 'api::category.category.find');
        const categoryFindOne = permissions.find(p => p.action === 'api::category.category.findOne');

        if (categoryFind && !categoryFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: categoryFind.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for category.find');
        }

        if (categoryFindOne && !categoryFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: categoryFindOne.id },
              data: { enabled: true },
            });
          console.log('✅ Enabled public access for category.findOne');
        }

        if (!permissionActions.includes('api::category.category.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::category.category.find',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for category.find');
        }

        if (!permissionActions.includes('api::category.category.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::category.category.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
          console.log('✅ Created public permission for category.findOne');
        }
      }
    } catch (error) {
      console.error('❌ Error setting up public permissions:', error);
    }

    // Note: Category and homepage section creation moved to utility functions
    // Call them manually when needed via API endpoints:
    // POST /api/populate/categories
    // POST /api/populate/homepage-sections
    // POST /api/populate/all
  },
};
