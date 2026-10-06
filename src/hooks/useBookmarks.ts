import { useCallback } from 'react';
import { useBookmarkStore } from './useBookmarkStore';

export function useBookmarks() {
  const ids = useBookmarkStore((s) => s.ids);
  const toggle = useBookmarkStore((s) => s.toggle);
  const clear = useBookmarkStore((s) => s.clear);
  const isBookmarked = useCallback((id: string) => ids.includes(id), [ids]);
  return { ids, count: ids.length, isBookmarked, toggle, clear };
}
