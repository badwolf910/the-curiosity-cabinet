import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Not found');
  return (
    <div className="container section empty">
      <h1>This room is not on the map</h1>
      <p className="muted">The page you looked for is missing from the cabinet.</p>
      <Link to="/" className="btn">Return to the entrance</Link>
    </div>
  );
}
