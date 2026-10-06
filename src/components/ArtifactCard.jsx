import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryById } from '../data/artifacts.js';
import BookmarkButton from './BookmarkButton.jsx';
import { useWikiSummary } from '../lib/wiki.js';
import ImageCrop from './ImageCrop.jsx';

export function Plate({ artifact, size = 'md' }) {
  const wiki = useWikiSummary(artifact.wiki);
  const [failed, setFailed] = useState(false);
  const own = artifact.image && !failed;
  const crop = size === 'sm' ? artifact.cropSm ?? artifact.crop : artifact.crop;
  return (
    <div className={`plate plate--${size}`} style={{ '--hue': artifact.hue }}>
      {own && crop ? (
        <ImageCrop src={artifact.image} alt={size === 'sm' ? '' : artifact.title} {...crop} onError={() => setFailed(true)} />
      ) : own ? (
        <img src={artifact.image} alt={size === 'sm' ? '' : artifact.title} loading="lazy" onError={() => setFailed(true)} />
      ) : wiki?.image ? (
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
