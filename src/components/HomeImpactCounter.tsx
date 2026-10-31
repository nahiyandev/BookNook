interface ImpactStat {
  id: string;
  number: string;
  label: string;
  subtext: string;
  icon: string;
}

const stats: ImpactStat[] = [
  {
    id: "books",
    number: "250+",
    label: "Books in Circulation",
    subtext: "Shared by neighborhood readers",
    icon: "📚",
  },
  {
    id: "reads",
    number: "1,400+",
    label: "Reading Hours Logged",
    subtext: "Spent exploring new stories",
    icon: "⏱️",
  },
  {
    id: "borrows",
    number: "480+",
    label: "Community Loans",
    subtext: "Completed with a 100% return rate",
    icon: "🤝",
  },
  {
    id: "community",
    number: "100%",
    label: "Peer-to-Peer Sharing",
    subtext: "Entirely run & shared by readers",
    icon: "💚",
  },
];

export default function HomeImpactCounter() {
  return (
    <section className="border-y border-[#E7E5E4] bg-linear-to-b from-white to-[#FDFBF7] py-16 dark:border-[#134E4A] dark:from-[#073B2E] dark:to-[#052E22] md:py-22">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#047857] dark:bg-[#052E22] dark:text-[#6EE7B7]">
            <span>📊</span> Community Milestones
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
          {stats.map((item) => (
            <div
              key={item.id}
              className="group relative flex flex-col items-center rounded-3xl border border-[#E7E5E4] bg-white p-7 text-center shadow-lg shadow-stone-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-[#047857]/40 hover:shadow-xl dark:border-[#134E4A] dark:bg-[#073B2E] dark:shadow-2xl dark:hover:border-[#6EE7B7]/40"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#ECFDF5] text-2xl transition duration-300 group-hover:scale-110 dark:bg-[#052E22]">
                {item.icon}
              </span>

              <div className="mt-4 font-serif text-3xl font-extrabold tracking-tight text-[#047857] sm:text-4xl dark:text-[#6EE7B7]">
                {item.number}
              </div>

              <h3 className="mt-1 font-serif text-base font-bold text-[#1F2937] dark:text-[#F0FDF4]">
                {item.label}
              </h3>

              <p className="mt-1 text-xs text-[#6B7280] dark:text-[#A7F3D0]">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

