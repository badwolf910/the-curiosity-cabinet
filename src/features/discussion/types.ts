import type { Artifact, ChatMessage } from '@/types';

/**
 * Contract for discussion backends. Implement this to plug in a real LLM; see proxyProvider.
 */
export interface DiscussionProvider {
  reply(artifact: Artifact, history: ChatMessage[]): Promise<string>;
}
