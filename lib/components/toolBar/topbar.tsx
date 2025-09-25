"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

import Dropdown from "@/lib/components/dropdown/dropdown";
import { optionItems } from "@/lib/types/componentTypes";

interface TopbarProps {
	style?: React.CSSProperties;
	locations: optionItems[];
	languages: optionItems[];
	educations: optionItems[];
	experienceLevel: optionItems[];
	workType: optionItems[];
	jobCategories: optionItems[];
	jobTime: optionItems[];
	salary: optionItems[];
	defaultJobTitle?: string;
	defaultLocation?: string;
	defaultLanguage?: string;
	defaultEducation?: string;
	defaultExperienceLevel: string | undefined;
	defaultWorkType?: string;
	defaultJobCategory?: string;
	defaultJobTime?: string;
	defaultSalary?: string;
	defaultJobSearchValue?: string | number;
}

const Topbar: React.FC<TopbarProps> = ({
	style,
	locations,
	languages,
	educations,
	workType,
	jobCategories,
	experienceLevel,
	jobTime,
	salary,
	defaultLocation,
	defaultLanguage,
	defaultWorkType,
	defaultJobCategory,
	defaultEducation,
	defaultJobTime,
	defaultSalary,
	defaultJobSearchValue,
	defaultExperienceLevel,
}) => {
        const [isFilterActive, setIsFilterActive] = useState<boolean>(true);
        const searchParams = useSearchParams();
        const router = useRouter();
        const pathname = usePathname();

        const createQueryString = useCallback(
                (name: string, value: string) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set(name, value);

                        return params.toString();
                },
                [searchParams],
        );

        const filters = useMemo(
                () => [
                        {
                                key: "job-category-dropdown",
                                defaultSelected: defaultJobCategory,
                                queryKey: "jobCategory",
                                items: jobCategories,
                                headerTitle: "Category",
                                icon: "/images/icons/findJob.svg",
                        },
                        {
                                key: "contract-type-dropdown",
                                defaultSelected: defaultWorkType,
                                queryKey: "workType",
                                items: workType,
                                headerTitle: "Contract Type",
                                icon: "/images/icons/findJob.svg",
                        },
                        {
                                key: "job-time-dropdown",
                                defaultSelected: defaultJobTime,
                                queryKey: "jobTime",
                                items: jobTime,
                                headerTitle: "Working hours",
                                icon: "/images/icons/findJob.svg",
                        },
                        {
                                key: "location-dropdown",
                                defaultSelected: defaultLocation,
                                queryKey: "location",
                                items: locations,
                                headerTitle: "Location",
                                icon: "/images/icons/location.svg",
                        },
                        {
                                key: "language-dropdown",
                                defaultSelected: defaultLanguage,
                                queryKey: "language",
                                items: languages,
                                headerTitle: "Language",
                                icon: "/images/icons/location.svg",
                        },
                        {
                                key: "salary-dropdown",
                                defaultSelected: defaultSalary,
                                queryKey: "salaryLabel",
                                items: salary,
                                headerTitle: "Salary",
                                icon: "/images/icons/dollar-circle.svg",
                        },
                        {
                                key: "education-dropdown",
                                defaultSelected: defaultEducation,
                                queryKey: "education",
                                items: educations,
                                headerTitle: "Education",
                                icon: "/images/icons/case.svg",
                        },
                        {
                                key: "experience-dropdown",
                                defaultSelected: defaultExperienceLevel,
                                queryKey: "experienceLevel",
                                items: experienceLevel,
                                headerTitle: "Experience Level",
                                icon: "/images/icons/case.svg",
                        },
                ],
                [
                        defaultEducation,
                        defaultExperienceLevel,
                        defaultJobCategory,
                        defaultJobTime,
                        defaultLanguage,
                        defaultLocation,
                        defaultSalary,
                        defaultWorkType,
                        educations,
                        experienceLevel,
                        jobCategories,
                        jobTime,
                        languages,
                        locations,
                        salary,
                        workType,
                ],
        );

        const handleQueryPush = useCallback(
                (name: string, value: string) => {
                        router.push(`${pathname}?${createQueryString(name, value)}`);
                },
                [createQueryString, pathname, router],
        );

        return (
                <div className="w-full">
                        <button
                                onClick={() => setIsFilterActive((prev) => !prev)}
                                className="mb-4 flex items-center gap-2 self-start rounded-full border border-gray-200 bg-light/90 py-1.5 px-4 text-sm font-medium text-gray-600 shadow-[0_10px_40px_rgba(151,159,183,0.15)] backdrop-blur lg:hidden"
                                aria-expanded={isFilterActive}
                                aria-controls="filters-panel"
                        >
                                Filter
                                {isFilterActive ? (
                                        <TiArrowSortedUp className="h-5 w-5" />
                                ) : (
                                        <TiArrowSortedDown className="h-5 w-5" />
                                )}
                        </button>

                        <div
                                style={style}
                                id="filters-panel"
                                className={`w-full rounded-3xl border border-gray-100 bg-light/80 py-5 px-4 shadow-[0_24px_120px_rgba(151,159,183,0.18)] backdrop-blur-sm sm:px-6 lg:px-10 ${
                                        isFilterActive ? "block" : "hidden"
                                }`}
                        >
                                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white/70 px-4 py-2 shadow-inner">
                                                <CiSearch className="h-5 w-5 text-gray-500" />
                                                <input
                                                        defaultValue={defaultJobSearchValue || ""}
                                                        onChange={(event) => handleQueryPush("jobTitle", event.target.value)}
                                                        type="text"
                                                        className="w-full bg-transparent text-base placeholder-gray-500 placeholder-opacity-60 focus:outline-none"
                                                        placeholder="Search job name"
                                                />
                                        </div>
                                        <Link
                                                className="self-start rounded-full border border-gray-200 bg-white/70 px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800 sm:self-auto"
                                                href="/jobs"
                                        >
                                                Clear
                                        </Link>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                        {filters.map((filter) => (
                                                <div key={filter.key} className="w-full">
                                                        <Dropdown
                                                                key={filter.key}
                                                                defaultSelected={filter.defaultSelected}
                                                                queryPushing={(label: string) => handleQueryPush(filter.queryKey, label)}
                                                                items={filter.items}
                                                                headerTitle={filter.headerTitle}
                                                                icon={filter.icon}
                                                        />
                                                </div>
                                        ))}
                                </div>
                        </div>
                </div>
        );

};

export default Topbar;