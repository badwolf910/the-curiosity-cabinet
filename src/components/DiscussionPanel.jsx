import { useEffect, useId, useRef, useState } from 'react';
import { askCurator, suggestedQuestions } from '../lib/curator.js';

export default function DiscussionPanel({ artifact }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const logRef = useRef(null);
  const abortRef = useRef(null);
  const inputId = useId();

  // Reset when navigating to another artifact.
  useEffect(() => {
    abortRef.current?.abort();
    setMessages([]);
    setBusy(false);
  }, [artifact.id]);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, busy]);

  async function send(text) {
    const question = text.trim();
    if (!question || busy) return;
    const history = [...messages, { role: 'user', text: question }];
    setMessages(history);
    setInput('');
    setBusy(true);
    const ctl = new AbortController();
    abortRef.current = ctl;
    try {
      const answer = await askCurator({ question, artifact, history, signal: ctl.signal });
      setMessages((m) => [...m, { role: 'curator', text: answer }]);
    } catch (e) {
      if (e.name !== 'AbortError') setMessages((m) => [...m, { role: 'curator', text: 'Sorry, I could not reach the curator just now.', error: true }]);
    } finally {
      if (!ctl.signal.aborted) setBusy(false);
    }
  }

  return (
    <section className="discuss" aria-labelledby="discuss-h">
      <h2 id="discuss-h">Ask the curator</h2>
      <div ref={logRef} className="discuss__log" role="log" aria-live="polite" aria-relevant="additions" tabIndex={0} aria-label="Conversation">
        {messages.length === 0 && (
          <div className="discuss__empty">
            <p className="muted">Pose a question about this artifact.</p>
            <ul className="chips">
              {suggestedQuestions(artifact).map((q) => (
                <li key={q}><button type="button" className="chip" onClick={() => send(q)}>{q}</button></li>
              ))}
            </ul>
          </div>
        )}
        {messages.map((m, i) => (
          <p key={i} className={`msg msg--${m.role}`}>
            <span className="sr-only">{m.role === 'user' ? 'You: ' : 'Curator: '}</span>{m.text}
          </p>
        ))}
        {busy && <p className="msg msg--curator msg--typing" role="status"><span className="sr-only">Curator is thinking</span><i /><i /><i /></p>}
      </div>
      <form className="discuss__form" onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <label htmlFor={inputId} className="sr-only">Your question</label>
        <input id={inputId} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something…" maxLength={300} autoComplete="off" />
        <button type="submit" className="btn" disabled={busy || !input.trim()}>Ask</button>
      </form>
    </section>
  );
}
