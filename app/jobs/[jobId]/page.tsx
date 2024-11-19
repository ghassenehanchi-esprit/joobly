import DetailsContainer from "@/lib/components/detailsContainer/DetailsContainer";
import { BACKEND_URL } from "@/lib/constant/constants";

async function getItem(id:string) {
  const res = await fetch(`${BACKEND_URL}/jobs/${id}`)

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