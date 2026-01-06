/**
 * Tag Seeding Logic
 * 
 * Creates or updates tags based on data from data.ts
 * Handles tagGroup, similarTags, and relatedTags relationships
 * Call via API: POST /api/populate/tags
 */

import type { Core } from '@strapi/strapi';
import { tagsData } from './data';
import { TagSeedingResult } from './types';

/**
 * Create or update tags from the data file
 * Uses two-pass approach:
 * 1. First pass: Create/update all tags with basic data and tagGroup
 * 2. Second pass: Link similar and related tags
 */
export async function seedTags(strapi: Core.Strapi): Promise<TagSeedingResult> {
  console.log('🔄 Starting tag seeding...');
  console.log(`📋 Found ${tagsData.length} tags in data file\n`);

  let createdCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;
  const errors: string[] = [];

  // Build a map of slug -> documentId for linking
  const tagDocumentIds: Map<string, string> = new Map();
  const tagGroupDocumentIds: Map<string, string> = new Map();

  // First, fetch all tag groups
  console.log('📂 Fetching tag groups...');
  const tagGroups = await strapi.query('api::tag-group.tag-group').findMany({});
  tagGroups.forEach((group: any) => {
    tagGroupDocumentIds.set(group.slug, group.documentId);
  });
  console.log(`   Found ${tagGroups.length} tag groups\n`);

  // ========== PASS 1: Create/update tags with basic data ==========
  console.log('🔄 Pass 1: Creating/updating tags with basic data...\n');

  for (const tagData of tagsData) {
    try {
      // Get tag group documentId
      const tagGroupDocId = tagGroupDocumentIds.get(tagData.tagGroupSlug);
      if (!tagGroupDocId) {
        console.warn(`⚠️  Tag group not found for tag "${tagData.name}": ${tagData.tagGroupSlug}`);
      }

      // Check if tag already exists
      const existingTag = await strapi.query('api::tag.tag').findOne({
        where: { slug: tagData.slug },
      });

      const baseData: any = {
        name: tagData.name,
        slug: tagData.slug,
        description: tagData.description,
      };

      // Add tag group relation if found
      if (tagGroupDocId) {
        baseData.tagGroup = tagGroupDocId;
      }

      if (!existingTag) {
        // Create new tag
        const created = await strapi.documents('api::tag.tag').create({
          data: baseData,
          status: 'published',
        });
        
        tagDocumentIds.set(tagData.slug, created.documentId);
        console.log(`✅ Created tag: ${tagData.name}`);
        createdCount++;
      } else {
        // Update existing tag
        await strapi.documents('api::tag.tag').update({
          documentId: existingTag.documentId,
          data: baseData,
          status: 'published',
        });
        
        tagDocumentIds.set(tagData.slug, existingTag.documentId);
        console.log(`📝 Updated tag: ${tagData.name}`);
        updatedCount++;
      }
    } catch (error: any) {
      const errorMsg = `Error processing tag ${tagData.name}: ${error?.message || error}`;
      console.error(`❌ ${errorMsg}`);
      errors.push(errorMsg);
    }
  }

  // ========== PASS 2: Link similar and related tags ==========
  console.log('\n🔄 Pass 2: Linking similar and related tags...\n');

  for (const tagData of tagsData) {
    try {
      const tagDocId = tagDocumentIds.get(tagData.slug);
      if (!tagDocId) continue;

      // Get similar tag documentIds
      const similarTagDocIds: string[] = [];
      if (tagData.similarTagSlugs) {
        for (const slug of tagData.similarTagSlugs) {
          const docId = tagDocumentIds.get(slug);
          if (docId) {
            similarTagDocIds.push(docId);
          }
        }
      }

      // Get related tag documentIds
      const relatedTagDocIds: string[] = [];
      if (tagData.relatedTagSlugs) {
        for (const slug of tagData.relatedTagSlugs) {
          const docId = tagDocumentIds.get(slug);
          if (docId) {
            relatedTagDocIds.push(docId);
          }
        }
      }

      // Only update if there are similar or related tags to link
      if (similarTagDocIds.length > 0 || relatedTagDocIds.length > 0) {
        const updateData: any = {};
        
        if (similarTagDocIds.length > 0) {
          updateData.similarTags = similarTagDocIds;
        }
        
        if (relatedTagDocIds.length > 0) {
          updateData.relatedTags = relatedTagDocIds;
        }

        await strapi.documents('api::tag.tag').update({
          documentId: tagDocId,
          data: updateData,
          status: 'published',
        });
        
        console.log(`🔗 Linked tags for: ${tagData.name} (${similarTagDocIds.length} similar, ${relatedTagDocIds.length} related)`);
      }
    } catch (error: any) {
      const errorMsg = `Error linking tags for ${tagData.name}: ${error?.message || error}`;
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
  console.log(`   📋 Total tags: ${tagsData.length}`);
  console.log('='.repeat(50));

  return { created: createdCount, updated: updatedCount, skipped: skippedCount, errors };
}
