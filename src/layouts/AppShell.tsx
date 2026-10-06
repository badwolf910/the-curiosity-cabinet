import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useBookmarks } from '@/hooks/useBookmarks';
import styles from './AppShell.module.css';

export function AppShell() {
  const { count } = useBookmarks();
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const first = useRef(true);

  // Move focus to main content on route change so keyboard/screen-reader users land on new content.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus();
    window.scrollTo?.(0, 0);
  }, [pathname]);

  const link = ({ isActive }: { isActive: boolean }) => (isActive ? `${styles.link} ${styles.active}` : styles.link);

  return (
    <>
      <a href="#main" className={styles.skip}>Skip to main content</a>
      <header className={styles.header}>
        <div className={`container ${styles.bar}`}>
          <NavLink to="/" className={styles.brand}>The Curiosity Cabinet</NavLink>
          <nav aria-label="Primary">
            <ul className={styles.nav}>
              <li><NavLink to="/" end className={link}>Collection</NavLink></li>
              <li><NavLink to="/timeline" className={link}>Timeline</NavLink></li>
              <li><NavLink to="/graph" className={link}>Graph</NavLink></li>
              <li><NavLink to="/bookmarks" className={link}>Shelf{count > 0 && <span aria-label={`${count} saved`}> ({count})</span>}</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <main id="main" ref={mainRef} tabIndex={-1} className={`container ${styles.main}`}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p>The Curiosity Cabinet — all artifacts are fictional but plausible.</p>
        </div>
      </footer>
    </>
  );
}
