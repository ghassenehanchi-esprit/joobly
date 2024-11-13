"use client"
import { Suspense, useEffect, useState } from "react";
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
      <div className="px-0 md:px-2 mdl:px-6">
          <div className="flex items-center justify-between mb-6 py-2 h-14">
						<p className="text-xl text-gray-600">
              10 available posts
						</p>
					</div>

          <div className="space-y-4">
              <div className="w-full flex flex-col gap-6 justify-between bg-light rounded-lg mb-4 shadow-lg p-6 xl:flex-row lg:gap-8">
                    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddds
                    dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
              </div>
            {/*
              <Suspense fallback={<div>Loading...</div>}>
                {jobs.jobs?.map((result: any) => (
                  <JobItem data={result} key={result._id} />
                ))}
              </Suspense>           
            */}
					</div>
      </div>
    </div>
  )
}

export default DashboardPage;