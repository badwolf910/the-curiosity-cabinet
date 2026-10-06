import { CATEGORIES } from '../data/artifacts.js';

export default function CategoryChips({ value, onChange, label = 'Category' }) {
  const items = [{ id: '', name: 'All' }, ...CATEGORIES];
  return (
    <div role="group" aria-label={label} className="chips">
      {items.map((c) => (
        <button
          key={c.id} type="button"
          className={`chip ${value === c.id ? 'is-active' : ''}`}
          aria-pressed={value === c.id}
          onClick={() => onChange(c.id)}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
