import type { Artifact, ViewMode } from '@/types';
import { ArtifactCard } from './ArtifactCard';
import { Reveal } from '@/components/ui';
import styles from './ArtifactGrid.module.css';

interface Props { artifacts: Artifact[]; view: ViewMode }

export function ArtifactGrid({ artifacts, view }: Props) {
  return (
    <ul className={`${styles.grid} ${view === 'list' ? styles.list : ''}`} aria-label="Artifacts">
      {artifacts.map((a) => (
        <li key={a.id}>
          <Reveal><ArtifactCard artifact={a} view={view} /></Reveal>
        </li>
      ))}
    </ul>
  );
}
