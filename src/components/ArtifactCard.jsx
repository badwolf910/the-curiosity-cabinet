import { memo } from 'react';
import { Link } from 'react-router-dom';
import { categoryById } from '../data/artifacts.js';
import BookmarkButton from './BookmarkButton.jsx';
import { useWikiSummary } from '../lib/wiki.js';

export function Plate({ artifact, size = 'md' }) {
  const wiki = useWikiSummary(artifact.wiki);
  return (
    <div className={`plate plate--${size}`} style={{ '--hue': artifact.hue }}>
      {wiki?.image ? (
        <img src={wiki.image} alt={size === 'sm' ? '' : artifact.title} loading="lazy" />
      ) : (
        <span aria-hidden="true">{artifact.glyph}</span>
      )}
    </div>
  );
}

function ArtifactCard({ artifact }) {
  const cat = categoryById[artifact.category];
  return (
    <article className="card">
      <Plate artifact={artifact} />
      <div className="card__body">
        <p className="eyebrow">{cat.name} · {artifact.yearLabel}</p>
        <h3 className="card__title">
          <Link to={`/artifact/${artifact.id}`} className="card__link">{artifact.title}</Link>
        </h3>
        <p className="muted">{artifact.summary}</p>
      </div>
      <BookmarkButton id={artifact.id} title={artifact.title} className="card__bookmark" />
    </article>
  );
}

export default memo(ArtifactCard);
