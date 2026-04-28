'use client';

import { Fragment } from '@/types';
import FragmentCard from './FragmentCard';

interface Props {
  fragments: Fragment[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (fragment: Fragment) => void;
}

export default function FragmentList({ fragments, selectedIds, onToggle, onDelete, onUpdate }: Props) {
  return (
    <section className="mt-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold">저장된 조각</h3>
        <p className="text-sm text-muted">{selectedIds.length}개의 조각을 선택했어요</p>
      </div>

      {fragments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#dfd6ca] bg-white/70 p-6 text-sm leading-7 text-muted">
          <p>아직 저장된 조각이 없어요.</p>
          <p>오늘 본 것, 들은 것, 느낀 것 하나만 남겨보세요.</p>
          <p>완성된 글보다 작은 조각이 먼저예요.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {fragments.map((fragment) => (
            <FragmentCard
              key={fragment.id}
              fragment={fragment}
              selected={selectedIds.includes(fragment.id)}
              onToggle={onToggle}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      )}
    </section>
  );
}
