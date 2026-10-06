import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BOOKMARKS_STORAGE_KEY } from '@/utils/constants';

interface BookmarkState {
  ids: string[];
  toggle: (id: string) => void;
  clear: () => void;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({ ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id] })),
      clear: () => set({ ids: [] }),
    }),
    { name: BOOKMARKS_STORAGE_KEY },
  ),
);
