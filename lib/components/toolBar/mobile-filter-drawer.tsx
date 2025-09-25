"use client";

import React from "react";
import { IoClose } from "react-icons/io5";

import type { FilterDefinition } from "./types";

interface MobileFilterDrawerProps {
        isOpen: boolean;
        filters: FilterDefinition[];
        filtersState: Record<string, string[]>;
        onClose: () => void;
        onToggle: (key: string, value: string) => void;
        onClearFilter: (key: string) => void;
        onReset: () => void;
        onApply: () => void;
        onClearAll: () => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
        isOpen,
        filters,
        filtersState,
        onClose,
        onToggle,
        onClearFilter,
        onReset,
        onApply,
        onClearAll,
}) => {
        if (!isOpen) {
                return null;
        }

        return (
                <div className="fixed inset-0 z-50 flex">
                        <button
                                type="button"
                                onClick={onClose}
                                className="absolute inset-0 h-full w-full bg-black/40"
                                aria-label="Close filters"
                        />
                        <div className="relative ml-auto flex h-full w-full max-w-md flex-col rounded-t-3xl bg-white shadow-[0_18px_80px_rgba(151,159,183,0.16)]">
                                <div className="flex items-center justify-between border-b border-gray-100 px-5 pb-3 pt-4">
                                        <div>
                                                <p className="text-sm font-medium text-gray-500">Refine your results</p>
                                                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                                        </div>
                                        <button
                                                type="button"
                                                onClick={onClose}
                                                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                                aria-label="Close filters"
                                        >
                                                <IoClose className="h-6 w-6" />
                                        </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-5">
                                        <div className="space-y-6 py-4">
                                                {filters.map((filter) => (
                                                        <section key={filter.key} className="rounded-2xl border border-gray-100 p-4 shadow-sm">
                                                                <header className="mb-3 flex items-center justify-between gap-2">
                                                                        <h4 className="text-sm font-semibold text-gray-700">
                                                                                {filter.headerTitle}
                                                                        </h4>
                                                                        <button
                                                                                type="button"
                                                                                onClick={() => onClearFilter(filter.queryKey)}
                                                                                className="text-xs font-medium text-gray-500 transition hover:text-gray-700"
                                                                        >
                                                                                Clear
                                                                        </button>
                                                                </header>
                                                                <div className="flex flex-col gap-2 pr-1 text-sm text-gray-600">
                                                                        {filter.items.map((item) => {
                                                                                const label = String(item.label);
                                                                                const checked = (filtersState[filter.queryKey] ?? []).includes(label);

                                                                                return (
                                                                                        <label
                                                                                                key={item.id}
                                                                                                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 transition hover:bg-gray-100"
                                                                                        >
                                                                                                <input
                                                                                                        type="checkbox"
                                                                                                        checked={checked}
                                                                                                        onChange={() => onToggle(filter.queryKey, label)}
                                                                                                        className="h-4 w-4 rounded border-gray-300 text-dark focus:ring-dark/40"
                                                                                                />
                                                                                                <span className="text-sm text-gray-700">{item.label}</span>
                                                                                        </label>
                                                                                );
                                                                        })}
                                                                        {!filter.items.length && (
                                                                                <p className="text-xs text-gray-400">No options available</p>
                                                                        )}
                                                                </div>
                                                        </section>
                                                ))}
                                        </div>
                                </div>

                                <div className="flex flex-col gap-3 border-t border-gray-100 p-5">
                                        <button
                                                type="button"
                                                onClick={onReset}
                                                className="w-full rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                        >
                                                Reset
                                        </button>
                                        <button
                                                type="button"
                                                onClick={onApply}
                                                className="w-full rounded-full bg-dark px-6 py-2 text-sm font-semibold text-white transition duration-200 hover:opacity-90"
                                        >
                                                Apply filters
                                        </button>
                                        <button
                                                type="button"
                                                onClick={onClearAll}
                                                className="w-full rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-600 transition duration-200 hover:border-gray-300 hover:text-gray-800"
                                        >
                                                Clear all
                                        </button>
                                </div>
                        </div>
                </div>
        );
};

export default MobileFilterDrawer;
