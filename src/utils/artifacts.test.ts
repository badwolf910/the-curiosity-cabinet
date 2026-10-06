import { artifacts } from '@/data';
import { getRelated, groupByEra } from './artifacts';
import { formatYear } from './format';

describe('artifact helpers', () => {
  it('groups by era in chronological order, sorted by year', () => {
    const groups = groupByEra(artifacts);
    expect(groups[0].era).toBe('Prehistoric');
    groups.forEach((g) => expect(g.items.map((i) => i.year)).toEqual([...g.items.map((i) => i.year)].sort((a, b) => a - b)));
  });
  it('resolves related artifacts in both directions without self', () => {
    const rel = getRelated(artifacts, artifacts.find((a) => a.id === 'amber-moth')!);
    expect(rel.map((r) => r.id)).toContain('bone-flute-of-the-glacier');
    expect(rel.map((r) => r.id)).not.toContain('amber-moth');
  });
  it('formats BCE years', () => {
    expect(formatYear(-2400)).toBe('2,400 BCE');
    expect(formatYear(1609)).toBe('1609');
  });
});
