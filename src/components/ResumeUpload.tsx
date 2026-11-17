"use client";

import React, { useState, useRef } from "react";
import { Upload, Sparkles, AlertCircle } from "lucide-react";
import { SAMPLE_RESUMES } from "@/data/sampleResumes";

interface ResumeUploadProps {
  onFileSelect: (file: File) => void;
  onSampleSelect: (sampleId: string) => void;
  error?: string | null;
}

export function ResumeUpload({
  onFileSelect,
  onSampleSelect,
  error: externalError,
}: ResumeUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const error = externalError || localError;

  const handleValidateAndSelect = (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setLocalError("Please select a valid .pdf file.");
      return;
    }
    setLocalError(null);
    onFileSelect(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleValidateAndSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
      {/* Hero / Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 border border-purple-600 bg-purple-50/70 px-2.5 py-0.5 text-[11px] font-mono tracking-widest uppercase text-purple-600 mb-3 font-semibold shadow-xs">
          Resume Scanner & Interview Matcher
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-sans">
          Upload PDF Resume
        </h1>
        <p className="mt-2 text-sm text-neutral-600 max-w-lg mx-auto">
          Scans technical proficiencies, evaluates seniority, aligns job criteria, and synthesizes tailored interview questions.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex flex-col items-center justify-center border-2 border-dashed p-10 transition-all cursor-pointer ${
          isDragging
            ? "border-purple-600 bg-purple-50/60 shadow-[0_0_20px_rgba(147,51,234,0.15)]"
            : "border-neutral-300 hover:border-purple-600 bg-neutral-50/50 hover:bg-purple-50/20"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleValidateAndSelect(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-neutral-300 bg-white group-hover:border-purple-600 group-hover:bg-purple-50/50 group-hover:scale-105 transition-all">
            <Upload className="h-5 w-5 text-neutral-800 group-hover:text-purple-600 transition-colors" />
          </div>
          <p className="font-medium text-sm text-black">
            Drop PDF resume here, or <span className="underline underline-offset-2 decoration-purple-600 text-purple-600 font-semibold">browse file</span>
          </p>
          <p className="mt-1 font-mono text-[11px] text-neutral-500">
            PDF format • Max 10MB
          </p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mt-4 flex items-center gap-2 border border-purple-600 bg-purple-50 px-3.5 py-2 text-xs text-purple-950 font-mono">
          <AlertCircle className="h-4 w-4 shrink-0 text-purple-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Quick Test / Sample Resumes */}
      <div className="mt-10 border-t border-neutral-200 pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
            Or test with sample profiles:
          </span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-purple-600 font-medium">
            <Sparkles className="h-3 w-3 text-purple-600" /> 1-Click Instant Run
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_RESUMES.map((sample) => (
            <button
              key={sample.id}
              onClick={(e) => {
                e.stopPropagation();
                onSampleSelect(sample.id);
              }}
              className="group flex flex-col items-start border border-neutral-200 bg-white p-3 text-left hover:border-purple-600 hover:shadow-[2px_2px_0px_0px_rgba(147,51,234,1)] transition-all"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-sans text-xs font-bold text-black group-hover:underline group-hover:text-purple-600">
                  {sample.name}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 border border-neutral-200 px-1 py-0.2">
                  {sample.experienceYears}y exp
                </span>
              </div>
              <span className="mt-0.5 font-mono text-[11px] text-neutral-900 group-hover:text-purple-600">
                {sample.targetRole}
              </span>
              <span className="mt-1.5 text-[10px] font-mono text-neutral-500 line-clamp-1">
                {sample.snippet}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}