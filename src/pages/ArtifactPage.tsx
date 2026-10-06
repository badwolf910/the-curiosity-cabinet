import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArtifactDetail } from '@/features/artifacts/ArtifactDetail';
import { useArtifacts } from '@/hooks/useArtifacts';

export default function ArtifactPage() {
  const { id } = useParams();
  const { getById } = useArtifacts();
  const artifact = getById(id);

  useEffect(() => {
    document.title = artifact ? `${artifact.title} — The Curiosity Cabinet` : 'Not found — The Curiosity Cabinet';
    return () => { document.title = 'The Curiosity Cabinet'; };
  }, [artifact]);

  if (!artifact) {
    return (
      <>
        <h1 className="page-title">Artifact not found</h1>
        <p>This item is not in the cabinet. <Link to="/">Return to the collection</Link>.</p>
      </>
    );
  }
  return <ArtifactDetail artifact={artifact} />;
}
