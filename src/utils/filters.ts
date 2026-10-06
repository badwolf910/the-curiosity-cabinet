import Fuse from 'fuse.js';
import type { Artifact, Filters } from '@/types';
import { CATEGORIES, ERAS } from './constants';

export const EMPTY_FILTERS: Filters = { q: '', category: '', era: '', tag: '' };

const fuseCache = new WeakMap<Artifact[], Fuse<Artifact>>();

function getFuse(artifacts: Artifact[]): Fuse<Artifact> {
  let fuse = fuseCache.get(artifacts);
  if (!fuse) {
    fuse = new Fuse(artifacts, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'tags', weight: 0.25 },
        { name: 'description', weight: 0.2 },
        { name: 'provenance', weight: 0.1 },
        { name: 'era', weight: 0.05 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });
    fuseCache.set(artifacts, fuse);
  }
  return fuse;
}

/** Applies fuzzy text search followed by category / era / tag filters. */
export function filterArtifacts(artifacts: Artifact[], filters: Filters): Artifact[] {
  const q = filters.q.trim();
  let result = q ? getFuse(artifacts).search(q).map((r) => r.item) : artifacts;
  if (filters.category) result = result.filter((a) => a.category === filters.category);
  if (filters.era) result = result.filter((a) => a.era === filters.era);
  if (filters.tag) result = result.filter((a) => a.tags.includes(filters.tag));
  return result;
}

/** Reads filters from URL params, discarding unknown category/era values. */
export function parseFilters(params: URLSearchParams): Filters {
  const category = params.get('category') ?? '';
  const era = params.get('era') ?? '';
  return {
    q: params.get('q') ?? '',
    category: CATEGORIES.some((c) => c.id === category) ? (category as Filters['category']) : '',
    era: (ERAS as string[]).includes(era) ? (era as Filters['era']) : '',
    tag: params.get('tag') ?? '',
  };
}

/** Serialises filters to URL params, omitting empty values. */
export function serializeFilters(filters: Filters): URLSearchParams {
  const params = new URLSearchParams();
  (Object.keys(filters) as (keyof Filters)[]).forEach((key) => {
    if (filters[key]) params.set(key, filters[key]);
  });
  return params;
}

export function hasActiveFilters(filters: Filters): boolean {
  return Object.values(filters).some(Boolean);
}

export function collectTags(artifacts: Artifact[]): string[] {
  return [...new Set(artifacts.flatMap((a) => a.tags))].sort();
}
