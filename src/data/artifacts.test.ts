import { artifacts } from './index';
import { CATEGORIES, ERAS } from '@/utils/constants';

describe('seed data', () => {
  it('has 30 artifacts with unique ids', () => {
    expect(artifacts).toHaveLength(30);
    expect(new Set(artifacts.map((a) => a.id)).size).toBe(30);
  });
  it('uses valid categories, eras and related ids', () => {
    const ids = new Set(artifacts.map((a) => a.id));
    artifacts.forEach((a) => {
      expect(CATEGORIES.some((c) => c.id === a.category)).toBe(true);
      expect(ERAS).toContain(a.era);
      a.relatedArtifacts.forEach((r) => expect(ids.has(r)).toBe(true));
    });
  });
});
