import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks.jsx';

export default function Layout() {
  const { ids } = useBookmarks();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const close = () => setOpen(false);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="container site-header__inner">
          <NavLink to="/" className="brand" onClick={close}>
            <span aria-hidden="true">🏺</span> The Curiosity Cabinet
          </NavLink>
          <button
            type="button" className="nav-toggle" aria-expanded={open} aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
          <nav id="primary-nav" aria-label="Primary" className={`nav ${open ? 'is-open' : ''}`}>
            <NavLink to="/browse" onClick={close}>Collection</NavLink>
            <NavLink to="/timeline" onClick={close}>Timeline</NavLink>
            <NavLink to="/bookmarks" onClick={close}>Bookmarks{ids.length > 0 && <span className="badge" aria-label={`${ids.length} saved`}>{ids.length}</span>}</NavLink>
          </nav>
          <form
            role="search" className="header-search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get('q').toString().trim();
              navigate(q ? `/browse?q=${encodeURIComponent(q)}` : '/browse');
              close();
            }}
          >
            <label className="sr-only" htmlFor="site-search">Search the collection</label>
            <input id="site-search" name="q" type="search" placeholder="Search…" autoComplete="off" />
          </form>
        </div>
      </header>
      <main id="main" tabIndex={-1}><Outlet /></main>
      <footer className="site-footer">
        <div className="container">
          <p>The Curiosity Cabinet · A small museum of discoveries and unusual objects.</p>
        </div>
      </footer>
    </>
  );
}
