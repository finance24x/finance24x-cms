export interface TagData {
  name: string;
  slug: string;
  description?: string;
}

export interface TagSeedingResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}

