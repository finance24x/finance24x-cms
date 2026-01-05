/**
 * Seed Articles Utility
 * 
 * Creates sample articles for each category.
 * Call via API: POST /api/populate/articles
 */

import type { Core } from '@strapi/strapi';

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  categorySlug: string;
  premium: boolean;
  views: number;
  tags: string[];
}

// Articles data organized by category slug
const articlesData: ArticleData[] = [
  // ============================================
  // INSIGHTS CATEGORY
  // ============================================
  {
    title: 'Union Budget 2026: Key Expectations and What Investors Should Watch For',
    slug: 'union-budget-2026-expectations-investors-guide',
    content: `
<h2>Introduction</h2>
<p>As India gears up for the Union Budget 2026, investors, businesses, and citizens alike are eagerly awaiting Finance Minister Nirmala Sitharaman's announcements. With the economy showing resilience despite global headwinds, this budget is expected to strike a balance between fiscal prudence and growth-oriented measures.</p>

<h2>Key Expectations from Union Budget 2026</h2>

<h3>1. Income Tax Relief for Middle Class</h3>
<p>One of the most anticipated announcements is potential relief for individual taxpayers. The current tax slabs under the new tax regime have been in place since 2023, and there's growing demand for:</p>
<ul>
  <li>Increase in the basic exemption limit from ₹3 lakh to ₹5 lakh</li>
  <li>Revision of tax slabs to provide relief to those earning between ₹10-20 lakh</li>
  <li>Enhancement of standard deduction from ₹50,000 to ₹75,000</li>
  <li>Higher deduction limits under Section 80C (currently ₹1.5 lakh)</li>
</ul>

<h3>2. Capital Gains Tax Rationalization</h3>
<p>The investment community is hoping for rationalization of capital gains tax structure:</p>
<ul>
  <li>Potential reduction in LTCG tax on equities from 12.5% to 10%</li>
  <li>Increase in LTCG exemption limit from ₹1.25 lakh</li>
  <li>Simplification of holding period requirements across asset classes</li>
</ul>

<h3>3. Infrastructure Push</h3>
<p>Following the government's focus on infrastructure development, expect significant allocations for:</p>
<ul>
  <li>National Infrastructure Pipeline projects</li>
  <li>Railway modernization and new routes</li>
  <li>Highway expansion under Bharatmala</li>
  <li>Smart cities and urban infrastructure</li>
  <li>Green energy infrastructure</li>
</ul>

<h3>4. Support for Manufacturing</h3>
<p>The Make in India initiative is expected to receive further impetus through:</p>
<ul>
  <li>Extended PLI schemes for new sectors</li>
  <li>Customs duty rationalization for raw materials</li>
  <li>Incentives for R&D and innovation</li>
  <li>MSME credit guarantee enhancements</li>
</ul>

<h3>5. Agriculture and Rural Economy</h3>
<p>Given the importance of rural economy, expect measures like:</p>
<ul>
  <li>Increased MSP for various crops</li>
  <li>Enhanced PM-KISAN benefits</li>
  <li>Irrigation and water conservation projects</li>
  <li>Agri-tech and cold storage infrastructure</li>
</ul>

<h2>Sectoral Impact Analysis</h2>

<h3>Banking and Financial Services</h3>
<p>Banks may benefit from potential recapitalization announcements and credit growth targets. NBFCs could see regulatory clarity on specific lending segments.</p>

<h3>Real Estate</h3>
<p>The housing sector is hoping for:</p>
<ul>
  <li>Increased deduction on home loan interest (currently ₹2 lakh)</li>
  <li>Extension of affordable housing benefits</li>
  <li>Reduced stamp duty incentives</li>
</ul>

<h3>Technology and Startups</h3>
<p>The startup ecosystem expects:</p>
<ul>
  <li>Extended tax holiday benefits</li>
  <li>Angel tax relief measures</li>
  <li>Incentives for AI and semiconductor manufacturing</li>
</ul>

<h2>Fiscal Deficit Target</h2>
<p>The government is expected to target a fiscal deficit of 4.5-4.8% of GDP for FY2026-27, continuing the path of fiscal consolidation while maintaining growth momentum.</p>

<h2>What Should Investors Do?</h2>
<p>Leading up to the budget, investors should:</p>
<ol>
  <li><strong>Avoid panic decisions:</strong> Budget volatility is normal and usually short-lived</li>
  <li><strong>Focus on fundamentals:</strong> Long-term investment thesis shouldn't change based on one budget</li>
  <li><strong>Watch for sector-specific cues:</strong> Position in sectors likely to benefit</li>
  <li><strong>Maintain liquidity:</strong> Keep some powder dry for post-budget opportunities</li>
</ol>

<h2>Conclusion</h2>
<p>Union Budget 2026 comes at a crucial time when India is positioning itself as a global manufacturing hub and aiming for developed nation status by 2047. The budget is expected to balance populist measures with structural reforms, providing opportunities for both consumption-driven and infrastructure-focused investments.</p>

<p><em>Stay tuned to Fin24x for live budget coverage and detailed analysis on February 1, 2026.</em></p>
`,
    excerpt: 'A comprehensive analysis of what to expect from Union Budget 2026 - from income tax relief to infrastructure spending. Key sectors to watch and investment strategies for the budget season.',
    author: 'Fin24x Research Team',
    publishedDate: '2026-01-05',
    categorySlug: 'insights',
    premium: false,
    views: 0,
    tags: ['Union Budget 2026', 'Budget Expectations', 'Tax Relief', 'Infrastructure', 'Investment Strategy', 'Finance Minister', 'Fiscal Policy']
  },
];

/**
 * Seed articles into the database
 */
export async function seedArticles(strapi: Core.Strapi) {
  console.log('🚀 Starting article seeding...\n');

  let createdCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const articleData of articlesData) {
    try {
      // Find the category by slug
      const category = await strapi.query('api::category.category').findOne({
        where: { slug: articleData.categorySlug },
      });

      if (!category) {
        console.log(`⚠️  Category not found: ${articleData.categorySlug}. Skipping article: ${articleData.title}`);
        skippedCount++;
        continue;
      }

      // Check if article already exists
      const existingArticle = await strapi.query('api::article.article').findOne({
        where: { slug: articleData.slug },
      });

      if (existingArticle) {
        // Delete and recreate to ensure proper category relation
        await strapi.documents('api::article.article').delete({
          documentId: existingArticle.documentId,
        });
        console.log(`🗑️  Deleted existing article: ${articleData.title}`);
        // Fall through to create new one
      }

      // Create the article using documents API for proper relation handling
      const created = await strapi.documents('api::article.article').create({
        data: {
          title: articleData.title,
          slug: articleData.slug,
          content: articleData.content,
          excerpt: articleData.excerpt,
          author: articleData.author,
          publishedDate: articleData.publishedDate,
          category: category.documentId, // Use documentId for Strapi v5 relations
          premium: articleData.premium,
          views: articleData.views,
          tags: articleData.tags,
        },
        status: 'published', // Publish immediately
      });

      console.log(`✅ Created article: ${articleData.title} (ID: ${created.id})`);
      createdCount++;

    } catch (error: any) {
      console.error(`❌ Error creating article "${articleData.title}":`, error?.message || error);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 Seeding Summary:');
  console.log(`   ✅ Created: ${createdCount}`);
  console.log(`   ⏭️  Skipped: ${skippedCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`   📝 Total: ${articlesData.length}`);
  console.log('='.repeat(60));

  return { created: createdCount, skipped: skippedCount, errors: errorCount, total: articlesData.length };
}

