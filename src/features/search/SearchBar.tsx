import { Input, Select, Button } from '@/components/ui';
import type { Filters } from '@/types';
import { CATEGORIES, ERAS } from '@/utils/constants';
import styles from './SearchBar.module.css';

interface Props {
  filters: Filters;
  onChange: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  onReset: () => void;
  active: boolean;
}

export function SearchBar({ filters, onChange, onReset, active }: Props) {
  return (
    <form role="search" aria-label="Search the collection" className={styles.bar} onSubmit={(e) => e.preventDefault()}>
      <Input
        label="Search"
        type="search"
        placeholder="Try “astrolabe” or “glass”"
        value={filters.q}
        onChange={(e) => onChange('q', e.target.value)}
        className={styles.search}
      />
      <Select
        label="Category"
        allLabel="All categories"
        value={filters.category}
        options={CATEGORIES.map((c) => ({ value: c.id, label: c.name }))}
        onChange={(v) => onChange('category', v as Filters['category'])}
      />
      <Select
        label="Era"
        allLabel="All eras"
        value={filters.era}
        options={ERAS.map((e) => ({ value: e, label: e }))}
        onChange={(v) => onChange('era', v as Filters['era'])}
      />
      {active && <Button variant="secondary" onClick={onReset} className={styles.reset}>Clear filters</Button>}
    </form>
  );
}
