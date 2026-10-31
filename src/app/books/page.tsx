import { API_URL } from "../../lib/config";
import BookCard from "../../components/BookCard";
import type { Book as BookType } from "../../lib/api";

export const metadata = { title: "All Books" };

export default async function AllBooksPage() {
  let books: BookType[] = [];
  let loadError = "";
  try {
    const res = await fetch(`${API_URL}/books`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load books");
    books = await res.json();
  } catch {
    loadError = "Could not load books. Please check that the backend is running and try again.";
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-[#047857]">All Books</h1>
      <p className="mt-2 text-sm text-[#6B7280]">
        Browse every book shared by readers in the library.
      </p>

      {loadError ? (
        <p className="mt-8 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950">
          {loadError}
        </p>
      ) : books.length === 0 ? (
        <p className="mt-8 text-sm text-[#6B7280]">
          No books yet. Be the first to add one!
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
