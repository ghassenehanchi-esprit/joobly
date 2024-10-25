"use client";
import React, { useCallback } from "react";
import Image from "next/image";
import Dropdown from "@/lib/components/dropdown/dropdown";
import styles from "./topBar.module.scss";
import searchIcon from "@/public/images/icons/search-large-lens.svg";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { optionItems } from "@/lib/types/componentTypes";

interface TopbarProps {
	style?: React.CSSProperties;
	locations: optionItems[];
	specializations: optionItems[];
	workType: optionItems[];
	salary: optionItems[];
	defaultJobTitle?: string;
	defaultLocation?: string;
	defaultWorkType?: string;
	defaultSalary?: string;
	defaultJobSearchValue?: string | number;
}

const Topbar: React.FC<TopbarProps> = ({
	style,
	locations,
	specializations,
	workType,
	salary,
	defaultJobTitle,
	defaultLocation,
	defaultWorkType,
	defaultSalary,
	defaultJobSearchValue,
}) => {
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
		<div style={style} className={styles["jobs-topbar"]}>
			<div className={styles["jobs-group"]}>
				<Image src={searchIcon} alt='search' className={styles["jobs-icon"]} />
				<input
					defaultValue={defaultJobSearchValue || ""}
					onChange={(e) =>
						router.push(pathname + "?" + createQueryString("jobTitle", e.target.value))
					}
					type='text'
					className={styles["header-jobs"]}
					placeholder='Search job name'
				/>
			</div>
			{/*  @ts-ignore */}
			<Dropdown
				key='work-type-dropdown'
				defaultSelected={defaultWorkType}
				queryPushing={(label: string) =>
					router.push(pathname + "?" + createQueryString("workType", label))
				}
				items={workType}
				headerTitle={"Work Type"}
				icon='/images/icons/findJob.svg'
			/>
			{/*  @ts-ignore */}
			<Dropdown
				key='location-dropdown'
				defaultSelected={defaultLocation}
				queryPushing={(label: string) =>
					router.push(pathname + "?" + createQueryString("location", label))
				}
				items={locations}
				headerTitle={"Location"}
				icon='/images/icons/location.svg'
			/>
			{/*  @ts-ignore */}
			<Dropdown
				key='salary-dropdown'
				defaultSelected={defaultSalary}
				queryPushing={(label: string) =>
					router.push(pathname + "?" + createQueryString("salary", label))
				}
				items={salary}
				headerTitle={"Salary"}
				icon='/images/icons/dollar-circle.svg'
			/>
			{/*  @ts-ignore */}
			<Dropdown
				key='specialization-dropdown'
				defaultSelected={defaultJobTitle}
				queryPushing={(label: string) =>
					router.push(pathname + "?" + createQueryString("jobTitle", label))
				}
				items={specializations}
				headerTitle={"Specialization"}
				icon='/images/icons/case.svg'
			/>
		</div>
	);
};

export default Topbar;
