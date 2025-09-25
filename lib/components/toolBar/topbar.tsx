"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Dropdown from "@/lib/components/dropdown/dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { optionItems } from "@/lib/types/componentTypes";

import { CiSearch } from "react-icons/ci";

import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import Link from "next/link";

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
	//const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
	const [isFilterActive, setIsFilterActive] = useState<boolean>(true);
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

{/*
	useEffect(() => {
        setWindowWidth(window?.innerWidth);
    }, []);
*/}
	



	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

        return (
                <div className="w-full">
                        <button
                                onClick={() => setIsFilterActive(!isFilterActive)}
                                className="bg-light rounded-md shadow-[0_4px_120px_rgba(151,159,183,0.15)] py-1 px-4 mb-3 text-gray-500 lg:hidden flex items-center gap-2"
                        >
                                Filter
                                {!isFilterActive ? <TiArrowSortedDown className="h-5 w-5" /> : <TiArrowSortedUp className="h-5 w-5" />}
                        </button>
                        <div
                                style={style}
                                className={`bg-light rounded-lg ${!isFilterActive ? "hidden" : ""} shadow-[0_4px_120px_rgba(151,159,183,0.15)] py-4 px-4 sm:px-6 w-full`}
                        >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
                                        <div className="flex w-full items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
                                                <CiSearch className="w-5 h-5 text-gray-500" />
                                                <input
                                                        defaultValue={defaultJobSearchValue || ""}
                                                        onChange={(e) =>
                                                                router.push(pathname + "?" + createQueryString("jobTitle", e.target.value))
                                                        }
                                                        type="text"
                                                        className="w-full text-base placeholder-gray-500 placeholder-opacity-60"
                                                        placeholder="Search job name"
                                                />
                                        </div>
                                        <Link
                                                className="bg-light rounded-md border border-gray-200 py-2 px-4 text-gray-500 hover:text-gray-700 hover:border-gray-300 duration-200 sm:self-auto self-start"
                                                href={"/jobs"}
                                        >
                                                Clear
                                        </Link>
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="job-category-dropdown"
                                                defaultSelected={defaultJobCategory}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("jobCategory", label))
                                                }
                                                items={jobCategories}
                                                headerTitle={"Category"}
                                                icon="/images/icons/findJob.svg"
                                        />
                                        </div>
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="contract-type-dropdown"
                                                defaultSelected={defaultWorkType}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("workType", label))
                                                }
                                                items={workType}
                                                headerTitle={"Contract Type"}
                                                icon="/images/icons/findJob.svg"
                                        />
                                        </div>
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="job-time-dropdown"
                                                defaultSelected={defaultJobTime}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("jobTime", label))
                                                }
                                                items={jobTime}
                                                headerTitle={"Working hours"}
                                                icon="/images/icons/findJob.svg"
                                        />
                                        </div>
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="location-dropdown"
                                                defaultSelected={defaultLocation}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("location", label))
                                                }
                                                items={locations}
                                                headerTitle={"Location"}
                                                icon="/images/icons/location.svg"
                                        />
                                        </div>
                                                {/*  @ts-ignore */}
                                        <div className="w-full">
                                                <Dropdown
                                                key="language-dropdown"
                                                defaultSelected={defaultLanguage}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("language", label))
                                                }
                                                items={languages}
                                                headerTitle={"Language"}
                                                icon="/images/icons/location.svg"
                                        />
                                        </div>
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="salary-dropdown"
                                                defaultSelected={defaultSalary}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("salaryLabel", label))
                                                }
                                                items={salary}
                                                headerTitle={"Salary"}
                                                icon="/images/icons/dollar-circle.svg"
                                        />
                                        </div>
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="education-dropdown"
                                                defaultSelected={defaultEducation}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("education", label))
                                                }
                                                items={educations}
                                                headerTitle={"Education"}
                                                icon="/images/icons/case.svg"
                                        />
                                        </div>
                                        {/*  @ts-ignore */}
                                        <div className="w-full">
                                        <Dropdown
                                                key="experience-dropdown"
                                                defaultSelected={defaultExperienceLevel}
                                                queryPushing={(label: string) =>
                                                        router.push(pathname + "?" + createQueryString("experienceLevel", label))
                                                }
                                                items={experienceLevel}
                                                headerTitle={"Experience Level"}
                                                icon="/images/icons/case.svg"
                                        />
                                        </div>
			</div>
		</div>
	);
};

export default Topbar;