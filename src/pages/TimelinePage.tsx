import { Timeline } from '@/features/timeline/Timeline';
import { useArtifacts } from '@/hooks/useArtifacts';

export default function TimelinePage() {
  const { artifacts } = useArtifacts();
  return (
    <>
      <h1 className="page-title">Timeline</h1>
      <p className="lede">Artifacts grouped by era, oldest first.</p>
      <Timeline artifacts={artifacts} />
    </>
  );
}
