import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppShell } from '@/layouts/AppShell';

const HomePage = lazy(() => import('@/pages/HomePage'));
const ArtifactPage = lazy(() => import('@/pages/ArtifactPage'));
const TimelinePage = lazy(() => import('@/pages/TimelinePage'));
const GraphPage = lazy(() => import('@/pages/GraphPage'));
const BookmarksPage = lazy(() => import('@/pages/BookmarksPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export default function App() {
  return (
    <Suspense fallback={<p role="status" className="container">Loading…</p>}>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<HomePage />} />
          <Route path="artifacts/:id" element={<ArtifactPage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="graph" element={<GraphPage />} />
          <Route path="bookmarks" element={<BookmarksPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
