"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { apiFetch } from "../lib/api";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";


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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs px-4">
      <div className="w-full max-w-md rounded-3xl border border-[#E7E5E4] bg-white p-6 shadow-2xl dark:border-[#134E4A] dark:bg-[#073B2E]">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ECFDF5] text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </span>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
              Borrow this book
            </h3>
            <p className="text-xs text-[#047857] dark:text-[#6EE7B7] font-semibold">
              7-Day Reader Loan
            </p>
          </div>
        </div>
        <p className="mt-3 truncate rounded-xl border border-[#E7E5E4] bg-[#FDFBF7] p-2.5 text-xs font-semibold text-[#1F2937] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5]">
          {bookTitle}
        </p>

        <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A7F3D0]">
          Borrower Name
          <input readOnly value={session?.user?.name || ""} className={`${inputClass} mt-1`} />
        </label>
        <label className="mt-3 block text-xs font-bold uppercase tracking-wider text-[#6B7280] dark:text-[#A7F3D0]">
          Borrower Email
          <input readOnly value={session?.user?.email || ""} className={`${inputClass} mt-1`} />
        </label>

        <div className="mt-6 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-xl border-2 border-[#E7E5E4] py-2.5 text-sm font-semibold text-[#374151] hover:bg-[#F3F4F6] dark:border-[#134E4A] dark:text-[#ECFDF5] dark:hover:bg-[#052E22]"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="flex-1 rounded-xl bg-linear-to-r from-[#047857] to-[#059669] py-2.5 text-sm font-bold text-white shadow-md transition-all hover:brightness-110"
            disabled={loading}
          >
            {loading ? "Borrowing..." : "Confirm Borrow"}
          </Button>
        </div>
      </div>
    </div>
  );
}
