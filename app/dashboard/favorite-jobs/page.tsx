import DashboardPage from "@/lib/components/dashboard/DashboardPage";
import MyFavoriteJobsPage from "@/lib/components/dashboard/MyFavoriteJobsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Joobly | Profile",
	description: "My favorite vacancy",
};


export default function FavoriteJobs() {
  return (
    <div>
        <MyFavoriteJobsPage/>
    </div>
  )
}
