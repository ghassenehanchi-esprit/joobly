import type { Metadata } from "next";
import "@/lib/styles/globals.scss";
import TopHeader from "@/lib/components/header/header";

export const metadata: Metadata = {
	title: "Joobly | Success",
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<TopHeader />
			{children}
		</>
	);
}
