/**
 * Homepage Section Seeding Logic
 * 
 * Creates homepage sections based on existing categories.
 * Uses configuration from data.ts for section types.
 * Call via API: POST /api/populate/homepage-sections
 */

import type { Core } from '@strapi/strapi';
import { sectionTypes, sectionDefaults, categoryTypeOverrides, SectionType } from './data';

export interface SeedResult {
  created: number;
  updated: number;
  errors: number;
  total: number;
}

/**
 * Get the section type for a category
 */
function getSectionType(categorySlug: string, index: number, customOverrides?: Record<string, SectionType>, customSectionTypes?: SectionType[]): SectionType {
  const overrides = customOverrides || categoryTypeOverrides;
  const types = customSectionTypes || sectionTypes;
  
  // Check for override first
  if (overrides[categorySlug]) {
    return overrides[categorySlug];
  }
  // Otherwise cycle through section types
  return types[index % types.length];
}

/**
 * Create or update homepage sections for all categories
 * 
 * Optional input format:
 * {
 *   "sectionTypes": ["grid", "news", "grid-with-date"],
 *   "categoryTypeOverrides": { "insights": "grid" },
 *   "sectionDefaults": { "buttonText": "view all", "enabled": true, "itemsToShow": 5 }
 * }
 */
export async function seedHomepageSections(strapi: Core.Strapi, inputData?: {
  sectionTypes?: SectionType[];
  categoryTypeOverrides?: Record<string, SectionType>;
  sectionDefaults?: { buttonText?: string; enabled?: boolean; itemsToShow?: number };
}): Promise<SeedResult> {
  const dataSource = inputData ? 'request body' : 'file';
  const customSectionTypes = inputData?.sectionTypes;
  const customOverrides = inputData?.categoryTypeOverrides;
  const customDefaults = inputData?.sectionDefaults;
  
  console.log('🔄 Starting homepage section seeding...');
  console.log(`📦 Using config from ${dataSource}\n`);

  // Fetch all enabled categories
  const categories = await strapi.query('api::category.category').findMany({
    where: { enabled: true },
    orderBy: { order: 'asc' },
  });

  if (!categories || categories.length === 0) {
    console.log('⚠️  No categories found. Please create categories first.');
    return { created: 0, updated: 0, errors: 0, total: 0 };
  }

  console.log(`📋 Found ${categories.length} categories. Creating homepage sections...\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let errorCount = 0;

  for (let index = 0; index < categories.length; index++) {
    const category = categories[index];
    
    try {
      const sectionType = getSectionType(category.slug, index, customOverrides, customSectionTypes);

      // Check if section already exists for this category
      const existingSections = await strapi.query('api::homepage-section.homepage-section').findMany({
        where: { category: category.id },
      });

      const existingSection = existingSections.length > 0 ? existingSections[0] : null;

      const defaults = customDefaults || sectionDefaults;
      const sectionData = {
        title: category.name,
        sectionType: sectionType,
        category: category.documentId,
        buttonText: defaults.buttonText,
        buttonUrl: `${category.slug}`,
        order: category.order || index + 1,
        enabled: defaults.enabled,
        itemsToShow: defaults.itemsToShow,
      };

      if (!existingSection) {
        // Create new section
        await strapi.documents('api::homepage-section.homepage-section').create({
          data: sectionData,
          status: 'published',
        });

        console.log(`✅ Created section: ${category.name} (Type: ${sectionType}, Order: ${sectionData.order})`);
        createdCount++;
      } else {
        // Update existing section
        await strapi.documents('api::homepage-section.homepage-section').update({
          documentId: existingSection.documentId,
          data: sectionData,
          status: 'published',
        });

        console.log(`📝 Updated section: ${category.name} (Type: ${sectionType})`);
        updatedCount++;
      }
    } catch (error: any) {
      console.error(`❌ Error processing section for ${category.name}:`, error?.message || error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Homepage Section Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   📝 Updated: ${updatedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📋 Total: ${categories.length}`);
  console.log(`   📦 Data Source: ${dataSource}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, errors: errorCount, total: categories.length };
}

