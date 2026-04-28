'use client';

import { Draft } from '@/types';

interface Props {
  drafts: Draft[];
  onLoad: (draft: Draft) => void;
}

export default function SavedDraftList({ drafts, onLoad }: Props) {
  return (
    <section className="mt-6 rounded-2xl border border-[#ece3d8] bg-white p-5 shadow-soft">
      <h3 className="text-lg font-semibold">저장한 초안</h3>
      {drafts.length === 0 ? (
        <p className="mt-2 text-sm text-muted">저장된 초안이 아직 없어요. 마음에 드는 초안이 생기면 저장해두세요.</p>
      ) : (
        <ul className="mt-3 space-y-3">
          {drafts.map((draft) => (
            <li key={draft.id} className="rounded-xl border border-[#f0e8dd] p-3">
              <button className="w-full text-left" onClick={() => onLoad(draft)}>
                <p className="font-medium text-[#2f2d29]">{draft.title}</p>
                <p className="mt-1 text-xs text-muted">{new Date(draft.createdAt).toLocaleString('ko-KR')}</p>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
