"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch, type Borrow } from "@/lib/api";
import { Button } from "@/components/ui/button";

/**
 * BookNook My Borrows — Borrow section, PRIVATE route (middleware guards it).
 * Table: Image, Title, Borrow Date, Return Date, Return Book button.
 * Return → DELETE /borrows/:id with JWT → backend increases copies by 1
 * and deletes the borrow record → list refreshes, toast shown.
 */
function formatDate(value: string) {
  return new Date(value).toLocaleDateString();
}

export default function MyBorrowsPage() {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [loading, setLoading] = useState(true);
  const [returningId, setReturningId] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setBorrows(await apiFetch<Borrow[]>("/borrows", { auth: true }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load your borrows.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    apiFetch<Borrow[]>("/borrows", { auth: true })
      .then((loadedBorrows) => {
        if (active) setBorrows(loadedBorrows);
      })
      .catch((error: unknown) => {
        if (active) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load your borrows."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [load]);

  async function handleReturn(id: string) {
    setReturningId(id);
    try {
      await apiFetch(`/borrows/${id}`, { method: "DELETE", auth: true });
      toast.success("Book returned successfully!");
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to return book.");
    } finally {
      setReturningId(null);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-[#047857]">My Borrows</h1>
      <p className="mt-2 text-sm text-[#6B7280]">Books you borrowed — return them on time.</p>

      {loading ? (
        <p className="mt-8 text-sm text-[#6B7280]">Loading...</p>
      ) : borrows.length === 0 ? (
        <p className="mt-8 text-sm text-[#6B7280]">
          You have not borrowed any books yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E7E5E4] bg-white dark:border-[#134E4A] dark:bg-[#064E3B]">
          <table className="w-full min-w-160 text-left text-sm">
            <thead>
              <tr className="border-b border-[#E7E5E4] dark:border-[#134E4A]">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Borrow Date</th>
                <th className="px-4 py-3">Return Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {borrows.map((borrow) => (
                <tr key={borrow._id} className="border-b border-[#F3F4F6] last:border-0 dark:border-[#134E4A]">
                  <td className="px-4 py-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={borrow.bookImage} alt={borrow.bookTitle} className="h-12 w-10 rounded object-cover" />
                  </td>
                  <td className="px-4 py-3 font-semibold text-[#1F2937] dark:text-[#ECFDF5]">{borrow.bookTitle}</td>
                  <td className="px-4 py-3">{formatDate(borrow.borrowDate)}</td>
                  <td className="px-4 py-3">{formatDate(borrow.returnDate)}</td>
                  <td className="px-4 py-3">
                    <Button
                      size="sm"
                      onClick={() => handleReturn(borrow._id)}
                      disabled={returningId === borrow._id}
                    >
                      {returningId === borrow._id ? "Returning..." : "Return Book"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
