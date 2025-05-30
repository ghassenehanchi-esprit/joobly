"use client";
import { Source_Sans_3 } from "next/font/google";
import "@/lib/styles/globals.scss";
import { Provider } from "react-redux";
import store from "@/lib/store";
import Footer from "@/app/footer";
import { usePathname } from "next/navigation";

import { SessionProvider } from "next-auth/react";
import Header from "./header";
import { Metadata } from "next";

const mainFont = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Joobly.cz – Find Multilingual Jobs in Prague and Czechia',
    template: '%s | Joobly.cz',
  },
  description:
    'Find multilingual jobs in Prague and across Czechia. English, German, French, and more. We connect expats with top employers.',
  openGraph: {
    title: 'Joobly.cz – Find Multilingual Jobs in Prague and Czechia',
    description:
      'Explore full-time and part-time multilingual job opportunities in Prague and across Czechia. Connect with top international employers.',
    url: 'https://joobly.cz',
    siteName: 'Joobly.cz',
    images: [
      {
        url: '/og-image.jpg', // Положи в public/og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Job search for expats in Czech Republic',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<html lang='en'>
			<body className={mainFont.className}>
				<SessionProvider>
					{pathname === "/" && <Header needBackgroundHeader={false}/>}
					<Provider store={store}>{children}</Provider>
					{pathname !== "/" && <Footer />}
				</SessionProvider>
			</body>
		</html>
	);
}
