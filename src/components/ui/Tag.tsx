import styles from './Tag.module.css';

interface Props { children: string; active?: boolean; onClick?: () => void }

export function Tag({ children, active, onClick }: Props) {
  if (!onClick) return <span className={styles.tag}>{children}</span>;
  return (
    <button type="button" className={`${styles.tag} ${styles.button}`} aria-pressed={!!active} onClick={onClick}>
      {children}
    </button>
  );
}
