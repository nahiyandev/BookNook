import Link from "next/link";
import HomeBanner from "@/components/HomeBanner";
import HomeBookExplorer from "@/components/HomeBookExplorer";
import { API_URL } from "@/lib/config";
import type { Book } from "@/lib/api";

/**
 * BookNook Home Page — Step 6 (Home).
 * Refined editorial design combining brand emerald, amber accents,
 * search lens, category shelf filtering, and community storytelling.
 */
export const metadata = { title: "Home | BookNook" };

async function getBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${API_URL}/books`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    const books: Book[] = Array.isArray(data) ? data : [];
    books.sort(
      (a, b) =>
        new Date((b as Book & { addedAt?: string }).addedAt || 0).getTime() -
        new Date((a as Book & { addedAt?: string }).addedAt || 0).getTime()
    );
    return books;
  } catch {
    return [];
  }
}

const borrowSteps = [
  {
    step: "01",
    icon: "🔍",
    title: "Browse & Discover",
    text: "Explore books shared by fellow readers. Pick from Fiction, Science, History, Kids, and more with live availability.",
  },
  {
    step: "02",
    icon: "📖",
    title: "Borrow Instantly",
    text: "With one click, borrow any book for a 7-day reading period. The available copy count automatically reserves it for you.",
  },
  {
    step: "03",
    icon: "🔄",
    title: "Read & Pass On",
    text: "Enjoy your reading time, then return the book from your Dashboard so the next reader can begin the journey.",
  },
];

const highlights = [
  {
    icon: "🌿",
    title: "Community Driven",
    desc: "100% shared by real passionate readers",
  },
  {
    icon: "⏱️",
    title: "7-Day Free Loan",
    desc: "Read without subscription or hidden fees",
  },
  {
    icon: "🤝",
    title: "Trust-Based Sharing",
    desc: "Zero fines, just return when you are done",
  },
  {
    icon: "📚",
    title: "Growing Catalog",
    desc: "Fresh arrivals added to shelves daily",
  },
];

export default async function HomePage() {
  const books = await getBooks();
  const featuredBook = books[0]; // Spotlight the freshest addition

  return (
    <div className="min-h-screen">
      {/* 1. Hero Swiper Banner */}
      <HomeBanner />

      {/* 2. Brand Trust Strip */}
      <section className="border-b border-[#E7E5E4] bg-white py-6 dark:border-[#134E4A] dark:bg-[#073B2E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-[#E7E5E4] dark:hover:border-[#134E4A]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ECFDF5] text-xl dark:bg-[#052E22]">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <h4 className="truncate text-xs font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                    {item.title}
                  </h4>
                  <p className="truncate text-[11px] text-[#6B7280] dark:text-[#A7F3D0]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. New Arrivals — Interactive Book Explorer with Search Lens & Category Filter */}
      <section className="bg-[#FDFBF7] py-14 dark:bg-[#052E22] md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HomeBookExplorer
            books={books}
            title="New Arrivals"
            subtitle="The latest books readers have added to BookNook."
            badge="✨ New Arrivals"
            showViewAll={true}
            maxDisplay={8}
          />
        </div>
      </section>

      {/* 4. Curated Spotlight: Featured Reader Addition */}
      {featuredBook && (
        <section className="border-y border-[#E7E5E4] bg-white py-14 dark:border-[#134E4A] dark:bg-[#073B2E] md:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-[#E7E5E4] bg-linear-to-br from-[#FDFBF7] via-white to-[#ECFDF5] p-6 shadow-xl shadow-stone-200/50 md:p-10 dark:border-[#134E4A] dark:from-[#052E22] dark:via-[#073B2E] dark:to-[#052E22] dark:shadow-2xl">
              <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                {/* Book Cover */}
                <div className="flex justify-center md:col-span-4">
                  <Link
                    href={`/books/${featuredBook._id}`}
                    className="group relative block max-w-xs overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10 transition group-hover:scale-102 dark:ring-white/10"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredBook.image}
                      alt={featuredBook.title}
                      className="aspect-2/3 h-72 w-auto rounded-2xl object-cover transition duration-300 group-hover:scale-105 sm:h-80"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-[#D97706] px-3 py-1 text-xs font-bold text-white shadow-md">
                      Featured Pick
                    </span>
                  </Link>
                </div>

                {/* Book Details & Quote */}
                <div className="md:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                    <span>⭐ Reader Spotlight</span>
                    <span>•</span>
                    <span>Shelf: {featuredBook.category}</span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[#1F2937] sm:text-3xl lg:text-4xl dark:text-[#F0FDF4]">
                    {featuredBook.title}
                  </h3>
                  <p className="mt-1 font-serif text-sm font-semibold text-[#047857] sm:text-base dark:text-[#6EE7B7]">
                    by {featuredBook.author}
                  </p>

                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-[#4B5563] sm:text-base dark:text-[#A7F3D0]">
                    {featuredBook.description ||
                      "A celebrated work shared with the community. Dive into its pages and experience the joy of reading."}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/books/${featuredBook._id}`}
                      className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#047857] via-[#059669] to-[#047857] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-900/20 transition hover:brightness-110 active:scale-[0.99]"
                    >
                      <span>Borrow This Book</span>
                      <span>📖</span>
                    </Link>
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 rounded-xl border border-[#E7E5E4] bg-white px-5 py-2.5 text-sm font-bold text-[#4B5563] shadow-xs transition hover:border-[#047857] hover:text-[#047857] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:hover:border-[#6EE7B7]"
                    >
                      <span>Browse More Titles</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. How Borrowing Works */}
      <section className="bg-[#FDFBF7] py-16 dark:bg-[#052E22] md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
              Simple & Free
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
              How BookNook Works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#6B7280] dark:text-[#A7F3D0]">
              Our three-step reading loop keeps shelves full and readers inspired.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {borrowSteps.map((item) => (
              <div
                key={item.step}
                className="group relative flex flex-col rounded-3xl border border-[#E7E5E4] bg-white p-7 shadow-lg shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#047857]/40 hover:shadow-xl dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ECFDF5] text-2xl text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
                    {item.icon}
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#E7E5E4] group-hover:text-[#D97706] transition dark:text-[#134E4A] dark:group-hover:text-[#FCD34D]">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B7280] dark:text-[#A7F3D0]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Community Share Callout (CTA) */}
      <section className="bg-white py-16 dark:bg-[#073B2E] md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#047857] via-[#065F46] to-[#047857] p-8 text-center text-white shadow-2xl shadow-emerald-900/30 sm:p-12 md:p-16">
            <div className="mx-auto max-w-2xl">
              <span className="inline-block text-3xl sm:text-4xl">📚✨</span>
              <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Share a Book, Spark a Journey
              </h2>
              <p className="mt-3 text-sm text-[#ECFDF5] sm:text-base leading-relaxed">
                Have books resting on your shelf at home? Share them with fellow readers in your community and let stories travel.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/add-book"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#047857] shadow-md transition hover:bg-[#FDFBF7] active:scale-[0.99]"
                >
                  <span>Add a Book to Library</span>
                  <span>➕</span>
                </Link>
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/20 active:scale-[0.99]"
                >
                  <span>Browse All Books</span>
                  <span>📖</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
