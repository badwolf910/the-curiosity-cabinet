import { Link } from 'react-router-dom';
import ImageCrop from './ImageCrop.jsx';

export default function FeatureStory({ artifact }) {
  const { feature: f, image } = artifact;
  return (
    <div className="feature">
      <p className="eyebrow">{f.subtitle}</p>

      <section aria-labelledby="disc-h">
        <h2 id="disc-h">The discovery</h2>
        <blockquote className="source source--story">
          {f.discovery.map((p) => <p key={p}>{p}</p>)}
        </blockquote>
      </section>

      <section aria-labelledby="spec-h">
        <h2 id="spec-h">The specimen</h2>
        <dl className="specs">
          {f.specimen.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd><ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul></dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="unusual-h">
        <h2 id="unusual-h">Why it’s unusual</h2>
        <p className="prose">{f.unusual}</p>
      </section>

      <section aria-labelledby="expert-h">
        <h2 id="expert-h">Expert commentary</h2>
        <figure className="callout">
          <blockquote><p>“{f.expert.quote}”</p></blockquote>
          <figcaption>— {f.expert.name}, {f.expert.role}</figcaption>
        </figure>
      </section>

      <section aria-labelledby="views-h">
        <h2 id="views-h">Visual analysis</h2>
        <ul className="views">
          {f.views.map((v) => (
            <li key={v.title}>
              <figure>
                <div className="views__frame"><ImageCrop src={image} alt={`${v.title} of the specimen`} {...v.crop} /></div>
                <figcaption><strong>{v.title}</strong><span className="muted">{v.text}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="chain-h">
        <h2 id="chain-h">Follow the thread</h2>
        <ol className="chain">
          {f.chain.map((c) => (
            <li key={c.label}>
              <a href={`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(c.q)}`} target="_blank" rel="noreferrer">{c.label}</a>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="journey-h">
        <h2 id="journey-h">The specimen’s journey</h2>
        <ol className="journey">
          {f.journey.map((j) => (
            <li key={j.when}>
              <span className="journey__icon" aria-hidden="true">{j.icon}</span>
              <div><h3>{j.when}</h3><p className="muted">{j.text}</p></div>
            </li>
          ))}
        </ol>
        <p><Link to="/timeline">See it on the full timeline →</Link></p>
      </section>
    </div>
  );
}
