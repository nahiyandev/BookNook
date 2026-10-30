"use client";

import { Button } from "./ui/button";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-[#064E3B]">
        <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
          {title}
        </h3>
        <p className="mt-2 text-sm text-[#6B7280] dark:text-[#A7F3D0]">{message}</p>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onCancel} className="flex-1" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700" disabled={loading}>
            {loading ? "Deleting..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
