import { BlogStructure } from '@/types';

interface Props {
  structure: BlogStructure | null;
}

export default function DraftPreview({ structure }: Props) {
  if (!structure) {
    return (
      <div className="rounded-2xl border border-dashed border-[#dfd6ca] bg-white/70 p-6 text-sm leading-7 text-muted">
        <p>아직 초안이 없어요.</p>
        <p>왼쪽에서 조각을 선택하고 글 구조를 만들어 보세요.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#ebe2d7] bg-white p-6 shadow-soft">
      <h3 className="text-xl font-semibold">Draft Preview</h3>

      <div className="mt-5 space-y-5 text-[15px] leading-7 text-[#2f2d29]">
        <section>
          <p className="mb-2 text-sm text-muted">제목 후보</p>
          <ul className="list-disc space-y-1 pl-5">
            {structure.titleCandidates.map((title) => (
              <li key={title}>{title}</li>
            ))}
          </ul>
        </section>

        <section>
          <p className="mb-1 text-sm text-muted">핵심 질문</p>
          <p>{structure.coreQuestion}</p>
        </section>

        <section>
          <p className="mb-1 text-sm text-muted">도입부</p>
          <p>{structure.introduction}</p>
        </section>

        <section>
          <p className="mb-1 text-sm text-muted">소제목</p>
          <ul className="list-disc pl-5">
            {structure.subtitles.map((subtitle) => (
              <li key={subtitle}>{subtitle}</li>
            ))}
          </ul>
        </section>

        <section>
          <p className="mb-1 text-sm text-muted">본문 초안</p>
          <pre className="whitespace-pre-wrap rounded-xl bg-[#fcfaf6] p-4 text-sm leading-7">{structure.bodyDraft}</pre>
        </section>

        <section>
          <p className="mb-1 text-sm text-muted">마무리</p>
          <p>{structure.conclusion}</p>
        </section>

        <section>
          <p className="mb-1 text-sm text-muted">추천 태그</p>
          <div className="flex flex-wrap gap-2">
            {structure.suggestedTags.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f3ede3] px-3 py-1 text-xs text-[#6a5744]">
                #{tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      <div className="markdown-output mt-6 rounded-xl border border-[#ece5d9] bg-[#fffefa] p-5">
        <p className="mb-2 text-xs uppercase tracking-[0.14em] text-muted">Markdown</p>
        <pre className="whitespace-pre-wrap text-sm leading-7">{structure.markdown}</pre>
      </div>
    </div>
  );
}
