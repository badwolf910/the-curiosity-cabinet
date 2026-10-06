import { useBookmarks } from '../hooks/useBookmarks.jsx';

export default function BookmarkButton({ id, title, className = '', withLabel = false }) {
  const { has, toggle } = useBookmarks();
  const saved = has(id);
  return (
    <button
      type="button"
      className={`bookmark ${saved ? 'is-saved' : ''} ${className}`}
      aria-pressed={saved}
      aria-label={`${saved ? 'Remove bookmark for' : 'Bookmark'} ${title}`}
      onClick={() => toggle(id)}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path d="M6 3h12v18l-6-4-6 4z" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
      {withLabel && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  );
}
