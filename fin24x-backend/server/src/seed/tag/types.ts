export interface TagData {
  name: string;
  slug: string;
  description?: string;
  tagGroupSlug: string; // Reference to tag group by slug
  similarTagSlugs?: string[]; // Similar tag slugs
  relatedTagSlugs?: string[]; // Related tag slugs
}

export interface TagSeedingResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}
