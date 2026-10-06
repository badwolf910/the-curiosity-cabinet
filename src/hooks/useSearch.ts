import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Filters } from '@/types';
import { artifacts } from '@/data';
import { filterArtifacts, hasActiveFilters, parseFilters, serializeFilters } from '@/utils/filters';

/** Search + filter state kept in the URL so views are shareable. */
export function useSearch() {
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const results = useMemo(() => filterArtifacts(artifacts, filters), [filters]);

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setParams((prev) => serializeFilters({ ...parseFilters(prev), [key]: value }), { replace: true });
    },
    [setParams],
  );
  const reset = useCallback(() => setParams({}, { replace: true }), [setParams]);

  return { filters, results, setFilter, reset, active: hasActiveFilters(filters) };
}
