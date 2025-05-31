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
