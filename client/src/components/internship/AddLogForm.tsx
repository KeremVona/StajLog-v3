import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { makeLog, reset } from "../../features/log/logSlice";

export interface LogData {
  id: string;
  dayNumber: number;
  date: Date | string;
  originalContent: string;
  internshipId: string;
  finalContent?: string;
  isAiImproved?: boolean;
}
// TODO:
// Add "use today's date"

// We omit 'id' and 'finalContent' for the making form,
// as those are typically handled by the backend or AI service.
type NewLogData = Omit<LogData, "id" | "finalContent">;

interface AddLogFormProps {
  internshipId: string;
  isSubmitting?: boolean;
}

export default function AddLogForm({
  internshipId,
  isSubmitting = false,
}: AddLogFormProps) {
  const [dayNumber, setDayNumber] = useState<number | "">("");
  const [date, setDate] = useState<string>("");
  const [originalContent, setOriginalContent] = useState("");
  const [isAiImproved, setIsAiImproved] = useState(false);

  const dispatch = useAppDispatch();

  const { currentLog, isError, isSuccess, isLoading, message } = useAppSelector(
    (state) => state.logs,
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    dispatch(reset());
  }, [currentLog, isError, isSuccess, message, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!dayNumber || !date || !originalContent.trim()) return;

    console.log("Sending to backend");
    dispatch(
      makeLog({
        id: internshipId,
        dayNumber: dayNumber,
        date: date,
        originalContent: originalContent,
        internshipId: internshipId,
      }),
    );

    // Optional: Reset form after submit
    setDayNumber("");
    setDate("");
    setOriginalContent("");
    setIsAiImproved(false);
  };

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className="p-8 bg-rose-50 font-sans text-gray-700">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(255,192,203,0.4)] border-2 border-pink-100 w-200 max-w-8xl"
      >
        <div className="flex flex-col flex-1 w-full">
          <label
            htmlFor="originalContent"
            className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 ml-1"
          >
            Daily Log
          </label>
          <textarea
            id="originalContent"
            placeholder="What did you build today?"
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            className="w-full h-50 px-5 py-3 bg-rose-50 border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all text-gray-700 placeholder-pink-300 font-medium"
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-col w-24 shrink-0">
            <label
              htmlFor="dayNumber"
              className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 ml-1"
            >
              Day
            </label>
            <input
              type="number"
              id="dayNumber"
              placeholder="1"
              value={dayNumber}
              onChange={(e) =>
                setDayNumber(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-gray-700 placeholder-orange-300 font-medium"
            />
          </div>
          <div className="flex flex-col w-44 shrink-0">
            <label
              htmlFor="date"
              className="text-xs font-bold text-pink-400 uppercase tracking-wider mb-2 ml-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-orange-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all text-orange-500 font-medium"
            />
          </div>
          <div className="flex flex-col pb-3 shrink-0 ml-2">
            <label className="flex items-center cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  id="isAiImproved"
                  checked={isAiImproved}
                  onChange={(e) => setIsAiImproved(e.target.checked)}
                  className="peer sr-only"
                />
                <div className="w-7 h-7 bg-white border-2 border-pink-300 rounded-xl peer-checked:bg-pink-400 peer-checked:border-pink-400 transition-all flex items-center justify-center group-hover:shadow-md">
                  <svg
                    className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
              </div>
              <span className="ml-3 text-sm font-bold text-orange-400 group-hover:text-orange-500 transition-colors">
                AI Enhance
              </span>
            </label>
          </div>
          <div className="shrink-0 ml-2">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold rounded-2xl shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-300 hover:from-orange-500 hover:to-pink-500 transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-4 focus:ring-pink-200"
            >
              Add Log
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
