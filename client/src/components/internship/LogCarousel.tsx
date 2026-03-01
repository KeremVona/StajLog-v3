import { useState } from "react";
import type { LogData } from "./AddLogForm";
import { LogCard } from "./LogCard";

interface LogCarouselProps {
  logs: LogData[];
}

export default function LogCarousel({ logs }: LogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!logs || logs.length === 0) {
    return (
      <div className="text-center p-8 text-pink-400 font-bold">
        No logs found for this internship yet!
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === logs.length - 1 ? prev : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === logs.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <div className="w-full overflow-hidden p-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {logs.map((log) => (
            <div key={log.id} className="w-full shrink-0 px-2">
              <LogCard log={log} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 mt-2">
        <button
          onClick={prevSlide}
          disabled={isFirst}
          className={`p-3 rounded-full transition-all ${
            isFirst
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-orange-50 text-orange-500 hover:bg-orange-100 border-2 border-orange-200 hover:-translate-y-1 shadow-sm"
          }`}
          aria-label="Previous day"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <span className="text-sm font-bold text-pink-400 uppercase tracking-wider">
          {currentIndex + 1} / {logs.length}
        </span>

        <button
          onClick={nextSlide}
          disabled={isLast}
          className={`p-3 rounded-full transition-all ${
            isLast
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-orange-50 text-orange-500 hover:bg-orange-100 border-2 border-orange-200 hover:-translate-y-1 shadow-sm"
          }`}
          aria-label="Next day"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
