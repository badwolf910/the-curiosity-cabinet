# The Curiosity Cabinet

A digital museum of discoveries and unusual objects: 30 fictional-but-plausible artifacts you can search, filter, browse on a timeline, explore as a relationship graph, bookmark, and discuss with a (mock) AI curator.

## Setup

```bash
npm install
cp .env.example .env   # optional
npm run dev            # http://localhost:5173
npm test               # Vitest + React Testing Library
npm run build          # type-check + production build
```

Requires Node 18+.

## Features

- **Search & filters** — Fuse.js fuzzy search plus category, era and tag filters. State lives in URL params (`/?q=glass&era=Modern`), so views are shareable.
- **Browse** — grid/list views of lazy-loaded cards (preference is persisted).
- **Artifact pages** — hero image, provenance, metadata, related artifacts (links resolved in both directions), concept graph and discussion panel.
- **Graph** — dependency-free SVG force layout (`utils/forceLayout.ts`). Nodes are focusable; arrow keys move between nodes, Enter opens. A list fallback is provided.
- **Timeline** — era groups; vertical on mobile, horizontal scroll-snap on desktop.
- **Bookmarks** — Zustand store persisted to `localStorage`.
- **Discussion** — chat UI over a `DiscussionProvider` interface. Uses a mock responder by default.
- **Accessibility** — skip link, landmarks, focus moved to `<main>` on navigation, ARIA states, focus-trapping modal, AA-contrast tokens, `prefers-reduced-motion` support.

## Architecture

```
src/
  components/ui/   Button, Card, Input, Select, Tag, Modal, Reveal
  features/        artifacts, search, graph, timeline, bookmarks, discussion
  layouts/         AppShell (header, skip link, footer)
  pages/           Route components (lazy-loaded for code splitting)
  hooks/           useArtifacts, useSearch, useBookmarks, stores
  data/            artifacts.json (+ schema.json)
  styles/          tokens.css (design tokens), global.css
  utils/           filters, forceLayout, formatting, constants
  types/           Shared TypeScript types
```

Styling uses CSS Modules on top of tokens in `src/styles/tokens.css`. Artifact images are generated SVG placeholders in `public/images`.

## Connecting a real LLM

Implement the `DiscussionProvider` interface (`src/features/discussion/types.ts`). The built-in `createProxyProvider` POSTs `{ artifact, messages }` to `VITE_DISCUSSION_API_URL` and expects `{ reply: string }`. Keep the provider API key in the serverless function — never in a `VITE_*` variable, which is shipped to the browser.

## Contributing

1. Branch from `main`; keep TypeScript strict-clean (`npm run typecheck`).
2. Add tests for hooks and utilities; run `npm test`.
3. Use design tokens rather than hard-coded colours/spacing, keep interactive targets ≥ 44px, and verify keyboard operation.
4. New artifacts go in `src/data/artifacts.json` and must match `schema.json`, with valid `relatedArtifacts` ids (enforced by tests).
