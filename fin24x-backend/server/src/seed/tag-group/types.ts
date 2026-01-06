export interface TagGroupData {
  name: string;
  slug: string;
  description?: string;
  order: number;
}

export interface TagGroupSeedingResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}

