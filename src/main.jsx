import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.jsx';
import { BookmarksProvider } from './hooks/useBookmarks.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <BookmarksProvider>
        <App />
      </BookmarksProvider>
    </HashRouter>
  </StrictMode>,
);
