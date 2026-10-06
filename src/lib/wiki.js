import { useEffect, useState } from 'react';

const cache = new Map();

function fetchSummary(title) {
  if (!cache.has(title)) {
    const p = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && {
        image: d.thumbnail?.source ?? null,
        extract: d.extract ?? '',
        url: d.content_urls?.desktop?.page ?? null,
      })
      .catch(() => null);
    cache.set(title, p);
  }
  return cache.get(title);
}

export function useWikiSummary(title) {
  const [data, setData] = useState(null);
  useEffect(() => {
    let live = true;
    setData(null);
    if (title) fetchSummary(title).then((d) => live && setData(d));
    return () => { live = false; };
  }, [title]);
  return data;
}
