import type { ReactNode } from 'react';
import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useSearch } from './useSearch';

const wrapper = (initial: string) => ({ children }: { children: ReactNode }) => (
  <MemoryRouter initialEntries={[initial]}>{children}</MemoryRouter>
);

describe('useSearch', () => {
  it('reads filters from the URL', () => {
    const { result } = renderHook(() => useSearch(), { wrapper: wrapper('/?era=Medieval') });
    expect(result.current.filters.era).toBe('Medieval');
    expect(result.current.results.every((a) => a.era === 'Medieval')).toBe(true);
  });
  it('updates and resets filters', () => {
    const { result } = renderHook(() => useSearch(), { wrapper: wrapper('/') });
    act(() => result.current.setFilter('category', 'oddities'));
    expect(result.current.active).toBe(true);
    expect(result.current.results.every((a) => a.category === 'oddities')).toBe(true);
    act(() => result.current.reset());
    expect(result.current.active).toBe(false);
  });
});
