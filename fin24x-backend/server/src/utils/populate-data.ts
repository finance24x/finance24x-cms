/**
 * Utility functions to populate initial data
 * Call these manually when needed, not on every startup
 */

import type { Core } from '@strapi/strapi';

/**
 * Create default categories for the website
 * Call this function manually when you need to populate categories
 */
export async function createDefaultCategories(strapi: Core.Strapi) {
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
      const existingCategory = await strapi
        .query('api::category.category')
        .findOne({
          where: { slug: categoryData.slug },
        });

      if (!existingCategory) {
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
  return { created: createdCount, updated: updatedCount, errors: errorCount, total: categories.length };
}

/**
 * Create homepage sections for all categories
 * Call this function manually when you need to populate homepage sections
 */
export async function createHomepageSections(strapi: Core.Strapi) {
  console.log('🔄 Starting homepage section creation...');
  
  // Wait a bit to ensure categories are created first
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Fetch all enabled categories
  let categories;
  try {
    categories = await strapi.entityService.findMany('api::category.category', {
      filters: { enabled: true },
      sort: ['order:asc'],
      publicationState: 'live',
    });
  } catch (error) {
    // Fallback to query
    categories = await strapi.query('api::category.category').findMany({
      where: { enabled: true },
      orderBy: { order: 'asc' },
    });
  }

  if (!categories || categories.length === 0) {
    console.log('⚠️  No categories found. Please create categories first.');
    return { created: 0, updated: 0, errors: 0, total: 0 };
  }

  console.log(`Found ${categories.length} categories. Creating homepage sections...`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  // Section type mapping - cycle through types
  const sectionTypes: ('grid' | 'grid-with-date' | 'news')[] = ['grid', 'grid-with-date', 'news'];
  
  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    try {
      // Cycle through section types
      const sectionType = sectionTypes[index % sectionTypes.length];
      
      // Check if section already exists for this category
      let existingSections;
      try {
        existingSections = await strapi.entityService.findMany('api::homepage-section.homepage-section', {
          filters: { category: category.id },
          publicationState: 'all',
        });
      } catch (error) {
        // Fallback to query
        existingSections = await strapi.query('api::homepage-section.homepage-section').findMany({
          where: { category: category.id },
        });
      }

      const existingSection = existingSections.length > 0 ? existingSections[0] : null;

      const sectionData = {
        title: category.name,
        sectionType: sectionType,
        category: category.id,
        buttonText: 'view all',
        buttonUrl: `${category.slug}`,
        order: category.order || index + 1,
        enabled: true,
        itemsToShow: 5,
      };

      if (!existingSection) {
        // Create new section
        try {
          const created = await strapi.entityService.create('api::homepage-section.homepage-section', {
            data: sectionData,
          });
          
          // Publish the section
          await strapi.entityService.update('api::homepage-section.homepage-section', created.id, {
            data: {},
            publicationState: 'live',
          });
          
          console.log(`✅ Created homepage section: ${category.name} (Type: ${sectionType}, Order: ${sectionData.order})`);
          createdCount++;
        } catch (createError: any) {
          // Fallback to query method
          const created = await strapi.query('api::homepage-section.homepage-section').create({
            data: {
              ...sectionData,
              publishedAt: new Date(),
            },
          });
          console.log(`✅ Created homepage section (query method): ${category.name}`);
          createdCount++;
        }
      } else {
        // Update existing section
        try {
          await strapi.entityService.update('api::homepage-section.homepage-section', existingSection.id, {
            data: sectionData,
            publicationState: 'live',
          });
          console.log(`✅ Updated homepage section: ${category.name} (Type: ${sectionType})`);
          updatedCount++;
        } catch (updateError: any) {
          // Fallback to query method
          await strapi.query('api::homepage-section.homepage-section').update({
            where: { id: existingSection.id },
            data: {
              ...sectionData,
              publishedAt: new Date(),
            },
          });
          console.log(`✅ Updated homepage section (query method): ${category.name}`);
          updatedCount++;
        }
      }
    } catch (error: any) {
      console.error(`❌ Error processing homepage section for ${category.name}:`, error?.message || error);
      errorCount++;
    }
  }
  
  console.log(`✅ Homepage section creation complete. Created: ${createdCount}, Updated: ${updatedCount}, Errors: ${errorCount}, Total: ${categories.length}`);
  return { created: createdCount, updated: updatedCount, errors: errorCount, total: categories.length };
}

