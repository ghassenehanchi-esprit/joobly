"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import toast from "react-hot-toast";

const DashboardPage = () => {
    const session = useSession();
    const [userName, setUserName] = useState(session.data?.user?.name || '');
    const [image, setImage] = useState('');
    const {status} = session;

    if (status === "loading") {
        return 'loading...';
    }

    if (status === "unauthenticated") {
        return redirect('/');
    }
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage;