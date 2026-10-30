"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { apiFetch, type Book } from "../../lib/api";
import { authClient } from "../../lib/auth-client";
import { Button } from "../../components/ui/button";
import EditBookModal from "../../components/EditBookModal";
import ConfirmModal from "../../components/ConfirmModal";

async function fetchMyBooks(email: string): Promise<Book[]> {
  const all = await apiFetch<Book[]>("/books");
  return all.filter((book) => book.addedBy?.email === email);
}

/**
 * BookNook My Books — Books section, PRIVATE route (middleware guards it).
 * The backend has no "my books" endpoint in the spec's 8 routes, so this
 * page fetches all books (public GET) and filters to the logged-in user's
 * own books (addedBy.email === session email) on the client.
 * Table layout matches the demo: Book (thumbnail + title + author),
 * Category, Copies, Actions (Edit, Delete). Delete uses a custom confirm
 * modal — never the browser confirm().
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-[#047857]">My Books</h1>
      <p className="mt-2 text-sm text-[#6B7280]">Books you added to the library.</p>

      {loading ? (
        <p className="mt-8 text-sm text-[#6B7280]">Loading...</p>
      ) : books.length === 0 ? (
        <p className="mt-8 text-sm text-[#6B7280]">
          You have not added any books yet.
        </p>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-[#E7E5E4] bg-white dark:border-[#134E4A] dark:bg-[#064E3B]">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#E7E5E4] dark:border-[#134E4A]">
                <th className="px-4 py-3">Book</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Copies</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className="border-b border-[#F3F4F6] last:border-0 dark:border-[#134E4A]">
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={book.image} alt={book.title} className="h-12 w-10 rounded object-cover" />
                      <span>
                        <span className="block font-semibold text-[#1F2937] dark:text-[#ECFDF5]">{book.title}</span>
                        <span className="block text-xs text-[#6B7280]">{book.author}</span>
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3">{book.category}</td>
                  <td className="px-4 py-3">{book.availableCopies} / {book.totalCopies}</td>
                  <td className="px-4 py-3">
                    <span className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditing(book)}>Edit</Button>
                      <Button size="sm" className="bg-red-600 hover:bg-red-700" onClick={() => setDeleting(book)}>Delete</Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <EditBookModal
        open={!!editing}
        book={editing}
        onClose={() => setEditing(null)}
        onSaved={load}
      />
      <ConfirmModal
        open={!!deleting}
        title="Delete this book?"
        message={`"${deleting?.title}" will be removed from the library. This cannot be undone.`}
        confirmLabel="Delete"
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
