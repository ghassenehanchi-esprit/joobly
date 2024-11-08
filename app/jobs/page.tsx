import React, { Suspense } from "react";
import Topbar from "../../lib/components/toolBar/topbar";
import styles from "./jobsListPage.module.scss";
import JobItem from "../../lib/components/jobItem/jobItem";
import { JobData, JobsPagePropsTypes, optionItems } from "@/lib/types/componentTypes";
import { uniqueArray } from "@/lib/utils/uniqueArray/uniqueArray";
import HeaderBackground from "@/lib/components/headerBackground/headerBackground";

export const dynamic = "force-dynamic";

async function processOptions(options: JobData[]) {
	const processedOptions = options.reduce(
		(acc, item) => {
			if (item.location) {
				acc.locations.push({ id: item._id!, label: item.location });
			}
			if (item.jobTitle) {
				acc.specializations.push({ id: item._id!, label: item.jobTitle });
			}
			if (item.workType) {
				acc.workTypes.push({ id: item._id!, label: item.workType });
			}
			if (item.salary) {
				acc.salaries.push({ id: item._id!, label: item.salary as string });
			}
			return acc;
		},
		{
			locations: [] as optionItems[],
			specializations: [] as optionItems[],
			workTypes: [] as optionItems[],
			salaries: [] as optionItems[],
		},
	);

	return {
		locations: uniqueArray(processedOptions.locations),
		specializations: uniqueArray(processedOptions.specializations),
		workTypes: uniqueArray(processedOptions.workTypes),
		salaries: uniqueArray(processedOptions.salaries),
	};
}

async function getData(params: any) {
	const res = await fetch(`https://prague-morning-backend.vercel.app/api/jobs?${params}`, {
		next: { revalidate: 60 },
	});
	if (!res) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

async function getOptions() {
	const res = await fetch(`https://prague-morning-backend.vercel.app/api/job-options`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const Jobs = async ({ searchParams }: JobsPagePropsTypes) => {
	const params = new URLSearchParams({
		location: searchParams?.location || "",
		jobTitle: searchParams?.jobTitle || "",
		workType: searchParams?.workType || "",
		salary: searchParams?.salary || "",
	});
	const [jobs, options] = await Promise.all([getData(params), getOptions()]);
	console.log(options);
	

	const { locations, specializations, workTypes, salaries } = await processOptions(options);

	const defaultLocation = locations.find((item) => item.label === searchParams?.location);
	const defaultJobTitle = specializations.find((item) => item.label === searchParams?.jobTitle);
	const defaultWorkType = workTypes.find((item) => item.label === searchParams?.workType);
	const defaultSalary = salaries.find((item) => item.label === searchParams?.salary);

	return (
	<>
		<HeaderBackground />
		<section className="mt-16 mb-20 px-4">
			<div className="container mx-auto flex flex-col md:flex-row">
				<Topbar
					defaultJobSearchValue={searchParams?.jobTitle}
					defaultLocation={defaultLocation?.id}
					defaultJobTitle={defaultJobTitle?.id}
					defaultWorkType={defaultWorkType?.id}
					defaultSalary={defaultSalary?.id}
					locations={locations}
					specializations={specializations}
					workType={workTypes}
					salary={salaries}
				/>
				<div className="px-0 md:px-2 mdl:px-6">
					<div className="flex items-center justify-between mb-6 py-2 h-14">
						<p className="text-xl text-gray-600">
							{jobs?.length || "No"} {jobs?.length > 1 ? "jobs" : "job"} found
						</p>
					</div>

					<div className="space-y-4">
						<Suspense fallback={<div>Loading...</div>}>
							{jobs.jobs?.map((result) => (
								<JobItem data={result} key={result._id} />
							))}
						</Suspense>
					</div>

					<div className="relative mt-16 h-[361px] bg-cover bg-center rounded-lg flex flex-col items-center justify-center text-center"
						style={{ backgroundImage: "url('/images/green-bg-search.svg')" }}
					>
						<h5 className="text-4xl font-bold tracking-wider text-light">
							Join our Job group on Facebook
						</h5>
						<a href="https://www.facebook.com/groups/jobsinpragueforeigners---"
							target="_blank"
							className="mt-5 px-8 py-4 bg-dark text-light font-bold text-xl rounded-lg hover:opacity-80"
						>
							Join Here
						</a>
					</div>
				</div>
			</div>
		</section>
		</>
	);
};

export default Jobs;
