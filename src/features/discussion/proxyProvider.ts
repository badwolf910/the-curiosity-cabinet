import type { DiscussionProvider } from './types';
import { mockProvider } from './mockProvider';

/**
 * Talks to a serverless proxy that holds the LLM API key server-side.
 * Request:  POST { artifact: { id, title, description, provenance }, messages: [{ role, content }] }
 * Response: { reply: string }
 */
export function createProxyProvider(url: string): DiscussionProvider {
  return {
    async reply(artifact, history) {
      const res = await fetch(url, {
        method: 'POST',
        signal: AbortSignal.timeout(20000),
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artifact: { id: artifact.id, title: artifact.title, description: artifact.description, provenance: artifact.provenance },
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error(`Discussion service responded with ${res.status}`);
      const data = (await res.json()) as { reply?: unknown };
      if (typeof data.reply !== 'string') throw new Error('Malformed discussion response');
      return data.reply;
    },
  };
}

export function getProvider(): DiscussionProvider {
  const url = import.meta.env.VITE_DISCUSSION_API_URL;
  return url ? createProxyProvider(url) : mockProvider;
}
