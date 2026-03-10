import { useState } from "react";
import type { LogData } from "../../interfaces/LogInterfaces";

interface LogCardProps {
  log: LogData;
  onEdit: (log: LogData) => void;
}

export function LogCard({ log, onEdit }: LogCardProps) {
  const [showOriginal, setShowOriginal] = useState(false);

  const hasAiContent = log.isAiImproved && log.finalContent;

  const displayContent =
    hasAiContent && !showOriginal ? log.finalContent : log.originalContent;

  const formattedDate = new Date(log.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(255,192,203,0.4)] border-2 border-pink-100 w-full h-full flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgb(255,192,203,0.6)]">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <span className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold rounded-xl shadow-md shadow-pink-200 text-sm">
            Day {log.dayNumber}
          </span>
          <span className="text-sm font-bold text-pink-400 uppercase tracking-wider">
            {formattedDate}
          </span>
          {/* Add the onClick handler to trigger the edit callback */}
          <button
            onClick={() => onEdit(log)}
            className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold rounded-xl shadow-md shadow-pink-200 text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            Edit log
          </button>
        </div>

        {log.isAiImproved && (
          <span className="flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-500 border-2 border-orange-200 rounded-xl text-xs font-bold shrink-0">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
            AI Enhanced
          </span>
        )}
      </div>

      <div className="bg-rose-50 p-5 rounded-2xl border-2 border-pink-100 flex-grow">
        <p className="text-gray-700 font-medium min-w-0 break-words leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
      </div>

      {hasAiContent && (
        <div className="mt-4 flex justify-end shrink-0">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className="text-xs font-bold text-orange-400 hover:text-pink-500 transition-colors flex items-center gap-1.5"
          >
            {showOriginal ? "View AI Format" : "View Original Draft"}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
