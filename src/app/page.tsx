import Link from "next/link";
import HomeBanner from "../components/HomeBanner";
import BookCard from "../components/BookCard";
import { Button } from "../components/ui/button";
import { API_URL } from "../lib/config";
import type { Book } from "../lib/api";

/**
 * BookNook home page — Step 6 (Home). REPLACES the Create Next App
 * scaffold ("Welcome to the HomePage") entirely.
 *
 * Sections, in order:
 *   1. Full-width Swiper banner (HomeBanner, client component).
 *   2. New Arrivals — latest 6 books from the database, newest first.
 *      Backend GET /books already sorts newest first (v2); the sort below
 *      is only a safety net when addedAt exists, and keeps backend order
 *      otherwise. "See All Books" below the grid goes to /books.
 *   3. How Borrowing Works — static, 3 steps (his own-idea section 1).
 *   4. Top Categories — static, 5 tiles (his own-idea section 2).
 *      Tiles link to /books; no search/filter is claimed as a feature.
 */
export const metadata = { title: "Home" };

async function getLatestBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_URL}/books`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const books: Book[] = Array.isArray(data) ? data : [];
    books.sort(
      (a, b) =>
        new Date(
          (b as Book & { addedAt?: string }).addedAt || 0,
        ).getTime() -
        new Date(
          (a as Book & { addedAt?: string }).addedAt || 0,
        ).getTime(),
    );
    return books.slice(0, 8);
  } catch {
    return [];
  }
}

const borrowSteps = [
  {
    step: "1",
    title: "Browse & pick",
    text: "Look through All Books and open the details of a book you want to read — its cover, author, category, and who added it.",
  },
  {
    step: "2",
    title: "Borrow for a few days",
    text: "Press Borrow This Book and confirm. The book is yours to read for a few days, and its available copies go down by one.",
  },
  {
    step: "3",
    title: "Read & return",
    text: "Enjoy the book, then return it from My Borrows. Its copies go back up by one, ready for the next reader.",
  },
];

const categories = [
  { name: "Fiction", text: "Stories and novels to get lost in." },
  { name: "Science", text: "How the world works, explained." },
  { name: "History", text: "People, places, and times gone by." },
  { name: "Kids", text: "Picture books and first adventures." },
  { name: "Others", text: "Everything else worth sharing." },
];

export default async function HomePage() {
  const books = await getLatestBooks();

  return (
    <div>
      <HomeBanner />

      {/* New Arrivals — dynamic, latest 8 in 4-column grid */}
      <section className="bg-[#FDFBF7] py-12 dark:bg-[#052E22] md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                New Arrivals
              </h2>
              <p className="mt-2 text-[#6B7280] dark:text-[#A7F3D0]">
                The latest books readers have added to BookNook.
              </p>
            </div>
            <Link
              href="/books"
              className="group inline-flex items-center gap-1.5 rounded-full border border-[#E7E5E4] bg-white px-4 py-2 text-sm font-semibold text-[#047857] shadow-xs transition hover:border-[#047857] hover:bg-[#ECFDF5] dark:border-[#134E4A] dark:bg-[#064E3B] dark:text-[#6EE7B7] dark:hover:bg-[#052E22]"
            >
              See All Books
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {books.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-[#E7E5E4] bg-white p-8 text-center dark:border-[#134E4A] dark:bg-[#064E3B]">
              <p className="text-[#6B7280] dark:text-[#A7F3D0]">
                No books yet — be the first to add one.
              </p>
              <Button render={<Link href="/add-book" />} nativeButton={false} className="mt-4 bg-[#047857] text-white hover:bg-[#065F46]">Add Book</Button>
            </div>
          ) : (
            <>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Button render={<Link href="/books" />} nativeButton={false} size="lg" className="bg-[#047857] text-white hover:bg-[#065F46]">See All Books</Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How Borrowing Works — static section 1 */}
      <section className="bg-white py-12 dark:bg-[#064E3B] md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
            How Borrowing Works
          </h2>
          <p className="mt-2 text-[#6B7280] dark:text-[#A7F3D0]">
            Three simple steps. Add a book, borrow a book, return a book.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {borrowSteps.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-[#E7E5E4] bg-[#FDFBF7] p-6 dark:border-[#134E4A] dark:bg-[#052E22]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D97706] font-serif text-lg font-bold text-white">
                  {item.step}
                </span>
                <h3 className="mt-4 font-serif text-xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
                  {item.title}
                </h3>
                <p className="mt-2 leading-relaxed text-[#6B7280] dark:text-[#A7F3D0]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Top Categories — static section 2 */}
      <section className="bg-[#FDFBF7] py-12 dark:bg-[#052E22] md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif text-3xl font-bold text-[#1F2937] dark:text-[#ECFDF5]">
            Top Categories
          </h2>
          <p className="mt-2 text-[#6B7280] dark:text-[#A7F3D0]">
            Pick a shelf and start browsing.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href="/books"
                className="rounded-2xl border border-[#E7E5E4] bg-white p-6 transition hover:border-[#047857] dark:border-[#134E4A] dark:bg-[#064E3B] dark:hover:border-[#6EE7B7]"
              >
                <h3 className="font-serif text-xl font-bold text-[#047857] dark:text-[#6EE7B7]">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-[#A7F3D0]">
                  {cat.text}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
