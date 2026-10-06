import { Link } from 'react-router-dom';
import type { Artifact } from '@/types';
import { Tag } from '@/components/ui';
import { BookmarkButton } from '@/features/bookmarks/BookmarkButton';
import { DiscussionPanel } from '@/features/discussion/DiscussionPanel';
import { RelationshipGraph } from '@/features/graph/RelationshipGraph';
import { useArtifacts } from '@/hooks/useArtifacts';
import { CATEGORIES } from '@/utils/constants';
import { getRelated } from '@/utils/artifacts';
import { formatYear } from '@/utils/format';
import { ArtifactGrid } from './ArtifactGrid';
import styles from './ArtifactDetail.module.css';

export function ArtifactDetail({ artifact }: { artifact: Artifact }) {
  const { artifacts } = useArtifacts();
  const related = getRelated(artifacts, artifact);
  const category = CATEGORIES.find((c) => c.id === artifact.category);

  return (
    <article className={styles.detail}>
      <nav aria-label="Breadcrumb"><Link to="/">← All artifacts</Link></nav>
      <img src={artifact.image} alt={`Illustration of ${artifact.title}`} className={styles.hero} width={400} height={300} />
      <header className={styles.header}>
        <div>
          <p className={styles.meta}>{category?.name} · {artifact.era} · {formatYear(artifact.year)}</p>
          <h1>{artifact.title}</h1>
        </div>
        <BookmarkButton id={artifact.id} title={artifact.title} />
      </header>
      <p className={styles.description}>{artifact.description}</p>
      <section aria-labelledby="prov">
        <h2 id="prov">Provenance</h2>
        <p>{artifact.provenance}</p>
      </section>
      <dl className={styles.facts}>
        <dt>Category</dt><dd><Link to={`/?category=${artifact.category}`}>{category?.name}</Link></dd>
        <dt>Era</dt><dd><Link to={`/?era=${artifact.era}`}>{artifact.era}</Link></dd>
        <dt>Date</dt><dd>{formatYear(artifact.year)}</dd>
        <dt>Tags</dt>
        <dd>{artifact.tags.map((t) => <Link key={t} to={`/?tag=${t}`} className={styles.tagLink}><Tag>{t}</Tag></Link>)}</dd>
      </dl>
      <section aria-labelledby="rel">
        <h2 id="rel">Related artifacts</h2>
        {related.length ? <ArtifactGrid artifacts={related} view="grid" /> : <p>No related artifacts recorded.</p>}
      </section>
      <section aria-labelledby="graph">
        <h2 id="graph">Concept graph</h2>
        <RelationshipGraph focusId={artifact.id} />
      </section>
      <DiscussionPanel artifact={artifact} />
    </article>
  );
}
