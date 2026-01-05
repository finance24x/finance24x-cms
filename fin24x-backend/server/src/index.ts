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

    // Create default categories (separate try-catch to ensure it runs even if permissions fail)
    try {
      await createDefaultCategories(strapi);
    } catch (error) {
      console.error('❌ Error creating default categories:', error);
    }
  },
};

/**
 * Create default categories for the website
 */
async function createDefaultCategories(strapi: Core.Strapi) {
  const categories = [
    {
      name: 'Insights',
      slug: 'insights',
      description: 'Expert analysis and in-depth insights on market trends, investment strategies, and economic indicators. Stay informed with comprehensive market analysis from financial experts.',
      order: 1,
      enabled: true,
    },
    {
      name: 'Latest News',
      slug: 'latest-news',
      description: 'Breaking news and latest updates from the business and economy world. Get real-time coverage of major financial events, policy changes, and market developments.',
      order: 2,
      enabled: true,
    },
    {
      name: 'Market News',
      slug: 'market-news',
      description: 'Live updates and breaking news from stock exchanges worldwide. Track market movements, corporate announcements, and trading activities as they happen.',
      order: 3,
      enabled: true,
    },
    {
      name: 'Gold Rates',
      slug: 'gold-rates',
      description: 'Today\'s gold prices for 22k and 24k gold across major cities in India. Track daily gold rates, historical trends, and get expert predictions on gold price movements.',
      order: 4,
      enabled: true,
    },
    {
      name: 'Silver Rates',
      slug: 'silver-rates',
      description: 'Live silver price trends per kilogram with real-time updates. Monitor silver rates, historical data, and market analysis to make informed investment decisions.',
      order: 5,
      enabled: true,
    },
    {
      name: 'Commodities',
      slug: 'commodities',
      description: 'Track prices and trends for oil, gas, metals, and agricultural commodities. Stay updated with commodity market movements, futures, and spot prices.',
      order: 6,
      enabled: true,
    },
    {
      name: 'IPOs',
      slug: 'ipos',
      description: 'Complete IPO information including Grey Market Premium (GMP), subscription dates, issue details, and subscription status. Get expert analysis on upcoming and ongoing IPOs.',
      order: 7,
      enabled: true,
    },
    {
      name: 'Stocks & Indices',
      slug: 'stocks-indices',
      description: 'Live stock quotes, charts, top gainers, and losers across major indices. Track NIFTY, SENSEX, BANKNIFTY, and individual stock performance with real-time data.',
      order: 8,
      enabled: true,
    },
    {
      name: 'Cryptocurrency',
      slug: 'cryptocurrency',
      description: 'Real-time cryptocurrency prices for Bitcoin (BTC), Ethereum (ETH), and other major cryptocurrencies. Track crypto market trends, news, and expert analysis.',
      order: 9,
      enabled: true,
    },
    {
      name: 'Mutual Funds',
      slug: 'mutual-funds',
      description: 'Top performing mutual funds with NAV performance, returns, and ratings. Compare funds, track portfolio performance, and get expert recommendations for your investment goals.',
      order: 10,
      enabled: true,
    },
    {
      name: 'Calculators',
      slug: 'calculators',
      description: 'Financial calculators for EMI, SIP, tax planning, and retirement planning. Use our comprehensive suite of calculators to plan your finances and investments effectively.',
      order: 11,
      enabled: true,
    },
    {
      name: 'Bank Deposits',
      slug: 'bank-deposits',
      description: 'Compare Fixed Deposits (FD), Recurring Deposits (RD), and interest rates across major banks. Find the best deposit schemes and maximize your savings returns.',
      order: 12,
      enabled: true,
    },
    {
      name: 'Govt. Schemes',
      slug: 'government-schemes',
      description: 'Complete information on government schemes including Provident Fund (PF), pension plans, subsidies, and social security benefits. Stay informed about eligibility and application procedures.',
      order: 13,
      enabled: true,
    },
  ];

  console.log('🔄 Starting category creation...');
  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  for (const categoryData of categories) {
    try {
      // Use query to find existing category (more reliable for checking)
      const existingCategory = await strapi
        .query('api::category.category')
        .findOne({
          where: { slug: categoryData.slug },
        });

      if (!existingCategory) {
        // Create using entityService with proper publication state
        try {
          const created = await strapi.entityService.create('api::category.category', {
            data: categoryData,
          });
          
          // Publish the entry
          await strapi.entityService.update('api::category.category', created.id, {
            data: {},
            publicationState: 'live',
          });
          
          console.log(`✅ Created and published category: ${categoryData.name} (ID: ${created.id}, Order: ${categoryData.order})`);
          createdCount++;
        } catch (createError: any) {
          // Fallback to query if entityService fails
          console.log(`⚠️  EntityService failed, trying query method for ${categoryData.name}...`);
          const created = await strapi.query('api::category.category').create({
            data: {
              ...categoryData,
              publishedAt: new Date(),
            },
          });
          console.log(`✅ Created category (query method): ${categoryData.name} (ID: ${created.id})`);
          createdCount++;
        }
      } else {
        // Update existing category
        try {
          await strapi.entityService.update('api::category.category', existingCategory.id, {
            data: categoryData,
            publicationState: 'live',
          });
          console.log(`✅ Updated category: ${categoryData.name} (ID: ${existingCategory.id}, Order: ${categoryData.order})`);
          updatedCount++;
        } catch (updateError: any) {
          // Fallback to query
          await strapi.query('api::category.category').update({
            where: { id: existingCategory.id },
            data: {
              ...categoryData,
              publishedAt: new Date(),
            },
          });
          console.log(`✅ Updated category (query method): ${categoryData.name} (ID: ${existingCategory.id})`);
          updatedCount++;
        }
      }
    } catch (error: any) {
      console.error(`❌ Error processing category ${categoryData.name}:`, error?.message || error);
      if (error?.stack) {
        console.error('Stack trace:', error.stack);
      }
      errorCount++;
    }
  }
  
  console.log(`✅ Category creation complete. Created: ${createdCount}, Updated: ${updatedCount}, Errors: ${errorCount}, Total: ${categories.length}`);
}
