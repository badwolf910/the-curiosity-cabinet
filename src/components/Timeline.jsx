import { Link } from 'react-router-dom';
import { categoryById, formatYear } from '../data/artifacts.js';
import { Plate } from './ArtifactCard.jsx';

export default function Timeline({ artifacts }) {
  const sorted = [...artifacts].sort((a, b) => a.year - b.year);
  if (!sorted.length) return <p className="muted">No artifacts match this filter.</p>;
  return (
    <ol className="timeline">
      {sorted.map((a, i) => (
        <li key={a.id} className={`timeline__item ${i % 2 ? 'is-right' : ''}`}>
          <span className="timeline__dot" aria-hidden="true" />
          <Link to={`/artifact/${a.id}`} className="timeline__card">
            <Plate artifact={a} size="sm" />
            <div>
              <p className="eyebrow">{formatYear(a.year)}</p>
              <h3>{a.title}</h3>
              <p className="muted">{categoryById[a.category].name} · {a.origin}</p>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
