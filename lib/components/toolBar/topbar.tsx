"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

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
        const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
        const [searchValue, setSearchValue] = useState(() =>
                defaultJobSearchValue ? String(defaultJobSearchValue) : "",
        );
        const searchParams = useSearchParams();
        const router = useRouter();
        const pathname = usePathname();

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

        const initialFilterState = useMemo(() => {
                return filters.reduce((acc, filter) => {
                        const defaultOption = filter.items.find(
                                (item) => item.id === filter.defaultSelected,
                        );

                        return {
                                ...acc,
                                [filter.queryKey]: defaultOption ? String(defaultOption.label) : "",
                        };
                }, {} as Record<string, string>);
        }, [filters]);

        const emptyFilterState = useMemo(() => {
                return filters.reduce(
                        (acc, filter) => ({
                                ...acc,
                                [filter.queryKey]: "",
                        }),
                        {} as Record<string, string>,
                );
        }, [filters]);

        const [filtersState, setFiltersState] = useState<Record<string, string>>(() => ({
                ...initialFilterState,
        }));

        useEffect(() => {
                setFiltersState({ ...initialFilterState });
        }, [initialFilterState]);

        useEffect(() => {
                setSearchValue(defaultJobSearchValue ? String(defaultJobSearchValue) : "");
        }, [defaultJobSearchValue]);

        const handleApplyFilters = useCallback(() => {
                const params = new URLSearchParams(searchParams.toString());

                if (searchValue) {
                        params.set("jobTitle", searchValue);
                } else {
                        params.delete("jobTitle");
                }

                filters.forEach((filter) => {
                        const value = filtersState[filter.queryKey];

                        if (value) {
                                params.set(filter.queryKey, value);
                        } else {
                                params.delete(filter.queryKey);
                        }
                });

                router.push(`${pathname}?${params.toString()}`);
                setIsFilterModalOpen(false);
        }, [filters, filtersState, pathname, router, searchParams, searchValue]);

        const handleClearAll = useCallback(() => {
                setSearchValue("");
                setFiltersState({ ...emptyFilterState });
                router.push(pathname);
                setIsFilterModalOpen(false);
        }, [emptyFilterState, pathname, router]);

        const handleFilterSelection = useCallback((key: string, value: string) => {
                setFiltersState((prev) => ({
                        ...prev,
                        [key]: value,
                }));
        }, []);

        return (
                <div className="w-full">
                        <div
                                style={style}
                                className="mx-auto w-full max-w-5xl rounded-3xl border border-gray-100 bg-white/70 py-5 px-4 shadow-[0_18px_80px_rgba(151,159,183,0.16)] backdrop-blur-sm sm:px-6 lg:px-8"
                        >
                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="flex w-full items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                                                <CiSearch className="h-5 w-5 text-gray-500" />
                                                <input
                                                        value={searchValue}
                                                        onChange={(event) => setSearchValue(event.target.value)}
                                                        onKeyDown={(event) => {
                                                                if (event.key === "Enter") {
                                                                        handleApplyFilters();
                                                                }
                                                        }}
                                                        type="text"
                                                        className="w-full bg-transparent text-base placeholder-gray-500 placeholder-opacity-60 focus:outline-none"
                                                        placeholder="Search job name"
                                                />
                                        </div>

                                        <div className="flex items-center gap-3">
                                                <button
                                                        type="button"
                                                        onClick={() => setIsFilterModalOpen(true)}
                                                        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                                >
                                                        <FiFilter className="h-5 w-5" />
                                                        <span className="hidden sm:inline">Filters</span>
                                                </button>
                                                <button
                                                        type="button"
                                                        onClick={handleApplyFilters}
                                                        className="rounded-full bg-dark px-5 py-2 text-sm font-semibold text-white transition duration-200 hover:opacity-90"
                                                >
                                                        Search
                                                </button>
                                                <Link
                                                        className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                                        href="/jobs"
                                                >
                                                        Clear
                                                </Link>
                                        </div>
                                </div>
                        </div>

                        {isFilterModalOpen && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                                        <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
                                                <div className="mb-6 flex items-center justify-between">
                                                        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                                                        <button
                                                                type="button"
                                                                onClick={() => setIsFilterModalOpen(false)}
                                                                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                                                aria-label="Close filters"
                                                        >
                                                                <IoClose className="h-6 w-6" />
                                                        </button>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        {filters.map((filter) => (
                                                                <label key={filter.key} className="flex flex-col gap-2 text-sm text-gray-700">
                                                                        <span className="font-medium text-gray-600">{filter.headerTitle}</span>
                                                                        <select
                                                                                value={filtersState[filter.queryKey] || ""}
                                                                                onChange={(event) =>
                                                                                        handleFilterSelection(filter.queryKey, event.target.value)
                                                                                }
                                                                                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-dark focus:outline-none focus:ring-2 focus:ring-dark/20"
                                                                        >
                                                                                <option value="">All</option>
                                                                                {filter.items.map((item) => (
                                                                                        <option key={item.id} value={String(item.label)}>
                                                                                                {item.label}
                                                                                        </option>
                                                                                ))}
                                                                        </select>
                                                                </label>
                                                        ))}
                                                </div>

                                                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                                        <button
                                                                type="button"
                                                                onClick={() => setFiltersState({ ...emptyFilterState })}
                                                                className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                                        >
                                                                Reset
                                                        </button>
                                                        <button
                                                                type="button"
                                                                onClick={handleApplyFilters}
                                                                className="rounded-full bg-dark px-6 py-2 text-sm font-semibold text-white transition duration-200 hover:opacity-90"
                                                        >
                                                                Apply filters
                                                        </button>
                                                        <button
                                                                type="button"
                                                                onClick={handleClearAll}
                                                                className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                                        >
                                                                Clear all
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        )}
                </div>
        );

};

export default Topbar;