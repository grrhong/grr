'use client';

import { FormEvent, useState } from 'react';
import { Category, FragmentFormValues } from '@/types';

const categories: Category[] = ['생활', '여행', '음악', '영화', 'AI/기술', '업무', '회고'];

const initialValues: FragmentFormValues = {
  memo: '',
  link: '',
  imageDescription: '',
  category: '생활',
  tags: ''
};

interface Props {
  onSave: (values: FragmentFormValues) => void;
}

export default function FragmentForm({ onSave }: Props) {
  const [values, setValues] = useState<FragmentFormValues>(initialValues);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!values.memo.trim() && !values.link.trim() && !values.imageDescription.trim()) return;
    onSave(values);
    setValues(initialValues);
  };

  return (
    <section className="rounded-2xl border border-[#ece6dc] bg-white p-6 shadow-soft">
      <h2 className="text-xl font-semibold text-ink">조각 넣기</h2>
      <p className="mt-2 text-sm leading-6 text-muted">
        카페에서 떠오른 생각, 유튜브를 보다가 저장한 문장, 여행 사진 설명까지 모두 글감이 될 수 있어요.
      </p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">텍스트 메모</span>
          <textarea
            className="h-28 w-full rounded-xl border border-[#e9e3d8] bg-[#fffdf9] px-4 py-3 leading-7 outline-none transition focus:border-[#c8b9a5] focus:ring-2 focus:ring-[#d7cbbd]"
            value={values.memo}
            onChange={(e) => setValues((prev) => ({ ...prev, memo: e.target.value }))}
            placeholder="오늘 마음에 남은 장면이나 문장을 적어보세요."
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">링크</span>
          <input
            className="w-full rounded-xl border border-[#e9e3d8] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#c8b9a5] focus:ring-2 focus:ring-[#d7cbbd]"
            value={values.link}
            onChange={(e) => setValues((prev) => ({ ...prev, link: e.target.value }))}
            placeholder="https://"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm text-muted">이미지 설명</span>
          <textarea
            className="h-24 w-full rounded-xl border border-[#e9e3d8] bg-[#fffdf9] px-4 py-3 leading-7 outline-none transition focus:border-[#c8b9a5] focus:ring-2 focus:ring-[#d7cbbd]"
            value={values.imageDescription}
            onChange={(e) => setValues((prev) => ({ ...prev, imageDescription: e.target.value }))}
            placeholder="사진 속 장면, 분위기, 떠오른 감정을 써보세요."
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label>
            <span className="mb-2 block text-sm text-muted">카테고리</span>
            <select
              className="w-full rounded-xl border border-[#e9e3d8] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#c8b9a5] focus:ring-2 focus:ring-[#d7cbbd]"
              value={values.category}
              onChange={(e) => setValues((prev) => ({ ...prev, category: e.target.value as Category }))}
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <label>
            <span className="mb-2 block text-sm text-muted">태그 (쉼표 구분)</span>
            <input
              className="w-full rounded-xl border border-[#e9e3d8] bg-[#fffdf9] px-4 py-3 outline-none transition focus:border-[#c8b9a5] focus:ring-2 focus:ring-[#d7cbbd]"
              value={values.tags}
              onChange={(e) => setValues((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="퇴근,카페,기록"
            />
          </label>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-[#5b4d40] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#4f4338] focus:outline-none focus:ring-2 focus:ring-[#d6cabe]"
        >
          조각 저장하기
        </button>
      </form>
    </section>
  );
}
