import { Suspense } from "react";
import Topbar from "../../lib/components/toolBar/topbar";
import JobItem from "../../lib/components/jobItem/jobItem";
import { JobData, JobsPagePropsTypes, optionItems } from "@/lib/types/componentTypes";
import { uniqueArray } from "@/lib/utils/uniqueArray/uniqueArray";
import HeaderBackground from "@/lib/components/headerBackground/headerBackground";
import { BACKEND_URL } from "@/lib/constant/constants";

export const dynamic = "force-dynamic";

async function processOptions(options: JobData[]) {
	const processedOptions = options.reduce(
		(acc, item) => {
			if (item.location) {
				acc.locations.push({ id: item._id!, label: item.location }); 
			}
			if (item.language) {
				acc.languages.push({ id: item._id!, label: item.language });
			}
			if (item.education) {
				acc.educations.push({ id: item._id!, label: item.education });
			}
			if (item.workType) {
				acc.workTypes.push({ id: item._id!, label: item.workType });
			}
			if (item.jobCategory) {
				acc.jobCategories.push({ id: item._id!, label: item.jobCategory });
			}
			if (item.jobTime) {
				acc.jobTimes.push({ id: item._id!, label: item.jobTime });
			}
			if (item.experienceLevel) {
				acc.experienceLevels.push({ id: item._id!, label: item.experienceLevel });
			}
			if (item.salaryLabel) {
				acc.salaryLabels.push({ id: item._id!, label: item.salaryLabel });
			}

			
			return acc;
		},
		{
			locations: [] as optionItems[],
			languages: [] as optionItems[],
			educations: [] as optionItems[],
			workTypes: [] as optionItems[],
			jobCategories: [] as optionItems[],
			jobTimes: [] as optionItems[],
			salaryLabels: [] as optionItems[],
			experienceLevels: [] as optionItems[],
		},
	);

	return {
		locations: uniqueArray(processedOptions.locations),
		languages: uniqueArray(processedOptions.languages),
		educations: uniqueArray(processedOptions.educations),
		workTypes: uniqueArray(processedOptions.workTypes),
		jobCategories: uniqueArray(processedOptions.jobCategories),
		jobTimes: uniqueArray(processedOptions.jobTimes),
		salaryLabels: uniqueArray(processedOptions.salaryLabels),
		experienceLevels: uniqueArray(processedOptions.experienceLevels),
	};
}

async function getData(params: any) {
	const res = await fetch(`${BACKEND_URL}/jobs?${params}`, {
		next: { revalidate: 60 },
	});
	if (!res) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

async function getOptions() {
	const res = await fetch(`${BACKEND_URL}/job-options`, {
		next: { revalidate: 60 },
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json();
}

const parseSearchParam = (param?: string | string[]) => {
        if (!param) {
                return [] as string[];
        }

        const rawValues = Array.isArray(param) ? param : param.split(",");

        return rawValues
                .map((value) => value.trim())
                .filter((value): value is string => Boolean(value.length));
};

const getDefaultIds = (items: optionItems[], selectedLabels: string[]) =>
        items
                .filter((item) => selectedLabels.includes(String(item.label)))
                .map((item) => item.id);

const Jobs = async ({ searchParams }: JobsPagePropsTypes) => {
        const params = new URLSearchParams();

        const rawJobTitleValue = Array.isArray(searchParams?.jobTitle)
                ? searchParams?.jobTitle[0]
                : searchParams?.jobTitle;
        const jobTitleValue = rawJobTitleValue?.trim();

        if (jobTitleValue) {
                params.set("jobTitle", jobTitleValue);
        }

        const locationFilters = parseSearchParam(searchParams?.location);
        locationFilters.forEach((value) => params.append("location", value));

        const languageFilters = parseSearchParam(searchParams?.language);
        languageFilters.forEach((value) => params.append("language", value));

        const workTypeFilters = parseSearchParam(searchParams?.workType);
        workTypeFilters.forEach((value) => params.append("workType", value));

        const jobCategoryFilters = parseSearchParam(searchParams?.jobCategory);
        jobCategoryFilters.forEach((value) => params.append("jobCategory", value));

        const educationFilters = parseSearchParam(searchParams?.education);
        educationFilters.forEach((value) => params.append("education", value));

        const jobTimeFilters = parseSearchParam(searchParams?.jobTime);
        jobTimeFilters.forEach((value) => params.append("jobTime", value));

        const salaryFilters = parseSearchParam(searchParams?.salaryLabel);
        salaryFilters.forEach((value) => params.append("salaryLabel", value));

        const experienceFilters = parseSearchParam(searchParams?.experienceLevel);
        experienceFilters.forEach((value) => params.append("experienceLevel", value));

        const [jobs, options] = await Promise.all([getData(params.toString()), getOptions()]);

        const { locations, languages, workTypes, jobTimes, educations, salaryLabels, experienceLevels, jobCategories } =
                await processOptions(options);

        const jobResults = Array.isArray(jobs) ? jobs : jobs?.jobs ?? [];
        const jobCount = jobResults.length;

        const defaultSelections = {
                location: getDefaultIds(locations, locationFilters),
                language: getDefaultIds(languages, languageFilters),
                education: getDefaultIds(educations, educationFilters),
                workType: getDefaultIds(workTypes, workTypeFilters),
                jobCategory: getDefaultIds(jobCategories, jobCategoryFilters),
                experienceLevel: getDefaultIds(experienceLevels, experienceFilters),
                jobTime: getDefaultIds(jobTimes, jobTimeFilters),
                salaryLabel: getDefaultIds(salaryLabels, salaryFilters),
        } satisfies Partial<Record<string, string[]>>;

	return (
	<>
		<HeaderBackground />
                <section className="mt-16 mb-20 px-4 sm:px-6">
                        <div className="container mx-auto flex flex-col gap-10">
                                <Topbar
                                        defaultJobSearchValue={jobTitleValue}
                                        defaultSelections={defaultSelections}
					locations={locations}
					languages={languages}
					educations={educations}
					workType={workTypes}
					jobCategories={jobCategories}
					jobTime={jobTimes}
					experienceLevel={experienceLevels}
					salary={salaryLabels}
				/>
                                <div className="px-0 md:px-2 mdl:px-6">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6 py-2">
                                                <p className="text-xl text-gray-600">
                                                        {jobCount || "No"} {jobCount === 1 ? "job" : "jobs"} found
                                                </p>
                                        </div>

                                        <div className="space-y-4">
                                                <Suspense fallback={<div>Loading...</div>}>
                                                        {jobResults.map((result: any) => (
                                                                <JobItem data={result} key={result._id} />
                                                        ))}
                                                </Suspense>
                                        </div>

                                        <div
                                                className="relative mt-16 bg-cover bg-center rounded-lg flex flex-col items-center justify-center text-center px-6 py-12 sm:px-10"
                                                style={{ backgroundImage: "url('/images/green-bg-search.svg')" }}
                                        >
                                                <h5 className="text-2xl sm:text-4xl font-bold tracking-wider text-light">
                                                        Join our Job group on Facebook
                                                </h5>
                                                <a
                                                        href="https://www.facebook.com/groups/jobsinpragueforeigners---"
                                                        target="_blank"
                                                        className="mt-5 px-8 py-3 sm:py-4 bg-dark text-light font-bold text-lg sm:text-xl rounded-lg hover:opacity-80"
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
