"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../lib/api";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";

/**
 * BookNook borrow modal — Borrow section.
 * Spec: "Borrow This Book" opens a modal with read-only User Name and
 * Email and a "Confirm Borrow" button. On submit, the backend saves a
 * borrow record and decreases copies by 1 (or rejects: 0 copies, or
 * already borrowed — both errors come from the backend and are shown
 * with a toast, never alert()).
 */
export default function BorrowModal({
  open,
  bookId,
  bookTitle,
  onClose,
}: {
  open: boolean;
  bookId: string;
  bookTitle: string;
  onClose: () => void;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [loading, setLoading] = useState(false);
  if (!open) return null;

  async function handleConfirm() {
    setLoading(true);
    try {
      const result = await apiFetch<{ returnDate: string }>("/borrows", {
        method: "POST",
        body: { bookId },
        auth: true,
      });
      const returnText = result.returnDate
        ? ` Return by ${new Date(result.returnDate).toLocaleDateString()}.`
        : "";
      toast.success(`Book borrowed! Return it within 7 days.${returnText}`);
      onClose();
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Borrow failed.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-lg border border-[#E7E5E4] bg-[#F9FAFB] px-3 py-2 text-sm text-[#1F2937] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-[#064E3B]">
        <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
          Borrow this book
        </h3>
        <p className="mt-1 text-sm text-[#6B7280] dark:text-[#A7F3D0]">{bookTitle}</p>

        <label className="mt-4 block text-sm font-medium">
          User Name
          <input readOnly value={session?.user?.name || ""} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-3 block text-sm font-medium">
          Email
          <input readOnly value={session?.user?.email || ""} className={`${inputClass} mt-1`} />
        </label>

        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1" disabled={loading}>
            {loading ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </div>
      </div>
    </div>
  );
}
