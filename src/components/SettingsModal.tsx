"use client";

import React, { useState } from "react";
import { X, Key, ShieldCheck, Cpu } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string, provider: "openai" | "heuristic") => void;
}

export function SettingsModal({ isOpen, onClose, onSave }: SettingsModalProps) {
  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("interviesne_api_key") || "";
    }
    return "";
  });

  const [provider, setProvider] = useState<"openai" | "heuristic">(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("interviesne_provider");
      if (stored === "openai" || stored === "heuristic") return stored;
    }
    return "heuristic";
  });

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem("interviesne_api_key", apiKey.trim());
    localStorage.setItem("interviesne_provider", provider);
    onSave(apiKey.trim(), provider);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-md border border-black bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-purple-600" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-black">
              AI Engine Settings
            </h3>
          </div>
          <button
            onClick={onClose}
            className="border border-neutral-200 p-1 text-neutral-500 hover:border-purple-600 hover:text-purple-700 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block font-mono text-xs text-neutral-600 mb-1.5 uppercase">
              Extraction Mode
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setProvider("heuristic")}
                className={`border p-2.5 text-left transition-all ${
                  provider === "heuristic"
                    ? "border-purple-600 bg-purple-600 text-white font-semibold shadow-xs"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-purple-400"
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Local Engine</span>
                </div>
                <div className="mt-1 text-[10px] font-mono opacity-80">
                  Instant • Zero Cost
                </div>
              </button>

              <button
                type="button"
                onClick={() => setProvider("openai")}
                className={`border p-2.5 text-left transition-all ${
                  provider === "openai"
                    ? "border-purple-600 bg-purple-600 text-white font-semibold shadow-xs"
                    : "border-neutral-200 bg-white text-neutral-700 hover:border-purple-400"
                }`}
              >
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>OpenAI API</span>
                </div>
                <div className="mt-1 text-[10px] font-mono opacity-80">
                  GPT-4o Scan
                </div>
              </button>
            </div>
          </div>

          {provider === "openai" && (
            <div>
              <label className="block font-mono text-xs text-neutral-600 mb-1.5 uppercase">
                OpenAI API Key
              </label>
              <input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full border border-neutral-300 p-2 font-mono text-xs text-black focus:border-purple-600 focus:outline-none"
              />
              <p className="mt-1 font-mono text-[10px] text-neutral-500">
                Key is stored only in your local browser storage.
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2 border-t border-neutral-200 pt-4">
          <button
            onClick={onClose}
            className="border border-neutral-300 px-3 py-1.5 font-mono text-xs text-neutral-700 hover:border-purple-600 hover:text-purple-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="border border-purple-600 bg-purple-600 px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-purple-700 shadow-xs"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
