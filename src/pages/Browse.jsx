import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ALL_TAGS, ARTIFACTS } from '../data/artifacts.js';
import ArtifactCard from '../components/ArtifactCard.jsx';
import CategoryChips from '../components/CategoryChips.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

const SORTS = {
  relevance: ['Default', () => 0],
  az: ['A to Z', (a, b) => a.title.localeCompare(b.title)],
  oldest: ['Oldest first', (a, b) => a.year - b.year],
  newest: ['Newest first', (a, b) => b.year - a.year],
};

export default function Browse() {
  useDocumentTitle('Collection');
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const cat = params.get('cat') ?? '';
  const tag = params.get('tag') ?? '';
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'relevance';

  const set = (k, v) => {
    const next = new URLSearchParams(params);
    v ? next.set(k, v) : next.delete(k);
    setParams(next, { replace: true });
  };

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return ARTIFACTS
      .filter((a) => (!cat || a.category === cat) && (!tag || a.tags.includes(tag)))
      .filter((a) => {
        const hay = `${a.title} ${a.summary} ${a.origin} ${a.tags.join(' ')}`.toLowerCase();
        return terms.every((t) => hay.includes(t));
      })
      .sort(SORTS[sort][1]);
  }, [q, cat, tag, sort]);

  const active = q || cat || tag;

  return (
    <div className="container section">
      <h1>The collection</h1>

      <div className="filters">
        <div className="field">
          <label htmlFor="q">Search</label>
          <input id="q" type="search" value={q} onChange={(e) => set('q', e.target.value)} placeholder="Title, tag, origin…" autoComplete="off" />
        </div>
        <div className="field">
          <label htmlFor="tag">Tag</label>
          <select id="tag" value={tag} onChange={(e) => set('tag', e.target.value)}>
            <option value="">Any tag</option>
            {ALL_TAGS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="sort">Sort</label>
          <select id="sort" value={sort} onChange={(e) => set('sort', e.target.value === 'relevance' ? '' : e.target.value)}>
            {Object.entries(SORTS).map(([k, [name]]) => <option key={k} value={k}>{name}</option>)}
          </select>
        </div>
      </div>

      <CategoryChips value={cat} onChange={(v) => set('cat', v)} />

      <p className="muted results-count" role="status" aria-live="polite">
        {results.length} {results.length === 1 ? 'object' : 'objects'}
        {active && <> · <button type="button" className="link-btn" onClick={() => setParams({}, { replace: true })}>Clear filters</button></>}
      </p>

      {results.length ? (
        <ul className="grid">
          {results.map((a) => <li key={a.id}><ArtifactCard artifact={a} /></li>)}
        </ul>
      ) : (
        <div className="empty"><p>Nothing in the cabinet matches that.</p></div>
      )}
    </div>
  );
}
