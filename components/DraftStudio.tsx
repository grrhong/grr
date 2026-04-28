'use client';

import { useState } from 'react';
import { BlogStructure, Draft, Fragment } from '@/types';
import { generateBlogStructure, generateMarkdownDraft } from '@/lib/mockAi';
import DraftPreview from './DraftPreview';

interface Props {
  selectedFragments: Fragment[];
  structure: BlogStructure | null;
  setStructure: (value: BlogStructure | null) => void;
  onSaveDraft: (draft: Draft) => void;
}

export default function DraftStudio({ selectedFragments, structure, setStructure, onSaveDraft }: Props) {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const announce = (message: string) => {
    setFeedback(message);
    setTimeout(() => setFeedback(''), 2400);
  };

  const ensureFragments = () => {
    if (selectedFragments.length === 0) {
      announce('먼저 조각을 선택해 주세요.');
      return false;
    }
    return true;
  };

  const handleGenerateStructure = async () => {
    if (!ensureFragments()) return;
    setLoading(true);
    const result = await generateBlogStructure(selectedFragments);
    setStructure(result);
    setLoading(false);
  };

  const handleGenerateMarkdown = async () => {
    if (!ensureFragments()) return;
    setLoading(true);
    const markdown = await generateMarkdownDraft(selectedFragments);
    const result = await generateBlogStructure(selectedFragments);
    setStructure({ ...result, markdown });
    setLoading(false);
  };

  const handleSaveDraft = () => {
    if (!structure) {
      announce('저장할 초안이 없어요. 먼저 생성해 주세요.');
      return;
    }

    const draft: Draft = {
      id: crypto.randomUUID(),
      title: structure.titleCandidates[0] ?? '제목 없는 초안',
      markdown: structure.markdown,
      sourceFragmentIds: selectedFragments.map((fragment) => fragment.id),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveDraft(draft);
    announce('초안을 저장했어요. 나중에 다시 꺼내볼 수 있어요.');
  };

  const handleCopy = async () => {
    if (!structure) {
      announce('복사할 마크다운이 없어요.');
      return;
    }
    await navigator.clipboard.writeText(structure.markdown);
    announce('마크다운을 복사했어요. 블로그에 바로 붙여넣을 수 있어요.');
  };

  return (
    <section className="rounded-2xl border border-[#ece3d8] bg-white p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Draft Studio</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            선택한 조각을 바탕으로 글의 흐름을 만들고, 마크다운 초안으로 정리하세요.
          </p>
        </div>
        {feedback && <p className="rounded-full bg-[#f4ede2] px-3 py-1 text-xs text-[#6b5846]">{feedback}</p>}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={handleGenerateStructure}
          className="rounded-xl bg-[#5b4d40] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#4f4338]"
        >
          {loading ? '생성 중...' : '글 구조 만들기'}
        </button>
        <button
          onClick={handleGenerateMarkdown}
          className="rounded-xl border border-[#d8cab8] bg-[#fbf7f2] px-4 py-2.5 text-sm text-[#4f4235] transition hover:bg-[#f4ede3]"
        >
          마크다운 초안 만들기
        </button>
        <button
          onClick={handleSaveDraft}
          className="rounded-xl border border-[#d8cab8] bg-white px-4 py-2.5 text-sm text-[#4f4235] transition hover:bg-[#faf4eb]"
        >
          초안 저장하기
        </button>
        <button
          onClick={handleCopy}
          className="rounded-xl border border-[#d8cab8] bg-white px-4 py-2.5 text-sm text-[#4f4235] transition hover:bg-[#faf4eb]"
        >
          마크다운 복사
        </button>
      </div>

      <div className="mt-6">
        <DraftPreview structure={structure} />
      </div>
    </section>
  );
}
