"use client"
import { Source_Sans_3 } from 'next/font/google';
import '@/lib/styles/globals.scss';
import ClientProviders from './providers';
import Header from './header';
import Footer from '@/app/footer';
import { usePathname } from 'next/navigation';

const mainFont = Source_Sans_3({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
	<html lang="en">
        <body className={mainFont.className}>
        <ClientProviders>
            {pathname === "/" && <Header needBackgroundHeader={false} />}
            {children}
            {pathname !== "/" && <Footer />}
        </ClientProviders>
        </body>
    </html>
    );
}
