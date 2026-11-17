"use client";

import React, { useState, useMemo, useRef } from "react";
import { Header } from "@/components/Header";
import { ResumeUpload } from "@/components/ResumeUpload";
import { ProcessingLogs } from "@/components/ProcessingLogs";
import { FilterSidebar } from "@/components/FilterSidebar";
import { JobRoleCard } from "@/components/JobRoleCard";
import { InterviewDrawer } from "@/components/InterviewDrawer";
import { SettingsModal } from "@/components/SettingsModal";
import { SAMPLE_RESUMES } from "@/data/sampleResumes";
import {
  JobFilterState,
  MatchedJobRole,
  ScanResponse,
} from "@/types";
import { Search, Briefcase } from "lucide-react";

export default function Home() {
  const [scanData, setScanData] = useState<ScanResponse | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingFilename, setProcessingFilename] = useState("");
  const [processError, setProcessError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<MatchedJobRole | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeResumeName, setActiveResumeName] = useState<string>("");

  // Filter state
  const [filters, setFilters] = useState<JobFilterState>({
    departments: [],
    levels: [],
    minMatchScore: 40,
    selectedSkills: [],
    searchQuery: "",
  });

  const pendingDataRef = useRef<ScanResponse | null>(null);
  const is15sCompleteRef = useRef(false);

  const finalizeScan = (data: ScanResponse) => {
    setScanData(data);
    setIsProcessing(false);
    setFilters((prev) => ({
      ...prev,
      levels: data.suggestedFilters.recommendedLevels.slice(0, 2),
      minMatchScore: 40,
    }));
  };

  const startScanFlow = async (fetchPromise: () => Promise<ScanResponse>, filename: string) => {
    setActiveResumeName(filename);
    setProcessingFilename(filename);
    setProcessError(null);
    setIsProcessing(true);
    pendingDataRef.current = null;
    is15sCompleteRef.current = false;

    try {
      const data = await fetchPromise();
      pendingDataRef.current = data;

      // If the 15s timer already completed while awaiting the API
      if (is15sCompleteRef.current) {
        finalizeScan(data);
      }
    } catch (err) {
      setProcessError(err instanceof Error ? err.message : "Error scanning resume");
    }
  };

  const handleFileSelect = (file: File) => {
    startScanFlow(async () => {
      const formData = new FormData();
      formData.append("file", file);

      const parseRes = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const parseData = await parseRes.json();
      if (!parseRes.ok) {
        throw new Error(parseData.error || "Failed to extract text from PDF");
      }

      const savedKey = typeof window !== "undefined" ? localStorage.getItem("interviesne_api_key") || "" : "";
      const rawStored = typeof window !== "undefined" ? localStorage.getItem("interviesne_provider") : "heuristic";
      const savedProvider: "openai" | "heuristic" = rawStored === "openai" ? "openai" : "heuristic";

      const scanRes = await fetch("/api/scan-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: parseData.text,
          options: {
            apiKey: savedKey,
            provider: savedProvider,
          },
        }),
      });

      if (!scanRes.ok) {
        const errorData = await scanRes.json();
        throw new Error(errorData.error || "Failed to scan resume");
      }

      return await scanRes.json();
    }, file.name);
  };

  const handleSampleSelect = (sampleId: string) => {
    const sample = SAMPLE_RESUMES.find((s) => s.id === sampleId);
    if (!sample) return;
    const filename = `${sample.name}_Resume.pdf`;

    startScanFlow(async () => {
      const savedKey = typeof window !== "undefined" ? localStorage.getItem("interviesne_api_key") || "" : "";
      const rawStored = typeof window !== "undefined" ? localStorage.getItem("interviesne_provider") : "heuristic";
      const savedProvider: "openai" | "heuristic" = rawStored === "openai" ? "openai" : "heuristic";

      const scanRes = await fetch("/api/scan-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText: sample.fullText,
          options: {
            apiKey: savedKey,
            provider: savedProvider,
          },
        }),
      });

      if (!scanRes.ok) {
        const errorData = await scanRes.json();
        throw new Error(errorData.error || "Failed to scan resume");
      }

      return await scanRes.json();
    }, filename);
  };

  const handleProcessingComplete = () => {
    is15sCompleteRef.current = true;
    if (pendingDataRef.current) {
      finalizeScan(pendingDataRef.current);
    }
  };

  const handleReset = () => {
    setScanData(null);
    setIsProcessing(false);
    setProcessingFilename("");
    setProcessError(null);
    setActiveResumeName("");
    setSelectedRole(null);
    pendingDataRef.current = null;
    is15sCompleteRef.current = false;
    setFilters({
      departments: [],
      levels: [],
      minMatchScore: 40,
      selectedSkills: [],
      searchQuery: "",
    });
  };

  // Distinct departments across all matched roles
  const availableDepartments = useMemo(() => {
    if (!scanData) return [];
    return Array.from(new Set(scanData.matchedRoles.map((r) => r.department))).sort();
  }, [scanData]);

  // Filtered Job Roles
  const filteredRoles = useMemo(() => {
    if (!scanData) return [];

    return scanData.matchedRoles.filter((role) => {
      // 1. Min Match score
      if (role.matchPercentage < filters.minMatchScore) {
        return false;
      }

      // 2. Department filter
      if (
        filters.departments.length > 0 &&
        !filters.departments.includes(role.department)
      ) {
        return false;
      }

      // 3. Seniority level filter
      if (filters.levels.length > 0 && !filters.levels.includes(role.level)) {
        return false;
      }

      // 4. Selected Skills filter (role must match all selected skills)
      if (filters.selectedSkills.length > 0) {
        const hasSelectedSkill = filters.selectedSkills.some((skill) =>
          role.matchingSkills.some((ms) => ms.toLowerCase() === skill.toLowerCase())
        );
        if (!hasSelectedSkill) return false;
      }

      // 5. Search query (title or department)
      if (filters.searchQuery.trim().length > 0) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = role.title.toLowerCase().includes(q);
        const matchesDept = role.department.toLowerCase().includes(q);
        const matchesSkill = role.requiredSkills.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDept && !matchesSkill) {
          return false;
        }
      }

      return true;
    });
  }, [scanData, filters]);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* Minimal Header */}
      <Header
        hasResume={!!scanData}
        onReset={handleReset}
        onOpenSettings={() => setIsSettingsOpen(true)}
        providerUsed={scanData?.providerUsed}
        candidateName={scanData?.candidate.name}
      />

      {/* Main Workspace */}
      <main className="flex-1">
        {isProcessing ? (
          <ProcessingLogs
            filename={processingFilename}
            error={processError}
            onComplete={handleProcessingComplete}
            onRetry={() => {
              setIsProcessing(false);
              setProcessError(null);
            }}
          />
        ) : !scanData ? (
          <ResumeUpload
            onFileSelect={handleFileSelect}
            onSampleSelect={handleSampleSelect}
            error={processError}
          />
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            {/* Top Toolbar / Search */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <h1 className="font-sans text-2xl font-bold tracking-tight text-black">
                  Job Role Matches & Interview Prep
                </h1>
                <p className="mt-0.5 font-mono text-xs text-neutral-500">
                  Showing {filteredRoles.length} eligible positions based on scanned proficiencies
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter by role or skill..."
                  value={filters.searchQuery}
                  onChange={(e) =>
                    setFilters({ ...filters, searchQuery: e.target.value })
                  }
                  className="w-full border border-neutral-300 bg-white py-1.5 pl-8 pr-3 font-mono text-xs text-black placeholder:text-neutral-400 focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Layout: Sidebar + Job Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Profile & Filters (4 cols) */}
              <div className="lg:col-span-4">
                <FilterSidebar
                  candidate={scanData.candidate}
                  filters={filters}
                  onFilterChange={setFilters}
                  availableDepartments={availableDepartments}
                />
              </div>

              {/* Right Column: Matched Job Cards (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {filteredRoles.length > 0 ? (
                  filteredRoles.map((role) => (
                    <JobRoleCard
                      key={role.id}
                      role={role}
                      onSelect={(r) => setSelectedRole(r)}
                    />
                  ))
                ) : (
                  <div className="border border-dashed border-neutral-300 p-12 text-center">
                    <Briefcase className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
                    <h3 className="font-sans text-base font-bold text-black">
                      No matching roles found
                    </h3>
                    <p className="mt-1 font-mono text-xs text-neutral-500 max-w-sm mx-auto">
                      Try lowering the minimum match score or clearing active department and skill filters.
                    </p>
                    <button
                      onClick={() =>
                        setFilters({
                          departments: [],
                          levels: [],
                          minMatchScore: 30,
                          selectedSkills: [],
                          searchQuery: "",
                        })
                      }
                      className="mt-4 border border-purple-600 bg-purple-600 px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-purple-700 transition-colors shadow-xs"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Drawer for Interview Questions */}
      <InterviewDrawer
        role={selectedRole}
        onClose={() => setSelectedRole(null)}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={() => {
          if (scanData) {
            startScanFlow(async () => {
              const savedKey = typeof window !== "undefined" ? localStorage.getItem("interviesne_api_key") || "" : "";
              const rawStored = typeof window !== "undefined" ? localStorage.getItem("interviesne_provider") : "heuristic";
              const savedProvider: "openai" | "heuristic" = rawStored === "openai" ? "openai" : "heuristic";

              const scanRes = await fetch("/api/scan-resume", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  resumeText: scanData.rawTextPreview,
                  options: {
                    apiKey: savedKey,
                    provider: savedProvider,
                  },
                }),
              });

              if (!scanRes.ok) {
                const errorData = await scanRes.json();
                throw new Error(errorData.error || "Failed to scan resume");
              }

              return await scanRes.json();
            }, activeResumeName || "Resume_Document.pdf");
          }
        }}
      />
    </div>
  );
}