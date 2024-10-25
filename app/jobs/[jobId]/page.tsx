import React from 'react';
import DetailsContainer from "@/lib/components/detailsContainer/DetailsContainer";

async function getItem(id:string) {
  const res = await fetch(`https://prague-morning-backend.vercel.app/api/jobs/${id}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
interface JobDetailsPropsTypes {
  params: { jobId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
const JobDetails = async ({ params}:JobDetailsPropsTypes) => {
  const jobDetails = await getItem(params.jobId)
  return (
 <DetailsContainer data={jobDetails}/>

  );
};

export default JobDetails;