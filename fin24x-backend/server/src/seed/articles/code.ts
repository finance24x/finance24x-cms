/**
 * Article Seeding Logic
 * 
 * Reads JSON files from category subfolders and creates articles.
 * 
 * Folder Structure:
 *   src/seed/articles/
 *     ├── code.ts (this file)
 *     ├── insights/
 *     │   ├── article-1.json
 *     │   └── article-2.json
 *     ├── latest-news/
 *     │   └── article-1.json
 *     └── ...
 * 
 * Each JSON file should contain an ArticleData object.
 * The folder name should match the category slug.
 * 
 * Call via API: POST /api/populate/articles
 */

import type { Core } from '@strapi/strapi';
import * as fs from 'fs';
import * as path from 'path';

export interface ArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  premium?: boolean;
  views?: number;
  tags?: string[];
}

export interface SeedResult {
  created: number;
  skipped: number;
  errors: number;
  total: number;
  details: {
    category: string;
    articles: number;
  }[];
}

/**
 * Get the base path for article data folders
 * Always reads from src directory since JSON files aren't compiled
 */
function getArticlesBasePath(): string {
  // Always use src path - JSON files are not compiled to dist
  // __dirname in dist is: .../dist/src/seed/articles
  // We need: .../src/seed/articles
  const distPath = __dirname;
  const srcPath = distPath.replace('/dist/src/', '/src/').replace('\\dist\\src\\', '\\src\\');
  return srcPath;
}

/**
 * Read all JSON files from a directory
 */
function readJsonFilesFromDir(dirPath: string): ArticleData[] {
  const articles: ArticleData[] = [];
  
  if (!fs.existsSync(dirPath)) {
    return articles;
  }

  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dirPath, file);
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const articleData = JSON.parse(content) as ArticleData;
        articles.push(articleData);
        console.log(`   📄 Loaded: ${file}`);
      } catch (error: any) {
        console.error(`   ❌ Error reading ${file}:`, error?.message);
      }
    }
  }
  
  return articles;
}

/**
 * Get all category folders and their articles
 */
function getAllArticleData(): Map<string, ArticleData[]> {
  const basePath = getArticlesBasePath();
  const categoryArticles = new Map<string, ArticleData[]>();
  
  console.log(`📁 Scanning for article data in: ${basePath}\n`);
  
  if (!fs.existsSync(basePath)) {
    console.log('⚠️  Articles base path not found');
    return categoryArticles;
  }

  const entries = fs.readdirSync(basePath, { withFileTypes: true });
  
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('.')) {
      const categorySlug = entry.name;
      const categoryPath = path.join(basePath, categorySlug);
      
      console.log(`📂 Category: ${categorySlug}`);
      const articles = readJsonFilesFromDir(categoryPath);
      
      if (articles.length > 0) {
        categoryArticles.set(categorySlug, articles);
        console.log(`   Found ${articles.length} article(s)\n`);
      } else {
        console.log(`   No articles found\n`);
      }
    }
  }
  
  return categoryArticles;
}

/**
 * Seed articles from JSON files or provided JSON into the database
 * 
 * Input format (optional):
 * {
 *   "articles": {
 *     "category-slug-1": [
 *       { "title": "...", "slug": "...", "content": "...", ... }
 *     ],
 *     "category-slug-2": [...]
 *   }
 * }
 */
export async function seedArticles(strapi: Core.Strapi, inputData?: { articles?: Record<string, ArticleData[]> }): Promise<SeedResult> {
  console.log('🚀 Starting article seeding...\n');

  let categoryArticles: Map<string, ArticleData[]>;
  const dataSource = inputData?.articles ? 'request body' : 'file';
  
  if (inputData?.articles) {
    // Convert JSON object to Map
    categoryArticles = new Map();
    for (const [categorySlug, articles] of Object.entries(inputData.articles)) {
      if (Array.isArray(articles)) {
        categoryArticles.set(categorySlug, articles);
      }
    }
    console.log(`📦 Using data from ${dataSource}`);
    console.log(`📋 Found ${categoryArticles.size} categories with articles\n`);
  } else {
    // Use file-based data
    categoryArticles = getAllArticleData();
  }
  
  if (categoryArticles.size === 0) {
    console.log('⚠️  No article data found. Provide JSON data or create JSON files in category folders.');
    return { created: 0, skipped: 0, errors: 0, total: 0, details: [] };
  }

  let totalCreated = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  let totalArticles = 0;
  const details: { category: string; articles: number }[] = [];

  for (const [categorySlug, articles] of categoryArticles) {
    console.log(`\n📂 Processing category: ${categorySlug}`);
    console.log('-'.repeat(40));

    // Find the category
    const category = await strapi.query('api::category.category').findOne({
      where: { slug: categorySlug },
    });

    if (!category) {
      console.log(`⚠️  Category not found: ${categorySlug}. Skipping ${articles.length} article(s).`);
      totalSkipped += articles.length;
      continue;
    }

    let categoryCreated = 0;

    for (const articleData of articles) {
      totalArticles++;
      
      try {
        // Check if article already exists
        const existingArticle = await strapi.query('api::article.article').findOne({
          where: { slug: articleData.slug },
        });

        if (existingArticle) {
          // Delete existing to recreate with proper relations
          await strapi.documents('api::article.article').delete({
            documentId: existingArticle.documentId,
          });
          console.log(`   🗑️  Replaced: ${articleData.title}`);
        }

        // Create the article
        await strapi.documents('api::article.article').create({
          data: {
            title: articleData.title,
            slug: articleData.slug,
            content: articleData.content,
            excerpt: articleData.excerpt,
            author: articleData.author,
            publishedDate: articleData.publishedDate,
            category: category.documentId,
            premium: articleData.premium ?? false,
            views: articleData.views ?? 0,
            tags: articleData.tags ?? [],
          },
          status: 'published',
        });

        console.log(`   ✅ Created: ${articleData.title}`);
        totalCreated++;
        categoryCreated++;

      } catch (error: any) {
        console.error(`   ❌ Error: ${articleData.title} - ${error?.message || error}`);
        totalErrors++;
      }
    }

    details.push({ category: categorySlug, articles: categoryCreated });
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Article Seeding Summary:');
  console.log(`   ✅ Created: ${totalCreated}`);
  console.log(`   ⏭️  Skipped: ${totalSkipped}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`   📝 Total: ${totalArticles}`);
  console.log(`   📦 Data Source: ${dataSource}`);
  console.log('\n📂 By Category:');
  for (const detail of details) {
    console.log(`   ${detail.category}: ${detail.articles} article(s)`);
  }
  console.log('='.repeat(60));

  return { created: totalCreated, skipped: totalSkipped, errors: totalErrors, total: totalArticles, details };
}

