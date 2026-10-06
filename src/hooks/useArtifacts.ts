import { useMemo } from 'react';
import { artifacts } from '@/data';
import { collectTags } from '@/utils/filters';

export function useArtifacts() {
  return useMemo(
    () => ({
      artifacts,
      tags: collectTags(artifacts),
      getById: (id: string | undefined) => artifacts.find((a) => a.id === id),
    }),
    [],
  );
}
