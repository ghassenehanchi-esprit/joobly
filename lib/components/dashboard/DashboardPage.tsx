"use client"
import { Suspense, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {redirect, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { useProfile } from "@/lib/hooks/useProfile";
import { UserProfileTypes } from "@/models/User";
import Button from "@/lib/components/button/button";

import { FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

const DashboardPage = () => {
    const { push } = useRouter();
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
            <Link 
            href={'/'}
            className="bg-gray-200 text-gray-500 font-bold text-lg border-2  hover:bg-white hover:border-[#006c53] hover:text-black text px-4 py-1 rounded-2xl flex items-center duration-200"
            >
                Create job post
            </Link>
					</div>

          <div className="space-y-4 w-full">
              <div className="w-full flex flex-col gap-6 justify-between bg-light rounded-lg mb-4 shadow-lg p-6 xl:flex-row lg:gap-8">
                <div className="flex flex-col gap-6">
                  <h3 className="text-lg font-bold text-gray-800">Developer</h3>
                   <p className="max-w-[800px]">
                      It is a long established fact that a reader will be distracted by the readable content 
                      of a page when looking at its layout. The point of using Lorem Ipsum is that it has a 
                      more-or-less normal distribution of letters, as opposed to using Content here, content 
                      here, making it look like readable English. Many desktop publishing packages and web 
                      page editors now use Lorem Ipsum as their default model text, and a search for lorem 
                      ipsum will uncover many web sites still in their infancy. Various versions have evolved 
                      over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                    </p>
                </div>
                <div className="flex flex-col items-end justify-end">
                  <div className="flex gap-2 items-center justify-between">
                    <Button
                      //onClick={() => push(`/jobs/${data?._id}`)}
                      className="bg-gray-200 text-gray-500 font-bold text-lg border-2  hover:bg-white hover:border-[#006c53] hover:text-black text px-4 py-2 rounded-2xl flex items-center duration-200"
                    >
                      Detail Information
                    </Button>
                    <div>
                      <MdDelete className="w-12 h-12 text-gray-500 cursor-pointer hover:text-[#006c53] duration-300"/>
                    </div>
                  </div>
                </div>
              </div>
					</div>
      </div>
    </div>
  )
}

export default DashboardPage;

 {/*
              <Suspense fallback={<div>Loading...</div>}>
                {jobs.jobs?.map((result: any) => (
                  <JobItem data={result} key={result._id} />
                ))}
              </Suspense>           
            */}


            {
              /*
              {item.description.substring(0, 80)}...
              */
            }