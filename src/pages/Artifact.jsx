import { Link, useParams } from 'react-router-dom';
import { byId, categoryById } from '../data/artifacts.js';
import { Plate } from '../components/ArtifactCard.jsx';
import BookmarkButton from '../components/BookmarkButton.jsx';
import RelatedGraph from '../components/RelatedGraph.jsx';
import DiscussionPanel from '../components/DiscussionPanel.jsx';
import FeatureStory from '../components/FeatureStory.jsx';
import NotFound from './NotFound.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { useWikiSummary } from '../lib/wiki.js';

export default function Artifact() {
  const { id } = useParams();
  const a = byId[id];
  const wiki = useWikiSummary(a?.wiki);
  useDocumentTitle(a?.title);
  if (!a) return <NotFound />;
  const cat = categoryById[a.category];

  return (
    <div className="container section artifact">
      <nav aria-label="Breadcrumb" className="crumbs">
        <Link to="/browse">Collection</Link> <span aria-hidden="true">/</span> <Link to={`/browse?cat=${cat.id}`}>{cat.name}</Link>
      </nav>

      <header className="artifact__head">
        <Plate artifact={a} size="lg" />
        <div>
          <p className="eyebrow">{a.yearLabel} · {a.origin}</p>
          <h1>{a.title}</h1>
          <p className="lead">{a.summary}</p>
          <BookmarkButton id={a.id} title={a.title} withLabel className="btn btn--ghost" />
        </div>
      </header>

      <div className="artifact__cols">
        <div>
          {a.feature && <FeatureStory artifact={a} />}
          {!a.feature && (
          <section aria-labelledby="story-h">
            <h2 id="story-h">The story</h2>
            <p className="prose">{a.story}</p>
            {wiki?.extract && (
              <blockquote className="source">
                <p>{wiki.extract}</p>
                <footer>Source: <a href={wiki.url} target="_blank" rel="noreferrer">Wikipedia</a> (images via Wikimedia Commons; licences vary)</footer>
              </blockquote>
            )}
          </section>
          )}
          <section aria-labelledby="facts-h">
            <h2 id="facts-h">Key facts</h2>
            <ul className="facts">{a.facts.map((f) => <li key={f}>{f}</li>)}</ul>
            <ul className="chips" aria-label="Tags">
              {a.tags.map((t) => <li key={t}><Link className="chip" to={`/browse?tag=${t}`}>#{t}</Link></li>)}
            </ul>
          </section>
          <RelatedGraph artifact={a} />
        </div>
        <aside><DiscussionPanel artifact={a} /></aside>
      </div>
    </div>
  );
}
