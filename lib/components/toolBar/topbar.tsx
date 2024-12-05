"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import Dropdown from "@/lib/components/dropdown/dropdown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { optionItems } from "@/lib/types/componentTypes";

import { CiSearch } from "react-icons/ci";

interface TopbarProps {
	style?: React.CSSProperties;
	locations: optionItems[];
	languages: optionItems[];
	educations: optionItems[];
	experienceLevel: optionItems[];
	workType: optionItems[];
	jobTime: optionItems[];
	salary: optionItems[];
	defaultJobTitle?: string;
	defaultLocation?: string;
	defaultLanguage?: string;
	defaultEducation?: string;
	defaultExperienceLevel: string | undefined;
	defaultWorkType?: string;
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
	experienceLevel,
	jobTime,
	salary,
	defaultLocation,
	defaultLanguage,
	defaultWorkType,
	defaultEducation,
	defaultJobTime,
	defaultSalary,
	defaultJobSearchValue,
	defaultExperienceLevel,
}) => {
	const [isFilterActive, setIsFilterActive] = useState<boolean>("true");
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

	return (
		<div
			style={style}
			className={`bg-light rounded-lg ${!isFilterActive ? "hidden" : ""} shadow-[0_4px_120px_rgba(151,159,183,0.15)] py-4 px-6 min-w-[300px]`}
		>
			<div className="flex items-center gap-3 mb-8">
				<CiSearch className="w-5 h-5 text-gray-500"/>
				<input
					defaultValue={defaultJobSearchValue || ""}
					onChange={(e) =>
						router.push(pathname + "?" + createQueryString("jobTitle", e.target.value))
					}
					type="text"
					className="w-[188px] h-[32px] placeholder-gray-500 placeholder-opacity-60 placeholder-font-semibold placeholder-line-[21px] text-lg"
					placeholder="Search job name"
				/>
			</div>
			{/*  @ts-ignore */}
			<Dropdown
				key="work-type-dropdown"
				defaultSelected={defaultWorkType}
				queryPushing={(label: string) =>
					router.push(pathname + "?" + createQueryString("workType", label))
				}
				items={workType}
				headerTitle={"Contract Type"}
				icon="/images/icons/findJob.svg"
			/>
			{/*  @ts-ignore */}
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
			{/*  @ts-ignore */}
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
				{/*  @ts-ignore */}
				<Dropdown
				key="location-dropdown"
				defaultSelected={defaultLanguage}
				queryPushing={(label: string) =>
					router.push(pathname + "?" + createQueryString("language", label))
				}
				items={languages}
				headerTitle={"Language"}
				icon="/images/icons/location.svg"
			/>
			{/*  @ts-ignore */}
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
			{/*  @ts-ignore */}
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
			{/*  @ts-ignore */}
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
	);
};

export default Topbar;