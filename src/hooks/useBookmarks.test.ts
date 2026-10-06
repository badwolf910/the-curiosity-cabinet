import { act, renderHook } from '@testing-library/react';
import { useBookmarks } from './useBookmarks';
import { useBookmarkStore } from './useBookmarkStore';
import { BOOKMARKS_STORAGE_KEY } from '@/utils/constants';

describe('useBookmarks', () => {
  beforeEach(() => useBookmarkStore.setState({ ids: [] }));

  it('toggles and persists to localStorage', () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => result.current.toggle('amber-moth'));
    expect(result.current.isBookmarked('amber-moth')).toBe(true);
    expect(JSON.parse(localStorage.getItem(BOOKMARKS_STORAGE_KEY)!).state.ids).toEqual(['amber-moth']);
    act(() => result.current.toggle('amber-moth'));
    expect(result.current.count).toBe(0);
  });
  it('clears all', () => {
    const { result } = renderHook(() => useBookmarks());
    act(() => { result.current.toggle('a'); result.current.toggle('b'); });
    act(() => result.current.clear());
    expect(result.current.ids).toEqual([]);
  });
});
