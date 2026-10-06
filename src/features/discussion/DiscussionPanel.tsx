import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import type { Artifact, ChatMessage } from '@/types';
import { Button, Input } from '@/components/ui';
import { getProvider } from './proxyProvider';
import type { DiscussionProvider } from './types';
import styles from './DiscussionPanel.module.css';

interface Props { artifact: Artifact; provider?: DiscussionProvider }

export function DiscussionPanel({ artifact, provider }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  const activeId = useRef(artifact.id);

  useEffect(() => {
    activeId.current = artifact.id;
    setMessages([]);
    setError('');
    setPending(false);
  }, [artifact.id]);

  useEffect(() => {
    logRef.current?.scrollTo?.({ top: logRef.current.scrollHeight });
  }, [messages]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || pending) return;
    const next: ChatMessage[] = [...messages, { id: crypto.randomUUID(), role: 'user', content: text }];
    setMessages(next);
    setDraft('');
    setPending(true);
    setError('');
    try {
      const reply = await (provider ?? getProvider()).reply(artifact, next);
      if (activeId.current !== artifact.id) return;
      setMessages([...next, { id: crypto.randomUUID(), role: 'assistant', content: reply }]);
    } catch {
      if (activeId.current === artifact.id) setError('The curator could not be reached. Please try again.');
    } finally {
      if (activeId.current === artifact.id) setPending(false);
    }
  };

  return (
    <section aria-labelledby="discuss-title" className={styles.panel}>
      <h2 id="discuss-title">Discuss with the curator</h2>
      <div ref={logRef} className={styles.log} role="log" aria-live="polite" aria-label="Conversation">
        {messages.length === 0 && <p className={styles.hint}>Ask about {artifact.title}: where it came from, how old it is, or what it connects to.</p>}
        {messages.map((m) => (
          <p key={m.id} className={`${styles.msg} ${m.role === 'user' ? styles.user : styles.bot}`}>
            <span className="visually-hidden">{m.role === 'user' ? 'You: ' : 'Curator: '}</span>
            {m.content}
          </p>
        ))}
        {pending && <p className={styles.hint}>The curator is thinking…</p>}
      </div>
      {error && <p role="alert" className={styles.error}>{error}</p>}
      <form onSubmit={submit} className={styles.form}>
        <Input label="Your question" value={draft} onChange={(e) => setDraft(e.target.value)} className={styles.input} />
        <Button type="submit" disabled={pending || !draft.trim()}>Send</Button>
      </form>
    </section>
  );
}
