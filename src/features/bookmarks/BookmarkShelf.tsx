import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from '@/components/ui';
import { ArtifactGrid } from '@/features/artifacts/ArtifactGrid';
import { useArtifacts } from '@/hooks/useArtifacts';
import { useBookmarks } from '@/hooks/useBookmarks';

export function BookmarkShelf() {
  const { artifacts } = useArtifacts();
  const { ids, clear } = useBookmarks();
  const [confirming, setConfirming] = useState(false);
  const saved = artifacts.filter((a) => ids.includes(a.id));

  if (saved.length === 0) {
    return (
      <p>
        Your shelf is empty. <Link to="/">Browse the collection</Link> and press the star to keep an artifact here.
      </p>
    );
  }
  return (
    <>
      <p aria-live="polite">{saved.length} saved {saved.length === 1 ? 'artifact' : 'artifacts'}</p>
      <ArtifactGrid artifacts={saved} view="grid" />
      <p><Button variant="secondary" onClick={() => setConfirming(true)}>Clear shelf</Button></p>
      <Modal open={confirming} title="Clear your shelf?" onClose={() => setConfirming(false)}>
        <p>This removes all {saved.length} bookmarks from this device.</p>
        <Button onClick={() => { clear(); setConfirming(false); }}>Yes, clear</Button>{' '}
        <Button variant="secondary" onClick={() => setConfirming(false)}>Cancel</Button>
      </Modal>
    </>
  );
}
