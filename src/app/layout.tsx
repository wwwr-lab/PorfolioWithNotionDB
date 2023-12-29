import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/styles/QueryProvider';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'KimYoungEn',
	description: '프론트엔드 개발자 김영은 포트폴리오 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<QueryProvider>
				<body>{children}</body>
			</QueryProvider>
		</html>
	);
}
