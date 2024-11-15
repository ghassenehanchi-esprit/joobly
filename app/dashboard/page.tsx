import DashboardPage from "@/lib/components/dashboard/DashboardPage";
import { getServerSession } from "next-auth";

export default function Dashboard() {
  const session = getServerSession();
  console.log(session);
  return (
    <section className="mt-16 mb-20 px-4 min-h-[60%]">
        <DashboardPage/>
    </section>
  )
}
