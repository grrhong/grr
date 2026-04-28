'use client';

import { Fragment } from '@/types';

interface Props {
  fragment: Fragment;
  selected: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (fragment: Fragment) => void;
}

export default function FragmentCard({ fragment, selected, onToggle, onDelete, onUpdate }: Props) {
  const formattedDate = new Date(fragment.createdAt).toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <article
      className={`rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft ${
        selected ? 'border-[#c9b9a5] ring-2 ring-[#eadfce]' : 'border-[#efe8dd]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[#f5eee4] px-3 py-1 text-xs font-medium text-[#6a5744]">{fragment.category}</span>
        <label className="flex items-center gap-2 text-xs text-muted">
          <input type="checkbox" checked={selected} onChange={() => onToggle(fragment.id)} />
          선택
        </label>
      </div>

      <textarea
        className="mt-3 h-24 w-full resize-none rounded-lg border border-transparent bg-[#fffefb] p-2 text-sm leading-6 text-[#2f2d29] outline-none transition focus:border-[#dbcdb9]"
        value={fragment.memo}
        onChange={(e) => onUpdate({ ...fragment, memo: e.target.value, updatedAt: new Date().toISOString() })}
      />

      {fragment.link && (
        <p className="mt-2 truncate text-sm text-[#4b617a]">
          🔗 <a href={fragment.link}>{fragment.link}</a>
        </p>
      )}

      {fragment.imageDescription && <p className="mt-2 text-sm leading-6 text-muted">🖼️ {fragment.imageDescription}</p>}

      <div className="mt-3 flex flex-wrap gap-2">
        {fragment.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#f3f1eb] px-2 py-1 text-xs text-muted">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-muted">
        <span>{formattedDate}</span>
        <button className="rounded-md px-2 py-1 hover:bg-[#f6efe6]" onClick={() => onDelete(fragment.id)}>
          삭제
        </button>
      </div>
    </article>
  );
}
