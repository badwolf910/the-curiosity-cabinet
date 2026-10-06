import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'curiosity-cabinet:bookmarks';
const Ctx = createContext(null);

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function BookmarksProvider({ children }) {
  const [ids, setIds] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* storage unavailable */ }
  }, [ids]);

  const toggle = useCallback((id) => setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id])), []);
  const value = useMemo(() => ({ ids, toggle, has: (id) => ids.includes(id) }), [ids, toggle]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useBookmarks = () => useContext(Ctx);
