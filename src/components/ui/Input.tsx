import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './Field.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(function Input({ label, id, className = '', ...rest }, ref) {
  const auto = useId();
  const inputId = id ?? auto;
  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={inputId}>{label}</label>
      <input ref={ref} id={inputId} {...rest} />
    </div>
  );
});
