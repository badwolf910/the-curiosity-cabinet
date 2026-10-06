export type CategoryId =
  | 'curiosities'
  | 'scientific-instruments'
  | 'ancient-objects'
  | 'oddities'
  | 'forgotten-technologies';

export type Era =
  | 'Prehistoric'
  | 'Ancient'
  | 'Medieval'
  | 'Renaissance'
  | 'Industrial'
  | 'Modern'
  | 'Contemporary';

export interface Artifact {
  id: string;
  title: string;
  category: CategoryId;
  era: Era;
  /** Negative values are BCE. */
  year: number;
  image: string;
  description: string;
  provenance: string;
  relatedArtifacts: string[];
  tags: string[];
}

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface Filters {
  q: string;
  category: CategoryId | '';
  era: Era | '';
  tag: string;
}

export type ViewMode = 'grid' | 'list';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}
