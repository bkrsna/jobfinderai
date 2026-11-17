"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, CheckCircle2, Loader2, FileText, AlertCircle, RefreshCw } from "lucide-react";

export interface LogStep {
  tag: string;
  stage: string;
  detail: string;
}

export const PROCESS_STEPS: LogStep[] = [
  {
    tag: "SYS_INIT",
    stage: "Pipeline Initialization",
    detail: "Mounting isolated document memory buffer and loading semantic embeddings...",
  },
  {
    tag: "PDF_PARSE",
    stage: "Binary PDF Parsing",
    detail: "Decompressing content streams, glyph coordinate matrices & font tables...",
  },
  {
    tag: "TEXT_NORM",
    stage: "Typography & Layout Normalization",
    detail: "Stripping visual formatting noise, extracting line breaks & structural anchors...",
  },
  {
    tag: "ENTITY_NLP",
    stage: "Biographical Entity Extraction",
    detail: "Identifying candidate credentials, academic records & contact metadata...",
  },
  {
    tag: "SKILLS_SCAN",
    stage: "Technical Proficiencies Extraction",
    detail: "Running vocabulary scan against 250+ engineering skills taxonomy...",
  },
  {
    tag: "DOMAIN_MAP",
    stage: "Competency Domain Clustering",
    detail: "Clustering detected proficiencies into Systems, Cloud, Frontend, and AI stacks...",
  },
  {
    tag: "TENURE_CALC",
    stage: "Experience Chronology Calibration",
    detail: "Parsing career milestones & computing total industry tenure...",
  },
  {
    tag: "SENIORITY",
    stage: "Seniority Tier Determination",
    detail: "Synthesizing project scale, leadership indicators & detected seniority level...",
  },
  {
    tag: "ROLE_QUERY",
    stage: "Role Catalog Indexing",
    detail: "Querying internal job definitions, departmental criteria & benchmark weights...",
  },
  {
    tag: "FIT_SCORING",
    stage: "Multi-Dimensional Vector Scoring",
    detail: "Computing cosine similarity & domain qualification scoring across open roles...",
  },
  {
    tag: "GAP_EVAL",
    stage: "Capability Gap Diagnostic",
    detail: "Cross-referencing requirements to isolate strengths & prerequisite gaps...",
  },
  {
    tag: "SYNTHESIS",
    stage: "Interview Synthesis & Rubrics",
    detail: "Synthesizing tailored behavioral and technical questions with scoring guides...",
  },
];

const TOTAL_DURATION_MS = 15000;
const STEP_INTERVAL_MS = TOTAL_DURATION_MS / PROCESS_STEPS.length; // 1250ms per step

interface ProcessingLogsProps {
  filename: string;
  onComplete: () => void;
  error?: string | null;
  onRetry?: () => void;
}

export function ProcessingLogs({
  filename,
  onComplete,
  error,
  onRetry,
}: ProcessingLogsProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const logsContainerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number>(Date.now());
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Smooth progress bar update (no time numbers shown)
  useEffect(() => {
    if (error) return;

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / TOTAL_DURATION_MS) * 100);
      setProgressPercent(pct);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(progressInterval);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [error]);

  // Step progression across 15 seconds
  useEffect(() => {
    if (error) return;

    startTimeRef.current = Date.now();
    setCurrentStepIndex(0);
    setIsFinished(false);

    const stepInterval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const nextIndex = Math.min(
        PROCESS_STEPS.length - 1,
        Math.floor(elapsed / STEP_INTERVAL_MS)
      );

      setCurrentStepIndex(nextIndex);

      if (elapsed >= TOTAL_DURATION_MS) {
        clearInterval(stepInterval);
        setIsFinished(true);
        // Small delay to let user see final completion before transitioning
        setTimeout(() => {
          onCompleteRef.current();
        }, 300);
      }
    }, 100);

    return () => clearInterval(stepInterval);
  }, [error]);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [currentStepIndex, isFinished]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Top Banner */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/30 pb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
          </span>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
            Semantic Resume Analysis Pipeline
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-600 bg-neutral-100 border border-neutral-200 px-2.5 py-1">
          <FileText className="h-3 w-3 text-purple-600 shrink-0" />
          <span className="truncate max-w-[200px] sm:max-w-[280px] font-medium text-black">
            {filename || "Resume_Document.pdf"}
          </span>
        </div>
      </div>

      {/* Main Terminal Window */}
      <div className="border-2 border-neutral-900 bg-neutral-950 text-neutral-100 shadow-[4px_4px_0px_0px_rgba(147,51,234,1)] overflow-hidden">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-purple-600" />
              <div className="h-2.5 w-2.5 rounded-full bg-fuchsia-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
            </div>
            <span className="ml-2 font-mono text-[11px] text-neutral-400 tracking-wider">
              PROCESS_LOGS // REALTIME_STREAM
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 font-mono text-[10px] text-purple-400">
              <Terminal className="h-3 w-3" />
              <span>HEURISTIC + NLP</span>
            </span>
          </div>
        </div>

        {/* Progress Bar (Smooth visual track, NO time/seconds displayed) */}
        <div className="relative h-1 w-full bg-neutral-800 overflow-hidden">
          <div
            className="h-full bg-purple-600 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(147,51,234,0.8)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Logs Output Area */}
        <div
          ref={logsContainerRef}
          className="h-80 sm:h-96 overflow-y-auto p-4 sm:p-5 font-mono text-xs space-y-2.5 selection:bg-purple-600 selection:text-white"
        >
          {error ? (
            <div className="border border-red-500/50 bg-red-950/30 p-4 text-red-300 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <AlertCircle className="h-4 w-4" />
                <span>[ERROR] Analysis Pipeline Interrupted</span>
              </div>
              <p className="text-xs text-neutral-300">{error}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="flex items-center gap-1.5 border border-purple-600 bg-purple-600 px-3 py-1 font-mono text-xs font-bold text-white hover:bg-purple-700 transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Try Again</span>
                </button>
              )}
            </div>
          ) : (
            <>
              {PROCESS_STEPS.slice(0, currentStepIndex + 1).map((step, idx) => {
                const isCurrent = idx === currentStepIndex && !isFinished;
                const isDone = idx < currentStepIndex || isFinished;

                return (
                  <div
                    key={step.tag}
                    className={`flex items-start gap-2.5 transition-opacity duration-200 ${
                      isCurrent
                        ? "text-white"
                        : isDone
                        ? "text-neutral-300"
                        : "text-neutral-600 opacity-60"
                    }`}
                  >
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-purple-500" />
                      ) : isCurrent ? (
                        <Loader2 className="h-3.5 w-3.5 text-purple-400 animate-spin" />
                      ) : (
                        <div className="h-3.5 w-3.5 rounded-full border border-neutral-700" />
                      )}
                    </div>

                    {/* Log Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-purple-400">
                          [{step.tag}]
                        </span>
                        <span className="font-semibold text-neutral-200">
                          {step.stage}
                        </span>
                        {isCurrent && (
                          <span className="inline-block h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[11px] text-neutral-400 leading-relaxed font-mono">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}

              {isFinished && (
                <div className="border-t border-neutral-800 pt-3 mt-3 flex items-center gap-2 text-purple-400 font-bold">
                  <CheckCircle2 className="h-4 w-4 text-purple-500" />
                  <span>[COMPLETE] Dossier analysis verified. Loading matched opportunities...</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="flex items-center justify-between border-t border-neutral-800 bg-neutral-900/60 px-4 py-2 font-mono text-[11px] text-neutral-500">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-ping" />
            <span>Processing status: active computation</span>
          </div>
          <span className="text-neutral-400 hidden sm:inline">
            Interviesne Engine
          </span>
        </div>
      </div>
    </div>
  );
}