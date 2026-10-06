import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ViewMode } from '@/types';
import { UI_STORAGE_KEY } from '@/utils/constants';

interface UiState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const useUiStore = create<UiState>()(
  persist((set) => ({ viewMode: 'grid', setViewMode: (viewMode) => set({ viewMode }) }), {
    name: UI_STORAGE_KEY,
  }),
);
