import Link from "next/link";
import HomeBanner from "@/components/HomeBanner";
import HomeBookExplorer from "@/components/HomeBookExplorer";
import HomeGenres from "@/components/HomeGenres";
import HomeImpactCounter from "@/components/HomeImpactCounter";
import HomeTestimonials from "@/components/HomeTestimonials";
import HomeFAQ from "@/components/HomeFAQ";
import HomeBookRequests from "@/components/HomeBookRequests";
import HomeNewsletter from "@/components/HomeNewsletter";
import { API_URL } from "@/lib/config";
import type { Book } from "@/lib/api";

/**
 * BookNook Home Page — Step 6 (Home).
 * Refined editorial design combining brand emerald, amber accents,
 * search lens, category shelf filtering, and community storytelling.
 */
export const metadata = { title: "Home" };

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
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: "Browse & Discover",
    text: "Explore books shared by fellow readers. Pick from Fiction, Science, History, Kids, and more with live availability.",
  },
  {
    step: "02",
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Borrow Instantly",
    text: "With one click, borrow any book for a 7-day reading period. The available copy count automatically reserves it for you.",
  },
  {
    step: "03",
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Read & Pass On",
    text: "Enjoy your reading time, then return the book from your Dashboard so the next reader can begin the journey.",
  },
];

const highlights = [
  {
    icon: (
      <svg className="h-5 w-5 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    title: "Community Driven",
    desc: "100% shared by real passionate readers",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "7-Day Reading Loan",
    desc: "Read and circulate with fellow bookworms",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Trust-Based Sharing",
    desc: "Honor code: read and pass it on",
  },
  {
    icon: (
      <svg className="h-5 w-5 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
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
      <section className="border-b border-emerald-100 bg-linear-to-r from-[#F0FDF4] via-[#ECFDF5] to-[#F0FDF4] py-6 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-emerald-200/60 bg-white/80 p-3 shadow-2xs backdrop-blur-xs transition hover:border-[#047857] hover:bg-white dark:border-[#134E4A] dark:bg-[#052E22]/60 dark:hover:border-[#6EE7B7]"
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

      {/* 3. New Arrivals — Fresh Books Showcase */}
      <section className="bg-[#FDFBF7] py-14 dark:bg-[#052E22] md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HomeBookExplorer
            books={books}
            title="New Arrivals"
            subtitle="The latest books readers have added to BookNook."
            badge="New Arrivals"
            showViewAll={true}
            maxDisplay={8}
            showSearch={false}
          />
        </div>
      </section>

      {/* 4. Curated Shelves & Reading Genres */}
      <HomeGenres />

      {/* 5. Curated Spotlight: Featured Reader Addition */}
      {featuredBook && (
        <section className="border-y border-emerald-200/80 bg-linear-to-b from-[#F0FDF4] via-[#FDFBF7] to-[#ECFDF5] py-14 dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] md:py-18">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl border border-emerald-200/90 bg-linear-to-br from-[#ECFDF5] via-[#FAFDFB] to-[#FEF3C7]/40 p-6 shadow-xl shadow-emerald-950/5 md:p-10 dark:border-[#134E4A] dark:from-[#052E22] dark:via-[#073B2E] dark:to-[#052E22] dark:shadow-2xl">
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
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#047857] px-3 py-1 text-xs font-bold text-white shadow-xs dark:bg-[#052E22] dark:text-[#6EE7B7]">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    <span>Reader Spotlight</span>
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
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </Link>
                    <Link
                      href="/books"
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white/90 px-5 py-2.5 text-sm font-bold text-[#047857] shadow-xs transition hover:border-[#047857] hover:bg-[#ECFDF5] dark:border-[#134E4A] dark:bg-[#052E22] dark:text-[#ECFDF5] dark:hover:border-[#6EE7B7]"
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

      {/* 6. How Borrowing Works */}
      <section className="bg-[#FDFBF7] py-16 dark:bg-[#052E22] md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#073B2E] dark:text-[#6EE7B7]">
              Peer-to-Peer Circulation
            </span>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
              How BookNook Works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-[#6B7280] dark:text-[#A7F3D0]">
              Our three-step reading loop keeps shelves full and readers inspired.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {borrowSteps.map((item, idx) => {
              const styles = [
                {
                  card: "border-emerald-200/90 bg-linear-to-br from-emerald-50/90 via-[#FAFDFB] to-emerald-100/40 hover:border-[#047857]",
                  num: "text-emerald-300 group-hover:text-[#047857]",
                  icon: "bg-emerald-100 text-[#047857]",
                },
                {
                  card: "border-amber-200/90 bg-linear-to-br from-amber-50/90 via-[#FFFDF5] to-amber-100/40 hover:border-[#D97706]",
                  num: "text-amber-300 group-hover:text-[#D97706]",
                  icon: "bg-amber-100 text-[#D97706]",
                },
                {
                  card: "border-teal-200/90 bg-linear-to-br from-teal-50/90 via-[#F4FAF8] to-teal-100/40 hover:border-teal-700",
                  num: "text-teal-300 group-hover:text-teal-700",
                  icon: "bg-teal-100 text-teal-700",
                },
              ][idx] || {
                card: "border-emerald-200 bg-white",
                num: "text-[#E7E5E4]",
                icon: "bg-[#ECFDF5] text-[#047857]",
              };

              return (
                <div
                  key={item.step}
                  className={`group relative flex flex-col rounded-3xl border p-7 shadow-lg shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40 ${styles.card}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-2xl dark:bg-[#052E22] dark:text-[#6EE7B7] ${styles.icon}`}>
                      {item.icon}
                    </span>
                    <span className={`font-serif text-2xl font-bold transition dark:text-[#134E4A] dark:group-hover:text-[#FCD34D] ${styles.num}`}>
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
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Community Milestones & Impact Stats */}
      <HomeImpactCounter />

      {/* 8. Reader Testimonials & Reviews */}
      <HomeTestimonials />

      {/* 9. Frequently Asked Questions (FAQ Accordion) */}
      <HomeFAQ />

      {/* 10. Community Book Requests (Wish Wall) */}
      <HomeBookRequests />

      {/* 11. Weekly Book Club Newsletter */}
      <HomeNewsletter />
    </div>
  );
}
