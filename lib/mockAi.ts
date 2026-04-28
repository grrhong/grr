import { BlogStructure, Fragment } from '@/types';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const flattenText = (fragments: Fragment[]) =>
  fragments
    .map((fragment) => [fragment.memo, fragment.imageDescription, fragment.link].filter(Boolean).join(' | '))
    .join(' ')
    .trim();

export async function generateBlogStructure(selectedFragments: Fragment[]): Promise<BlogStructure> {
  await wait(450);

  const categories = [...new Set(selectedFragments.map((fragment) => fragment.category))];
  const tags = [...new Set(selectedFragments.flatMap((fragment) => fragment.tags))].filter(Boolean);
  const base = flattenText(selectedFragments) || '오늘 퇴근길에 떠오른 생각';
  const keyPhrase = base.slice(0, 44);

  const titleCandidates = [
    `퇴근 후 기록: ${keyPhrase}`,
    `작은 조각에서 시작한 ${categories[0] ?? '하루'} 이야기`,
    `카페에서 정리한 오늘의 메모들`,
    `${selectedFragments.length}개의 조각으로 만든 나의 초안`,
    `${categories.join(' · ') || '일상'}를 다시 바라보는 밤`
  ];

  const coreQuestion = `오늘 붙잡은 조각들은 내 하루를 어떤 문장으로 설명해줄 수 있을까?`;

  const subtitles = [
    '1. 오늘 남겨둔 장면',
    '2. 왜 이 조각이 마음에 남았는지',
    '3. 지금의 나에게 연결되는 의미',
    '4. 내일을 위한 한 줄 정리'
  ];

  const introduction =
    '퇴근 후 조용한 책상에 앉아, 흩어진 조각들을 천천히 꺼내보았다. 완성된 문장이 아니어도 괜찮았다. 지금의 감각을 잃지 않기 위해 기록을 시작했다.';

  const bodyDraft = selectedFragments
    .map((fragment, index) => {
      const pieces = [fragment.memo, fragment.imageDescription, fragment.link].filter(Boolean).join(' / ');
      return `${index + 1}. ${pieces || '아직 비어 있는 조각'}`;
    })
    .join('\n');

  const conclusion =
    '오늘의 기록은 완벽한 글이 아니라, 나중에 다시 꺼내볼 수 있는 단서에 가깝다. 그래도 이 조각들 덕분에 하루가 조금 더 선명해졌다.';

  const markdown = `# ${titleCandidates[0]}\n\n## 핵심 질문\n${coreQuestion}\n\n## 도입\n${introduction}\n\n## 소제목\n${subtitles.map((subtitle) => `- ${subtitle}`).join('\n')}\n\n## 본문 초안\n${bodyDraft}\n\n## 마무리\n${conclusion}\n\n## 추천 태그\n${tags.slice(0, 6).map((tag) => `#${tag}`).join(' ')}`;

  return {
    titleCandidates,
    coreQuestion,
    introduction,
    subtitles,
    bodyDraft,
    conclusion,
    suggestedTags: tags,
    markdown
  };
}

export async function generateMarkdownDraft(selectedFragments: Fragment[]): Promise<string> {
  const structure = await generateBlogStructure(selectedFragments);
  return structure.markdown;
}
