import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Artifact, ViewMode } from '@/types';
import { Card, Tag } from '@/components/ui';
import { BookmarkButton } from '@/features/bookmarks/BookmarkButton';
import { CATEGORIES } from '@/utils/constants';
import { formatYear } from '@/utils/format';
import styles from './ArtifactCard.module.css';

interface Props { artifact: Artifact; view?: ViewMode }

export const ArtifactCard = memo(function ArtifactCard({ artifact, view = 'grid' }: Props) {
  const category = CATEGORIES.find((c) => c.id === artifact.category)?.name;
  return (
    <Card className={`${styles.card} ${view === 'list' ? styles.list : ''}`}>
      <img src={artifact.image} alt="" loading="lazy" decoding="async" width={400} height={300} className={styles.image} />
      <div className={styles.body}>
        <p className={styles.meta}>{category} · {artifact.era} · {formatYear(artifact.year)}</p>
        <h3 className={styles.title}>
          <Link to={`/artifacts/${artifact.id}`} className={styles.link}>{artifact.title}</Link>
        </h3>
        <p className={styles.desc}>{artifact.description}</p>
        <div className={styles.tags}>{artifact.tags.slice(0, 3).map((t) => <Tag key={t}>{t}</Tag>)}</div>
      </div>
      <div className={styles.bookmark}><BookmarkButton id={artifact.id} title={artifact.title} /></div>
    </Card>
  );
});
