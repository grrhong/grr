import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'After Work Desk',
  description: '퇴근 후 흩어진 생각을 블로그 초안으로 정리하는 개인 작업실'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
