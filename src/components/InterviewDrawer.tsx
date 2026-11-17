"use client";

import React, { useState } from "react";
import { MatchedJobRole, InterviewQuestion } from "@/types";
import { X, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";

interface InterviewDrawerProps {
  role: MatchedJobRole | null;
  onClose: () => void;
}

export function InterviewDrawer({ role, onClose }: InterviewDrawerProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  if (!role) return null;

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const copyQuestionText = (q: InterviewQuestion) => {
    const text = `Q: ${q.question}\nKey Focus Areas: ${q.focusPoints.join(", ")}\nExpected Concepts: ${q.expectedConcepts.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopiedId(q.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAllQuestions = () => {
    const text = role.tailoredQuestions
      .map(
        (q, idx) =>
          `[${idx + 1}] ${q.category.toUpperCase()}\n${q.question}\n- Focus: ${q.focusPoints.join(", ")}\n- Key Concepts: ${q.expectedConcepts.join(", ")}\n`
      )
      .join("\n---\n\n");

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const categories = ["All", ...Array.from(new Set(role.tailoredQuestions.map((q) => q.category)))];

  const filteredQuestions =
    activeCategory === "All"
      ? role.tailoredQuestions
      : role.tailoredQuestions.filter((q) => q.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="relative flex h-full w-full max-w-2xl flex-col bg-white border-l-2 border-purple-600 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-neutral-200 p-5 bg-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 border border-neutral-300 px-1.5 py-0.5">
                {role.department}
              </span>
              <span className="font-mono text-xs font-bold bg-purple-600 text-white px-2 py-0.5 shadow-xs">
                {role.matchPercentage}% MATCH
              </span>
            </div>
            <h2 className="mt-2 font-sans text-xl font-bold text-black tracking-tight">
              {role.title}
            </h2>
            <p className="mt-1 font-mono text-xs text-neutral-600">
              Tailored Interview Questions & Evaluation Rubrics
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded border border-neutral-200 p-1.5 text-neutral-600 hover:border-purple-600 hover:text-purple-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Action / Category Bar */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-2.5 bg-neutral-50">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`font-mono text-xs px-2 py-1 transition-colors ${
                  activeCategory === cat
                    ? "bg-purple-600 text-white font-semibold shadow-xs"
                    : "bg-white border border-neutral-200 text-neutral-700 hover:border-purple-600 hover:text-purple-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={copyAllQuestions}
            className="shrink-0 flex items-center gap-1 border border-neutral-300 bg-white px-2.5 py-1 font-mono text-[11px] text-black hover:border-purple-600 hover:text-purple-700 transition-all"
          >
            {copiedAll ? <Check className="h-3 w-3 text-purple-600" /> : <Copy className="h-3 w-3" />}
            <span>{copiedAll ? "Copied All" : "Copy All"}</span>
          </button>
        </div>

        {/* Question List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isExpanded = !!expandedQuestions[q.id];
            const isCopied = copiedId === q.id;

            return (
              <div
                key={q.id}
                className="border border-neutral-200 bg-white p-4 transition-all hover:border-purple-400"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-purple-600 border border-purple-600 bg-purple-50 px-1.5 py-0.5">
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">
                      {q.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyQuestionText(q)}
                      className="border border-neutral-200 p-1 text-neutral-500 hover:border-purple-600 hover:text-purple-700 transition-colors"
                      title="Copy question text"
                    >
                      {isCopied ? (
                        <Check className="h-3 w-3 text-purple-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                    <button
                      onClick={() => toggleQuestion(q.id)}
                      className="border border-neutral-200 p-1 text-neutral-500 hover:border-purple-600 hover:text-purple-700 transition-colors"
                      title={isExpanded ? "Collapse evaluation points" : "Expand evaluation points"}
                    >
                      {isExpanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <p className="mt-3 font-sans text-sm font-semibold text-black leading-snug">
                  {q.question}
                </p>

                {/* Answer Rubric & Talking Points */}
                {isExpanded && (
                  <div className="mt-4 border-t border-neutral-100 pt-3 space-y-3 font-mono text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-purple-600 font-semibold block mb-1">
                        What Interviewers Assess:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-neutral-700">
                        {q.focusPoints.map((pt, pIdx) => (
                          <li key={pIdx}>{pt}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-purple-600 font-semibold block mb-1">
                        High-Signal Concepts & Keywords:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {q.expectedConcepts.map((c, cIdx) => (
                          <span
                            key={cIdx}
                            className="bg-purple-50 text-purple-900 border border-purple-200 px-1.5 py-0.5 text-[10px]"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!isExpanded && (
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="mt-2 text-[10px] font-mono text-purple-600 hover:text-purple-700 underline underline-offset-2"
                  >
                    Reveal interview evaluation points & key concepts
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-200 p-4 bg-neutral-50 flex items-center justify-between text-xs font-mono">
          <span className="text-neutral-500">
            Total {filteredQuestions.length} questions loaded
          </span>
          <button
            onClick={onClose}
            className="border border-purple-600 bg-purple-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-purple-700 transition-colors shadow-xs"
          >
            Close Drawer
          </button>
        </div>
      </div>
    </div>
  );
}
