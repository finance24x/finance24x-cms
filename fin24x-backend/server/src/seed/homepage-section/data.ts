/**
 * Homepage Section Configuration Data
 * 
 * Configure section types and their cycling pattern.
 * Sections are auto-generated based on categories.
 */

export type SectionType = 'grid' | 'grid-with-date' | 'news';

/**
 * Section types to cycle through when creating homepage sections
 * The order defines which type each category section gets
 */
export const sectionTypes: SectionType[] = ['grid', 'grid-with-date', 'news'];

/**
 * Default configuration for homepage sections
 */
export const sectionDefaults = {
  buttonText: 'view all',
  enabled: true,
  itemsToShow: 5,
};

/**
 * Optional: Override section type for specific category slugs
 * If a category slug is listed here, it will use the specified type
 * instead of cycling through sectionTypes
 */
export const categoryTypeOverrides: Record<string, SectionType> = {
  // Example overrides:
  // 'insights': 'grid',
  // 'latest-news': 'news',
  // 'gold-rates': 'grid-with-date',
};

