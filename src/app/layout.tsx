import ReduxProvider from '@/client/providers/redux-provider';
import Header from '@/components/pages/header';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/main.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Wordle',
	description: 'A wordle app made using next.js',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className='dark'>
			<body className={inter.className}>
				<ReduxProvider>
					<Header />
					{children}
				</ReduxProvider>
				<Toaster />
			</body>
		</html>
	);
}
