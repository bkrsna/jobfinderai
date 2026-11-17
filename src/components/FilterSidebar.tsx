"use client";

import React from "react";
import { CandidateProfile, JobFilterState, SeniorityLevel } from "@/types";
import { Filter, X, Check } from "lucide-react";

interface FilterSidebarProps {
  candidate: CandidateProfile;
  filters: JobFilterState;
  onFilterChange: (filters: JobFilterState) => void;
  availableDepartments: string[];
}

const ALL_LEVELS: SeniorityLevel[] = ["Junior", "Mid", "Senior", "Lead", "Staff"];

export function FilterSidebar({
  candidate,
  filters,
  onFilterChange,
  availableDepartments,
}: FilterSidebarProps) {
  const toggleLevel = (level: SeniorityLevel) => {
    const exists = filters.levels.includes(level);
    const updated = exists
      ? filters.levels.filter((l) => l !== level)
      : [...filters.levels, level];
    onFilterChange({ ...filters, levels: updated });
  };

  const toggleDepartment = (dept: string) => {
    const exists = filters.departments.includes(dept);
    const updated = exists
      ? filters.departments.filter((d) => d !== dept)
      : [...filters.departments, dept];
    onFilterChange({ ...filters, departments: updated });
  };

  const toggleSkill = (skill: string) => {
    const exists = filters.selectedSkills.includes(skill);
    const updated = exists
      ? filters.selectedSkills.filter((s) => s !== skill)
      : [...filters.selectedSkills, skill];
    onFilterChange({ ...filters, selectedSkills: updated });
  };

  const resetFilters = () => {
    onFilterChange({
      departments: [],
      levels: [],
      minMatchScore: 40,
      selectedSkills: [],
      searchQuery: "",
    });
  };

  const activeFilterCount =
    filters.departments.length +
    filters.levels.length +
    filters.selectedSkills.length +
    (filters.minMatchScore > 40 ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <aside className="w-full space-y-5">
      {/* 1. Candidate Overview Card */}
      <div className="border border-neutral-300 bg-white p-4 hover:border-purple-600 transition-colors">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            Detected Profile
          </span>
          <span className="bg-purple-600 text-white px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider shadow-xs">
            {candidate.detectedLevel}
          </span>
        </div>

        <div className="mt-3">
          <div className="font-sans text-base font-bold text-black">
            {candidate.name || "Candidate"}
          </div>
          <div className="font-mono text-xs text-neutral-600 mt-0.5">
            {candidate.estimatedYearsExperience} Years Experience
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {candidate.primaryDomains.map((domain) => (
            <span
              key={domain}
              className="border border-neutral-300 bg-neutral-50 px-1.5 py-0.5 text-[10px] font-mono text-black"
            >
              {domain}
            </span>
          ))}
        </div>

        <p className="mt-3 border-t border-neutral-100 pt-2.5 font-sans text-xs text-neutral-600 leading-relaxed">
          {candidate.summary}
        </p>
      </div>

      {/* 2. Filter Controls Box */}
      <div className="border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-black uppercase tracking-wider">
            <Filter className="h-3.5 w-3.5 text-purple-600" />
            <span>Job Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 rounded-full bg-purple-600 px-1.5 text-[9px] text-white font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              className="font-mono text-[10px] text-neutral-500 hover:text-purple-700 flex items-center gap-0.5 underline underline-offset-2"
            >
              <X className="h-2.5 w-2.5" /> Clear All
            </button>
          )}
        </div>

        {/* Min Match Score */}
        <div className="mt-4">
          <div className="flex items-center justify-between font-mono text-xs">
            <span className="text-neutral-600">Min Match Score:</span>
            <span className="font-bold text-purple-600">{filters.minMatchScore}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={90}
            step={5}
            value={filters.minMatchScore}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minMatchScore: parseInt(e.target.value, 10),
              })
            }
            className="mt-2 w-full accent-purple-600 cursor-pointer"
          />
          <div className="flex justify-between font-mono text-[10px] text-neutral-400">
            <span>20%</span>
            <span>50%</span>
            <span>90%</span>
          </div>
        </div>

        {/* Seniority Tier */}
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-2">
            Seniority Level
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ALL_LEVELS.map((level) => {
              const active = filters.levels.includes(level);
              return (
                <button
                  key={level}
                  onClick={() => toggleLevel(level)}
                  className={`border px-2 py-1 text-xs font-mono transition-colors ${
                    active
                      ? "border-purple-600 bg-purple-600 text-white font-bold"
                      : "border-neutral-200 bg-white text-neutral-800 hover:border-purple-600 hover:text-purple-700"
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Department Filter */}
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500 block mb-2">
            Department
          </span>
          <div className="space-y-1">
            {availableDepartments.map((dept) => {
              const active = filters.departments.includes(dept);
              return (
                <button
                  key={dept}
                  onClick={() => toggleDepartment(dept)}
                  className={`flex w-full items-center justify-between border px-2 py-1 text-left text-xs font-mono transition-colors ${
                    active
                      ? "border-purple-600 bg-purple-50/80 text-purple-950 font-semibold"
                      : "border-neutral-100 text-neutral-700 hover:border-purple-300"
                  }`}
                >
                  <span className="truncate">{dept}</span>
                  {active && <Check className="h-3 w-3 shrink-0 text-purple-600" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Extracted Skills Cloud */}
      <div className="border border-neutral-200 bg-white p-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
            Candidate Skills ({candidate.allSkills.length})
          </span>
          <span className="text-[10px] font-mono text-neutral-400">
            Click to filter
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1 max-h-64 overflow-y-auto pr-1">
          {candidate.allSkills.map((skill) => {
            const active = filters.selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`border px-1.5 py-0.5 text-[11px] font-mono transition-all ${
                  active
                    ? "border-purple-600 bg-purple-600 text-white font-medium"
                    : "border-neutral-200 bg-white text-neutral-800 hover:border-purple-600 hover:text-purple-700"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
