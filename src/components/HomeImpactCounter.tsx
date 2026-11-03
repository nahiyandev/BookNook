interface ImpactStat {
  id: string;
  number: string;
  label: string;
  subtext: string;
  icon: React.ReactNode;
}

const stats: ImpactStat[] = [
  {
    id: "books",
    number: "250+",
    label: "Books in Circulation",
    subtext: "Shared by neighborhood readers",
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "reads",
    number: "1,400+",
    label: "Reading Hours Logged",
    subtext: "Spent exploring new stories",
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    id: "borrows",
    number: "480+",
    label: "Community Loans",
    subtext: "Completed with a 100% return rate",
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: "community",
    number: "100%",
    label: "Peer-to-Peer Sharing",
    subtext: "Entirely run & shared by readers",
    icon: (
      <svg className="h-6 w-6 text-[#047857] dark:text-[#6EE7B7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

export default function HomeImpactCounter() {
  return (
    <section className="border-y border-[#E7E5E4] bg-linear-to-b from-white to-[#FDFBF7] py-16 dark:border-[#134E4A] dark:from-[#073B2E] dark:to-[#052E22] md:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <span>Community Milestones</span>
          </span>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-[#1F2937] sm:text-4xl dark:text-[#F0FDF4]">
            Our Growing Shelf & Reading Family
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-[#6B7280] dark:text-[#A7F3D0]">
            Together, we are transforming idle bookshelf space into an open, accessible reading room for everyone.
          </p>
        </div>

        {/* Counter Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, idx) => {
            const styles = [
              {
                card: "border-emerald-200/90 bg-linear-to-b from-emerald-50/90 via-[#FAFDFB] to-emerald-100/30 hover:border-[#047857]",
                icon: "bg-emerald-100 text-[#047857]",
                num: "text-[#047857]",
              },
              {
                card: "border-teal-200/90 bg-linear-to-b from-teal-50/90 via-[#F5FBFA] to-teal-100/30 hover:border-teal-700",
                icon: "bg-teal-100 text-teal-700",
                num: "text-teal-700",
              },
              {
                card: "border-amber-200/90 bg-linear-to-b from-amber-50/90 via-[#FFFDF7] to-amber-100/30 hover:border-[#D97706]",
                icon: "bg-amber-100 text-[#D97706]",
                num: "text-[#D97706]",
              },
              {
                card: "border-purple-200/90 bg-linear-to-b from-purple-50/90 via-[#FAF5FF] to-purple-100/30 hover:border-purple-700",
                icon: "bg-purple-100 text-purple-700",
                num: "text-purple-700",
              },
            ][idx] || {
              card: "border-emerald-200 bg-emerald-50/50",
              icon: "bg-[#ECFDF5] text-[#047857]",
              num: "text-[#047857]",
            };

            return (
              <div
                key={item.id}
                className={`group relative flex flex-col items-center rounded-3xl border p-7 text-center shadow-lg shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-[#134E4A] dark:bg-none dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40 ${styles.card}`}
              >
                <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition duration-300 group-hover:scale-110 dark:bg-[#052E22] dark:text-[#6EE7B7] ${styles.icon}`}>
                  {item.icon}
                </span>

                <div className={`mt-4 font-serif text-3xl font-extrabold tracking-tight sm:text-4xl dark:text-[#6EE7B7] ${styles.num}`}>
                  {item.number}
                </div>

                <h3 className="mt-1 font-serif text-base font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                  {item.label}
                </h3>

                <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                  {item.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

