"use client";

import { useState } from "react";
import {
  Dialog,
  DialogPopup,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SignOutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
}

export default function SignOutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: SignOutConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirm();
    } finally {
      setLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup className="max-w-sm">
        <div className="flex items-center gap-3.5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 shadow-xs dark:border-red-900/40 dark:bg-red-950/50 dark:text-red-400">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </span>
          <div>
            <DialogTitle>Sign Out?</DialogTitle>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#A7F3D0]">
              BookNook Community
            </p>
          </div>
        </div>

        <div className="mt-3.5">
          <DialogDescription>
            Are you sure you want to sign out of BookNook? You can sign back in anytime to continue borrowing and sharing books.
          </DialogDescription>
        </div>

        <div className="mt-6 flex gap-3 border-t border-[#E7E5E4] pt-4 dark:border-[#134E4A]">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
            className="flex-1 cursor-pointer rounded-xl border border-[#E7E5E4] py-2.5 text-xs font-bold text-[#4B5563] transition hover:bg-stone-100 dark:border-[#134E4A] dark:text-[#ECFDF5] dark:hover:bg-[#052E22]"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 cursor-pointer rounded-xl bg-linear-to-r from-red-600 to-rose-700 py-2.5 text-xs font-bold text-white shadow-md shadow-red-900/20 transition hover:brightness-110 active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      </DialogPopup>
    </Dialog>
  );
}

