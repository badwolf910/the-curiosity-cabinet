import { useEffect } from 'react';

export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · The Curiosity Cabinet` : 'The Curiosity Cabinet';
  }, [title]);
}
