"use client";
import { Source_Sans_3 } from "next/font/google";
import "@/lib/styles/globals.scss";
import { Provider } from "react-redux";
import store from "@/lib/store";
import Footer from "@/app/footer";
import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import TopHeader from "@/lib/components/header/header";

const mainFont = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<html lang='en'>
			<body className={mainFont.className}>
				<Provider store={store}>{children}</Provider>
				{pathname !== "/" && <Footer />}
			</body>
		</html>
	);
}
