import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

const Browse = lazy(() => import('./pages/Browse.jsx'));
const Artifact = lazy(() => import('./pages/Artifact.jsx'));
const TimelinePage = lazy(() => import('./pages/TimelinePage.jsx'));
const Bookmarks = lazy(() => import('./pages/Bookmarks.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollAndFocus() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollAndFocus />
      <Suspense fallback={<p className="container section muted" role="status">Loading…</p>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="artifact/:id" element={<Artifact />} />
            <Route path="timeline" element={<TimelinePage />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
