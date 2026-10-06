import { Link } from 'react-router-dom';
import type { Artifact } from '@/types';
import { groupByEra } from '@/utils/artifacts';
import { formatYear } from '@/utils/format';
import styles from './Timeline.module.css';

export function Timeline({ artifacts }: { artifacts: Artifact[] }) {
  const groups = groupByEra(artifacts);
  return (
    <div className={styles.track} role="list" aria-label="Timeline of artifacts by era" tabIndex={0}>
      {groups.map(({ era, items }) => (
        <section key={era} role="listitem" aria-labelledby={`era-${era}`} className={styles.era}>
          <h2 id={`era-${era}`}>{era}</h2>
          <ol className={styles.list}>
            {items.map((a) => (
              <li key={a.id} className={styles.item}>
                <span className={styles.year}>{formatYear(a.year)}</span>
                <Link to={`/artifacts/${a.id}`}>{a.title}</Link>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
