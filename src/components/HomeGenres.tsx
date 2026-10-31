import Link from "next/link";

interface GenreCard {
  id: string;
  name: string;
  query: string;
  icon: string;
  count: string;
  tag: string;
  description: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
}

const genres: GenreCard[] = [
  {
    id: "fiction",
    name: "Fiction & Novels",
    query: "Fiction",
    icon: "📖",
    count: "40+ Books",
    tag: "Most Popular",
    description:
      "Captivating storytelling, timeless classics, thrillers, and heartfelt literary journeys.",
    accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
    accentBorder: "border-emerald-200 dark:border-emerald-800/60",
    accentText: "text-[#047857] dark:text-[#6EE7B7]",
  },
  {
    id: "science",
    name: "Science & Tech",
    query: "Science",
    icon: "🔬",
    count: "25+ Books",
    tag: "Curiosity Hub",
    description:
      "Deep dives into astrophysics, computer algorithms, human biology, and space exploration.",
    accentBg: "bg-teal-50 dark:bg-teal-950/40",
    accentBorder: "border-teal-200 dark:border-teal-800/60",
    accentText: "text-teal-700 dark:text-teal-300",
  },
  {
    id: "history",
    name: "History & Ideas",
    query: "History",
    icon: "🏛️",
    count: "20+ Books",
    tag: "Timeless Wisdom",
    description:
      "Memoirs of great minds, epoch-defining world events, civilizations, and timeless philosophy.",
    accentBg: "bg-amber-50 dark:bg-amber-950/40",
    accentBorder: "border-amber-200 dark:border-amber-800/60",
    accentText: "text-[#D97706] dark:text-[#FCD34D]",
  },
  {
    id: "kids",
    name: "Kids & Young Readers",
    query: "Kids",
    icon: "🧸",
    count: "18+ Books",
    tag: "Family Favorites",
    description:
      "Vibrant picture books, bedtime fables, and inspiring tales designed for curious little bookworms.",
    accentBg: "bg-sky-50 dark:bg-sky-950/40",
    accentBorder: "border-sky-200 dark:border-sky-800/60",
    accentText: "text-sky-700 dark:text-sky-300",
  },
];

export default function HomeGenres() {
  return (
    <section className="border-b border-[#E7E5E4] bg-white py-14 dark:border-[#134E4A] dark:bg-[#073B2E] md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
              <span>🏷️</span> Curated Shelves
            </span>
            <h2 className="mt-2.5 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
              Explore by Reading Genre
            </h2>
            <p className="mt-1 text-sm text-[#6B7280] dark:text-[#A7F3D0]">
              Discover stories curated by community members across diverse genres and shelves.
            </p>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#047857] transition hover:text-[#065F46] hover:underline dark:text-[#6EE7B7] dark:hover:text-[#A7F3D0]"
          >
            <span>View All Shelves</span>
            <span>→</span>
          </Link>
        </div>

        {/* Genre Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              href={`/books`}
              className={`group relative flex flex-col justify-between rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${genre.accentBg} ${genre.accentBorder} shadow-sm shadow-stone-200/50 dark:shadow-none`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-xs dark:bg-[#052E22]">
                    {genre.icon}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${genre.accentText} bg-white/70 backdrop-blur-xs dark:bg-black/20`}
                  >
                    {genre.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-xl font-bold text-[#1F2937] transition group-hover:text-[#047857] dark:text-[#F0FDF4] dark:group-hover:text-[#6EE7B7]">
                  {genre.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#6B7280] dark:text-[#A7F3D0]">
                  {genre.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
                <span className="text-xs font-semibold text-[#4B5563] dark:text-[#A7F3D0]">
                  {genre.count}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-bold ${genre.accentText} transition group-hover:translate-x-1`}
                >
                  Explore <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

