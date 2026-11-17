"use client";

import React from "react";
import { Sliders, RefreshCw, FileText } from "lucide-react";

interface HeaderProps {
  hasResume: boolean;
  onReset: () => void;
  onOpenSettings: () => void;
  providerUsed?: string;
  candidateName?: string;
}

export function Header({
  hasResume,
  onReset,
  onOpenSettings,
  providerUsed,
  candidateName,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center bg-purple-600 text-white font-mono text-xs font-bold tracking-tight shadow-xs">
            IN
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-sm font-bold tracking-widest uppercase text-black">
              INTERVIESNE
            </span>
            <span className="text-[10px] font-mono tracking-wider text-purple-600 uppercase hidden sm:inline">
              / Resume & Role Architect
            </span>
          </div>
        </div>

        {/* Center / Status */}
        {hasResume && candidateName && (
          <div className="hidden md:flex items-center gap-2 text-xs font-mono">
            <FileText className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-neutral-500">Candidate:</span>
            <span className="font-semibold text-black">{candidateName}</span>
            {providerUsed && (
              <span className="rounded border border-purple-200 bg-purple-50/70 px-1.5 py-0.5 text-[10px] text-purple-700 font-medium">
                {providerUsed.includes("OpenAI") ? "OpenAI" : "Deterministic Engine"}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {hasResume && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs font-medium text-black hover:border-purple-600 hover:text-purple-700 transition-colors"
              title="Reset and upload another resume"
            >
              <RefreshCw className="h-3 w-3" />
              <span>New Scan</span>
            </button>
          )}

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 rounded border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs font-medium text-neutral-700 hover:border-purple-600 hover:text-purple-700 transition-colors"
            title="Configure AI Provider or API Key"
          >
            <Sliders className="h-3 w-3" />
            <span className="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
}
