import { memo } from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import styles from './BookmarkButton.module.css';

interface Props { id: string; title: string }

export const BookmarkButton = memo(function BookmarkButton({ id, title }: Props) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(id);
  return (
    <button
      type="button"
      className={`${styles.button} ${saved ? styles.saved : ''}`}
      aria-pressed={saved}
      aria-label={`Bookmark ${title}`}
      onClick={() => toggle(id)}
    >
      <span aria-hidden="true">{saved ? '★' : '☆'}</span>
    </button>
  );
});
