"use client";

import React from "react";
import { MatchedJobRole } from "@/types";
import { ArrowRight, Briefcase, MapPin, DollarSign } from "lucide-react";

interface JobRoleCardProps {
  role: MatchedJobRole;
  onSelect: (role: MatchedJobRole) => void;
}

export function JobRoleCard({ role, onSelect }: JobRoleCardProps) {
  const isHighMatch = role.matchPercentage >= 75;

  return (
    <div className="group border border-neutral-200 bg-white p-5 hover:border-purple-600 transition-all hover:shadow-[3px_3px_0px_0px_rgba(147,51,234,1)]">
      {/* Top Bar: Title & Match Badge */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-200 px-1.5 py-0.5">
              {role.department}
            </span>
            <span className="font-mono text-[10px] text-neutral-500">
              {role.level} • {role.type}
            </span>
          </div>

          <h3 className="mt-1.5 font-sans text-lg font-bold text-black tracking-tight group-hover:text-purple-600 group-hover:underline">
            {role.title}
          </h3>
        </div>

        {/* Match Percentage Badge */}
        <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between">
          <div
            className={`border px-3 py-1 font-mono text-sm font-bold tracking-tight ${
              isHighMatch
                ? "border-purple-600 bg-purple-600 text-white"
                : "border-purple-600 bg-purple-50 text-purple-700"
            }`}
          >
            {role.matchPercentage}% MATCH
          </div>
        </div>
      </div>

      {/* Meta tags */}
      <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-neutral-600">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-neutral-400" />
          {role.location}
        </span>
        <span className="flex items-center gap-1">
          <DollarSign className="h-3 w-3 text-neutral-400" />
          {role.salaryRange}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="h-3 w-3 text-neutral-400" />
          {role.experienceMinYears}+ Yrs Req
        </span>
      </div>

      {/* Fit Assessment (One sentence, zero slop) */}
      <p className="mt-3 font-sans text-xs text-neutral-700 bg-neutral-50 border border-neutral-100 p-2 leading-relaxed">
        {role.fitAssessment}
      </p>

      {/* Skills Matrix */}
      <div className="mt-4 space-y-2 border-t border-neutral-100 pt-3">
        {/* Matching Skills */}
        {role.matchingSkills.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-purple-600 font-semibold mt-0.5 w-16">
              Matched:
            </span>
            <div className="flex flex-wrap gap-1">
              {role.matchingSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-purple-600 text-white px-1.5 py-0.5 font-mono text-[10px] font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Skills */}
        {role.missingSkills.length > 0 && (
          <div className="flex items-start gap-2">
            <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-neutral-400 mt-0.5 w-16">
              Skill Gap:
            </span>
            <div className="flex flex-wrap gap-1">
              {role.missingSkills.map((skill) => (
                <span
                  key={skill}
                  className="border border-dashed border-neutral-400 bg-white text-neutral-600 px-1.5 py-0.5 font-mono text-[10px]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-neutral-200 pt-3">
        <span className="font-mono text-[11px] text-neutral-500">
          {role.tailoredQuestions.length} Interview Questions Available
        </span>
        <button
          onClick={() => onSelect(role)}
          className="flex items-center gap-1.5 border border-purple-600 bg-white px-3 py-1 font-mono text-xs font-bold text-purple-600 hover:bg-purple-600 hover:text-white transition-all shadow-xs"
        >
          <span>Interview Prep</span>
          <ArrowRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
