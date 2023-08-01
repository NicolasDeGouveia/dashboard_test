import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SideBar from './components/sideBar/SideBar';
import { ReduxProvider } from './redux/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-100`}>
                <ReduxProvider>
                    <SideBar />
                    <main className="w-full h-screen lg:pl-40">{children}</main>
                </ReduxProvider>
            </body>
        </html>
    );
}
