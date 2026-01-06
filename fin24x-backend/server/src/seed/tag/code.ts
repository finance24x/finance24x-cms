/**
 * Tag Seeding Logic
 * 
 * Creates or updates tags based on data from data.ts
 * Call via API: POST /api/populate/tags
 */

import type { Core } from '@strapi/strapi';
import { tagsData } from './data';
import { TagSeedingResult } from './types';

/**
 * Create or update tags from the data file
 */
export async function seedTags(strapi: Core.Strapi): Promise<TagSeedingResult> {
  console.log('🔄 Starting tag seeding...');
  console.log(`📋 Found ${tagsData.length} tags in data file\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  const errors: string[] = [];

  for (const tagData of tagsData) {
    try {
      // Check if tag already exists
      const existingTag = await strapi.query('api::tag.tag').findOne({
        where: { slug: tagData.slug },
      });

      if (!existingTag) {
        // Create new tag using documents API
        await strapi.documents('api::tag.tag').create({
          data: tagData,
          status: 'published',
        });
        
        console.log(`✅ Created tag: ${tagData.name}`);
        createdCount++;
      } else {
        // Update existing tag
        await strapi.documents('api::tag.tag').update({
          documentId: existingTag.documentId,
          data: tagData,
          status: 'published',
        });
        
        console.log(`📝 Updated tag: ${tagData.name}`);
        updatedCount++;
      }
    } catch (error: any) {
      const errorMsg = `Error processing tag ${tagData.name}: ${error?.message || error}`;
      console.error(`❌ ${errorMsg}`);
      errors.push(errorMsg);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Tag Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   📝 Updated: ${updatedCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errors.length}`);
  console.log(`   📋 Total: ${tagsData.length}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, skipped: skippedCount, errors };
}

