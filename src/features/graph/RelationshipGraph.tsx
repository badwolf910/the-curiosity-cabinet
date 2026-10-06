import { useMemo, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useArtifacts } from '@/hooks/useArtifacts';
import { computeLayout } from '@/utils/forceLayout';
import type { GraphEdge } from '@/utils/forceLayout';
import { getRelated } from '@/utils/artifacts';
import styles from './RelationshipGraph.module.css';

const W = 720;
const H = 480;
const COLORS: Record<string, string> = {
  curiosities: '#c9a24b',
  'scientific-instruments': '#8a6f4d',
  'ancient-objects': '#b5835a',
  oddities: '#a4543a',
  'forgotten-technologies': '#7a7f5a',
};

/** Force-directed SVG graph; every node is focusable and a list fallback follows the graphic. */
export function RelationshipGraph({ focusId }: { focusId?: string }) {
  const { artifacts } = useArtifacts();
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);

  const { nodes, edges, items } = useMemo(() => {
    const focus = artifacts.find((a) => a.id === focusId);
    const items = focus ? [focus, ...getRelated(artifacts, focus)] : artifacts;
    const present = new Set(items.map((a) => a.id));
    const seen = new Set<string>();
    const edges: GraphEdge[] = [];
    items.forEach((a) =>
      a.relatedArtifacts.forEach((r) => {
        const key = [a.id, r].sort().join('|');
        if (present.has(r) && !seen.has(key)) {
          seen.add(key);
          edges.push({ source: a.id, target: r });
        }
      }),
    );
    return { items, edges, nodes: computeLayout(items.map((a) => a.id), edges, W, H) };
  }, [artifacts, focusId]);

  const pos = new Map(nodes.map((n) => [n.id, n]));
  const byId = new Map(items.map((a) => [a.id, a]));

  const onKeyDown = (e: KeyboardEvent<SVGGElement>, id: string, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/artifacts/${id}`);
      return;
    }
    const step = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0;
    if (step) {
      e.preventDefault();
      const all = svgRef.current?.querySelectorAll<SVGGElement>('[data-node]');
      all?.[(index + step + all.length) % all.length]?.focus();
    }
  };

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className={styles.svg}
        role="group"
        aria-label="Graph of related artifacts. Use arrow keys to move between nodes and Enter to open one."
      >
        {edges.map((e) => {
          const a = pos.get(e.source);
          const b = pos.get(e.target);
          return a && b ? <line key={`${e.source}-${e.target}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={styles.edge} /> : null;
        })}
        {nodes.map((n, i) => {
          const a = byId.get(n.id);
          if (!a) return null;
          const isFocus = n.id === focusId;
          return (
            <g
              key={n.id}
              data-node
              tabIndex={0}
              role="button"
              aria-label={a.title}
              aria-current={isFocus ? 'page' : undefined}
              transform={`translate(${n.x} ${n.y})`}
              className={styles.node}
              onClick={() => navigate(`/artifacts/${n.id}`)}
              onKeyDown={(e) => onKeyDown(e, n.id, i)}
            >
              <circle r={isFocus ? 16 : 11} fill={COLORS[a.category]} className={styles.dot} />
              <text y={isFocus ? 32 : 26} textAnchor="middle" className={styles.label}>{a.title.length > 22 ? `${a.title.slice(0, 21)}…` : a.title}</text>
            </g>
          );
        })}
      </svg>
      <details className={styles.fallback}>
        <summary>View connections as a list</summary>
        <ul>
          {items.map((a) => (
            <li key={a.id}>
              <Link to={`/artifacts/${a.id}`}>{a.title}</Link>
              {' — '}
              {getRelated(artifacts, a).filter((r) => byId.has(r.id)).map((r) => r.title).join(', ') || 'no connections'}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
