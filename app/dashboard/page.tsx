import DashboardPage from "@/lib/components/dashboard/DashboardPage";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Joobly | Profile",
	description: "user dashboard",
};

export default function Dashboard() {
  const session = getServerSession();
  console.log(session);
  return (
    <section className="mt-16 mb-20 px-4 min-h-[60%]">
        <DashboardPage/>
    </section>
  )
}
