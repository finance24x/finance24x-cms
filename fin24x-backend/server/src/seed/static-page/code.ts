/**
 * Static Page Seeding Logic
 * 
 * Creates or updates static pages based on data from data.ts
 * Call via API: POST /api/populate/static-pages
 */

import type { Core } from '@strapi/strapi';
import { staticPages, StaticPageData } from './data';

export interface SeedResult {
  created: number;
  updated: number;
  errors: number;
  total: number;
}

/**
 * Create or update static pages from the data file or provided JSON
 */
export async function seedStaticPages(strapi: Core.Strapi, inputData?: StaticPageData[]): Promise<SeedResult> {
  // Use provided data or fallback to file data
  const staticPagesData = inputData || staticPages;
  const dataSource = inputData ? 'request body' : 'file';
  
  console.log('🔄 Starting static page seeding...');
  console.log(`📋 Found ${staticPagesData.length} static pages in ${dataSource}\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  for (const pageData of staticPagesData) {
    try {
      // Check if static page already exists
      const existingPage = await strapi.query('api::static-page.static-page').findOne({
        where: { slug: pageData.slug },
      });

      if (!existingPage) {
        // Create new static page using documents API
        const created = await strapi.documents('api::static-page.static-page').create({
          data: pageData,
          status: 'published',
        });
        
        console.log(`✅ Created static page: ${pageData.title}`);
        createdCount++;
      } else {
        // Update existing static page
        await strapi.documents('api::static-page.static-page').update({
          documentId: existingPage.documentId,
          data: pageData,
          status: 'published',
        });
        
        console.log(`📝 Updated static page: ${pageData.title}`);
        updatedCount++;
      }
    } catch (error: any) {
      console.error(`❌ Error processing static page ${pageData.title}:`, error?.message || error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Static Page Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   📝 Updated: ${updatedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📋 Total: ${staticPagesData.length}`);
  console.log(`   📦 Data Source: ${dataSource}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, errors: errorCount, total: staticPagesData.length };
}

