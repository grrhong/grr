# After Work Desk

퇴근 후 흩어진 생각을 블로그 초안으로 정리하는 개인 작업실 MVP입니다.

## 기술 스택

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- localStorage 기반 저장 (로그인/DB 없음)
- Mock AI (`lib/mockAi.ts`)

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`에 접속하면 됩니다.

## 핵심 기능

- 조각 입력(메모/링크/이미지 설명/카테고리/태그) 및 저장
- 저장 조각 카드 목록, 선택, 삭제, 간단 편집
- 선택 조각 기반 글 구조 생성/마크다운 초안 생성(Mock)
- 마크다운 복사
- 초안 저장/불러오기
- 모든 데이터 localStorage 저장

## 폴더 구조

- `app/page.tsx`: 메인 2단 레이아웃 및 상태 관리
- `components/*`: UI 컴포넌트
- `lib/storage.ts`: localStorage 유틸
- `lib/mockAi.ts`: AI 호출 대체 mock 함수
- `types/index.ts`: 타입 정의

## 향후 OpenAI API 연결 포인트

- `lib/mockAi.ts`의 함수 시그니처를 유지한 채 내부 구현만 API 호출로 교체하면 됩니다.
