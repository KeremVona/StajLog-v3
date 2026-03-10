import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset, updateLog } from "../../features/log/logSlice";
import type { LogData, LogParamsUpdate } from "../../interfaces/LogInterfaces";
import { EditLogModal } from "./EditLogModal";
import { LogCard } from "./LogCard";

interface LogCarouselProps {
  logs: LogData[];
}

export default function LogCarousel({ logs }: LogCarouselProps) {
  const sortedLogs = [...logs].sort((a, b) => a.dayNumber - b.dayNumber);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingLog, setEditingLog] = useState<LogData | null>(null);

  const dispatch = useAppDispatch();

  const { isLoading, isError, isSuccess, message } = useAppSelector(
    (state) => state.logs,
  );

  const handleEditClick = (logToEdit: LogData) => {
    setEditingLog(logToEdit);
  };

  const handleSave = async (update: LogParamsUpdate) => {
    if (!update.id) {
      console.error("Cannot update a log without an ID!");
      return;
    }

    dispatch(
      updateLog({
        id: update.id,
        logData: update.data,
      }),
    );
  };

  // Handle Redux side-effects (errors, success messages)
  useEffect(() => {
    if (isError) {
      alert(message || "An error occurred while saving.");
    }

    // Reset the success/error state so it doesn't trigger again on re-renders
    if (isError || isSuccess) {
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  if (!sortedLogs || sortedLogs.length === 0) {
    return (
      <div className="text-center p-8 text-pink-400 font-bold">
        No logs found for this internship yet!
      </div>
    );
  }

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === sortedLogs.length - 1 ? prev : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sortedLogs.length - 1;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative">
      <div className="w-full overflow-hidden p-4">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {sortedLogs.map((log) => (
            <div key={log.id} className="w-full shrink-0 px-2">
              <LogCard log={log} onEdit={handleEditClick} />
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
              : "bg-orange-50 text-orange-500 hover:bg-orange-100 border-2 border-orange-200 hover:-translate-y-1 shadow-sm cursor-pointer"
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
          {currentIndex + 1} / {sortedLogs.length}
        </span>

        <button
          onClick={nextSlide}
          disabled={isLast}
          className={`p-3 rounded-full transition-all ${
            isLast
              ? "bg-gray-100 text-gray-300 cursor-not-allowed"
              : "bg-orange-50 text-orange-500 hover:bg-orange-100 border-2 border-orange-200 hover:-translate-y-1 shadow-sm cursor-pointer"
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

      {editingLog && (
        <EditLogModal
          log={editingLog}
          isOpen={!!editingLog}
          onClose={() => setEditingLog(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
