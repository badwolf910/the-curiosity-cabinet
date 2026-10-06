import { useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import styles from './Field.module.css';

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label: string;
  options: { value: string; label: string }[];
  allLabel: string;
  onChange: (value: string) => void;
}

export function Select({ label, options, allLabel, onChange, id, value, ...rest }: Props) {
  const auto = useId();
  const selectId = id ?? auto;
  return (
    <div className={styles.field}>
      <label htmlFor={selectId}>{label}</label>
      <select id={selectId} value={value} onChange={(e) => onChange(e.target.value)} {...rest}>
        <option value="">{allLabel}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
