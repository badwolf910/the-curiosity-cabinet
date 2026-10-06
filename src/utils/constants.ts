import type { Category, Era } from '@/types';

export const ERAS: Era[] = [
  'Prehistoric',
  'Ancient',
  'Medieval',
  'Renaissance',
  'Industrial',
  'Modern',
  'Contemporary',
];

export const CATEGORIES: Category[] = [
  { id: 'curiosities', name: 'Curiosities', blurb: 'Wonders that defy easy classification.' },
  { id: 'scientific-instruments', name: 'Scientific Instruments', blurb: 'Tools built to measure the unmeasurable.' },
  { id: 'ancient-objects', name: 'Ancient Objects', blurb: 'Voices from deep time.' },
  { id: 'oddities', name: 'Oddities', blurb: 'Strange, small, and stubbornly memorable.' },
  { id: 'forgotten-technologies', name: 'Forgotten Technologies', blurb: 'Inventions the future left behind.' },
];

export const BOOKMARKS_STORAGE_KEY = 'curiosity-cabinet:bookmarks';
export const UI_STORAGE_KEY = 'curiosity-cabinet:ui';
