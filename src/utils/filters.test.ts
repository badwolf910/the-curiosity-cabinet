import { artifacts } from '@/data';
import { collectTags, filterArtifacts, EMPTY_FILTERS, parseFilters, serializeFilters } from './filters';

describe('filterArtifacts', () => {
  it('returns everything with empty filters', () => {
    expect(filterArtifacts(artifacts, EMPTY_FILTERS)).toHaveLength(artifacts.length);
  });
  it('fuzzy matches typos', () => {
    const res = filterArtifacts(artifacts, { ...EMPTY_FILTERS, q: 'astrolab' });
    expect(res.some((a) => a.id === 'astrolabe-of-al-fazari')).toBe(true);
  });
  it('combines category, era and tag filters', () => {
    const res = filterArtifacts(artifacts, { q: '', category: 'forgotten-technologies', era: 'Industrial', tag: 'gears' });
    expect(res.length).toBeGreaterThan(0);
    expect(res.every((a) => a.category === 'forgotten-technologies' && a.era === 'Industrial' && a.tags.includes('gears'))).toBe(true);
  });
});

describe('URL param helpers', () => {
  it('round-trips filters and drops empties', () => {
    const f = { q: 'glass', category: 'oddities' as const, era: '' as const, tag: '' };
    expect(serializeFilters(f).toString()).toBe('q=glass&category=oddities');
    expect(parseFilters(serializeFilters(f))).toEqual(f);
  });
  it('ignores invalid category and era', () => {
    expect(parseFilters(new URLSearchParams('category=nope&era=Bronze'))).toEqual(EMPTY_FILTERS);
  });
  it('collects sorted unique tags', () => {
    const tags = collectTags(artifacts);
    expect(tags).toEqual([...new Set(tags)].sort());
  });
});
