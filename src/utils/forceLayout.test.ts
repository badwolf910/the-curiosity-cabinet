import { computeLayout } from './forceLayout';

describe('computeLayout', () => {
  const edges = [{ source: 'a', target: 'b' }, { source: 'b', target: 'c' }];
  it('is deterministic and stays inside bounds', () => {
    const one = computeLayout(['a', 'b', 'c'], edges, 600, 400);
    expect(computeLayout(['a', 'b', 'c'], edges, 600, 400)).toEqual(one);
    one.forEach((n) => {
      expect(n.x).toBeGreaterThanOrEqual(0);
      expect(n.x).toBeLessThanOrEqual(600);
      expect(n.y).toBeGreaterThanOrEqual(0);
      expect(n.y).toBeLessThanOrEqual(400);
    });
  });
  it('handles empty input and ignores unknown edge ids', () => {
    expect(computeLayout([], [], 100, 100)).toEqual([]);
    expect(computeLayout(['a'], [{ source: 'a', target: 'zzz' }], 100, 100)).toHaveLength(1);
  });
});
