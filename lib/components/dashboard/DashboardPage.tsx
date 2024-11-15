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
    console.log(profile);


      const { email, image, name, jobPostPoints } = (profile.data as UserProfileTypes);
      console.log(jobPostPoints);

      function HandleCheckJobPostPoints() {
        if (jobPostPoints <= 0) {
          toast((t) => (
            <span className="flex flex-col gap-4 text-[#006c53] text-center items-center mb-2">
              <span className="font-medium">
                You don&apos;t have enough points to post a job.
              </span>
              <button onClick={() => toast.dismiss(t.id)}>
                <Link 
                className="bg-[#006c53] text-white px-4 py-2 border 
                hover:bg-white hover:text-[#006c53] border-[#006c53] 
                rounded-xl duration-300"
                href={'/packages'}
                >
                  Buy more
                </Link>
              </button>
            </span>
          ));
         
        } else {
          push('/post-job');
        }
      }
    
    

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
            <FaUser className="text-[#006c53] w-16 h-16"/>
          </div>
        )}
        </div>
        <div className="flex flex-col text-gray-500">
        <div>name: {" "}<span>{name}</span></div>
        <div>email: {" "}<span>{email}</span></div>
          
        </div>
      </div>
      <div className="px-0 md:px-2 mdl:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6 py-2 h-14 mt-4 lg:mt-0">
						<p className=" text-gray-600 text-sm md:text-xl">
              {jobPostPoints > 0 ? jobPostPoints : "no"} available job postings
						</p>
            <Button
            onClick={() => HandleCheckJobPostPoints()}
            className="bg-gray-200 text-gray-500 font-bold text-lg border-2  hover:bg-white hover:border-[#006c53] hover:text-black text px-4 py-1 rounded-2xl flex items-center duration-200"
            >
                Create job post
            </Button>
					</div>

          <div className="space-y-4 w-full">
            {/*your job posts*/}
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