import { ArtifactGrid } from '@/features/artifacts/ArtifactGrid';
import { SearchBar } from '@/features/search/SearchBar';
import { TagFilter } from '@/features/search/TagFilter';
import { ViewToggle } from '@/features/search/ViewToggle';
import { useArtifacts } from '@/hooks/useArtifacts';
import { useSearch } from '@/hooks/useSearch';
import { useUiStore } from '@/hooks/useUiStore';

export default function HomePage() {
  const { tags } = useArtifacts();
  const { filters, results, setFilter, reset, active } = useSearch();
  const view = useUiStore((s) => s.viewMode);
  const setView = useUiStore((s) => s.setViewMode);

  return (
    <>
      <h1 className="page-title">Explore the collection</h1>
      <p className="lede">Thirty strange and wonderful objects, from a moth in amber to a shoebox of floppy disks.</p>
      <SearchBar filters={filters} onChange={setFilter} onReset={reset} active={active} />
      <details style={{ margin: '1rem 0' }}>
        <summary style={{ minHeight: 44, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>Filter by tag{filters.tag ? `: ${filters.tag}` : ''}</summary>
        <TagFilter tags={tags} selected={filters.tag} onSelect={(t) => setFilter('tag', t)} />
      </details>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
        <p role="status" style={{ margin: 0 }}>{results.length} {results.length === 1 ? 'artifact' : 'artifacts'} found</p>
        <ViewToggle view={view} onChange={setView} />
      </div>
      {results.length ? <ArtifactGrid artifacts={results} view={view} /> : <p>Nothing matches. Try clearing a filter.</p>}
    </>
  );
}
