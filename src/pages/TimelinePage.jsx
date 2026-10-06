import { useState } from 'react';
import { ARTIFACTS } from '../data/artifacts.js';
import Timeline from '../components/Timeline.jsx';
import CategoryChips from '../components/CategoryChips.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function TimelinePage() {
  useDocumentTitle('Timeline');
  const [cat, setCat] = useState('');
  const items = cat ? ARTIFACTS.filter((a) => a.category === cat) : ARTIFACTS;
  return (
    <div className="container section">
      <h1>Timeline</h1>
      <p className="lead">From ancient seas to Victorian laboratories, ordered by age.</p>
      <CategoryChips value={cat} onChange={setCat} />
      <Timeline artifacts={items} />
    </div>
  );
}
