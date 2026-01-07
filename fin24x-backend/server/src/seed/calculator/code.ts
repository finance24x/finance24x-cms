/**
 * Calculator Seeding Logic
 * 
 * Creates or updates calculators based on data from data.ts
 * Call via API: POST /api/populate/calculators
 */

import type { Core } from '@strapi/strapi';
import { calculators } from './data';

export interface SeedResult {
  created: number;
  updated: number;
  errors: number;
  total: number;
}

/**
 * Create or update calculators from the data file
 */
export async function seedCalculators(strapi: Core.Strapi): Promise<SeedResult> {
  console.log('🔄 Starting calculator seeding...');
  console.log(`📋 Found ${calculators.length} calculators in data file\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  // First, find the "calculators" category to link calculators to it
  const calculatorsCategory = await strapi.query('api::category.category').findOne({
    where: { slug: 'calculators' },
  });

  if (!calculatorsCategory) {
    console.log('⚠️  Warning: "calculators" category not found. Calculators will not be linked to a category.');
    console.log('   Create a category with slug "calculators" and run this seed again to link them.\n');
  } else {
    console.log(`✅ Found "calculators" category (ID: ${calculatorsCategory.documentId})\n`);
  }

  for (const calcData of calculators) {
    try {
      // Check if calculator already exists
      const existingCalc = await strapi.query('api::calculator.calculator').findOne({
        where: { slug: calcData.slug },
      });

      // Prepare data with category relation
      const dataToSave: any = {
        ...calcData,
      };

      // Link to category if found
      if (calculatorsCategory) {
        dataToSave.category = calculatorsCategory.documentId;
      }

      if (!existingCalc) {
        // Create new calculator
        await strapi.documents('api::calculator.calculator').create({
          data: dataToSave,
          status: 'published',
        });
        
        console.log(`✅ Created calculator: ${calcData.title}`);
        createdCount++;
      } else {
        // Update existing calculator
        await strapi.documents('api::calculator.calculator').update({
          documentId: existingCalc.documentId,
          data: dataToSave,
          status: 'published',
        });
        
        console.log(`📝 Updated calculator: ${calcData.title}`);
        updatedCount++;
      }
    } catch (error: any) {
      console.error(`❌ Error processing calculator ${calcData.title}:`, error?.message || error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Calculator Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   📝 Updated: ${updatedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📋 Total: ${calculators.length}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, errors: errorCount, total: calculators.length };
}

