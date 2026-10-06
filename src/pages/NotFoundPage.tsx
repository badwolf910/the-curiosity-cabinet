import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <h1 className="page-title">Page not found</h1>
      <p><Link to="/">Return to the collection</Link></p>
    </>
  );
}
