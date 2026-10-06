import { Tag } from '@/components/ui';

interface Props { tags: string[]; selected: string; onSelect: (tag: string) => void }

export function TagFilter({ tags, selected, onSelect }: Props) {
  return (
    <div role="group" aria-label="Filter by tag" style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {tags.map((t) => (
        <Tag key={t} active={selected === t} onClick={() => onSelect(selected === t ? '' : t)}>{t}</Tag>
      ))}
    </div>
  );
}
