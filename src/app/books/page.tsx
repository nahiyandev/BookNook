import Link from "next/link";
import { API_URL } from "@/lib/config";
import type { Book as BookType } from "@/lib/api";
import HomeBookExplorer from "@/components/HomeBookExplorer";

export const metadata = { title: "All Books | BookNook" };
export const dynamic = "force-dynamic";

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
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
        <Link href="/" className="hover:text-[#047857] hover:underline dark:hover:text-[#6EE7B7]">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-[#047857] dark:text-[#6EE7B7]">All Books</span>
      </div>

      {loadError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400">
          <p className="font-bold">Error loading books:</p>
          <p className="mt-1">{loadError}</p>
        </div>
      ) : (
        <HomeBookExplorer
          books={books}
          title="All Library Books"
          subtitle="Search by title or author, and filter by shelf category to find your next great read."
          badge="📚 Complete Catalog"
          showViewAll={false}
        />
      )}
    </div>
  );
}
