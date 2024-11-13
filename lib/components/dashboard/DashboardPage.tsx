"use client"
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {redirect} from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useProfile } from "@/lib/hooks/useProfile";
import { UserProfileTypes } from "@/models/User";
import { FaUser } from "react-icons/fa";

const DashboardPage = () => {
    const session = useSession();
    
    const {status} = session;
    const profile = useProfile();

    const email = (profile.data as UserProfileTypes)?.email;
    const image = (profile.data as UserProfileTypes)?.image;
    const name = (profile.data as UserProfileTypes)?.name;
    

    if (profile.loading) {
        return (
        <div className="container mx-auto">
            loading...
        </div>
        );
    }

    if (status === "unauthenticated") {
        return redirect('/');
    }
  return (
    <div className="container mx-auto flex flex-col lg:flex-row">
      <div className="bg-light rounded-lg shadow-[0_4px_120px_rgba(151,159,183,0.15)] py-4 px-6 min-w-[300px] h-[520px]">
        <div>
        {image && (
              <Image src={image} width={100} height={100} alt="user image" className="rounded-xl" />
          )}
        {!image && (
          <div className="w-24 h-24 border-2 border-[#006c53] rounded-xl flex items-center justify-center">
            <FaUser className="text-[#006c53] w-18 h-18"/>
          </div>
        )}
        </div>
        <div className="flex flex-col text-gray-500">
          <h3>{name}</h3>
          <h4>{email}</h4>
        </div>
      </div>
      <div>
        posts
      </div>
    </div>
  )
}

export default DashboardPage;