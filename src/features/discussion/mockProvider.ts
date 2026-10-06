import type { Artifact, ChatMessage } from '@/types';
import type { DiscussionProvider } from './types';

export function mockReply(artifact: Artifact, question: string): string {
  const q = question.toLowerCase();
  if (/(where|origin|provenance|found|come from)/.test(q)) return `${artifact.provenance}`;
  if (/(when|date|old|age|year)/.test(q)) return `${artifact.title} belongs to the ${artifact.era} era, around ${Math.abs(artifact.year)}${artifact.year < 0 ? ' BCE' : ''}.`;
  if (/(related|similar|connect)/.test(q)) return `Look for the themes ${artifact.tags.join(', ')} — the concept graph below shows which artifacts share them.`;
  return `${artifact.description} What else would you like to know about its origins, age, or connections?`;
}

export const mockProvider: DiscussionProvider = {
  async reply(artifact, history: ChatMessage[]) {
    const last = [...history].reverse().find((m) => m.role === 'user');
    await new Promise((r) => setTimeout(r, 300));
    return mockReply(artifact, last?.content ?? '');
  },
};
