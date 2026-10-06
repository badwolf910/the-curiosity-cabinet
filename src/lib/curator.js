import { ARTIFACTS, byId, categoryById } from '../data/artifacts.js';

const ENDPOINT = import.meta.env.VITE_AI_ENDPOINT;

const STOP = new Set('the a an of to is was what how why who when where did does do about and or in on it this that tell me more'.split(' '));
const tokens = (s) => s.toLowerCase().match(/[a-z0-9]+/g)?.filter((t) => !STOP.has(t)) ?? [];

export function suggestedQuestions(artifact) {
  return [
    `Why is the ${artifact.title} significant?`,
    'What remains mysterious about it?',
    'What else in the cabinet connects to it?',
  ];
}

// Offline curator: answers from cabinet data. Replace by setting VITE_AI_ENDPOINT.
function localAnswer(question, artifact) {
  const q = tokens(question);
  const has = (...w) => w.some((x) => q.includes(x));
  const related = artifact.related.map((id) => byId[id]);

  if (has('related', 'connect', 'connects', 'else', 'similar', 'link')) {
    return `Connected to ${artifact.title}: ${related.map((r) => `${r.title} (${r.summary.toLowerCase().replace(/\.$/, '')})`).join('; ')}.`;
  }
  if (has('mysterious', 'mystery', 'unknown', 'unsolved', 'puzzle', 'debate')) {
    const m = artifact.facts.find((f) => /debate|unknown|no known|never|remain/i.test(f));
    return `${m ? `${m}. ` : ''}${artifact.category === 'mysteries' ? 'This object sits in our Unsolved Mysteries wing: ' : 'Open questions: '}${artifact.story.split('. ').slice(-1)[0]}`;
  }
  if (has('when', 'old', 'date', 'age', 'year')) return `${artifact.title} dates to ${artifact.yearLabel}, from ${artifact.origin}.`;
  if (has('where', 'origin', 'from', 'found')) return `It comes from ${artifact.origin}. ${artifact.facts[0]}.`;
  if (has('fact', 'facts', 'interesting', 'surprising')) return `Three things worth knowing: ${artifact.facts.join('; ')}.`;

  // Score sentences against the question.
  const sentences = artifact.story.split(/(?<=\.)\s+/);
  const best = sentences
    .map((s) => ({ s, n: tokens(s).filter((t) => q.includes(t)).length }))
    .sort((a, b) => b.n - a.n)[0];
  if (best && best.n > 0) return best.s;

  const other = ARTIFACTS.find((a) => a.id !== artifact.id && tokens(a.title + ' ' + a.tags.join(' ')).some((t) => q.includes(t)));
  if (other) return `That sounds like ${other.title} (${categoryById[other.category].name}). ${other.summary}`;
  return `${artifact.summary} Try asking about its origin, its date, what is still unknown, or what connects to it.`;
}

export async function askCurator({ question, artifact, history, signal }) {
  if (ENDPOINT) {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history, artifact: { id: artifact.id, title: artifact.title, story: artifact.story, facts: artifact.facts } }),
      signal,
    });
    if (!res.ok) throw new Error('The curator is unavailable.');
    return (await res.json()).answer;
  }
  await new Promise((r) => setTimeout(r, 450));
  return localAnswer(question, artifact);
}
