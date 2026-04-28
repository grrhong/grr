'use client';

import { useEffect, useMemo, useState } from 'react';
import DraftStudio from '@/components/DraftStudio';
import FragmentForm from '@/components/FragmentForm';
import FragmentList from '@/components/FragmentList';
import Header from '@/components/Header';
import SavedDraftList from '@/components/SavedDraftList';
import { loadDrafts, loadFragments, saveDrafts, saveFragments } from '@/lib/storage';
import { BlogStructure, Draft, Fragment, FragmentFormValues } from '@/types';

const starterFragments: Fragment[] = [
  {
    id: 'seed-1',
    memo: '퇴근길에 들른 카페에서 창가 자리에 앉았는데, 비 냄새가 섞인 커피 향이 유난히 선명했다.',
    link: '',
    imageDescription: '젖은 도로 위로 노란 조명이 번진 장면',
    category: '생활',
    tags: ['퇴근', '카페', '저녁'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'seed-2',
    memo: '요즘 반복해서 듣는 플레이리스트가 집중할 때 어떤 리듬을 만들어주는지 기록해보고 싶다.',
    link: 'https://music.youtube.com/',
    imageDescription: '',
    category: '음악',
    tags: ['플레이리스트', '집중'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function Home() {
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [structure, setStructure] = useState<BlogStructure | null>(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const storedFragments = loadFragments();
    const storedDrafts = loadDrafts();

    setFragments(storedFragments.length > 0 ? storedFragments : starterFragments);
    setDrafts(storedDrafts);
  }, []);

  useEffect(() => {
    saveFragments(fragments);
  }, [fragments]);

  useEffect(() => {
    saveDrafts(drafts);
  }, [drafts]);

  const selectedFragments = useMemo(
    () => fragments.filter((fragment) => selectedIds.includes(fragment.id)),
    [fragments, selectedIds]
  );

  const flashNotice = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(''), 2200);
  };

  const handleSaveFragment = (values: FragmentFormValues) => {
    const tags = values.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    const now = new Date().toISOString();
    const next: Fragment = {
      id: crypto.randomUUID(),
      memo: values.memo.trim(),
      link: values.link.trim(),
      imageDescription: values.imageDescription.trim(),
      category: values.category,
      tags,
      createdAt: now,
      updatedAt: now
    };

    setFragments((prev) => [next, ...prev]);
    flashNotice('저장했어요. 나중에 글감으로 꺼낼 수 있어요.');
  };

  return (
    <main className="min-h-screen px-8 py-10 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <Header />

        {notice && (
          <div className="mb-4 inline-flex rounded-full border border-[#ddd1bf] bg-[#f8f3ea] px-4 py-2 text-sm text-[#655443]">
            {notice}
          </div>
        )}

        <section className="grid gap-6 xl:grid-cols-[1.02fr_1.35fr]">
          <div>
            <FragmentForm onSave={handleSaveFragment} />
            <FragmentList
              fragments={fragments}
              selectedIds={selectedIds}
              onToggle={(id) =>
                setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
              }
              onDelete={(id) => {
                setFragments((prev) => prev.filter((fragment) => fragment.id !== id));
                setSelectedIds((prev) => prev.filter((item) => item !== id));
              }}
              onUpdate={(fragment) => {
                setFragments((prev) => prev.map((item) => (item.id === fragment.id ? fragment : item)));
              }}
            />
          </div>

          <div>
            <DraftStudio
              selectedFragments={selectedFragments}
              structure={structure}
              setStructure={setStructure}
              onSaveDraft={(draft) => setDrafts((prev) => [draft, ...prev])}
            />
            <SavedDraftList
              drafts={drafts}
              onLoad={(draft) => {
                setStructure({
                  titleCandidates: [draft.title],
                  coreQuestion: '저장된 초안에서 다시 글의 질문을 다듬어 보세요.',
                  introduction: '저장된 초안을 불러왔어요. 필요한 부분을 수정해보세요.',
                  subtitles: ['기존 구조 검토', '문장 다듬기', '게시 전 점검'],
                  bodyDraft: draft.markdown,
                  conclusion: '이 초안은 언제든 다시 업데이트할 수 있어요.',
                  suggestedTags: [],
                  markdown: draft.markdown
                });
              }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
