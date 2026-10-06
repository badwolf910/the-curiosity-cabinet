export interface GraphNode {
  id: string;
  x: number;
  y: number;
}
export interface GraphEdge {
  source: string;
  target: string;
}

/**
 * Small deterministic force-directed layout (repulsion + spring + centering).
 * Nodes start on a circle so output is stable between renders.
 */
export function computeLayout(
  ids: string[],
  edges: GraphEdge[],
  width: number,
  height: number,
  iterations = 220,
): GraphNode[] {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) / 3;
  const nodes = ids.map((id, i) => {
    const angle = (2 * Math.PI * i) / Math.max(ids.length, 1);
    return { id, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle), vx: 0, vy: 0 };
  });
  const index = new Map(nodes.map((n, i) => [n.id, i]));
  const links = edges
    .map((e) => [index.get(e.source), index.get(e.target)] as const)
    .filter((l): l is readonly [number, number] => l[0] !== undefined && l[1] !== undefined);
  const spring = Math.min(width, height) / 4;
  // Larger graphs need proportionally stronger repulsion to avoid clumping.
  const repulsion = 1800 * Math.max(1, ids.length / 6) ** 2;

  for (let step = 0; step < iterations; step++) {
    const cooling = 1 - step / iterations;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let dist = Math.hypot(dx, dy);
        if (dist < 0.01) {
          dx = 0.1 * (i + 1);
          dy = 0.1 * (j + 1);
          dist = Math.hypot(dx, dy);
        }
        const force = (repulsion / (dist * dist)) * cooling;
        a.vx += (dx / dist) * force;
        a.vy += (dy / dist) * force;
        b.vx -= (dx / dist) * force;
        b.vy -= (dy / dist) * force;
      }
    }
    for (const [s, t] of links) {
      const a = nodes[s];
      const b = nodes[t];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = (dist - spring) * 0.02 * cooling;
      a.vx += (dx / dist) * force;
      a.vy += (dy / dist) * force;
      b.vx -= (dx / dist) * force;
      b.vy -= (dy / dist) * force;
    }
    const pad = 36;
    for (const n of nodes) {
      n.vx += (cx - n.x) * 0.005;
      n.vy += (cy - n.y) * 0.005;
      n.x = Math.min(width - pad, Math.max(pad, n.x + n.vx));
      n.y = Math.min(height - pad, Math.max(pad, n.y + n.vy));
      n.vx *= 0.6;
      n.vy *= 0.6;
    }
  }
  return nodes.map(({ id, x, y }) => ({ id, x, y }));
}
