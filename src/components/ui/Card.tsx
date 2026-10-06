import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

export function Card({ className = '', ...rest }: HTMLAttributes<HTMLElement>) {
  return <article className={`${styles.card} ${className}`} {...rest} />;
}
