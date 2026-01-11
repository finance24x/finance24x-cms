/**
 * TagGroup Seeding Logic
 * 
 * Creates or updates tag groups based on data from data.ts
 * Call via API: POST /api/populate/tag-groups
 */

import type { Core } from '@strapi/strapi';
import { tagGroupsData } from './data';
import { TagGroupSeedingResult, TagGroupData } from './types';

/**
 * Create or update tag groups from the data file or provided JSON
 */
export async function seedTagGroups(strapi: Core.Strapi, inputData?: TagGroupData[]): Promise<TagGroupSeedingResult> {
  // Use provided data or fallback to file data
  const tagGroupsDataToUse = inputData || tagGroupsData;
  const dataSource = inputData ? 'request body' : 'file';
  
  console.log('🔄 Starting tag group seeding...');
  console.log(`📋 Found ${tagGroupsDataToUse.length} tag groups in ${dataSource}\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  const errors: string[] = [];

  for (const groupData of tagGroupsDataToUse) {
    try {
      // Check if tag group already exists
      const existingGroup = await strapi.query('api::tag-group.tag-group').findOne({
        where: { slug: groupData.slug },
      });

      if (!existingGroup) {
        // Create new tag group using documents API
        await strapi.documents('api::tag-group.tag-group').create({
          data: groupData,
          status: 'published',
        });
        
        console.log(`✅ Created tag group: ${groupData.name} (Order: ${groupData.order})`);
        createdCount++;
      } else {
        // Update existing tag group
        await strapi.documents('api::tag-group.tag-group').update({
          documentId: existingGroup.documentId,
          data: groupData,
          status: 'published',
        });
        
        console.log(`📝 Updated tag group: ${groupData.name} (Order: ${groupData.order})`);
        updatedCount++;
      }
    } catch (error: any) {
      const errorMsg = `Error processing tag group ${groupData.name}: ${error?.message || error}`;
      console.error(`❌ ${errorMsg}`);
      errors.push(errorMsg);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 Tag Group Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   📝 Updated: ${updatedCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errors.length}`);
  console.log(`   📋 Total: ${tagGroupsDataToUse.length}`);
  console.log(`   📦 Data Source: ${dataSource}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, skipped: skippedCount, errors };
}

