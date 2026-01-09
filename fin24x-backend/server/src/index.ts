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
        }

        if (headerFindOne && !headerFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: headerFindOne.id },
              data: { enabled: true },
            });
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
        }

        if (footerFindOne && !footerFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: footerFindOne.id },
              data: { enabled: true },
            });
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
        }

        if (!permissionActions.includes('api::header.header.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::header.header.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        if (!permissionActions.includes('api::footer.footer.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::footer.footer.find',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        if (!permissionActions.includes('api::footer.footer.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::footer.footer.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
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
        }

        if (marketTickerFindOne && !marketTickerFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: marketTickerFindOne.id },
              data: { enabled: true },
            });
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
        }

        if (!permissionActions.includes('api::market-ticker.market-ticker.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::market-ticker.market-ticker.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
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
        }

        if (homepageSectionFindOne && !homepageSectionFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: homepageSectionFindOne.id },
              data: { enabled: true },
            });
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
        }

        if (!permissionActions.includes('api::homepage-section.homepage-section.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::homepage-section.homepage-section.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
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
        }

        if (articleFindOne && !articleFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: articleFindOne.id },
              data: { enabled: true },
            });
        }

        if (!permissionActions.includes('api::article.article.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::article.article.find',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        if (!permissionActions.includes('api::article.article.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::article.article.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
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
        }

        if (categoryFindOne && !categoryFindOne.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: categoryFindOne.id },
              data: { enabled: true },
            });
        }

        if (!permissionActions.includes('api::category.category.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::category.category.find',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        if (!permissionActions.includes('api::category.category.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::category.category.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        // Enable permissions for tag
        if (!permissionActions.includes('api::tag.tag.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::tag.tag.find',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        if (!permissionActions.includes('api::tag.tag.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::tag.tag.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        // Enable permissions for tag-group
        if (!permissionActions.includes('api::tag-group.tag-group.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::tag-group.tag-group.find',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        if (!permissionActions.includes('api::tag-group.tag-group.findOne')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::tag-group.tag-group.findOne',
              role: publicRole.id,
              enabled: true,
            },
          });
        }

        // Enable permissions for popular-tag
        const popularTagFind = permissions.find(p => p.action === 'api::popular-tag.popular-tag.find');

        if (popularTagFind && !popularTagFind.enabled) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: popularTagFind.id },
              data: { enabled: true },
            });
        }

        if (!permissionActions.includes('api::popular-tag.popular-tag.find')) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action: 'api::popular-tag.popular-tag.find',
              role: publicRole.id,
              enabled: true,
            },
          });
        }
      }
    } catch (error) {
      console.error('❌ Error setting up public permissions:', error);
    }

  },
};
