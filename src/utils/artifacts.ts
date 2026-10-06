import type { Artifact, Era } from '@/types';
import { ERAS } from './constants';

export function groupByEra(artifacts: Artifact[]): { era: Era; items: Artifact[] }[] {
  return ERAS.map((era) => ({
    era,
    items: artifacts.filter((a) => a.era === era).sort((a, b) => a.year - b.year),
  })).filter((g) => g.items.length > 0);
}

/** Related ids in both directions, resolved to artifacts, de-duplicated. */
export function getRelated(artifacts: Artifact[], artifact: Artifact): Artifact[] {
  const ids = new Set(artifact.relatedArtifacts);
  artifacts.forEach((a) => {
    if (a.relatedArtifacts.includes(artifact.id)) ids.add(a.id);
  });
  ids.delete(artifact.id);
  return artifacts.filter((a) => ids.has(a.id));
}
