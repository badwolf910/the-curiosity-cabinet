import { RelationshipGraph } from '@/features/graph/RelationshipGraph';

export default function GraphPage() {
  return (
    <>
      <h1 className="page-title">Related concepts</h1>
      <p className="lede">Lines join artifacts that share a story. Tab to a node and press Enter to open it.</p>
      <RelationshipGraph />
    </>
  );
}
