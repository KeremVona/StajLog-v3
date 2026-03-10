import { useEffect, useState } from "react";
import type { LogData, LogParamsUpdate } from "../../interfaces/LogInterfaces";

interface EditLogModalProps {
  log: LogData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (update: LogParamsUpdate) => void;
}

export function EditLogModal({
  log,
  isOpen,
  onClose,
  onSave,
}: EditLogModalProps) {
  // Local state to track edits before saving
  const [editedLog, setEditedLog] = useState<LogData>(log);

  // Reset local state if the modal opens with a new log
  useEffect(() => {
    if (isOpen) {
      setEditedLog(log);
    }
  }, [log, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: editedLog.id,
      data: editedLog,
    });
    onClose();
  };

  const hasAiContent =
    editedLog.isAiImproved && editedLog.finalContent !== undefined;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-[0_8px_30px_rgb(255,192,203,0.6)] border-2 border-pink-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-pink-50 shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold rounded-xl shadow-sm text-sm">
              Day {editedLog.dayNumber}
            </span>
            <h2 className="text-xl font-bold text-gray-800">Edit Log</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-pink-500 transition-colors p-1"
            aria-label="Close modal"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto flex flex-col gap-6">
            {/* Original Content Field */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-orange-400 uppercase tracking-wider">
                Original Draft
              </label>
              <textarea
                value={editedLog.originalContent}
                onChange={(e) =>
                  setEditedLog({
                    ...editedLog,
                    originalContent: e.target.value,
                  })
                }
                className="w-full h-40 p-4 bg-rose-50 border-2 border-pink-100 rounded-2xl text-gray-700 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all resize-none"
                placeholder="Write your log here..."
                required
              />
            </div>

            {/* Final Content Field (Only shows if AI improved) */}
            {hasAiContent && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-pink-400 uppercase tracking-wider flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  AI Enhanced Version
                </label>
                <textarea
                  value={editedLog.finalContent}
                  onChange={(e) =>
                    setEditedLog({ ...editedLog, finalContent: e.target.value })
                  }
                  className="w-full h-40 p-4 bg-orange-50 border-2 border-orange-100 rounded-2xl text-gray-700 focus:outline-none focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
                  placeholder="AI generated content..."
                />
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-pink-50 flex justify-end gap-3 shrink-0 bg-gray-50/50 rounded-b-[2rem]">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold rounded-xl shadow-md shadow-pink-200 hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
