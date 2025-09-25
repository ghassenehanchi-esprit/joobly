"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { FiFilter } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

import { optionItems } from "@/lib/types/componentTypes";

import MobileFilterDrawer from "./mobile-filter-drawer";
import type { FilterDefinition } from "./types";

const cloneFilterState = (state: Record<string, string[]>) =>
        Object.fromEntries(
                Object.entries(state).map(([key, values]) => [key, [...values]]),
        ) as Record<string, string[]>;

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
        defaultJobSearchValue?: string | number;
        defaultSelections?: Partial<Record<string, string[]>>;
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
        defaultJobSearchValue,
        defaultSelections,
}) => {
        const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
        const [isMobileView, setIsMobileView] = useState(false);
        const [searchValue, setSearchValue] = useState(() =>
                defaultJobSearchValue ? String(defaultJobSearchValue) : "",
        );
        const searchParams = useSearchParams();
        const router = useRouter();
        const pathname = usePathname();

        const filters = useMemo<FilterDefinition[]>(
                () => [
                        {
                                key: "job-category-dropdown",
                                defaultSelectedIds: defaultSelections?.jobCategory ?? [],
                                queryKey: "jobCategory",
                                items: jobCategories,
                                headerTitle: "Category",
                                icon: "/images/icons/findJob.svg",
                        },
                        {
                                key: "contract-type-dropdown",
                                defaultSelectedIds: defaultSelections?.workType ?? [],
                                queryKey: "workType",
                                items: workType,
                                headerTitle: "Contract Type",
                                icon: "/images/icons/findJob.svg",
                        },
                        {
                                key: "job-time-dropdown",
                                defaultSelectedIds: defaultSelections?.jobTime ?? [],
                                queryKey: "jobTime",
                                items: jobTime,
                                headerTitle: "Working hours",
                                icon: "/images/icons/findJob.svg",
                        },
                        {
                                key: "location-dropdown",
                                defaultSelectedIds: defaultSelections?.location ?? [],
                                queryKey: "location",
                                items: locations,
                                headerTitle: "Location",
                                icon: "/images/icons/location.svg",
                        },
                        {
                                key: "language-dropdown",
                                defaultSelectedIds: defaultSelections?.language ?? [],
                                queryKey: "language",
                                items: languages,
                                headerTitle: "Language",
                                icon: "/images/icons/location.svg",
                        },
                        {
                                key: "salary-dropdown",
                                defaultSelectedIds: defaultSelections?.salaryLabel ?? [],
                                queryKey: "salaryLabel",
                                items: salary,
                                headerTitle: "Salary",
                                icon: "/images/icons/dollar-circle.svg",
                        },
                        {
                                key: "education-dropdown",
                                defaultSelectedIds: defaultSelections?.education ?? [],
                                queryKey: "education",
                                items: educations,
                                headerTitle: "Education",
                                icon: "/images/icons/case.svg",
                        },
                        {
                                key: "experience-dropdown",
                                defaultSelectedIds: defaultSelections?.experienceLevel ?? [],
                                queryKey: "experienceLevel",
                                items: experienceLevel,
                                headerTitle: "Experience Level",
                                icon: "/images/icons/case.svg",
                        },
                ],
                [
                        defaultSelections,
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
                        const defaultOptions = filter.items.filter((item) =>
                                filter.defaultSelectedIds.includes(item.id),
                        );

                        return {
                                ...acc,
                                [filter.queryKey]: defaultOptions.map((item) =>
                                        String(item.label),
                                ),
                        };
                }, {} as Record<string, string[]>);
        }, [filters]);

        const emptyFilterState = useMemo(() => {
                return filters.reduce(
                        (acc, filter) => ({
                                ...acc,
                                [filter.queryKey]: [],
                        }),
                        {} as Record<string, string[]>,
                );
        }, [filters]);

        const [filtersState, setFiltersState] = useState<Record<string, string[]>>(() =>
                cloneFilterState(initialFilterState),
        );

        useEffect(() => {
                setFiltersState(cloneFilterState(initialFilterState));
        }, [initialFilterState]);

        useEffect(() => {
                setSearchValue(defaultJobSearchValue ? String(defaultJobSearchValue) : "");
        }, [defaultJobSearchValue]);

        useEffect(() => {
                if (typeof window === "undefined") {
                        return;
                }

                const handleResize = () => {
                        setIsMobileView(window.innerWidth < 768);
                };

                handleResize();

                window.addEventListener("resize", handleResize);

                return () => {
                        window.removeEventListener("resize", handleResize);
                };
        }, []);

        useEffect(() => {
                if (typeof document === "undefined" || isMobileView) {
                        return;
                }

                const { body } = document;
                const previousOverflow = body.style.overflow;

                if (isFilterModalOpen) {
                        body.style.overflow = "hidden";
                }

                return () => {
                        body.style.overflow = previousOverflow;
                };
        }, [isFilterModalOpen, isMobileView]);

        const handleApplyFilters = useCallback(() => {
                const params = new URLSearchParams(searchParams.toString());
                const trimmedSearchValue = searchValue.trim();

                if (trimmedSearchValue) {
                        params.set("jobTitle", trimmedSearchValue);
                } else {
                        params.delete("jobTitle");
                }

                filters.forEach((filter) => {
                        const values = filtersState[filter.queryKey] ?? [];

                        params.delete(filter.queryKey);

                        values.forEach((value) => {
                                params.append(filter.queryKey, value);
                        });
                });

                router.push(`${pathname}?${params.toString()}`);
                setIsFilterModalOpen(false);
        }, [filters, filtersState, pathname, router, searchParams, searchValue]);

        const handleClearAll = useCallback(() => {
                setSearchValue("");
                setFiltersState(cloneFilterState(emptyFilterState));
                router.push(pathname);
                setIsFilterModalOpen(false);
        }, [emptyFilterState, pathname, router]);

        const handleClearFilterGroup = useCallback((key: string) => {
                setFiltersState((prev) => ({
                        ...prev,
                        [key]: [],
                }));
        }, []);

        const handleFilterSelection = useCallback((key: string, value: string) => {
                setFiltersState((prev) => {
                        const currentValues = prev[key] ?? [];
                        const exists = currentValues.includes(value);
                        const nextValues = exists
                                ? currentValues.filter((item) => item !== value)
                                : [...currentValues, value];

                        return {
                                ...prev,
                                [key]: nextValues,
                        };
                });
        }, []);

        const renderFiltersModal = () => {
                if (!isFilterModalOpen) {
                        return null;
                }

                if (isMobileView) {
                        return (
                                <MobileFilterDrawer
                                        filters={filters}
                                        filtersState={filtersState}
                                        isOpen={isFilterModalOpen}
                                        onApply={handleApplyFilters}
                                        onClearAll={handleClearAll}
                                        onClearFilter={handleClearFilterGroup}
                                        onClose={() => setIsFilterModalOpen(false)}
                                        onReset={() =>
                                                setFiltersState(
                                                        cloneFilterState(initialFilterState),
                                                )
                                        }
                                        onToggle={handleFilterSelection}
                                />
                        );
                }

                return (
                        <div
                                aria-modal="true"
                                role="dialog"
                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/60 px-4 py-6 backdrop-blur-sm"
                                onClick={() => setIsFilterModalOpen(false)}
                        >
                                <div
                                        className="relative flex w-full max-w-5xl max-h-[90vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5"
                                        onClick={(event) => event.stopPropagation()}
                                >
                                        <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="space-y-1">
                                                        <h3 className="text-2xl font-semibold text-gray-900">Refine your search</h3>
                                                        <p className="text-sm text-gray-500">
                                                                Select the categories that matter most to you to personalise the job results.
                                                        </p>
                                                </div>
                                                <button
                                                        type="button"
                                                        onClick={() => setIsFilterModalOpen(false)}
                                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                                                        aria-label="Close filters"
                                                >
                                                        <IoClose className="h-5 w-5" />
                                                </button>
                                        </div>

                                        <div className="flex-1 overflow-y-auto px-6 py-4">
                                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                                                        {filters.map((filter) => (
                                                                <div
                                                                        key={filter.key}
                                                                        className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm"
                                                                >
                                                                        <div className="flex items-center justify-between gap-3">
                                                                                <span className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                                                                                        {filter.headerTitle}
                                                                                </span>
                                                                                <button
                                                                                        type="button"
                                                                                        onClick={() => handleClearFilterGroup(filter.queryKey)}
                                                                                        className="text-xs font-medium text-gray-400 transition hover:text-gray-600"
                                                                                >
                                                                                        Clear
                                                                                </button>
                                                                        </div>

                                                                        <div className="flex max-h-52 flex-col gap-2 overflow-y-auto pr-1 text-sm text-gray-600">
                                                                                {filter.items.map((item) => {
                                                                                        const label = String(item.label);
                                                                                        const checked = (filtersState[filter.queryKey] ?? []).includes(
                                                                                                label,
                                                                                        );

                                                                                        return (
                                                                                                <label
                                                                                                        key={item.id}
                                                                                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors ${
                                                                                                                checked
                                                                                                                        ? "border-dark/60 bg-dark/5 text-gray-900"
                                                                                                                        : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50"
                                                                                                        }`}
                                                                                                >
                                                                                                        <input
                                                                                                                type="checkbox"
                                                                                                                checked={checked}
                                                                                                                onChange={() =>
                                                                                                                        handleFilterSelection(
                                                                                                                                filter.queryKey,
                                                                                                                                label,
                                                                                                                        )
                                                                                                                }
                                                                                                                className="h-4 w-4 rounded border-gray-300 text-dark focus:ring-dark/40"
                                                                                                        />
                                                                                                        <span className="truncate text-sm">{item.label}</span>
                                                                                                </label>
                                                                                        );
                                                                                })}
                                                                                {!filter.items.length && (
                                                                                        <p className="text-xs text-gray-400">No options available</p>
                                                                                )}
                                                                        </div>
                                                                </div>
                                                        ))}
                                                </div>
                                        </div>

                                        <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
                                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                                                        <button
                                                                type="button"
                                                                onClick={() => setFiltersState(cloneFilterState(initialFilterState))}
                                                                className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                                        >
                                                                Reset to defaults
                                                        </button>
                                                        <button
                                                                type="button"
                                                                onClick={handleClearAll}
                                                                className="rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                                        >
                                                                Clear all
                                                        </button>
                                                        <button
                                                                type="button"
                                                                onClick={handleApplyFilters}
                                                                className="rounded-full bg-dark px-6 py-2 text-sm font-semibold text-white transition duration-200 hover:opacity-90"
                                                        >
                                                                Apply filters
                                                        </button>
                                                </div>
                                        </div>
                                </div>
                        </div>
                );
        };

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
                        {renderFiltersModal()}
                </div>
        );
};

export default Topbar;
