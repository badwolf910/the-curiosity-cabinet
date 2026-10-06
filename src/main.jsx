import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { BookmarksProvider } from './hooks/useBookmarks.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BookmarksProvider>
        <App />
      </BookmarksProvider>
    </BrowserRouter>
  </StrictMode>,
);
