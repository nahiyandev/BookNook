"use client";

import { Button } from "@/components/ui/button";

/**
 * BookNook confirm modal — Books section (delete confirmation).
 * Custom modal on purpose: the spec forbids the default browser confirm().
 * Renders nothing when closed; when open, it blocks the page with an
 * overlay and asks Cancel / Confirm. No browser dialog is used anywhere.
 */
export default function ConfirmModal({
  open,
  title,
  message,
  confirmLabel,
  onCancel,
  onConfirm,
  loading,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
      <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-6 shadow-2xl dark:border-red-900/40 dark:bg-[#073B2E]">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-2xl text-red-600 shadow-xs dark:border-red-900/40 dark:bg-red-950/50 dark:text-red-400">
            🗑️
          </span>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F2937] sm:text-2xl dark:text-[#F0FDF4]">
              {title}
            </h3>
            <p className="text-xs font-semibold text-red-600 dark:text-red-400">
              Permanent Library Action
            </p>
          </div>
        </div>

        <p className="mt-3.5 rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-3.5 text-xs sm:text-sm leading-relaxed text-[#4B5563] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#A7F3D0]">
          {message}
        </p>

        <div className="mt-6 flex gap-3 border-t border-[#E7E5E4] pt-4 dark:border-[#134E4A]">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 rounded-xl border-2 border-[#E7E5E4] py-2.5 font-bold text-[#4B5563] transition hover:bg-[#F3F4F6] dark:border-[#134E4A] dark:text-[#ECFDF5] dark:hover:bg-[#052E22]"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-linear-to-r from-red-600 to-rose-700 py-2.5 font-bold text-white shadow-lg shadow-red-900/20 transition hover:brightness-110 active:scale-[0.99]"
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
