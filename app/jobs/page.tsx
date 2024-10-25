import React, { Suspense } from "react";
import Topbar from "../../lib/components/toolBar/topbar";
import Dropdown from "@/lib/components/dropdown/dropdown";
import { SORTBY } from "@/lib/constant/constants";
import styles from "./jobsListPage.module.scss";
import JobItem from "../../lib/components/jobItem/jobItem";
import { JobData, JobsPagePropsTypes, optionItems } from "@/lib/types/componentTypes";
import { uniqueArray } from "@/lib/utils/uniqueArray/uniqueArray";

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

	const { locations, specializations, workTypes, salaries } = await processOptions(options);

	const defaultLocation = locations.find((item) => item.label === searchParams?.location);
	const defaultJobTitle = specializations.find((item) => item.label === searchParams?.jobTitle);
	const defaultWorkType = workTypes.find((item) => item.label === searchParams?.workType);
	const defaultSalary = salaries.find((item) => item.label === searchParams?.salary);

	return (
		<section className={styles["page-jobs"]}>
			<div className={`container ${styles["page-container"]}`}>
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
				<div className={styles["content"]}>
					<div className={styles["results"]}>
						<p className={styles["results-count"]}>
							{jobs?.length || "No"} {jobs?.length > 1 ? "jobs" : "job"} found
						</p>
						<div className={styles["results-sort"]}>
							<p className='font-sans'>Sort by:</p>
							<Dropdown
								items={SORTBY.map((item) => ({ id: item.id.toString(), label: item.label }))}
								headerTitle='Newest'
								className='dropdown-sort'
								defaultSelected={0}
							/>
						</div>
					</div>

					<div className={styles["results-data"]}>
						<Suspense fallback={<div>Loading...</div>}>
							{jobs.jobs
								? jobs.jobs?.map((result: any) => <JobItem data={result} key={result._id} />)
								: null}
						</Suspense>
					</div>

					<div className={styles["join-us"]}>
						<h5>Join our Job group on Facebook</h5>
						<a
							href='https://www.facebook.com/groups/jobsinpragueforeigners---'
							target={"_blank"}
							className={styles["join-link"]}
						>
							Join Here
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Jobs;
