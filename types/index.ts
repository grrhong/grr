export type Category = '생활' | '여행' | '음악' | '영화' | 'AI/기술' | '업무' | '회고';

export interface Fragment {
  id: string;
  memo: string;
  link: string;
  imageDescription: string;
  category: Category;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Draft {
  id: string;
  title: string;
  markdown: string;
  sourceFragmentIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogStructure {
  titleCandidates: string[];
  coreQuestion: string;
  introduction: string;
  subtitles: string[];
  bodyDraft: string;
  conclusion: string;
  suggestedTags: string[];
  markdown: string;
}

export interface FragmentFormValues {
  memo: string;
  link: string;
  imageDescription: string;
  category: Category;
  tags: string;
}
