import { Button } from '@/components/ui';
import type { ViewMode } from '@/types';

interface Props { view: ViewMode; onChange: (v: ViewMode) => void }

export function ViewToggle({ view, onChange }: Props) {
  return (
    <div role="group" aria-label="Layout">
      {(['grid', 'list'] as const).map((v) => (
        <Button key={v} variant={view === v ? 'primary' : 'secondary'} aria-pressed={view === v} onClick={() => onChange(v)}>
          {v === 'grid' ? 'Grid' : 'List'}
        </Button>
      ))}
    </div>
  );
}
