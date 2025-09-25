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
                                className="mb-3 flex items-center gap-2 rounded-md bg-light py-1 px-4 text-gray-500 shadow-[0_4px_120px_rgba(151,159,183,0.15)] lg:hidden"
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
                                className={`w-full rounded-lg bg-light py-4 px-4 shadow-[0_4px_120px_rgba(151,159,183,0.15)] sm:px-6 ${
                                        isFilterActive ? "block" : "hidden"
                                }`}
                        >
                                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div className="flex w-full items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
                                                <CiSearch className="h-5 w-5 text-gray-500" />
                                                <input
                                                        defaultValue={defaultJobSearchValue || ""}
                                                        onChange={(event) => handleQueryPush("jobTitle", event.target.value)}
                                                        type="text"
                                                        className="w-full text-base placeholder-gray-500 placeholder-opacity-60"
                                                        placeholder="Search job name"
                                                />
                                        </div>
                                        <Link
                                                className="duration-200 self-start rounded-md border border-gray-200 bg-light py-2 px-4 text-gray-500 hover:border-gray-300 hover:text-gray-700 sm:self-auto"
                                                href="/jobs"
                                        >
                                                Clear
                                        </Link>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
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