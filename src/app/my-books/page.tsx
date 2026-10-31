"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch, type Book } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import EditBookModal from "@/components/EditBookModal";
import ConfirmModal from "@/components/ConfirmModal";

async function fetchMyBooks(email: string): Promise<Book[]> {
  const all = await apiFetch<Book[]>("/books");
  return all.filter((book: Book) => book.addedBy?.email === email);
}

/**
 * BookNook My Books — Books section, PRIVATE route (middleware guards it).
 * The backend has no "my books" endpoint in the spec's 8 routes, so this
 * page fetches all books (public GET) and filters to the logged-in user's
 * own books (addedBy.email === session email) on the client.
 */
export default function MyBooksPage() {
  const { data: session } = authClient.useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Book | null>(null);
  const [deleting, setDeleting] = useState<Book | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const userEmail = session?.user?.email;

  const load = useCallback(async () => {
    if (!userEmail) return;
    try {
      setBooks(await fetchMyBooks(userEmail));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load your books.");
    }
  }, [userEmail]);

  useEffect(() => {
    if (!userEmail) return;
    let active = true;
    fetchMyBooks(userEmail)
      .then((loadedBooks) => {
        if (active) setBooks(loadedBooks);
      })
      .catch((error: unknown) => {
        if (active) {
          toast.error(
            error instanceof Error ? error.message : "Failed to load your books."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [userEmail]);

  async function handleDelete() {
    if (!deleting) return;
    setDeleteLoading(true);
    try {
      await apiFetch(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      toast.success("Book deleted successfully!");
      setDeleting(null);
      load();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete book.");
    } finally {
      setDeleteLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Top Breadcrumbs & Page Header with quick Add Book button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
            <Link href="/" className="hover:text-[#047857] hover:underline dark:hover:text-[#6EE7B7]">
              Home
            </Link>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">My Books</span>
          </div>
          <div className="mt-2 flex items-center gap-3">
            <h1 className="font-serif text-3xl font-bold tracking-tight text-[#047857] sm:text-4xl dark:text-[#6EE7B7]">
              My Books
            </h1>
            {!loading && books.length > 0 && (
              <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
                {books.length} {books.length === 1 ? "Book" : "Books"}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-[#6B7280] sm:text-sm dark:text-[#A7F3D0]">
            Books you have shared with the community library — edit details or manage copies.
          </p>
        </div>

        <Link
          href="/add-book"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition-all hover:brightness-110 active:scale-[0.99]"
        >
          <span>Add New Book</span>
          <span className="text-base">➕</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex min-h-60 flex-col items-center justify-center gap-3 rounded-3xl border border-[#E7E5E4] bg-white p-8 dark:border-[#134E4A] dark:bg-[#073B2E]">
          <div className="h-9 w-9 animate-spin rounded-full border-3 border-[#A7F3D0] border-t-[#047857] dark:border-[#134E4A] dark:border-t-[#6EE7B7]" />
          <p className="text-xs font-medium text-[#6B7280] dark:text-[#A7F3D0]">
            Loading your shelf...
          </p>
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E7E5E4] bg-white p-12 text-center shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ECFDF5] text-3xl text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            📚
          </span>
          <h3 className="mt-4 font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
            Your Shelf is Empty
          </h3>
          <p className="mt-2 max-w-sm text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            You have not contributed any books to BookNook yet. Share a favorite read with the community today!
          </p>
          <Link
            href="/add-book"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#047857] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#065F46]"
          >
            <span>Add Your First Book</span>
            <span>→</span>
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-xl shadow-stone-200/50 dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-left text-sm">
              <thead>
                <tr className="border-b border-[#E7E5E4] bg-[#FDFBF7] text-[11px] font-bold uppercase tracking-wider text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                  <th className="px-6 py-4">Book Title & Author</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Copies Available</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6] dark:divide-[#134E4A]/60">
                {books.map((book) => (
                  <tr
                    key={book._id}
                    className="transition hover:bg-[#FDFBF7]/70 dark:hover:bg-[#052E22]/50"
                  >
                    {/* Book Cover + Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <Link href={`/books/${book._id}`} className="group relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={book.image}
                            alt={book.title}
                            className="aspect-2/3 h-14 w-auto rounded-lg object-cover shadow-xs ring-1 ring-[#E7E5E4] transition group-hover:scale-105 dark:ring-[#134E4A]"
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            href={`/books/${book._id}`}
                            className="block truncate font-serif text-base font-bold text-[#1F2937] transition hover:text-[#047857] hover:underline dark:text-[#F0FDF4] dark:hover:text-[#6EE7B7]"
                          >
                            {book.title}
                          </Link>
                          <span className="block truncate text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                            by {book.author}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category pill */}
                    <td className="px-6 py-4">
                      <span className="inline-block rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#047857] ring-1 ring-[#047857]/20 dark:bg-[#052E22] dark:text-[#6EE7B7] dark:ring-[#6EE7B7]/30">
                        {book.category}
                      </span>
                    </td>

                    {/* Copies Available */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-[#047857] dark:text-[#34D399]">
                          {book.availableCopies}
                        </span>
                        <span className="text-xs text-[#9CA3AF]">
                          / {book.totalCopies} copies
                        </span>
                        <span
                          className={`inline-block h-2 w-2 rounded-full ${
                            book.availableCopies > 0 ? "bg-[#10B981]" : "bg-red-500"
                          }`}
                          title={book.availableCopies > 0 ? "In Stock" : "Out of Stock"}
                        />
                      </div>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditing(book)}
                          className="rounded-lg border border-[#A7F3D0] bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] shadow-xs transition hover:bg-[#047857] hover:text-white dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#6EE7B7] dark:hover:bg-[#047857] dark:hover:text-white"
                        >
                          ✏️ Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setDeleting(book)}
                          className="rounded-lg border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold text-red-600 shadow-xs transition hover:bg-red-600 hover:text-white dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-600 dark:hover:text-white"
                        >
                          🗑️ Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Book Modal */}
      <EditBookModal
        open={!!editing}
        book={editing}
        onClose={() => setEditing(null)}
        onSaved={load}
      />

      {/* Custom Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleting}
        title="Delete this book?"
        message={`"${deleting?.title}" will be permanently removed from the library catalog. This action cannot be undone.`}
        confirmLabel="Yes, Delete Book"
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
