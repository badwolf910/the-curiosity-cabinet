import { Link } from 'react-router-dom';
import { ARTIFACTS, CATEGORIES } from '../data/artifacts.js';
import ArtifactCard from '../components/ArtifactCard.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import HeroPhoto from '../components/HeroPhoto.jsx';

export default function Home() {
  useDocumentTitle('');
  const featured = ARTIFACTS.slice(0, 3);
  const day = ARTIFACTS[Math.floor(Date.now() / 864e5) % ARTIFACTS.length];

  return (
    <>
      <section className="hero">
        <HeroPhoto />
        <div className="container hero__content">
          <p className="eyebrow">A digital museum</p>
          <h1>Step inside the Curiosity Cabinet</h1>
          <p className="lead">Strange machines, undeciphered scripts, and natural marvels, gathered in one quiet room for the curious.</p>
          <div className="row">
            <Link to="/browse" className="btn">Explore the collection</Link>
            <Link to="/timeline" className="btn btn--ghost">Walk the timeline</Link>
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="wings-h">
        <h2 id="wings-h">Browse by wing</h2>
        <ul className="grid grid--cats">
          {CATEGORIES.map((c) => (
            <li key={c.id}>
              <Link to={`/browse?cat=${c.id}`} className="wing">
                <span className="wing__glyph" aria-hidden="true">{c.glyph}</span>
                <span className="wing__name">{c.name}</span>
                <span className="muted">{c.blurb}</span>
                <span className="wing__count">{ARTIFACTS.filter((a) => a.category === c.id).length} objects</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container section" aria-labelledby="day-h">
        <h2 id="day-h">Object of the day</h2>
        <ul className="grid"><li><ArtifactCard artifact={day} /></li></ul>
      </section>

      <section className="container section" aria-labelledby="feat-h">
        <h2 id="feat-h">Featured</h2>
        <ul className="grid">
          {featured.map((a) => <li key={a.id}><ArtifactCard artifact={a} /></li>)}
        </ul>
      </section>
    </>
  );
}
