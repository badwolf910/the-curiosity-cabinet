import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import styles from './Reveal.module.css';

/** Fades content up when it scrolls into view. Honours prefers-reduced-motion via global CSS. */
export function Reveal({ children }: { children: ReactNode }) {
  const [ref, seen] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`${styles.reveal} ${seen ? styles.seen : ''}`}>
      {children}
    </div>
  );
}
