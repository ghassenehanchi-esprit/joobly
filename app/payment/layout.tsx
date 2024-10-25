import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "@/lib/styles/globals.scss";
import Header from "@/app/header";
import Footer from "@/app/footer";

const mainFont = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Joobly | Payment",
};

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header topHeaderTitle='' bottomHeaderTitle='List Payment' />
			{children}
		</>
	);
}
