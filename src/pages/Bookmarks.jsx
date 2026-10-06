import { Link } from 'react-router-dom';
import { byId } from '../data/artifacts.js';
import ArtifactCard from '../components/ArtifactCard.jsx';
import { useBookmarks } from '../hooks/useBookmarks.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Bookmarks() {
  useDocumentTitle('Bookmarks');
  const { ids } = useBookmarks();
  const items = ids.map((id) => byId[id]).filter(Boolean);
  return (
    <div className="container section">
      <h1>Your bookmarks</h1>
      {items.length ? (
        <ul className="grid">{items.map((a) => <li key={a.id}><ArtifactCard artifact={a} /></li>)}</ul>
      ) : (
        <div className="empty">
          <p>No saved objects yet. Use the bookmark icon on any artifact.</p>
          <Link to="/browse" className="btn">Browse the collection</Link>
        </div>
      )}
    </div>
  );
}
