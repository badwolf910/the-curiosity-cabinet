import { Link } from 'react-router-dom';
import { byId } from '../data/artifacts.js';

const W = 640;
const H = 460;
const CX = W / 2;
const CY = H / 2;

function ring(items, r, offset = 0) {
  return items.map((a, i) => {
    const t = (i / items.length) * Math.PI * 2 - Math.PI / 2 + offset;
    return { a, x: CX + Math.cos(t) * r * 1.35, y: CY + Math.sin(t) * r };
  });
}

export default function RelatedGraph({ artifact }) {
  const firstIds = artifact.related;
  const secondIds = [...new Set(firstIds.flatMap((id) => byId[id].related))].filter((id) => id !== artifact.id && !firstIds.includes(id));
  const first = ring(firstIds.map((id) => byId[id]), 120);
  const second = ring(secondIds.map((id) => byId[id]), 195, 0.3);
  const pos = Object.fromEntries([...first, ...second].map((n) => [n.a.id, n]));

  const edges = [];
  first.forEach((n) => edges.push([{ x: CX, y: CY }, n, false]));
  first.forEach((n) => n.a.related.forEach((id) => pos[id] && !firstIds.includes(id) && edges.push([n, pos[id], true])));

  const node = (n, cls) => (
    <Link key={n.a.id} to={`/artifact/${n.a.id}`} className={`graph__node ${cls}`} aria-label={`${n.a.title}, related concept`}>
      <circle cx={n.x} cy={n.y} r={cls === 'is-first' ? 26 : 20} />
      <text x={n.x} y={n.y + 5} textAnchor="middle" className="graph__glyph" aria-hidden="true">{n.a.glyph}</text>
      <text x={n.x} y={n.y + (cls === 'is-first' ? 44 : 36)} textAnchor="middle" className="graph__label">{n.a.title.length > 22 ? `${n.a.title.slice(0, 20)}…` : n.a.title}</text>
    </Link>
  );

  return (
    <section aria-labelledby="graph-h" className="graph">
      <h2 id="graph-h">Related concepts</h2>
      <svg viewBox={`0 0 ${W} ${H}`} role="group" aria-label={`Graph of artifacts related to ${artifact.title}`}>
        {edges.map(([p, q, faint], i) => (
          <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} className={faint ? 'graph__edge is-faint' : 'graph__edge'} />
        ))}
        <g aria-hidden="true">
          <circle cx={CX} cy={CY} r={34} className="graph__center" />
          <text x={CX} y={CY + 7} textAnchor="middle" className="graph__glyph graph__glyph--center">{artifact.glyph}</text>
        </g>
        {second.map((n) => node(n, 'is-second'))}
        {first.map((n) => node(n, 'is-first'))}
      </svg>
      <ul className="graph__list">
        {firstIds.map((id) => (
          <li key={id}><Link to={`/artifact/${id}`}>{byId[id].title}</Link></li>
        ))}
      </ul>
    </section>
  );
}
