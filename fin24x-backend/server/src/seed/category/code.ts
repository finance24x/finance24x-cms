/**
 * Category Seeding Logic
 * 
 * Creates or updates categories based on data from data.ts
 * Call via API: POST /api/populate/categories
 */

import type { Core } from '@strapi/strapi';
import { categories } from './data';

export interface SeedResult {
  created: number;
  updated: number;
  errors: number;
  total: number;
}

/**
 * Create or update categories from the data file
 */
export async function seedCategories(strapi: Core.Strapi): Promise<SeedResult> {
  console.log('🔄 Starting category seeding...');
  console.log(`📋 Found ${categories.length} categories in data file\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  for (const categoryData of categories) {
    try {
      // Check if category already exists
      const existingCategory = await strapi.query('api::category.category').findOne({
        where: { slug: categoryData.slug },
      });

      if (!existingCategory) {
        // Create new category using documents API
        const created = await strapi.documents('api::category.category').create({
          data: categoryData,
          status: 'published',
        });
        
        console.log(`✅ Created category: ${categoryData.name} (Order: ${categoryData.order})`);
        createdCount++;
      } else {
        // Update existing category
        await strapi.documents('api::category.category').update({
          documentId: existingCategory.documentId,
          data: categoryData,
          status: 'published',
        });
        
        console.log(`📝 Updated category: ${categoryData.name} (Order: ${categoryData.order})`);
        updatedCount++;
      }
    } catch (error: any) {
      console.error(`❌ Error processing category ${categoryData.name}:`, error?.message || error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Category Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   📝 Updated: ${updatedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📋 Total: ${categories.length}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, errors: errorCount, total: categories.length };
}

